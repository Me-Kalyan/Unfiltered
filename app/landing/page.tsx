import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Check,
  ImageIcon,
  Lock,
  PenLine,
  Quote,
  Smartphone,
  Sparkles,
  WandSparkles,
} from "lucide-react"

import { LogoMark } from "@/components/logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  title: "Landing",
  description:
    "Unfiltered is a private journaling app for daily reflection, writing streaks, and memorable stories.",
  alternates: {
    canonical: "/landing",
  },
  openGraph: {
    title: "Unfiltered - Private Journaling, Reimagined",
    description:
      "Capture thoughts, photos, and stories in a calm writing space built for consistency.",
    url: `${siteUrl}/landing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Unfiltered - Private Journaling, Reimagined",
    description:
      "Capture thoughts, photos, and stories in a calm writing space built for consistency.",
  },
}

const features = [
  {
    title: "Focused Writing",
    description: "A distraction-light editor with autosave and clear typography.",
    icon: PenLine,
  },
  {
    title: "Memory With Photos",
    description: "Attach moments to entries and build visual story threads over time.",
    icon: ImageIcon,
  },
  {
    title: "Private by Default",
    description: "Your journal is protected with clear privacy settings and secure storage.",
    icon: Lock,
  },
  {
    title: "Habit Momentum",
    description: "Track streaks, writing goals, and personal progress without pressure.",
    icon: BarChart3,
  },
  {
    title: "Cross-Device",
    description: "Write from desktop or mobile with a clean responsive experience.",
    icon: Smartphone,
  },
  {
    title: "Prompted Reflection",
    description: "Use gentle prompts when you need ideas and start writing faster.",
    icon: WandSparkles,
  },
]

const testimonials = [
  {
    quote:
      "It made journaling finally stick for me. The flow is calm and fast, so I write every day.",
    name: "Riya P.",
    role: "Product Designer",
  },
  {
    quote:
      "I can capture rough thoughts instantly and polish them later. The mobile layout is excellent.",
    name: "Marco L.",
    role: "Founder",
  },
  {
    quote:
      "The streaks and analytics are useful, but the app still feels personal, not gamified.",
    name: "Anika T.",
    role: "Teacher",
  },
]

const stats = [
  { label: "Active writers", value: "50K+" },
  { label: "Entries written", value: "2M+" },
  { label: "Avg. weekly streak", value: "5.8 days" },
  { label: "App satisfaction", value: "4.9/5" },
]

export default function LandingPage() {
  const year = new Date().getFullYear()

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Unfiltered",
    applicationCategory: "LifestyleApplication",
    url: `${siteUrl}/landing`,
    operatingSystem: "Web, iOS, Android",
    description:
      "Unfiltered is a private journaling app for daily reflection, writing streaks, and memorable stories.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1f1a17] dark:bg-[#130f0d] dark:text-[#f1e6d8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="sticky top-0 z-50 border-b border-[#d9cfc4]/80 bg-[#f7f4ed]/80 backdrop-blur dark:border-[#31261f] dark:bg-[#130f0d]/85">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/landing" className="flex items-center gap-2.5" aria-label="Unfiltered home">
            <LogoMark className="h-8 w-auto" />
            <span className="font-script text-2xl font-semibold">Unfiltered</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            <a href="#features" className="text-sm font-medium text-[#4e4037] transition-colors hover:text-[#8f4f31] dark:text-[#c6aea0] dark:hover:text-[#f5c4a9]">Features</a>
            <a href="#reviews" className="text-sm font-medium text-[#4e4037] transition-colors hover:text-[#8f4f31] dark:text-[#c6aea0] dark:hover:text-[#f5c4a9]">Reviews</a>
            <a href="#pricing" className="text-sm font-medium text-[#4e4037] transition-colors hover:text-[#8f4f31] dark:text-[#c6aea0] dark:hover:text-[#f5c4a9]">Pricing</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" className="text-[#4e4037] hover:bg-[#efe4d7] dark:text-[#dbc6bb] dark:hover:bg-[#2a211c]">Sign in</Button>
            </Link>
            <Link href="/">
              <Button className="bg-[#1f1a17] text-[#f7f4ed] hover:bg-[#3a2c24] dark:bg-[#eab18e] dark:text-[#1f1a17] dark:hover:bg-[#f6c8ab]">Start writing</Button>
            </Link>
          </div>

          <details className="relative md:hidden">
            <summary className="list-none rounded-lg border border-[#d9cfc4] px-3 py-2 text-sm font-medium dark:border-[#31261f]">Menu</summary>
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#d9cfc4] bg-[#fffaf4] p-3 shadow-xl dark:border-[#31261f] dark:bg-[#1b1512]">
              <div className="mb-3 flex items-center justify-end"><ThemeToggle /></div>
              <div className="flex flex-col gap-2 text-sm">
                <a href="#features" className="rounded-lg px-2 py-1.5 hover:bg-[#efe4d7] dark:hover:bg-[#2a211c]">Features</a>
                <a href="#reviews" className="rounded-lg px-2 py-1.5 hover:bg-[#efe4d7] dark:hover:bg-[#2a211c]">Reviews</a>
                <a href="#pricing" className="rounded-lg px-2 py-1.5 hover:bg-[#efe4d7] dark:hover:bg-[#2a211c]">Pricing</a>
                <Link href="/" className="rounded-lg px-2 py-1.5 hover:bg-[#efe4d7] dark:hover:bg-[#2a211c]">Sign in</Link>
                <Link href="/" className="rounded-lg bg-[#1f1a17] px-2 py-1.5 text-[#f7f4ed] dark:bg-[#eab18e] dark:text-[#1f1a17]">Start writing</Link>
              </div>
            </div>
          </details>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-24 lg:px-8">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-[#f7b38c]/25 blur-3xl dark:bg-[#8f4f31]/30" />
            <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-[#b8d5b3]/20 blur-3xl dark:bg-[#5f7d5f]/20" />
          </div>

          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9cfc4] bg-[#fffaf4] px-4 py-2 text-sm text-[#5f4d42] dark:border-[#3a2f29] dark:bg-[#1b1512] dark:text-[#d9c4b7]">
                <Sparkles className="h-4 w-4 text-[#d68052]" />
                Designed for thoughtful daily writing
              </div>

              <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Journal with clarity.
                <span className="block text-[#8f4f31] dark:text-[#f3b18a]">Grow with consistency.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5f4d42] dark:text-[#ceb8ab]">
                Unfiltered gives you a calm writing surface, rich entry history, and practical insights that keep your journaling habit alive.
              </p>

              <form className="mt-8 flex w-full flex-col gap-3 sm:max-w-md sm:flex-row" aria-label="Start free">
                <Input type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" className="h-12 border-[#d9cfc4] bg-[#fffaf4] dark:border-[#3a2f29] dark:bg-[#1b1512]" />
                <Button type="submit" className="h-12 bg-[#1f1a17] text-[#f7f4ed] hover:bg-[#3a2c24] dark:bg-[#eab18e] dark:text-[#1f1a17] dark:hover:bg-[#f6c8ab]">
                  Start free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="mt-3 text-sm text-[#766257] dark:text-[#ad9588]">No credit card required. Free plan available forever.</p>
            </div>

            <Card className="overflow-hidden border-[#d9cfc4] bg-[#fffaf4] shadow-2xl shadow-[#a67052]/10 dark:border-[#3a2f29] dark:bg-[#1b1512]">
              <CardContent className="p-0">
                <div className="border-b border-[#e3d8cc] bg-[#f6eee4] px-5 py-3 dark:border-[#332922] dark:bg-[#201915]">
                  <p className="text-sm font-medium text-[#5f4d42] dark:text-[#ceb8ab]">Today&apos;s reflection</p>
                </div>
                <div className="space-y-4 p-5 sm:p-6">
                  <p className="text-lg leading-relaxed">What changed in the way you handled stress this week, and what triggered that shift?</p>
                  <div className="rounded-xl border border-[#e3d8cc] bg-[#f7f4ed] p-4 dark:border-[#332922] dark:bg-[#130f0d]">
                    <p className="text-sm text-[#6f5c51] dark:text-[#bfa89b]">Draft preview</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#4e4037] dark:text-[#dbc6bb]">I noticed I paused before reacting today. The habit of writing every morning seems to be rewiring how I respond...</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.slice(0, 2).map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-[#e3d8cc] bg-[#fff] p-3 dark:border-[#332922] dark:bg-[#181210]">
                        <p className="text-xs text-[#6f5c51] dark:text-[#bfa89b]">{stat.label}</p>
                        <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y border-[#e3d8cc] bg-[#fffaf4] px-4 py-12 dark:border-[#2f241f] dark:bg-[#181210] sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-[#6f5c51] dark:text-[#bfa89b]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">A better writing stack for everyday life</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[#6f5c51] dark:text-[#bfa89b]">
              Purpose-built tools to make journaling easier to start and easier to sustain.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-[#ded2c7] bg-[#fffaf4] transition-transform hover:-translate-y-1 dark:border-[#332922] dark:bg-[#1b1512]">
                  <CardContent className="p-5">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1e4d6] dark:bg-[#31261f]">
                      <feature.icon className="h-5 w-5 text-[#8f4f31] dark:text-[#f3b18a]" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6f5c51] dark:text-[#bfa89b]">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-[#f1e6d9] px-4 py-16 dark:bg-[#19110e] sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">Trusted by daily journalers</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <Card key={item.name} className="border-[#d9cfc4] bg-[#fffaf4] dark:border-[#332922] dark:bg-[#1b1512]">
                  <CardContent className="p-5">
                    <Quote className="h-6 w-6 text-[#8f4f31] dark:text-[#f3b18a]" />
                    <p className="mt-4 text-sm leading-relaxed text-[#4e4037] dark:text-[#dbc6bb]">{item.quote}</p>
                    <p className="mt-4 font-medium">{item.name}</p>
                    <p className="text-sm text-[#6f5c51] dark:text-[#bfa89b]">{item.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-4xl rounded-2xl border border-[#d9cfc4] bg-[#fffaf4] p-6 dark:border-[#332922] dark:bg-[#1b1512] sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-[#8f4f31] dark:text-[#f3b18a]">Simple pricing</p>
            <h2 className="mt-2 text-3xl font-bold">Start free, upgrade when it helps</h2>
            <p className="mt-3 text-[#6f5c51] dark:text-[#bfa89b]">All plans include core journaling, entry history, and cross-device access.</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card className="border-[#ded2c7] bg-[#fff] dark:border-[#332922] dark:bg-[#181210]">
                <CardContent className="p-5">
                  <p className="text-sm text-[#6f5c51] dark:text-[#bfa89b]">Free</p>
                  <p className="mt-1 text-3xl font-semibold">$0</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#8f4f31]" />Unlimited entries</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#8f4f31]" />Basic prompts</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#8f4f31]" />Web and mobile</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-[#8f4f31] bg-[#1f1a17] text-[#fffaf4] dark:bg-[#eab18e] dark:text-[#1f1a17]">
                <CardContent className="p-5">
                  <p className="text-sm opacity-85">Pro</p>
                  <p className="mt-1 text-3xl font-semibold">$9/mo</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4" />Advanced insights</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4" />Unlimited photos</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4" />Priority support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d9cfc4] px-4 py-8 dark:border-[#31261f] sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-auto" />
            <span className="font-script text-xl font-semibold">Unfiltered</span>
          </div>
          <div className="flex items-center gap-5 text-sm text-[#6f5c51] dark:text-[#bfa89b]">
            <Link href="/">Privacy</Link>
            <Link href="/">Terms</Link>
            <Link href="/">Contact</Link>
          </div>
          <p className="text-sm text-[#6f5c51] dark:text-[#bfa89b]">{year} Unfiltered. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
