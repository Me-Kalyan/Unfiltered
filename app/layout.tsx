import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Caveat } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Unfiltered - Your Personal Journal',
  description: 'Write entries, upload photos, and tell your stories with Unfiltered - a personal journaling platform.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`font-sans antialiased ${caveat.variable}`}>{children}</body>
    </html>
  )
}
