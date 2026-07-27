import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'sketch-colorization',
  summary:
    'Colorizes hand-drawn sketches using classical segmentation techniques, with no deep learning at any stage. A threshold splits the drawing into regions, external contours become fillable shapes, and a fixed colour map paints them.',
  plateCaption:
    'Hand-drawn sketch → threshold segmentation → external contours filled from a cycling colour map → colorized output, using no deep learning.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'The project came out of a computer vision course at IIT Jodhpur with a deliberate constraint: colorize hand-drawn sketches using only pre-deep-learning image processing. No network, no training run, no weights to ship. That rules out the obvious modern answer and forces the interesting question — how much of a sketch can you recover from pixel intensities alone.',
        'A pencil sketch is mostly white paper with dark strokes on it. The strokes enclose regions, and those regions are what a human would colour in. So the whole problem reduces to two steps: find the enclosed regions, then decide what colour each one gets. There is no dataset behind this. QuickDraw and a foreground/background sketch set were used for poking at inputs during development, but nothing is fitted to them.',
        'The pipeline below is the entire system. Everything downstream of the threshold is deterministic, which means the threshold is also the single point where the whole thing can go wrong.',
      ],
      diagram: `flowchart LR
  A[Grayscale sketch] --> B[Pick threshold from median]
  B --> C[Threshold to binary regions]
  C --> D[Find external contours]
  D --> E[Fill each contour from colour map]
  E --> F[Blend with original strokes]
  F --> G[Colorized image]`,
    },
    {
      heading: 'Approach',
      body: [
        'The model, such as it is, is a class. SketchColor in sketch.py takes a grayscale array and returns a coloured one, with no state carried between calls. Segmentation is a single cv.threshold, defaulting to TOZERO_INV so that pixels above the cutoff are zeroed and the darker stroke structure is what survives. Five other threshold modes are selectable — TOZERO, BINARY, BINARY_INV, TRUNC, TRIANGLE — because different sketch styles respond differently to the same cutoff.',
        'From the thresholded image, cv.findContours with RETR_EXTERNAL and CHAIN_APPROX_SIMPLE returns only the outermost boundary of each connected region. Nested holes are ignored on purpose: a sketch that is filled from the inside out tends to lose the interior detail that makes it readable as a drawing.',
        'Colour assignment is the least clever part of the system, and that is the point. Each contour gets colour_map[i % len(color_map)] — the index of the contour as OpenCV found it, wrapped around the length of the palette. There is no attempt to infer that a face should be skin-coloured or a leaf green. The palette cycles, and the result is decorative rather than semantic.',
        'The last step is what makes the output look like a coloured sketch instead of a stack of flat polygons. The filled image is combined with the original grayscale sketch at equal weight through cv.addWeighted at 0.5 and 0.5, so the pencil strokes remain visible through the colour rather than being painted over.',
      ],
      diagram: `flowchart TD
  A[Thresholded mask] --> B[findContours RETR EXTERNAL]
  B --> C[Contour list in discovery order]
  C --> D[Index wrapped over palette length]
  D --> E[fillPoly onto a copy of the sketch]
  E --> F[addWeighted half fill half sketch]
  F --> G[Strokes still visible through colour]`,
    },
    {
      heading: 'Key decisions',
      body: [
        'The README is blunt about the weak point: the algorithm is highly sensitive to the threshold value. A cutoff that segments a dark charcoal drawing cleanly will flatten a light pencil sketch into a single region, and vice versa. Rather than hide that behind an adaptive method, both entry points expose the threshold as a first-class knob and then supply a reasonable starting guess.',
        'The guess is a median heuristic. The image median divided by 255 gives a rough measure of how light the paper is, and that value is bucketed into a threshold between 100 and 200 — darker sketches get a lower cutoff, near-white ones get a higher one. It fires only when the operator has left the control at its default value, so an explicitly chosen threshold is never silently overridden.',
        'That is a small design decision with a specific consequence: the default path adapts to the input, and the manual path stays predictable. Someone tuning a difficult sketch can move the slider and trust that the number they set is the number that runs.',
      ],
      diagram: `flowchart TD
  A[Grayscale sketch] --> B[Median divided by 255]
  B --> C{Threshold left at default}
  C -- no --> D[Use the operator value]
  C -- yes --> E[Map lightness band to cutoff]
  E --> F[Dark sketch 100 to 120]
  E --> G[Mid sketch 150 to 180]
  E --> H[Near white sketch 190 to 200]
  D --> I[Run segmentation]
  F --> I
  G --> I
  H --> I`,
    },
    {
      heading: 'Reimplementing the primitives',
      body: [
        'A second class, SketchColorScratch, sits beside the first and rebuilds the OpenCV calls the pipeline depends on. Colour space conversion covers four directions, and the one the pipeline actually asks for is GRAY2BGR, which stacks the grey plane three times. The BGR2GRAY branch beside it is a per-pixel luma dot product against the standard coefficients, and nothing calls it — both entry points read the sketch in as grayscale already. Thresholding is a set of NumPy boolean masks, one branch per mode. Alpha blending is the weighted sum written out and clipped back into the byte range.',
        'The two harder ones are contour work. findContours is written as a border tracer that scans for a lit pixel, then walks four-connected neighbours without immediately reversing direction, erasing pixels as it goes so a pixel is never consumed twice. fillPoly rasterises a polygon by taking its bounding box and testing every pixel inside it with a ray-casting point-in-polygon check.',
        'Neither of those two survives into the pipeline. The call to the hand-written tracer is commented out and OpenCV findContours and fillPoly run in its place, so the scratch class keeps its own conversion, thresholding and blending but borrows OpenCV for contour work. That is just as well, because the tracer does not run. Its first neighbour test dereferences the previous direction while that is still unset, so a genuinely binary mask raises a TypeError; on the default TOZERO_INV path, where the mask carries the original grey values rather than 255, the same test never matches and every lit pixel degenerates into its own one-point contour. Outputs from the scratch class are written with a _scratch suffix so the two paths can be compared side by side. The shipped app uses SketchColor throughout.',
      ],
      diagram: `flowchart LR
  A[cvtColor] --> A2[Stack grey plane into three channels]
  B[threshold] --> B2[NumPy boolean masks]
  C[findContours] --> C2[Four direction border trace]
  D[fillPoly] --> D2[Ray casting point in polygon]
  E[addWeighted] --> E2[Weighted sum then clip]`,
    },
    {
      heading: 'Result',
      body: [
        'Two front ends over the same class. A CLI in main.py takes an image path, a colour map, a threshold and a threshold type, prints how long the colorization took, and writes the result under a per-image output directory named after the palette. Given no arguments it picks a random sketch from the data folder, which makes it easy to sanity-check a change.',
        'The web version is a Streamlit app: upload a sketch, move the threshold slider, choose one of eight colour maps and one of five threshold modes, and see the original and the colorized version side by side with the elapsed time in the caption. The result is downloadable as a JPEG. It is deployed on Streamlit Community Cloud and has handled 100+ concurrent sessions.',
        'The whole thing runs on OpenCV, NumPy and Streamlit. No model file, no GPU, no inference server — the runtime cost of colorizing an image is a threshold, a contour pass and a blend.',
      ],
    },
  ],
  metrics: [
    { value: '100+', label: 'concurrent sessions' },
    { value: '8', label: 'colour maps' },
    { value: '0', label: 'deep learning models' },
  ],
  stackFull: ['Python', 'OpenCV', 'NumPy', 'Streamlit'],
}

export default detail
