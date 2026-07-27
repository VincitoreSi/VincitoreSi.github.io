import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import type { ProjectDetail } from '@/data/types'
import DetailShell from '@/components/DetailShell'

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
  const title = `${meta.title} — Tushar Kumar`
  const image = {
    url: `/og/${slug}.jpg`,
    width: 1200,
    height: 630,
    alt: `${meta.title} — project card`,
  }
  return {
    title,
    description: meta.tagline,
    openGraph: {
      title,
      description: meta.tagline,
      url: `/work/${slug}/`,
      type: 'article',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.tagline,
      images: [image],
    },
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = projects.find((p) => p.slug === slug)
  if (!meta) notFound()

  const detail = await loadDetail(slug)
  if (!detail) notFound()

  return <DetailShell meta={meta} detail={detail} />
}
