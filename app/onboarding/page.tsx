"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  PenLine,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Sun,
  Moon,
  Sunset,
  Target,
  BookOpen,
  ImageIcon,
  Bell,
  User,
  Lock,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { LogoMark } from "@/components/logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"

interface OnboardingData {
  name: string
  journalName: string
  writingTime: string
  goal: string
  privacy: string
  reminders: boolean
}

const STEPS = [
  { id: 1, title: "Welcome" },
  { id: 2, title: "Your Name" },
  { id: 3, title: "Journal Setup" },
  { id: 4, title: "Writing Time" },
  { id: 5, title: "Goals" },
  { id: 6, title: "Privacy" },
  { id: 7, title: "Ready" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    name: "",
    journalName: "My Journal",
    writingTime: "morning",
    goal: "reflection",
    privacy: "private",
    reminders: true,
  })

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length))
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const updateData = (field: keyof OnboardingData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1412] flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-auto" />
            <span className="font-script text-2xl font-semibold text-[#3d3535] dark:text-[#e8ddd5]">Unfiltered</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" className="text-[#8a7a7a] dark:text-[#9a8a82] hover:text-[#3d3535] dark:hover:text-[#e8ddd5]">
                Skip for now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="px-6">
        <div className="max-w-2xl mx-auto">
          <Progress value={progress} className="h-1 bg-[#e8e0da] dark:bg-[#3a2f28]" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-[#8a7a7a] dark:text-[#9a8a82]">Step {currentStep} of {STEPS.length}</span>
            <span className="text-xs text-[#8a7a7a] dark:text-[#9a8a82]">{STEPS[currentStep - 1].title}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-[#d4a5a5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-[#d4a5a5]" />
              </div>
              <h1 className="text-3xl font-bold text-[#3d3535] dark:text-[#e8ddd5] mb-4">
                Welcome to Unfiltered
              </h1>
              <p className="text-[#6a5f5f] dark:text-[#b0a098] mb-8 leading-relaxed">
                Your personal space for authentic expression. Let's set up your journal 
                in just a few steps so it feels truly yours.
              </p>
              <Button 
                onClick={nextStep}
                className="bg-[#3d3535] hover:bg-[#2d2525] text-white px-8"
              >
                Let's Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Name */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-[#d4a5a5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-[#d4a5a5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#3d3535] dark:text-[#e8ddd5] mb-2 text-center">
                What should we call you?
              </h2>
              <p className="text-[#6a5f5f] dark:text-[#b0a098] mb-8 text-center">
                This will be used to personalize your journal experience.
              </p>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={data.name}
                  onChange={(e) => updateData("name", e.target.value)}
                  className="h-12 bg-white dark:bg-[#231c19] border-[#e8e0da] dark:border-[#3a2f28] focus:border-[#d4a5a5] text-center text-lg"
                />
              </div>
            </div>
          )}

          {/* Step 3: Journal Name */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-[#d4a5a5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-[#d4a5a5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#3d3535] dark:text-[#e8ddd5] mb-2 text-center">
                Name your journal
              </h2>
              <p className="text-[#6a5f5f] dark:text-[#b0a098] mb-8 text-center">
                Give your journal a name that inspires you. You can always change this later.
              </p>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="My Journal"
                  value={data.journalName}
                  onChange={(e) => updateData("journalName", e.target.value)}
                  className="h-12 bg-white dark:bg-[#231c19] border-[#e8e0da] dark:border-[#3a2f28] focus:border-[#d4a5a5] text-center text-lg"
                />
                <div className="flex flex-wrap justify-center gap-2">
                  {["My Journal", "Daily Reflections", "Life Notes", "Thoughts & Dreams"].map((name) => (
                    <button
                      key={name}
                      onClick={() => updateData("journalName", name)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        data.journalName === name
                          ? "bg-[#d4a5a5] text-white"
                          : "bg-[#f0ebe5] dark:bg-[#2a211d] text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#e8e0da] dark:hover:bg-[#3a2f28]"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Writing Time */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#3d3535] dark:text-[#e8ddd5] mb-2 text-center">
                When do you prefer to write?
              </h2>
              <p className="text-[#6a5f5f] dark:text-[#b0a098] mb-8 text-center">
                We'll customize your prompts based on your writing time.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "morning", icon: Sun, label: "Morning", desc: "Start your day with reflection" },
                  { id: "afternoon", icon: Sunset, label: "Afternoon", desc: "Capture midday thoughts" },
                  { id: "evening", icon: Moon, label: "Evening", desc: "Wind down with journaling" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateData("writingTime", option.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      data.writingTime === option.id
                        ? "border-[#d4a5a5] bg-[#d4a5a5]/5"
                        : "border-[#e8e0da] dark:border-[#3a2f28] bg-white dark:bg-[#231c19] hover:border-[#d4a5a5]/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      data.writingTime === option.id ? "bg-[#d4a5a5]" : "bg-[#f0ebe5] dark:bg-[#2a211d]"
                    }`}>
                      <option.icon className={`w-6 h-6 ${
                        data.writingTime === option.id ? "text-white" : "text-[#8a7a7a] dark:text-[#9a8a82]"
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-[#3d3535] dark:text-[#e8ddd5]">{option.label}</div>
                      <div className="text-sm text-[#8a7a7a] dark:text-[#9a8a82]">{option.desc}</div>
                    </div>
                    {data.writingTime === option.id && (
                      <Check className="w-5 h-5 text-[#d4a5a5] ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Goals */}
          {currentStep === 5 && (
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-[#d4a5a5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[#d4a5a5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#3d3535] dark:text-[#e8ddd5] mb-2 text-center">
                What's your journaling goal?
              </h2>
              <p className="text-[#6a5f5f] dark:text-[#b0a098] mb-8 text-center">
                This helps us personalize your experience.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "reflection", label: "Self-Reflection", desc: "Understand yourself better" },
                  { id: "gratitude", label: "Gratitude", desc: "Focus on the positive" },
                  { id: "creativity", label: "Creativity", desc: "Express yourself freely" },
                  { id: "memories", label: "Memories", desc: "Capture life moments" },
                  { id: "growth", label: "Growth", desc: "Track personal progress" },
                  { id: "healing", label: "Healing", desc: "Process emotions" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateData("goal", option.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      data.goal === option.id
                        ? "border-[#d4a5a5] bg-[#d4a5a5]/5"
                        : "border-[#e8e0da] dark:border-[#3a2f28] bg-white dark:bg-[#231c19] hover:border-[#d4a5a5]/50"
                    }`}
                  >
                    <div className="font-semibold text-[#3d3535] dark:text-[#e8ddd5] mb-1">{option.label}</div>
                    <div className="text-xs text-[#8a7a7a] dark:text-[#9a8a82]">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Privacy */}
          {currentStep === 6 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#3d3535] dark:text-[#e8ddd5] mb-2 text-center">
                Set your default privacy
              </h2>
              <p className="text-[#6a5f5f] dark:text-[#b0a098] mb-8 text-center">
                You can change this for individual entries anytime.
              </p>
              <div className="space-y-4">
                {[
                  { id: "private", icon: Lock, label: "Private", desc: "Only you can see your entries" },
                  { id: "shared", icon: User, label: "Shared", desc: "Share with selected people" },
                  { id: "public", icon: Globe, label: "Public", desc: "Anyone can read your entries" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateData("privacy", option.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 w-full transition-all ${
                      data.privacy === option.id
                        ? "border-[#d4a5a5] bg-[#d4a5a5]/5"
                        : "border-[#e8e0da] dark:border-[#3a2f28] bg-white dark:bg-[#231c19] hover:border-[#d4a5a5]/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      data.privacy === option.id ? "bg-[#d4a5a5]" : "bg-[#f0ebe5] dark:bg-[#2a211d]"
                    }`}>
                      <option.icon className={`w-6 h-6 ${
                        data.privacy === option.id ? "text-white" : "text-[#8a7a7a] dark:text-[#9a8a82]"
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-[#3d3535] dark:text-[#e8ddd5]">{option.label}</div>
                      <div className="text-sm text-[#8a7a7a] dark:text-[#9a8a82]">{option.desc}</div>
                    </div>
                    {data.privacy === option.id && (
                      <Check className="w-5 h-5 text-[#d4a5a5] ml-auto" />
                    )}
                  </button>
                ))}
              </div>

              {/* Reminders Toggle */}
              <div className="mt-8 p-4 bg-white dark:bg-[#231c19] rounded-xl border border-[#e8e0da] dark:border-[#3a2f28]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#d4a5a5]" />
                    <div>
                      <div className="font-medium text-[#3d3535] dark:text-[#e8ddd5]">Daily Reminders</div>
                      <div className="text-sm text-[#8a7a7a] dark:text-[#9a8a82]">Get gentle nudges to write</div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateData("reminders", !data.reminders)}
                    className={`w-12 h-7 rounded-full transition-colors ${
                      data.reminders ? "bg-[#d4a5a5]" : "bg-[#e8e0da] dark:bg-[#3a2f28]"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white dark:bg-[#231c19] shadow-sm transition-transform ${
                      data.reminders ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Ready */}
          {currentStep === 7 && (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-[#d4a5a5] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-[#3d3535] dark:text-[#e8ddd5] mb-4">
                You're all set{data.name ? `, ${data.name}` : ""}!
              </h1>
              <p className="text-[#6a5f5f] dark:text-[#b0a098] mb-8 leading-relaxed">
                Your journal "<span className="font-medium text-[#3d3535] dark:text-[#e8ddd5]">{data.journalName}</span>" is ready. 
                Start capturing your thoughts and memories today.
              </p>

              {/* Summary Card */}
              <Card className="bg-white/80 dark:bg-[#231c19]/80 border-[#e8e0da] dark:border-[#3a2f28] mb-8 text-left">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7a7a] dark:text-[#9a8a82]">Writing time</span>
                    <span className="text-[#3d3535] dark:text-[#e8ddd5] capitalize">{data.writingTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7a7a] dark:text-[#9a8a82]">Goal</span>
                    <span className="text-[#3d3535] dark:text-[#e8ddd5] capitalize">{data.goal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7a7a] dark:text-[#9a8a82]">Privacy</span>
                    <span className="text-[#3d3535] dark:text-[#e8ddd5] capitalize">{data.privacy}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a7a7a] dark:text-[#9a8a82]">Reminders</span>
                    <span className="text-[#3d3535] dark:text-[#e8ddd5]">{data.reminders ? "On" : "Off"}</span>
                  </div>
                </CardContent>
              </Card>

              <Link href="/">
                <Button 
                  className="bg-[#d4a5a5] hover:bg-[#c49090] text-white px-8"
                >
                  Start Writing
                  <PenLine className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      {currentStep > 1 && currentStep < 7 && (
        <footer className="p-6">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-[#6a5f5f] dark:text-[#b0a098] hover:text-[#3d3535] dark:text-[#e8ddd5]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={nextStep}
              className="bg-[#3d3535] hover:bg-[#2d2525] text-white"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </footer>
      )}
    </div>
  )
}
