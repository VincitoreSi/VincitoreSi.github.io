import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'

export default function ProjectIndex() {
  return (
    <ul>
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </ul>
  )
}
