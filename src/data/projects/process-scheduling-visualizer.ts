import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'process-scheduling-visualizer',
  summary:
    'Animates classical CPU scheduling algorithms step by step against a shared workload, with practical visualization for educational use.',
  plateCaption:
    'Shared workload → scheduling algorithm → step-by-step Gantt-chart visualization of process execution.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'A practical web portal that visualizes classical CPU scheduling algorithms — FCFS, SJF, Round Robin, Priority Scheduling — by animating them step by step against a shared workload.',
        'Users input a set of processes with arrival times and burst durations, select a scheduling algorithm, and watch the Gantt chart build in real time as processes are scheduled, showing wait times, turnaround times, and context switches.',
      ],
    },
  ],
  metrics: [
    { value: '4+', label: 'algorithms visualized' },
    { value: 'Step-by-step', label: 'Gantt animation' },
  ],
  stackFull: ['JavaScript', 'HTML', 'CSS'],
}

export default detail
