import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'covid-dashboard',
  summary:
    'An interactive dashboard visualizing the state of Covid-19 across India using Plotly Dash.',
  plateCaption:
    'Data sources → Plotly Dash dashboard → interactive charts mapping Covid-19 statistics across India.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'An interactive dashboard built with Plotly Dash and Python that visualizes the state of Covid-19 across India — case counts, recoveries, fatalities, and trends over time.',
        'The dashboard pulls from public data sources and renders interactive charts: state-wise distributions, time-series curves, and heatmaps showing outbreak intensity across regions.',
      ],
      diagram: `flowchart LR
  Data Sources --> ETL Pipeline --> Plotly Dash --> Interactive Charts + Map`,
    },
  ],
  metrics: [{ value: 'Interactive', label: 'India-wide Covid-19 dashboard' }],
  stackFull: ['Plotly Dash', 'Python', 'Flask', 'R'],
}

export default detail
