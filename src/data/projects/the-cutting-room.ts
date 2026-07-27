import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'the-cutting-room',
  summary:
    'A multi-agent GenAI video pipeline that scores short-form video from handpicked creators, breaks the winners down into generation-ready blueprints, and regenerates them as new reels. A FastAPI hub and a React 19 dashboard, with three agents coordinating over HTTP and no shared filesystem.',
  plateCaption:
    'Separate components drawn around a central hub — AnalysisEngine, AutoSearch, SimilarContent and the Dashboard — each connected only to the hub and never to each other.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'Building a GenAI video pipeline typically means a monolithic service where every component shares a filesystem and a process. That couples ingestion, generation, scoring, and rendering so tightly that scaling one means scaling everything, and a failure in any stage takes down the whole pipeline.',
        'The stages also differ enormously in what they cost. Scraping and scoring are free and need no API key at all. Generating a blueprint spends model credits per clip, and rendering spends roughly four cents per generated frame. A monolith leaves nowhere obvious to put the boundary that rations the expensive half, which is the boundary that actually matters once the thing runs unattended.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'Each capability is its own directory with its own dependencies and its own CLI, and they integrate only over HTTP. One FastAPI service — ReelScraper, the hub, on 127.0.0.1:8787 — owns every read and every write. No agent touches another agent’s files, and the decoupling comes from that boundary rather than from folder layout. Two join keys hold the system together: content_id ties a corpus row to its downloaded clip and its blueprint, and audio_id ties a row to the sound it used. The hub also serves the built Dashboard from the same origin, plus static mounts for the scraped corpus and for generated renders, so the whole product is one process on one port with no cross-origin requests to reason about.',
        'Work moves through eight stages. AutoSearch finds candidate creators and posts them for review; approved handles become the source list a scrape run consumes. The hub itself scrapes those pages, scores everything it pulled, and downloads the clips that clear a tier gate. AnalysisEngine watches the downloaded clips and writes blueprints. SimilarContent reads a blueprint and writes a clone recipe into the Studio, which is purely a human gate — nothing renders until a person approves it.',
      ],
      diagram: [
        'flowchart LR',
        '  A[Discover] --> B[Sources]',
        '  B --> C[Scrape]',
        '  C --> D[Score]',
        '  D --> E[Media]',
        '  E --> F[Blueprint]',
        '  F --> G[Propose]',
        '  G --> H{Human gate}',
        '  H -->|approved| I[Render]',
        '  H -->|rejected| J[Dropped]',
      ].join('\n'),
    },
    {
      heading: 'Scoring, and what the gates ration',
      body: [
        'The scoring engine is platform-agnostic and purely arithmetic — no model call anywhere in it. It computes four signals per post: engagement rate as engagements over followers, reach multiplier as plays over followers, outlier score as plays over that creator’s own median plays, and velocity as plays per day since posting. Each signal is percentile-normalised across the whole dataset and the ranks are blended by configurable weights into a 0 to 100 score and a tier label. The defaults lean hardest on reach multiplier, with outlier score and engagement rate weighted equally behind it and velocity counting least, and a post missing a signal is scored on the weights that did resolve rather than being penalised for the gap.',
        'That score then doubles as the spending control. The media stage is not a top-N download but a tier gate: the niche config names a minimum tier, and that label is resolved through the same tiers table the scoring engine uses, so choosing Viral gets exactly the scoring engine’s Viral cutoff and the two cannot drift apart. Only downloaded clips are eligible for the paid blueprint stage, so one gate bounds both disk and spend.',
        'Above that sits an optional cascading heartbeat — a sixty-second tick that fires the next stage once enough new material has landed, sized as a funnel of percentages. Because no percentage can exceed one hundred, every step in the derivation is at least as large as the one before it, so a downstream stage can never be configured to fire more often than the stage feeding it. That is structural rather than validated: there is no number you can type into the form that breaks it. Rendering is excluded from the cascade entirely — it is not in the stage list and the config endpoint drops any key outside the allowlist.',
      ],
      diagram: [
        'flowchart LR',
        '  A[engagement rate] --> P[percentile rank]',
        '  B[reach multiplier] --> P',
        '  C[outlier score] --> P',
        '  D[velocity] --> P',
        '  P --> W[weighted blend]',
        '  W --> S[score and tier]',
        '  S --> G{tier gate}',
        '  G -->|at or above| M[download clip]',
        '  G -->|below| X[metadata only]',
        '  M --> Q[paid blueprint queue]',
      ].join('\n'),
    },
    {
      heading: 'Blueprints, validated and repaired',
      body: [
        'AnalysisEngine uploads a downloaded clip and asks Gemini 2.5 Pro to describe it shot by shot in JSON mode, returning one canonical document: video metadata, a global style block with a concrete hex palette, the audio and the audio strategy, a shots array where every shot carries its own generation prompt and negative prompt, a regeneration guide holding the full prompt sequence in order, and a lean virality formula the hub serves to other agents. The call is made over hand-rolled urllib rather than a vendor SDK, which is the house style across all three Python agents.',
        'The document is then actually validated. Structure goes through jsonschema, and a second pass adds the meaning-level rules jsonschema cannot express — the sharpest of which hard-fails a regeneration guide whose prompt sequence has degraded into placeholders like shot_1_generation_prompt instead of real prompt text. A failure is not discarded: the exact validator errors are fed back to the model as a targeted repair prompt, up to two passes, and a repaired document is only accepted if it produces strictly fewer errors than the one it replaces. Identity is never taken from the model — content_id and the platform’s audio metadata are stamped onto the blueprint from the hub’s queue item, because the model cannot read that metadata and should not be guessing it.',
        'Two failure modes get explicit handling. An uploaded file URI expires, so an expiry raises a typed error, the clip is re-uploaded once, and the call is retried. And a three-strike circuit breaker stops the run after three consecutive failures, so a revoked key, an exhausted quota, or a hub outage costs three clips rather than the whole queue. A success resets the count, and a pacer keeps a minimum gap between calls.',
      ],
      diagram: [
        'stateDiagram-v2',
        '  [*] --> Generate',
        '  Generate --> Reupload: file uri expired',
        '  Reupload --> Generate',
        '  Generate --> Validate',
        '  Validate --> Persist: no errors',
        '  Validate --> Repair: validator errors',
        '  Repair --> Validate: fewer errors',
        '  Repair --> Persist: two passes spent',
        '  Persist --> [*]',
      ].join('\n'),
    },
    {
      heading: 'From blueprint to reel',
      body: [
        'Producers are pluggable through one contract. An agent posts a manifest to the hub declaring its kind, what it consumes, whether it needs a human gate, its config schema, and its secrets by environment-variable name only — the hub reports whether a key is present but never stores its value. The Dashboard renders a lane per registered producer, so adding one is a directory copy from the template plus a registration call, not a change to the hub.',
        'The proposing half is free: it reads the ranked corpus and the blueprints over HTTP and writes markdown. It scores each exemplar by how cheap it is to remake — shot count is the strongest term, worth forty-five points divided by the number of shots, then duration on a linear slope, then the fraction of shots whose camera does not move. A clip whose length is unknown, or that runs thirty seconds or longer, is vetoed outright rather than scored. Every term is continuous and monotone, and that shape is a correction: an earlier banded version saturated on a real Instagram corpus, every candidate scored the same forty out of a gate of fifty-five, and the selector silently fell back to ranking by virality while claiming to rank by ease. Each recipe now carries the arithmetic in a reasons trail, so the first question a 51.03 provokes has an answer in the file.',
        'Rendering is the only step that spends money per frame, so it is human-triggered by construction. Everything that can fail for free — parsing the recipe, allocating per-shot hold times, composing prompts, applying the frame budget — happens before the first API call, and a dry run stops exactly there. Frame zero is generated from text alone and inspected for defects before it becomes the reference for every later frame, because the image model has no seed and cross-frame consistency has to come from attaching that anchor. A defect in frame zero would otherwise be reproduced faithfully across every subsequent frame at four cents each, and the reel would still render and reach the gate looking finished.',
        'ffmpeg then joins the frames with the concat filter rather than the concat demuxer, which does not hold the per-segment durations it is given. Output is a silent vertical mp4: platform-licensed audio cannot be attached programmatically, so the recipe carries an audio block as the manual handoff instead of muxing an approximation that would look finished and sound wrong. The whole system ships as a multi-arch image to the GitHub Container Registry, with ffmpeg and x264 built from source against a configure line that disables everything and re-enables only the codecs, filters, and muxers the stitcher actually invokes.',
      ],
      diagram: [
        'sequenceDiagram',
        '  participant P as Producer',
        '  participant H as Hub',
        '  participant I as Image model',
        '  participant F as ffmpeg',
        '  P->>H: read corpus and blueprints',
        '  P->>H: post recipe to the human gate',
        '  H-->>P: approved item',
        '  P->>I: frame zero prompt',
        '  I-->>P: anchor frame',
        '  P->>I: later prompts plus anchor',
        '  I-->>P: remaining frames',
        '  P->>F: frames and hold times',
        '  F-->>P: silent vertical mp4',
        '  P->>H: post render, poster and caption',
      ].join('\n'),
    },
  ],
  metrics: [
    { value: '3', label: 'agents' },
    { value: '1', label: 'hub' },
    { value: '0', label: 'shared filesystem' },
  ],
  stackFull: ['FastAPI', 'Python', 'uv', 'React 19', 'TypeScript', 'Vite', 'Gemini', 'jsonschema', 'ffmpeg', 'SQLite FTS5', 'Server-Sent Events', 'Docker'],
}

export default detail
