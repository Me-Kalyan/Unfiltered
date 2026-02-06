"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  Clock3,
  Compass,
  Lock,
  Moon,
  Sparkles,
  Sun,
  Target,
  User,
} from "lucide-react"

import { LogoMark } from "@/components/logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface OnboardingData {
  name: string
  intent: "reflection" | "gratitude" | "clarity" | "creativity"
  cadence: "daily" | "weekday" | "three-times"
  writingWindow: "morning" | "evening"
  promptStyle: "gentle" | "direct" | "story"
  privacy: "private" | "shared"
  reminders: boolean
}

const steps = [
  { id: 1, title: "Welcome" },
  { id: 2, title: "Your Name" },
  { id: 3, title: "Intent" },
  { id: 4, title: "Cadence" },
  { id: 5, title: "Prompt Style" },
  { id: 6, title: "Privacy" },
  { id: 7, title: "Launch" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    name: "",
    intent: "reflection",
    cadence: "daily",
    writingWindow: "morning",
    promptStyle: "gentle",
    privacy: "private",
    reminders: true,
  })

  const progress = useMemo(() => ((step - 1) / (steps.length - 1)) * 100, [step])

  const next = () => setStep((s) => Math.min(s + 1, steps.length))
  const prev = () => setStep((s) => Math.max(s - 1, 1))

  const starterPrompts = {
    gentle: "What small moment felt meaningful today?",
    direct: "What decision are you avoiding, and why?",
    story: "Describe one scene from today as if it were a short story.",
  }

  return (
    <div className="min-h-screen bg-[var(--warm-bg)] text-[var(--warm-ink)] dark:bg-[#120f0d] dark:text-[#efe0cf]">
      <header className="p-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-auto" />
            <span className="font-script text-2xl font-semibold">Unfiltered</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" className="text-[var(--warm-muted)] hover:bg-[#eee2d5] dark:text-[#cdb8a8] dark:hover:bg-[#241c18]">Skip for now</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6">
        <div className="mx-auto max-w-2xl">
          <Progress value={progress} className="h-1 bg-[#e7d9ca] dark:bg-[#312722]" />
          <div className="mt-2 flex justify-between text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">
            <span>Step {step} of {steps.length}</span>
            <span>{steps[step - 1].title}</span>
          </div>
        </div>
      </div>

      <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center px-6 py-10">
        <div className="w-full">
          {step === 1 && (
            <div className="text-center animate-fade-in">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ead5c4] dark:bg-[#30221a]">
                <Sparkles className="h-10 w-10 text-[var(--warm-accent)]" />
              </div>
              <h1 className="font-editorial text-3xl font-semibold">Let&apos;s shape your daily writing ritual</h1>
              <p className="mx-auto mt-4 max-w-lg text-[var(--warm-muted)] dark:text-[#bfa89a]">
                We&apos;ll personalize your prompts, cadence, and writing flow in less than two minutes.
              </p>
              <Button onClick={next} className="mt-8 bg-[var(--warm-ink)] text-[var(--warm-bg)] hover:bg-[#44342a] dark:bg-[#f0bc99] dark:text-[#241c17]">
                Start setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <Card className="border-[#e1d2c1] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411] animate-fade-in">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ead5c4] dark:bg-[#30221a]"><User className="h-6 w-6 text-[var(--warm-accent)]" /></div>
                <h2 className="font-editorial text-2xl font-semibold">What should we call you?</h2>
                <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Used for welcome messages and reminders.</p>
                <Input
                  value={data.name}
                  onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
                  className="mt-5 h-12 border-[#decdba] bg-[#fffdf9] dark:border-[#342a24] dark:bg-[#1d1613]"
                  placeholder="Your name"
                />
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-[#e1d2c1] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411] animate-fade-in">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ead5c4] dark:bg-[#30221a]"><Compass className="h-6 w-6 text-[var(--warm-accent)]" /></div>
                <h2 className="font-editorial text-2xl font-semibold">What&apos;s your primary intent?</h2>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    ["reflection", "Self Reflection"],
                    ["gratitude", "Gratitude"],
                    ["clarity", "Mental Clarity"],
                    ["creativity", "Creative Practice"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setData((p) => ({ ...p, intent: id as OnboardingData["intent"] }))}
                      className={`rounded-xl border px-4 py-3 text-left ${
                        data.intent === id
                          ? "border-[var(--warm-accent)] bg-[#f7ecdf] dark:bg-[#2a1f1a]"
                          : "border-[#e1d2c1] bg-[#fffdf9] dark:border-[#342a24] dark:bg-[#1d1613]"
                      }`}
                    >
                      <p className="font-medium">{label}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card className="border-[#e1d2c1] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411] animate-fade-in">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ead5c4] dark:bg-[#30221a]"><Clock3 className="h-6 w-6 text-[var(--warm-accent)]" /></div>
                <h2 className="font-editorial text-2xl font-semibold">Choose your cadence</h2>
                <div className="mt-5 grid grid-cols-1 gap-3">
                  {[
                    ["daily", "Daily", "Build momentum with short entries every day"],
                    ["weekday", "Weekdays", "Write Monday to Friday"],
                    ["three-times", "3x per week", "A sustainable rhythm for busy weeks"],
                  ].map(([id, label, desc]) => (
                    <button
                      key={id}
                      onClick={() => setData((p) => ({ ...p, cadence: id as OnboardingData["cadence"] }))}
                      className={`rounded-xl border px-4 py-3 text-left ${
                        data.cadence === id
                          ? "border-[var(--warm-accent)] bg-[#f7ecdf] dark:bg-[#2a1f1a]"
                          : "border-[#e1d2c1] bg-[#fffdf9] dark:border-[#342a24] dark:bg-[#1d1613]"
                      }`}
                    >
                      <p className="font-medium">{label}</p>
                      <p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">{desc}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setData((p) => ({ ...p, writingWindow: "morning" }))}
                    className={`rounded-xl border p-3 ${data.writingWindow === "morning" ? "border-[var(--warm-accent)]" : "border-[#e1d2c1] dark:border-[#342a24]"}`}
                  >
                    <Sun className="mx-auto h-5 w-5 text-[var(--warm-accent)]" />
                    <p className="mt-1 text-sm">Morning</p>
                  </button>
                  <button
                    onClick={() => setData((p) => ({ ...p, writingWindow: "evening" }))}
                    className={`rounded-xl border p-3 ${data.writingWindow === "evening" ? "border-[var(--warm-accent)]" : "border-[#e1d2c1] dark:border-[#342a24]"}`}
                  >
                    <Moon className="mx-auto h-5 w-5 text-[var(--warm-accent)]" />
                    <p className="mt-1 text-sm">Evening</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card className="border-[#e1d2c1] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411] animate-fade-in">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ead5c4] dark:bg-[#30221a]"><Target className="h-6 w-6 text-[var(--warm-accent)]" /></div>
                <h2 className="font-editorial text-2xl font-semibold">Pick your prompt style</h2>
                <div className="mt-5 grid grid-cols-1 gap-3">
                  {[
                    ["gentle", "Gentle", "Soft prompts for calm reflection"],
                    ["direct", "Direct", "Clear questions that challenge your thinking"],
                    ["story", "Story", "Creative prompts to narrate your day"],
                  ].map(([id, label, desc]) => (
                    <button
                      key={id}
                      onClick={() => setData((p) => ({ ...p, promptStyle: id as OnboardingData["promptStyle"] }))}
                      className={`rounded-xl border px-4 py-3 text-left ${
                        data.promptStyle === id
                          ? "border-[var(--warm-accent)] bg-[#f7ecdf] dark:bg-[#2a1f1a]"
                          : "border-[#e1d2c1] bg-[#fffdf9] dark:border-[#342a24] dark:bg-[#1d1613]"
                      }`}
                    >
                      <p className="font-medium">{label}</p>
                      <p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">{desc}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 6 && (
            <Card className="border-[#e1d2c1] bg-[var(--warm-surface)] dark:border-[#342a24] dark:bg-[#1a1411] animate-fade-in">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ead5c4] dark:bg-[#30221a]"><Lock className="h-6 w-6 text-[var(--warm-accent)]" /></div>
                <h2 className="font-editorial text-2xl font-semibold">Privacy and reminders</h2>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setData((p) => ({ ...p, privacy: "private" }))}
                    className={`rounded-xl border px-4 py-3 text-left ${data.privacy === "private" ? "border-[var(--warm-accent)]" : "border-[#e1d2c1] dark:border-[#342a24]"}`}
                  >
                    <p className="font-medium">Private</p>
                    <p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">Only you can access by default.</p>
                  </button>
                  <button
                    onClick={() => setData((p) => ({ ...p, privacy: "shared" }))}
                    className={`rounded-xl border px-4 py-3 text-left ${data.privacy === "shared" ? "border-[var(--warm-accent)]" : "border-[#e1d2c1] dark:border-[#342a24]"}`}
                  >
                    <p className="font-medium">Shared</p>
                    <p className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">Allow selective sharing.</p>
                  </button>
                </div>

                <button
                  onClick={() => setData((p) => ({ ...p, reminders: !p.reminders }))}
                  className="mt-5 flex w-full items-center justify-between rounded-xl border border-[#e1d2c1] bg-[#fffdf9] px-4 py-3 dark:border-[#342a24] dark:bg-[#1d1613]"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-[var(--warm-accent)]" />
                    <span className="text-sm">Daily reminder</span>
                  </div>
                  <span className="text-xs text-[var(--warm-muted)] dark:text-[#bfa89a]">{data.reminders ? "On" : "Off"}</span>
                </button>
              </CardContent>
            </Card>
          )}

          {step === 7 && (
            <div className="animate-fade-in text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#d88d63]">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h1 className="font-editorial text-3xl font-semibold">You&apos;re ready{data.name ? `, ${data.name}` : ""}</h1>
              <p className="mx-auto mt-3 max-w-lg text-[var(--warm-muted)] dark:text-[#bfa89a]">
                Your journal setup is complete. We&apos;ve prepared your first prompt so you can begin immediately.
              </p>

              <Card className="mx-auto mt-6 max-w-xl border-[#e1d2c1] bg-[var(--warm-surface)] text-left dark:border-[#342a24] dark:bg-[#1a1411]">
                <CardContent className="space-y-3 p-5">
                  <div className="flex justify-between text-sm"><span className="text-[var(--warm-muted)] dark:text-[#bfa89a]">Intent</span><span className="capitalize">{data.intent}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[var(--warm-muted)] dark:text-[#bfa89a]">Cadence</span><span className="capitalize">{data.cadence}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[var(--warm-muted)] dark:text-[#bfa89a]">Writing window</span><span className="capitalize">{data.writingWindow}</span></div>
                  <div className="rounded-lg border border-[#e1d2c1] bg-[#fffdf9] p-3 text-sm dark:border-[#342a24] dark:bg-[#1d1613]">
                    <p className="text-xs uppercase tracking-wide text-[var(--warm-muted)] dark:text-[#bfa89a]">Starter prompt</p>
                    <p className="mt-1">{starterPrompts[data.promptStyle]}</p>
                  </div>
                </CardContent>
              </Card>

              <Link href="/">
                <Button className="mt-8 bg-[var(--warm-ink)] text-[var(--warm-bg)] hover:bg-[#44342a] dark:bg-[#f0bc99] dark:text-[#241c17]">
                  Start writing
                  <BookOpen className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {step > 1 && step < steps.length && (
        <footer className="p-6">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <Button variant="ghost" onClick={prev} className="text-[var(--warm-muted)] hover:bg-[#eee2d5] dark:text-[#cdb8a8] dark:hover:bg-[#241c18]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={next} className="bg-[var(--warm-ink)] text-[var(--warm-bg)] hover:bg-[#44342a] dark:bg-[#f0bc99] dark:text-[#241c17]">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </footer>
      )}
    </div>
  )
}
