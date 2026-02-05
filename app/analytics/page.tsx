"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  FileText,
  BookOpen,
  ImageIcon,
  Flame,
  Target,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Award,
  Hash,
  Sun,
  Moon,
  Sunset,
} from "lucide-react"
import Link from "next/link"

// Logo Component
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 22"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unfiltered Logo"
    >
      <g 
        stroke="#3d3535" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        strokeDasharray="2 1.5"
        fill="none"
      >
        <line x1="16" y1="1" x2="16" y2="7" />
        <line x1="9" y1="3" x2="11" y2="8" />
        <line x1="23" y1="3" x2="21" y2="8" />
        <line x1="3" y1="10" x2="7" y2="11" />
        <line x1="29" y1="10" x2="25" y2="11" />
      </g>
      <path
        d="M 6 18 A 10 10 0 0 1 26 18 Z"
        fill="#d4a5a5"
      />
      <line
        x1="2"
        y1="18"
        x2="30"
        y2="18"
        stroke="#3d3535"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Progress Ring Component
function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 10,
  className = "" 
}: { 
  progress: number
  size?: number
  strokeWidth?: number
  className?: string 
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className={`progress-ring ${className}`}>
      <circle
        stroke="#e8e0da"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#d4a5a5"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        className="progress-ring__circle"
      />
    </svg>
  )
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendValue,
  color = "rose",
}: {
  icon: React.ElementType
  label: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  color?: "rose" | "amber" | "emerald" | "blue"
}) {
  const colorClasses = {
    rose: "bg-[#d4a5a5]/10 text-[#d4a5a5]",
    amber: "bg-amber-100 text-amber-600",
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
  }

  return (
    <Card className="bg-white/80 border-[#e8e0da]/60 hover:shadow-lg hover:shadow-[#d4a5a5]/5 transition-all">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-[#8a7a7a]"
            }`}>
              {trend === "up" ? <TrendingUp className="w-4 h-4" /> : 
               trend === "down" ? <TrendingDown className="w-4 h-4" /> : null}
              {trendValue}
            </div>
          )}
        </div>
        <div className="text-3xl font-bold text-[#3d3535] mb-1">{value}</div>
        <div className="text-sm text-[#8a7a7a]">{label}</div>
      </CardContent>
    </Card>
  )
}

// Bar Chart Component
function SimpleBarChart({ data }: { data: { label: string; value: number }[] }) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div 
            className="w-full bg-[#d4a5a5] rounded-t-lg transition-all hover:bg-[#c49090]"
            style={{ height: `${(item.value / maxValue) * 100}%`, minHeight: 4 }}
          />
          <span className="text-xs text-[#8a7a7a]">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// Activity Heatmap
function ActivityHeatmap() {
  const weeks = 12
  const days = 7
  const cells = Array.from({ length: weeks * days }).map(() => Math.random())
  
  return (
    <div>
      <div className="grid grid-cols-12 gap-1">
        {cells.map((intensity, i) => {
          let bgColor = "bg-[#f0ebe5]"
          if (intensity > 0.8) bgColor = "bg-[#d4a5a5]"
          else if (intensity > 0.6) bgColor = "bg-[#d4a5a5]/70"
          else if (intensity > 0.4) bgColor = "bg-[#d4a5a5]/40"
          else if (intensity > 0.2) bgColor = "bg-[#d4a5a5]/20"
          return (
            <div
              key={i}
              className={`aspect-square rounded-sm ${bgColor} transition-colors hover:ring-2 hover:ring-[#d4a5a5]/30`}
            />
          )
        })}
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-[#8a7a7a]">12 weeks ago</span>
        <div className="flex items-center gap-2 text-xs text-[#8a7a7a]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#f0ebe5]" />
            <div className="w-3 h-3 rounded-sm bg-[#d4a5a5]/20" />
            <div className="w-3 h-3 rounded-sm bg-[#d4a5a5]/40" />
            <div className="w-3 h-3 rounded-sm bg-[#d4a5a5]/70" />
            <div className="w-3 h-3 rounded-sm bg-[#d4a5a5]" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  // Sample data
  const weeklyData = [
    { label: "Mon", value: 450 },
    { label: "Tue", value: 320 },
    { label: "Wed", value: 580 },
    { label: "Thu", value: 420 },
    { label: "Fri", value: 650 },
    { label: "Sat", value: 280 },
    { label: "Sun", value: 390 },
  ]

  const monthlyData = [
    { label: "Jan", value: 12 },
    { label: "Feb", value: 18 },
    { label: "Mar", value: 15 },
    { label: "Apr", value: 22 },
    { label: "May", value: 19 },
    { label: "Jun", value: 25 },
  ]

  const topTags = [
    { tag: "gratitude", count: 34 },
    { tag: "reflection", count: 28 },
    { tag: "goals", count: 22 },
    { tag: "travel", count: 18 },
    { tag: "wellness", count: 15 },
  ]

  const writingTimes = [
    { time: "Morning", percent: 45, icon: Sun },
    { time: "Afternoon", percent: 25, icon: Sunset },
    { time: "Evening", percent: 30, icon: Moon },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/80 backdrop-blur-md border-b border-[#e8e0da]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6a5f5f] hover:bg-[#f0ebe5] hover:text-[#3d3535] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2.5">
                <LogoMark className="h-8 w-auto" />
                <span className="font-script text-2xl font-semibold text-[#3d3535]">Unfiltered</span>
              </div>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px] bg-white border-[#e8e0da]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3d3535] mb-2">Analytics</h1>
          <p className="text-[#6a5f5f]">Track your writing journey and discover insights about your journaling habits.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={FileText}
            label="Total Entries"
            value="147"
            trend="up"
            trendValue="+12%"
            color="rose"
          />
          <StatCard
            icon={BookOpen}
            label="Words Written"
            value="52.8K"
            trend="up"
            trendValue="+8%"
            color="amber"
          />
          <StatCard
            icon={Flame}
            label="Current Streak"
            value="23 days"
            trend="up"
            trendValue="Best: 45"
            color="emerald"
          />
          <StatCard
            icon={Clock}
            label="Avg. Entry Length"
            value="358"
            trend="neutral"
            trendValue="words"
            color="blue"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Words Per Day */}
          <Card className="bg-white/80 border-[#e8e0da]/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#d4a5a5]" />
                Words Per Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={weeklyData} />
            </CardContent>
          </Card>

          {/* Entries Per Month */}
          <Card className="bg-white/80 border-[#e8e0da]/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#d4a5a5]" />
                Entries Per Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={monthlyData} />
            </CardContent>
          </Card>
        </div>

        {/* Activity & Goals */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Heatmap */}
          <Card className="lg:col-span-2 bg-white/80 border-[#e8e0da]/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#d4a5a5]" />
                Writing Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityHeatmap />
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card className="bg-white/80 border-[#e8e0da]/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-[#d4a5a5]" />
                Weekly Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <ProgressRing progress={68} size={140} strokeWidth={12} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[#3d3535]">68%</span>
                    <span className="text-xs text-[#8a7a7a]">complete</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-lg font-semibold text-[#3d3535]">3,420 / 5,000</div>
                  <div className="text-sm text-[#8a7a7a]">words this week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top Tags */}
          <Card className="bg-white/80 border-[#e8e0da]/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Hash className="w-5 h-5 text-[#d4a5a5]" />
                Top Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topTags.map((item, i) => (
                <div key={item.tag} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#f0ebe5] flex items-center justify-center text-xs font-medium text-[#6a5f5f]">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#3d3535]">#{item.tag}</span>
                      <span className="text-xs text-[#8a7a7a]">{item.count} entries</span>
                    </div>
                    <div className="h-1.5 bg-[#f0ebe5] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#d4a5a5] rounded-full"
                        style={{ width: `${(item.count / topTags[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Writing Times */}
          <Card className="bg-white/80 border-[#e8e0da]/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#d4a5a5]" />
                Preferred Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {writingTimes.map((item) => (
                <div key={item.time} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0ebe5] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#6a5f5f]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#3d3535]">{item.time}</span>
                      <span className="text-sm font-semibold text-[#d4a5a5]">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-[#f0ebe5] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#d4a5a5] rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card className="bg-white/80 border-[#e8e0da]/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-[#d4a5a5]" />
                Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#d4a5a5]/10 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#d4a5a5] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#3d3535]">50K Words!</div>
                  <div className="text-xs text-[#8a7a7a]">Reached on Jan 15</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#f0ebe5] rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#e8e0da] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#8a7a7a]" />
                </div>
                <div>
                  <div className="font-medium text-[#3d3535]">30 Day Streak</div>
                  <div className="text-xs text-[#8a7a7a]">7 days to go!</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#f0ebe5] rounded-xl opacity-50">
                <div className="w-10 h-10 rounded-full bg-[#e8e0da] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#8a7a7a]" />
                </div>
                <div>
                  <div className="font-medium text-[#3d3535]">200 Entries</div>
                  <div className="text-xs text-[#8a7a7a]">53 entries to go</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
