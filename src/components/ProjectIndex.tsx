import { projects } from '@/data/projects'
import { plateFor } from './plates/registry'
import ProjectCard from './ProjectCard'

export default function ProjectIndex() {
  return (
    <ul>
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} plate={plateFor(p.slug, 'card')} />
      ))}
    </ul>
  )
}
