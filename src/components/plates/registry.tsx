import type { ReactNode } from 'react'
import PageIndexPlate from './PageIndexPlate'

export type PlateSize = 'card' | 'detail'

/** Filled in as plate components land (Task 7 completes the set). */
const PLATES: Record<string, () => ReactNode> = {
  pageindex: PageIndexPlate,
}

export function plateFor(slug: string, _size: PlateSize): ReactNode {
  const Component = PLATES[slug]
  return Component ? <Component /> : null
}
