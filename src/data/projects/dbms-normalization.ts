import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'dbms-normalization',
  summary:
    'Takes a CSV table, infers its functional dependencies from the rows themselves, and decomposes it recursively until every table that comes out is in BCNF. A Streamlit front end shows the input and the resulting tables, and each one is written back into MySQL.',
  plateCaption:
    'Raw table → step-by-step normalization through 1NF, 2NF, 3NF, BCNF with visualized decomposition at each stage.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'Normalization is taught as a procedure over a declared schema: you are handed the functional dependencies, you check them against each normal form, and you split where a rule is broken. Real tables rarely arrive that way. What you usually have is a CSV — columns, rows, and no statement anywhere of which attribute determines which.',
        'So the first half of the problem is not decomposition at all. It is working out what the dependencies are before any normal form can be checked, and doing it from the only evidence present, which is the data.',
      ],
    },
    {
      heading: 'Inferring dependencies from the data',
      body: [
        'A dependency X to Y is tested directly against the rows. Group every row by its value of X, then look at the values of Y inside each group; if any group holds more than one distinct Y, the dependency does not hold. That check is the primitive everything else is built on, and it needs no schema, only the table.',
        'The search runs the check over candidate determinants of one, two, and three attributes. Composite determinants are only recorded when none of the attributes involved already determine one another individually, which stops the set filling up with dependencies that a smaller one already implies. The search is also ordered: an attribute is tried as a determinant only for the attributes to its right in column order, so the discovered set is a function of the column layout as well as the data.',
        'From that set, attribute closure is computed the usual way — repeatedly apply every dependency whose left side is already inside the closure, until nothing new is added. Any attribute set whose closure covers the whole table is a candidate key, and the search stops at the first size that yields one, so the keys returned are the smallest that exist. The shortest of them becomes the primary key, the union of them is the set of prime attributes, and everything left over is non-prime. That split is what the normal form rules are phrased in terms of.',
      ],
      diagram: `flowchart LR
  CSV[CSV file] --> DF[pandas DataFrame]
  DF --> Gen[Enumerate candidate determinants]
  Gen --> Test[Group rows by determinant]
  Test --> Keep[Keep if right side is constant per group]
  Keep --> Cl[Attribute closure]
  Cl --> Keys[Smallest candidate keys]
  Keys --> Prime[Prime and non prime attributes]`,
    },
    {
      heading: 'The normal form ladder',
      body: [
        'The four checks are layered rather than independent. The 2NF check calls the 1NF check first and returns its failure if there is one, the 3NF check calls the 2NF check, and the BCNF check calls the 3NF check. Each check does one thing of its own: 1NF looks for a cell holding a list, 2NF for a dependency whose left side is a proper subset of a candidate key and whose right side is non-prime, 3NF for a dependency whose left side contains no candidate key and whose right side is non-prime, BCNF for any dependency whose left side is not a superkey.',
        'The driver only ever asks the BCNF question. Because of the layering, what comes back is not simply a yes or no but the lowest-form violation present, together with the offending dependency. That is the useful property: the caller does not have to decide which rule to fix next, and the order in which a table gets taken apart is fixed by the ladder rather than by the order dependencies happened to be discovered in.',
      ],
      diagram: `flowchart TD
  Start[Check one table] --> A{Any cell holds a list}
  A -- yes --> V1[1NF violation]
  A -- no --> B{Partial dependency}
  B -- yes --> V2[2NF violation]
  B -- no --> C{Transitive dependency}
  C -- yes --> V3[3NF violation]
  C -- no --> D{Determinant is not a superkey}
  D -- yes --> V4[BCNF violation]
  D -- no --> Done[Table is in BCNF]`,
    },
    {
      heading: 'Decomposition',
      body: [
        'A violation comes back as the dependency that caused it, and that dependency decides the split. The closure of its left side is computed; one child table gets every attribute inside that closure, the other gets the left side plus every attribute outside it. The left side is what the two share, so the original table is recoverable by joining on it. The parent is removed from the working set and replaced by its two children, named by appending 1 and 2, which is why the intermediate tables carry names like Employee21.',
        'Because a child can itself violate a rule, the process is a sweep rather than a single pass: every table in the working set is checked, any that fails is replaced by its two children, and the sweep repeats until an entire pass finds nothing left to decompose.',
        'The four CSVs checked into the repository record one such run over the sample hotel-contract table, whose columns are NIN, contractNo, hoursPerWeek, eName, hotelNo and hotelLocation. Its candidate key is NIN with contractNo, so the dependency from NIN alone to eName is a partial one and the ladder reports it as a 2NF violation first; that splits off the employee names. The remainder is split on contractNo, and the piece holding contractNo, hotelNo and hotelLocation is split once more on hotelNo, leaving four tables.',
      ],
      diagram: `flowchart TD
  E[Employee] --> E1["Employee1 - NIN, eName"]
  E --> E2[Employee2]
  E2 --> E21[Employee21]
  E2 --> E22["Employee22 - contractNo, NIN, hoursPerWeek"]
  E21 --> E211["Employee211 - hotelNo, hotelLocation"]
  E21 --> E212["Employee212 - hotelNo, contractNo"]`,
    },
    {
      heading: 'Result',
      body: [
        'The output of a run is a set of tables, each in BCNF and each carrying its own primary key. They are written out three ways. Every table is exported to a CSV in a chosen directory, and every table is created in MySQL — the schema is generated by mapping pandas column types onto SQL types, integer to int, float to float, object to varchar, boolean to bool, and the rows are then inserted through parameterized statements rather than string-built SQL.',
        'The Streamlit app is the interactive path: it takes a table name and an uploaded CSV, shows the original table with the primary key that was inferred for it, and then shows each of the tables the decomposition produced with its own key, so the split is visible next to what it came from. The same pipeline runs from a command-line entry point that reads a CSV path instead, and prints the full dependency set and candidate keys for each result. The app ships with a Procfile and a Streamlit config script for a hosted deployment.',
      ],
      diagram: `flowchart LR
  T[BCNF tables] --> Map[Map pandas dtypes to SQL types]
  Map --> Create[CREATE TABLE]
  Create --> Ins[Parameterized inserts]
  Ins --> DB[MySQL]
  T --> Out[CSV export]
  T --> UI[Streamlit view]`,
    },
  ],
  metrics: [
    { value: '1NF→BCNF', label: 'normalization range' },
    { value: '10+', label: 'table schemas supported' },
  ],
  stackFull: ['Python', 'C++', 'SQL', 'Streamlit', 'pandas', 'MySQL'],
}

export default detail
