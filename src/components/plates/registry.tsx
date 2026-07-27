import type { ReactNode } from 'react'

export type PlateSize = 'card' | 'detail'

/** Filled in as plate components land (Tasks 5 and 7). */
const PLATES: Record<string, () => ReactNode> = {}

export function plateFor(slug: string, _size: PlateSize): ReactNode {
  const Component = PLATES[slug]
  return Component ? <Component /> : null
}
