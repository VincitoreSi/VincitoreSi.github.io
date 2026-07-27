import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="shell">
      <p className="label accent" style={{ paddingTop: 'var(--s7)' }}>404</p>
      <h1 className="display-l" style={{ margin: 'var(--s4) 0' }}>No such page</h1>
      <p className="body muted">That route is not part of this document.</p>
      <p style={{ marginTop: 'var(--s5)' }}>
        <Link className="label link" href="/">← Index</Link>
      </p>
    </main>
  )
}
