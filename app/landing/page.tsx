import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Check,
  FileLock2,
  Fingerprint,
  Flame,
  ImageIcon,
  PenLine,
  ShieldCheck,
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
    "Unfiltered is a private journaling app for daily reflection, writing streaks, and meaningful personal growth.",
  alternates: {
    canonical: "/landing",
  },
  openGraph: {
    title: "Unfiltered - Private Journaling, Editorially Crafted",
    description:
      "A premium writing space for personal reflection, memory capture, and habit-building.",
    url: `${siteUrl}/landing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Unfiltered - Private Journaling, Editorially Crafted",
    description:
      "A premium writing space for personal reflection, memory capture, and habit-building.",
  },
}

const features = [
  {
    title: "Focused Writing Flow",
    description: "A clean editor with autosave, version recovery, and distraction-light formatting.",
    icon: PenLine,
  },
  {
    title: "Guided Reflection",
    description: "Personalized prompts and weekly reviews that help you stay consistent.",
    icon: WandSparkles,
  },
  {
    title: "Memories That Last",
    description: "Combine photos, tags, and story threads to preserve meaningful moments.",
    icon: ImageIcon,
  },
  {
    title: "Habit Momentum",
    description: "Track streaks, writing windows, and progress with practical insights.",
    icon: Flame,
  },
  {
    title: "Private by Default",
    description: "Clear privacy controls at entry level: private, shared, or public.",
    icon: FileLock2,
  },
  {
    title: "Editorial Reading Experience",
    description: "Typography and spacing tuned for thoughtful long-form writing.",
    icon: BookOpen,
  },
]

const faqItems = [
  {
    question: "Is Unfiltered free to start?",
    answer:
      "Yes. The free plan includes unlimited text entries, tags, and cross-device sync for core journaling.",
  },
  {
    question: "Can I export my journal anytime?",
    answer:
      "Yes. You can export entries to Markdown and PDF on paid plans, and your content remains yours.",
  },
  {
    question: "How private are my entries?",
    answer:
      "Entries are private by default. You can selectively change visibility for individual entries.",
  },
  {
    question: "Can I change reminder cadence later?",
    answer:
      "Absolutely. You can switch reminder schedule, prompt style, and goals from settings anytime.",
  },
]

const stats = [
  { label: "Growing community", value: "50K+" },
  { label: "Words captured", value: "2M+" },
  { label: "Average weekly streak", value: "5.8 days" },
  { label: "User satisfaction", value: "4.9/5" },
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
      "Unfiltered is a private journaling app for daily reflection, writing streaks, and meaningful personal growth.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <div className="min-h-screen bg-[var(--warm-bg)] text-[var(--warm-ink)] dark:bg-[#120f0d] dark:text-[#efe0cf]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="sticky top-0 z-50 border-b border-[var(--warm-border)]/80 bg-[var(--warm-bg)]/90 backdrop-blur dark:border-[#2d251f] dark:bg-[#120f0d]/90">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/landing" className="flex items-center gap-2.5" aria-label="Unfiltered home">
            <LogoMark className="h-8 w-auto" />
            <span className="font-script text-2xl font-semibold">Unfiltered</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            <a href="#product" className="text-sm font-medium text-[var(--warm-muted)] transition-colors hover:text-[var(--warm-accent)] dark:text-[#cdb8a8] dark:hover:text-[#f1c09f]">Product</a>
            <a href="#security" className="text-sm font-medium text-[var(--warm-muted)] transition-colors hover:text-[var(--warm-accent)] dark:text-[#cdb8a8] dark:hover:text-[#f1c09f]">Security</a>
            <a href="#pricing" className="text-sm font-medium text-[var(--warm-muted)] transition-colors hover:text-[var(--warm-accent)] dark:text-[#cdb8a8] dark:hover:text-[#f1c09f]">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-[var(--warm-muted)] transition-colors hover:text-[var(--warm-accent)] dark:text-[#cdb8a8] dark:hover:text-[#f1c09f]">FAQ</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" className="text-[var(--warm-muted)] hover:bg-[#efe3d7] dark:text-[#d8c2b3] dark:hover:bg-[#221a16]">Sign in</Button>
            </Link>
            <Link href="/">
              <Button className="bg-[var(--warm-ink)] text-[var(--warm-bg)] hover:bg-[#423229] dark:bg-[#f0bc99] dark:text-[#241c17] dark:hover:bg-[#f8ceb0]">
                Start writing
              </Button>
            </Link>
          </div>

          <details className="relative md:hidden">
            <summary className="list-none rounded-lg border border-[var(--warm-border)] px-3 py-2 text-sm font-medium dark:border-[#2d251f]">Menu</summary>
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[var(--warm-border)] bg-[var(--warm-surface)] p-3 shadow-xl dark:border-[#2d251f] dark:bg-[#1a1411]">
              <div className="mb-3 flex items-center justify-end"><ThemeToggle /></div>
              <div className="flex flex-col gap-2 text-sm">
                <a href="#product" className="rounded-lg px-2 py-1.5 hover:bg-[#efe3d7] dark:hover:bg-[#26201c]">Product</a>
                <a href="#security" className="rounded-lg px-2 py-1.5 hover:bg-[#efe3d7] dark:hover:bg-[#26201c]">Security</a>
                <a href="#pricing" className="rounded-lg px-2 py-1.5 hover:bg-[#efe3d7] dark:hover:bg-[#26201c]">Pricing</a>
                <a href="#faq" className="rounded-lg px-2 py-1.5 hover:bg-[#efe3d7] dark:hover:bg-[#26201c]">FAQ</a>
                <Link href="/" className="rounded-lg px-2 py-1.5 hover:bg-[#efe3d7] dark:hover:bg-[#26201c]">Sign in</Link>
                <Link href="/" className="rounded-lg bg-[var(--warm-ink)] px-2 py-1.5 text-[var(--warm-bg)] dark:bg-[#f0bc99] dark:text-[#241c17]">Start writing</Link>
              </div>
            </div>
          </details>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-16 top-6 h-72 w-72 rounded-full bg-[#df8f63]/20 blur-3xl dark:bg-[#7f472b]/30" />
            <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#b5cfad]/15 blur-3xl dark:bg-[#5c7658]/20" />
          </div>

          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--warm-border)] bg-[var(--warm-surface)] px-4 py-2 text-sm text-[var(--warm-muted)] dark:border-[#342a24] dark:bg-[#1c1512] dark:text-[#d7c2b2]">
                <Sparkles className="h-4 w-4 text-[var(--warm-accent)]" />
                Modern Editorial Warmth
              </div>

              <h1 className="font-editorial text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Your private writing ritual,
                <span className="block text-[var(--warm-accent)] dark:text-[#f1c09f]">designed to last.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--warm-muted)] dark:text-[#c6b0a2]">
                Unfiltered turns daily journaling into a calm, premium habit with thoughtful prompts,
                clean writing surfaces, and privacy-first controls.
              </p>

              <form className="mt-8 flex w-full flex-col gap-3 sm:max-w-md sm:flex-row" aria-label="Start free">
                <Input type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" className="h-12 border-[var(--warm-border)] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1c1512]" />
                <Button type="submit" className="h-12 bg-[var(--warm-ink)] text-[var(--warm-bg)] hover:bg-[#46352b] dark:bg-[#f0bc99] dark:text-[#241c17] dark:hover:bg-[#f8ceb0]">
                  Start free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="mt-3 text-sm text-[#7c675b] dark:text-[#ac9487]">No credit card required. Cancel anytime.</p>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">
                <span className="rounded-full border border-[var(--warm-border)] px-3 py-1 dark:border-[#342a24]">Private by default</span>
                <span className="rounded-full border border-[var(--warm-border)] px-3 py-1 dark:border-[#342a24]">Export anytime</span>
                <span className="rounded-full border border-[var(--warm-border)] px-3 py-1 dark:border-[#342a24]">No ads</span>
              </div>
              <p className="mt-2 text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">Metrics shown are product aggregate indicators and may vary over time.</p>
            </div>

            <Card className="overflow-hidden border-[var(--warm-border)] bg-[var(--warm-surface)] shadow-2xl shadow-[#a86a4a]/10 dark:border-[#342a24] dark:bg-[#1b1512]">
              <CardContent className="p-0">
                <div className="border-b border-[#e7dacc] bg-[#f6ede2] px-5 py-3 dark:border-[#332821] dark:bg-[#231b17]">
                  <p className="text-sm font-medium text-[var(--warm-muted)] dark:text-[#cbb6a8]">Today&apos;s reflection</p>
                </div>
                <div className="space-y-4 p-5 sm:p-6">
                  <p className="text-lg leading-relaxed">What boundary helped you protect your energy this week?</p>
                  <div className="rounded-xl border border-[#e7dacc] bg-[#f7f2e9] p-4 dark:border-[#332821] dark:bg-[#140f0d]">
                    <p className="text-sm text-[var(--warm-muted)] dark:text-[#bda798]">Draft preview</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#514239] dark:text-[#d9c2b3]">I paused before saying yes to everything. Writing in the morning made that boundary feel intentional instead of defensive...</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.slice(0, 2).map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-[#e7dacc] bg-[#fffdf9] p-3 dark:border-[#332821] dark:bg-[#191310]">
                        <p className="text-xs text-[var(--warm-muted)] dark:text-[#bda798]">{stat.label}</p>
                        <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y border-[#e5d7c8] bg-[var(--warm-surface)] px-4 py-12 dark:border-[#2f251f] dark:bg-[#181210] sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-[var(--warm-muted)] dark:text-[#bda798]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="product" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="font-editorial text-center text-3xl font-semibold sm:text-4xl">Product experience built for consistency</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--warm-muted)] dark:text-[#bda798]">
              Every surface is designed to reduce friction between thought and writing.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-[#e0d0bf] bg-[var(--warm-surface)] transition-transform hover:-translate-y-1 dark:border-[#332821] dark:bg-[#1b1512]">
                  <CardContent className="p-5">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2e3d3] dark:bg-[#30251f]">
                      <feature.icon className="h-5 w-5 text-[var(--warm-accent)] dark:text-[#f1c09f]" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--warm-muted)] dark:text-[#bda798]">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="bg-[#f2e7da] px-4 py-16 dark:bg-[#17110f] sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-[var(--warm-accent)] dark:text-[#f1c09f]">Security & trust</p>
              <h2 className="font-editorial mt-2 text-3xl font-semibold sm:text-4xl">Built for private reflection</h2>
              <p className="mt-4 text-[var(--warm-muted)] dark:text-[#bda798]">
                Journaling only works when trust is non-negotiable. Unfiltered gives you explicit privacy controls and transparent data ownership.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card className="border-[#decfbe] bg-[var(--warm-surface)] dark:border-[#332821] dark:bg-[#1b1512]">
                <CardContent className="p-5">
                  <Fingerprint className="h-5 w-5 text-[var(--warm-accent)]" />
                  <h3 className="mt-3 font-semibold">Entry-level privacy</h3>
                  <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bda798]">Set privacy for each entry with one click.</p>
                </CardContent>
              </Card>
              <Card className="border-[#decfbe] bg-[var(--warm-surface)] dark:border-[#332821] dark:bg-[#1b1512]">
                <CardContent className="p-5">
                  <ShieldCheck className="h-5 w-5 text-[var(--warm-accent)]" />
                  <h3 className="mt-3 font-semibold">Account safeguards</h3>
                  <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bda798]">Modern auth and secure session handling by default.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#decfbe] bg-[var(--warm-surface)] p-6 dark:border-[#332821] dark:bg-[#1b1512] sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--warm-accent)] dark:text-[#f1c09f]">Simple pricing</p>
            <h2 className="font-editorial mt-2 text-3xl font-semibold">Choose your writing pace</h2>
            <p className="mt-3 text-[var(--warm-muted)] dark:text-[#bda798]">No lock-ins. Export your data whenever you need.</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card className="border-[#dfd0c0] bg-[#fff] dark:border-[#332821] dark:bg-[#181210]">
                <CardContent className="p-5">
                  <p className="text-sm text-[var(--warm-muted)] dark:text-[#bda798]">Free</p>
                  <p className="mt-1 text-3xl font-semibold">$0</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--warm-accent)]" />Unlimited text entries</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--warm-accent)]" />Daily prompts</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--warm-accent)]" />Web + mobile access</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-[var(--warm-accent)] bg-[var(--warm-ink)] text-[var(--warm-bg)] dark:bg-[#f0bc99] dark:text-[#241c17]">
                <CardContent className="p-5">
                  <p className="text-sm opacity-85">Pro</p>
                  <p className="mt-1 text-3xl font-semibold">$9/mo</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4" />Advanced insights & streaks</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4" />Unlimited photos & stories</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4" />Export to PDF + Markdown</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f2e7da] px-4 py-16 dark:bg-[#17110f] sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="font-editorial text-center text-3xl font-semibold sm:text-4xl">Frequently asked questions</h2>
            <div className="mt-8 space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-[#dfd0c0] bg-[var(--warm-surface)] p-4 dark:border-[#332821] dark:bg-[#1b1512]">
                  <summary className="cursor-pointer list-none font-semibold">{item.question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--warm-muted)] dark:text-[#bda798]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dcccbc] px-4 py-8 dark:border-[#31251f] sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-auto" />
            <span className="font-script text-xl font-semibold">Unfiltered</span>
          </div>
          <div className="flex items-center gap-5 text-sm text-[var(--warm-muted)] dark:text-[#bda798]">
            <Link href="/privacy">Privacy</Link>
            <Link href="/security">Security</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/status">Status</Link>
          </div>
          <p className="text-sm text-[var(--warm-muted)] dark:text-[#bda798]">{year} Unfiltered. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
