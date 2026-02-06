"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Clock,
  Lightbulb,
  Moon,
  Sun,
  Target,
  TrendingUp,
} from "lucide-react"

import { LogoMark } from "@/components/logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex h-44 items-end gap-2">
      {data.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="w-full rounded-t-md bg-[#d08b64]" style={{ height: `${(item.value / max) * 100}%` }} />
          <span className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [range, setRange] = useState("30d")

  const wordsByDay = [
    { label: "Mon", value: 420 },
    { label: "Tue", value: 680 },
    { label: "Wed", value: 510 },
    { label: "Thu", value: 740 },
    { label: "Fri", value: 580 },
    { label: "Sat", value: 260 },
    { label: "Sun", value: 390 },
  ]

  const compare = useMemo(
    () => ({
      thisWeekWords: 3580,
      lastWeekWords: 3020,
      thisWeekEntries: 7,
      lastWeekEntries: 5,
      bestWindow: "8:00 PM - 10:00 PM",
      currentStreak: 23,
    }),
    []
  )

  return (
    <div className="min-h-screen bg-[var(--warm-bg)] text-[var(--warm-ink)] dark:bg-[#120f0d] dark:text-[#efe0cf]">
      <header className="sticky top-0 z-50 border-b border-[#decebc]/70 bg-[var(--warm-bg)]/90 backdrop-blur dark:border-[#312620] dark:bg-[#120f0d]/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Back" className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#ece0d3] dark:hover:bg-[#241d18]">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-auto" />
              <span className="font-script text-2xl font-semibold">Unfiltered</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-[140px] border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-editorial text-3xl font-semibold sm:text-4xl">Writing analytics</h1>
        <p className="mt-2 text-[var(--warm-muted)] dark:text-[#bfa89a]">Actionable insights to keep your journaling habit steady.</p>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]"><CardContent className="p-4"><p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">This week</p><p className="text-2xl font-semibold">{compare.thisWeekWords}</p><p className="text-xs text-emerald-600">+18.5% vs last week</p></CardContent></Card>
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]"><CardContent className="p-4"><p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">Entries</p><p className="text-2xl font-semibold">{compare.thisWeekEntries}</p><p className="text-xs text-emerald-600">+2 entries</p></CardContent></Card>
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]"><CardContent className="p-4"><p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">Current streak</p><p className="text-2xl font-semibold">{compare.currentStreak} days</p><p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">Best: 45 days</p></CardContent></Card>
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]"><CardContent className="p-4"><p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">Best window</p><p className="text-lg font-semibold">{compare.bestWindow}</p><p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">Highest completion rate</p></CardContent></Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-[#c67a53]" />Words by day</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={wordsByDay} />
            </CardContent>
          </Card>

          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-[#c67a53]" />Weekly goal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">72%</p>
              <p className="mt-1 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">3,580 / 5,000 words</p>
              <p className="mt-4 text-sm">At your current pace, you will hit your goal by <span className="font-semibold">Saturday evening</span>.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Lightbulb className="h-4 w-4 text-[#c67a53]" />Insight</CardTitle></CardHeader>
            <CardContent><p className="text-sm">You write 1.8x more words on days when you start with a guided prompt.</p></CardContent>
          </Card>
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Clock className="h-4 w-4 text-[#c67a53]" />Recommendation</CardTitle></CardHeader>
            <CardContent><p className="text-sm">Set reminders for <span className="font-semibold">7:45 PM</span> to match your peak writing window.</p></CardContent>
          </Card>
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4 text-[#c67a53]" />Next milestone</CardTitle></CardHeader>
            <CardContent><p className="text-sm">420 words away from your next milestone: <span className="font-semibold">4k this week</span>.</p></CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Sun className="h-4 w-4 text-[#c67a53]" />Morning sessions</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">27% of entries</p></CardContent>
          </Card>
          <Card className="border-[#decebc] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411]">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Moon className="h-4 w-4 text-[#c67a53]" />Evening sessions</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">61% of entries (highest quality window)</p></CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-[#decebc] bg-[#f1e5d8] dark:border-[#342a24] dark:bg-[#1b1512]">
          <CardContent className="flex items-start gap-3 p-5">
            <Calendar className="mt-0.5 h-5 w-5 text-[#c67a53]" />
            <div>
              <p className="font-medium">Weekly action plan</p>
              <p className="text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">1) Keep evening reminders active. 2) Start each session with one prompt. 3) Target 620 words/day to exceed your goal.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
