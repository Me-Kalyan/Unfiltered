import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Caveat, Playfair_Display } from 'next/font/google'

import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-editorial' })
const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['500', '600', '700']
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1412' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Unfiltered - Your Personal Journal',
    template: '%s | Unfiltered'
  },
  description: 'Write entries, upload photos, and tell your stories with Unfiltered - a personal journaling platform with writing prompts, analytics, and beautiful themes.',
  keywords: ['journal', 'diary', 'writing', 'personal journal', 'daily journal', 'gratitude journal', 'journaling app'],
  authors: [{ name: 'Unfiltered' }],
  creator: 'Unfiltered',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Unfiltered',
    title: 'Unfiltered - Your Personal Journal',
    description: 'Write entries, upload photos, and tell your stories with Unfiltered - a personal journaling platform.',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5pvMbjLdH3t6Umx5syvbMvwrFlZC5l.png',
        width: 1200,
        height: 630,
        alt: 'Unfiltered - Personal Journal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unfiltered - Your Personal Journal',
    description: 'Write entries, upload photos, and tell your stories with Unfiltered - a personal journaling platform.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5pvMbjLdH3t6Umx5syvbMvwrFlZC5l.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  category: 'productivity',
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
      <body className={`${geist.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
