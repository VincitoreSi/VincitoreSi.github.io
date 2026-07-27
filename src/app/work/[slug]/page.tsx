import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import type { ProjectDetail } from '@/data/types'
import DetailShell from '@/components/DetailShell'
import { plateFor } from '@/components/plates/registry'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

async function loadDetail(slug: string): Promise<ProjectDetail | null> {
  try {
    const mod = await import(`@/data/projects/${slug}`)
    return mod.default as ProjectDetail
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const meta = projects.find((p) => p.slug === slug)
  if (!meta) return {}
  return {
    title: `${meta.title} — Tushar Kumar`,
    description: meta.tagline,
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = projects.find((p) => p.slug === slug)
  if (!meta) notFound()

  const detail = await loadDetail(slug)
  if (!detail) notFound()

  return <DetailShell meta={meta} detail={detail} plate={plateFor(slug, 'detail')} />
}
