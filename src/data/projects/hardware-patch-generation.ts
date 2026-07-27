import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'hardware-patch-generation',
  summary:
    'A resource-aware patch-generation algorithm for functional ECO, solving 10,000+ test cases at roughly 90% efficiency with sub-second generation.',
  plateCaption:
    'Circuit design → ECO constraints → resource-aware patch algorithm → optimized patch with 90% efficiency.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'A flexible, scalable, and practical resource-aware patch-generation algorithm for functional ECO (Engineering Change Order) in hardware design, written in C++ and Verilog.',
        'The algorithm considers resource constraints when generating patches, solving 10,000+ test cases at roughly 90% efficiency versus benchmarks with sub-second generation time. Work conducted under Prof. Binod Kumar at IIT Jodhpur, targeting the ICCAD 2017 contest problem.',
      ],
    },
  ],
  metrics: [
    { value: '10,000+', label: 'test cases solved' },
    { value: '~90%', label: 'efficiency' },
    { value: '<1s', label: 'generation time' },
  ],
  stackFull: ['C++', 'Verilog'],
}

export default detail
