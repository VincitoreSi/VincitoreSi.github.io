import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'dbms-normalization',
  summary:
    'Normalizes database tables from 1NF through BCNF with step-by-step visualization of each decomposition.',
  plateCaption:
    'Raw table → step-by-step normalization through 1NF, 2NF, 3NF, BCNF with visualized decomposition at each stage.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'A system that normalizes database tables from 1NF through BCNF with step-by-step visualization of each decomposition.',
        'APIs were implemented in Python and C++ handling 10+ table schemas with up to 50 attributes each. The web portal shows each normalization step — identifying functional dependencies, detecting partial and transitive dependencies, and decomposing — so the user sees how the table transforms at each normal form.',
      ],
    },
  ],
  metrics: [
    { value: '1NF→BCNF', label: 'normalization range' },
    { value: '10+', label: 'table schemas supported' },
  ],
  stackFull: ['Python', 'C++', 'SQL', 'Streamlit'],
}

export default detail
