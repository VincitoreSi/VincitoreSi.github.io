import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Fraunces, Newsreader, JetBrains_Mono } from 'next/font/google'
import { THEME_SCRIPT } from '@/lib/theme-script'
import GsapProvider from '@/components/motion/GsapProvider'
import './globals.css'

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
})

const body = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vincitoresi.github.io'),
  title: 'Tushar Kumar — AI Engineer',
  description:
    'AI engineer at Samsung R&D building retrieval and multi-agent systems. B.Tech AI & Data Science, IIT Jodhpur.',
  openGraph: {
    title: 'Tushar Kumar — AI Engineer',
    description: 'AI engineer building retrieval and multi-agent systems.',
    url: 'https://vincitoresi.github.io',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {children}
        <GsapProvider />
      </body>
    </html>
  )
}
