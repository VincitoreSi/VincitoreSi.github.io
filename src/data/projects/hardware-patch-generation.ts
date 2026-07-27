import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'hardware-patch-generation',
  summary:
    'A resource-aware patch-generation algorithm for functional ECO, solving 10,000+ test cases at roughly 90% efficiency with sub-second generation.',
  plateCaption:
    'Circuit design → ECO constraints → resource-aware patch algorithm → optimized patch with 90% efficiency.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'The ICCAD 2017 CAD Contest set the problem this way. You are handed two gate-level netlists. F is the design in hand, with a small number of internal wires left undriven — the target points. G is the golden circuit, the behaviour F is supposed to have. The job is to synthesise logic for each target so that the patched F is equivalent to G.',
        'What makes this more than a synthesis exercise is the third input. A weight file assigns a cost to every node in F, and a patch may only read nodes that already exist in the circuit — the base nodes. The score of a patch is the sum of the weights of the base nodes it uses, so two patches that both make F equivalent to G are not worth the same. A patch that fails equivalence is worth nothing at all, whatever it scores.',
        'The tool is a command line program taking F, G and the weight file and writing two things: patch.v, a standalone Verilog module driving the targets, and out.v, a copy of F with that module instanced at the target wires. Both go to a formal checker before anything is reported.',
      ],
      diagram: `flowchart LR
  FV["F.v with target wires"] --> ECO["eco flow"]
  GV["G.v golden circuit"] --> ECO
  WT["weight.txt node costs"] --> ECO
  ECO --> PAT["patch.v"]
  ECO --> OUT["out.v"]
  PAT --> CEC["ABC cec against G"]
  OUT --> CEC`,
    },
    {
      heading: 'Shape of the flow',
      body: [
        'Both netlists are read by a regex parser that accepts any single-line gate instantiation and uppercases its type; the primitives the simulator actually evaluates are and, or, nand, nor, xor, xnor, not, buf, plus constant ties. The contest format hides the targets in plain sight: the first wire declaration in F.v lists ordinary internal wires, the second lists the target names, so the parser returns the second group separately and treats those nodes as undriven.',
        'Before any search runs, the outputs that no target can reach are checked against G with the ABC command cec. If those already differ, no patch at any price can fix the circuit, and the tool stops rather than searching.',
        'Then the targets are grouped. Each target is expanded forward through its fanout cone, intersected with the primary outputs, which gives a map from a set of targets to the outputs they jointly affect. Connected components over those sets produce groups of targets that share no output at all. When there is more than one group, each is solved on a cut-down copy of the circuit and the resulting patches are merged; a single group is solved on the circuit as it stands. This split is not cosmetic: the target array built during the search enumerates every assignment of the unresolved targets, so cost grows as two to the power of the number of targets held at once. Splitting the problem into independent groups is what keeps that exponent small.',
      ],
      diagram: `flowchart TD
  RD["parse F, G and weights"] --> CL["cec the outputs no target can reach"]
  CL --> DP["map each target to the outputs it reaches"]
  DP --> CC["connected components give independent groups"]
  CC --> PS["solve each group on a cut down circuit"]
  PS --> MG["merge the group patches"]
  MG --> MW["weight minimiser"]
  MW --> MP["ABC map to shrink gate count"]
  MP --> FV["final cec of out.v against G"]`,
    },
    {
      heading: 'Resolving one target',
      body: [
        'Within a group, targets are resolved one at a time. The smallest cluster of mutually dependent targets is chosen first, ties going to the cluster that covers the most outputs, and the target itself is then drawn at random from within that cluster. The design under test is assembled fresh each round: the original circuit with the patches found so far spliced in, and every still-unresolved target tied to ground.',
        'Stimulus is chosen by input count. Below sixteen inputs the tool enumerates the input space exhaustively; above that it enumerates thirteen inputs exhaustively and randomises the rest, giving 8192 patterns. Simulation is bit-parallel — every wire holds one Python integer with one bit per pattern, and gate evaluation is a reduce with and, or or xor over those integers, so the whole pattern set moves through the netlist in a single memoised pass over the output cones.',
        'For each pattern, every assignment of the unresolved targets is simulated and the assignments that reproduce G on the affected outputs are recorded. That table is the target array. Patterns where every assignment works carry no information and are dropped, which shrinks the pattern set considerably. Collapsing the array onto one target gives the target vector: 0 where the target must be low, 1 where it must be high, and x where either value keeps the circuit equivalent. Those x positions are the don’t-care set, and they are what makes a cheap patch possible at all.',
        'The base search then picks support nodes, the resulting truth table goes through ABC to become gates, and the candidate patch is checked with cec on only the affected outputs. If no candidate passes, the tool builds a miter of the patched circuit against G with ABC, fraigs it, and simulates the miter to find input patterns where the two disagree. Those counterexamples are appended to the stimulus and the target is retried — each one removes an x from the target vector and forces the next basis to be more precise. When a target comes up repeatedly without resolving, every target sharing an output with it is unmarked and that region starts over.',
      ],
      diagram: `flowchart TD
  PK["pick next target"] --> DUT["build DUT from patches so far"]
  DUT --> SM["simulate F and G over the stimulus"]
  SM --> TA["target array of admissible assignments"]
  TA --> TV["target vector with x entries"]
  TV --> BS["base search"]
  BS --> SY["truth table through ABC"]
  SY --> EC["cec on the affected outputs"]
  EC -->|equivalent| OK["target resolved"]
  EC -->|not equivalent| MT["miter simulation for counterexamples"]
  MT --> SM
  OK --> PK`,
    },
    {
      heading: 'Choosing base nodes',
      body: [
        'Every candidate node has a signature — its simulated value across the pattern set, again one integer with one bit per pattern. Choosing base nodes is then a covering problem expressed as conflicts. All patterns start in one group. Adding a node splits every group in two according to that node’s signature bit. A group is in conflict while it still holds both a pattern where the target must be 0 and one where it must be 1, because no function of the chosen nodes can tell those patterns apart. When the conflict count reaches zero the chosen nodes are a valid support and a truth table exists.',
        'The greedy step is run twice with different metrics: absolute, which favours the node that removes the most conflicts, and weighted, which favours the best ratio of cost to conflicts removed. Neither pass scans the whole candidate pool — each step draws as many random candidates as there are nodes still in play and keeps the best of that sample, so this is a randomised greedy rather than an exhaustive one. Both bases are kept and compared later. Nodes already used by another target’s patch have their weight forced to zero, so they are absorbed for free before anything is paid for, which pushes the separate patches to share support. The step usually samples one candidate at a time but occasionally samples pairs or triples, so a combination that only pays off jointly is still reachable.',
        'Two clean-up passes follow. The first walks the basis and drops any node whose removal still leaves zero conflicts. The second tries substituting each remaining node with every other candidate, keeping any swap that lowers the score, and restarting whenever the basis shrinks. There is one implementation detail worth naming: groups of patterns are held either as bitmasks or as lists of pattern indices, and the code re-picks between the two representations each iteration using a hard-coded cost expression over the group count, the live pattern count and the stimulus width, cross terms included. The answers are identical; only the cost of scanning for conflicts differs, and which is cheaper flips as the groups get sparse.',
        'Each surviving basis becomes two candidate patches — the on-set as a sum of products and the off-set as a product of sums. Each is emitted as a flat Verilog module and mapped by ABC against a gate library of inverters, buffers and AND, OR, NAND, NOR, XOR and XNOR gates up to ten inputs. ABC does the actual gate-level minimisation; the search here is only concerned with which nodes the patch is allowed to read.',
      ],
      diagram: `flowchart LR
  SG["node signatures and target vector"] --> GA["greedy on conflicts removed"]
  SG --> GW["greedy on weight per conflict"]
  GA --> RD["drop redundant nodes"]
  GW --> RD
  RD --> MR["swap nodes for cheaper ones"]
  MR --> BL["bases sorted by weight"]
  BL --> DN["sum of products patch"]
  BL --> CN["product of sums patch"]`,
    },
    {
      heading: 'Fallbacks and minimisation',
      body: [
        'Some targets sit on a path of single-fanout gates leading straight to a primary output. For those, a correct patch can be constructed without any search: take the cone in G that drives that output, then walk back along the path in F adding an inverter for each inverting gate and re-applying the side inputs of any XOR. Its score is known as soon as it is built, so it is added to the candidate list and used as a ceiling — search results more expensive than the fallback are discarded rather than tested. It is not trusted on construction, though: it goes through the same equivalence check as every other candidate.',
        'The finished patch is not shipped as found. Several variants are generated: one that repeatedly replaces subsets of the support with the nodes driving them, walking the basis back toward the primary inputs; one that replaces the support wholesale with the primary inputs of its cone; and one that pushes the support forward toward the outputs instead. Each variant is scored by weight sum and then by gate count, and the list is walked cheapest-first, returning the first variant that passes cec against G on all outputs. Nothing is accepted on the strength of the simulation alone.',
        'After that the patch is mapped through ABC once more to shrink its gate count, out.v is written with the patch instanced into F, and the pair is checked against G a final time. A random test generator ships alongside the tool: it synthesises a random golden circuit, removes gates from it to produce F and its targets, and generates a weight file, which lets the flow be exercised beyond the sample circuits bundled with the repository.',
        'Work conducted under Prof. Binod Kumar at IIT Jodhpur, targeting ICCAD 2017 contest problem A. The tool described in the sections above is the open-source Functional_ECO implementation from IPPM RAS, vendored into the repository under solution/helper; its README asks that Stempkovskiy, Telpukhov and Soloviev, Fast and accurate resource-aware functional ECO patch generation tool, MWENT 2018, be cited.',
      ],
    },
  ],
  metrics: [
    { value: '10,000+', label: 'test cases solved' },
    { value: '~90%', label: 'efficiency' },
    { value: '<1s', label: 'generation time' },
  ],
  stackFull: ['Python', 'Verilog', 'Berkeley ABC'],
}

export default detail
