"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Search,
  Plus,
  BookOpen,
  ImageIcon,
  Layers,
  User,
  Calendar,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  ChevronRight,
  ChevronLeft,
  Menu,
  LogOut,
  Settings,
  Flame,
  Target,
  Heart,
  Lock,
  Globe,
  Users,
  Download,
  Bookmark,
  BookmarkCheck,
  Hash,
  Sparkles,
  FileText,
  Lightbulb,
  Check,
  PenLine,
  Home,
  CalendarDays,
  FolderOpen,
  ArrowRight,
  Zap,
  Eye,
} from "lucide-react"

// Logo Component
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />
      <path
        d="M20 12L14 18L20 24L26 18L20 12Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 16V28"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#d4a5a5" />
          <stop offset="100%" stopColor="#c49090" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Types
interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  time: string
  photos: string[]
  storyId?: string
  tags: string[]
  privacy: "public" | "private" | "shared"
  isFavorite: boolean
  wordCount: number
  template?: string
}

interface Story {
  id: string
  name: string
  description: string
  entryCount: number
  coverColor: string
}

interface WritingGoal {
  daily: number
  current: number
}



// Enhanced Progress Ring with smoother animation
function ProgressRing({ 
  progress, 
  size = 80, 
  strokeWidth = 6,
}: { 
  progress: number
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="progress-ring drop-shadow-sm">
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a5a5" />
          <stop offset="100%" stopColor="#c49090" />
        </linearGradient>
      </defs>
      <circle
        stroke="#f0ebe5"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="progress-ring__circle"
        stroke="url(#progressGradient)"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
      />
    </svg>
  )
}

// Refined Daily Prompt with better typography
function DailyPrompt({ prompt, onUse }: { prompt: string; onUse: () => void }) {
  return (
    <Card className="glass-card overflow-hidden card-interactive card-highlight">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090] shrink-0">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-subtle mb-2">Today&apos;s Prompt</p>
            <p className="text-body font-medium leading-relaxed">{prompt}</p>
          </div>
        </div>
        <button 
          onClick={onUse}
          className="btn-primary w-full mt-5 flex items-center justify-center gap-2"
        >
          <PenLine className="h-4 w-4" />
          <span>Write About This</span>
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </CardContent>
    </Card>
  )
}

// Refined Stats Card with better visual hierarchy
function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  trend,
}: { 
  icon: React.ElementType
  label: string
  value: string | number
  trend?: string
}) {
  return (
    <Card className="glass-card card-interactive group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090] transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
          {trend && (
            <span className="text-xs font-medium text-[#8a9a7a] bg-[#8a9a7a]/10 px-2 py-0.5 rounded-full">
              {trend}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-[#3d3535] dark:text-[#e8ddd5] tracking-tight">{value}</p>
          <p className="text-muted mt-0.5">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Streak Card with better visuals
function StreakCard({ streak, goal }: { streak: number; goal: WritingGoal }) {
  const progress = Math.min((goal.current / goal.daily) * 100, 100)
  const isComplete = progress >= 100
  
  return (
    <Card className="glass-card overflow-hidden card-interactive card-highlight">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isComplete ? "bg-[#e07a5f]/20" : "bg-[#e07a5f]/10"}`}>
                <Flame className={`h-5 w-5 text-[#e07a5f] ${isComplete ? "animate-bounce-subtle" : ""}`} />
              </div>
              <span className="text-4xl font-bold text-[#3d3535] dark:text-[#e8ddd5] tracking-tight">{streak}</span>
            </div>
            <p className="text-muted">Day Streak</p>
            <p className="text-subtle mt-2">
              {isComplete ? "Goal reached!" : "Keep going!"}
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <ProgressRing progress={progress} size={76} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-[#3d3535] dark:text-[#e8ddd5]">{goal.current}</span>
              <span className="text-xs text-[#8a7a7a] dark:text-[#9a8a82]">/ {goal.daily}</span>
            </div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-[#e8e0da] dark:border-[#3a2f28]/60 dark:border-[#2a211d]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted">
              <Target className="h-4 w-4" />
              <span>Daily Goal</span>
            </div>
            <span className="font-semibold text-[#4a3f3f] dark:text-[#d5ccc5]">{goal.daily} words</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Refined Entry Card with polished interactions
function EntryCard({
  entry,
  onEdit,
  onDelete,
  onToggleFavorite,
  onView,
  stories,
  className = "",
}: {
  entry: JournalEntry
  onEdit: () => void
  onDelete: () => void
  onToggleFavorite: () => void
  onView: () => void
  stories: Story[]
  className?: string
}) {
  const story = stories.find((s) => s.id === entry.storyId)
  const readingTime = Math.max(1, Math.ceil(entry.wordCount / 200))

  const PrivacyIcon = entry.privacy === "public" ? Globe : entry.privacy === "shared" ? Users : Lock

  return (
    <Card 
      className={`glass-card group overflow-hidden card-interactive cursor-pointer ${className}`}
      onClick={onView}
    >
      {entry.photos.length > 0 && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={entry.photos[0] || "/placeholder.svg"}
            alt={entry.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {entry.photos.length > 1 && (
            <Badge className="absolute bottom-3 right-3 bg-black/60 text-white border-0 backdrop-blur-sm">
              +{entry.photos.length - 1} more
            </Badge>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-[#231c19]/90 backdrop-blur-sm text-[#8a7a7a] dark:text-[#9a8a82] shadow-sm">
                  <PrivacyIcon className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="capitalize">{entry.privacy}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-[#231c19]/90 backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95 shadow-sm"
          >
            {entry.isFavorite ? (
              <BookmarkCheck className="h-4 w-4 text-[#d4a5a5]" />
            ) : (
              <Bookmark className="h-4 w-4 text-[#8a7a7a] dark:text-[#9a8a82]" />
            )}
          </button>
        </div>
      )}

      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="heading-sm line-clamp-1 group-hover:text-[#c49090] transition-colors duration-300">
              {entry.title}
            </h3>
            <div className="mt-2 flex items-center gap-3 text-muted">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {entry.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min
              </span>
            </div>
          </div>

          {entry.photos.length === 0 && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className="btn-icon h-8 w-8"
              >
                {entry.isFavorite ? (
                  <BookmarkCheck className="h-4 w-4 text-[#d4a5a5]" />
                ) : (
                  <Bookmark className="h-4 w-4 text-[#8a7a7a] dark:text-[#9a8a82]" />
                )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="btn-icon h-8 w-8 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4 text-[#8a7a7a] dark:text-[#9a8a82]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView(); }}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Entry
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Entry
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-600 focus:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {entry.content && (
          <p className="mb-4 text-body line-clamp-3 opacity-80">
            {entry.content}
          </p>
        )}

        {entry.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {entry.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-[#f5f0eb] text-[#8a7a7a] dark:text-[#9a8a82] border-0 text-xs font-normal px-2.5 py-0.5 hover:bg-[#ebe5df] transition-colors"
              >
                <Hash className="h-3 w-3 mr-1 opacity-60" />
                {tag}
              </Badge>
            ))}
            {entry.tags.length > 3 && (
              <Badge variant="secondary" className="bg-[#f5f0eb] text-[#8a7a7a] dark:text-[#9a8a82] border-0 text-xs px-2.5 py-0.5">
                +{entry.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[#e8e0da] dark:border-[#3a2f28]/50">
          {story ? (
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full ring-2 ring-white"
                style={{ backgroundColor: story.coverColor }}
              />
              <span className="text-xs text-[#8a7a7a] dark:text-[#9a8a82] font-medium">{story.name}</span>
            </div>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-1.5 text-xs text-[#a08080]">
            <FileText className="h-3.5 w-3.5" />
            <span className="font-medium">{entry.wordCount}</span>
            <span>words</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Calendar Components with refined styling
function MonthlyCalendar({ entries }: { entries: JournalEntry[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()
  
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const entriesByDate = useMemo(() => {
    const map = new Map<string, number>()
    entries.forEach(entry => {
      const dateKey = entry.date
      map.set(dateKey, (map.get(dateKey) || 0) + 1)
    })
    return map
  }, [entries])

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-11" />)
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    const hasEntries = entriesByDate.has(dateStr)
    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

    days.push(
      <button
        key={day}
        className={`relative flex h-11 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 hover:bg-[#f0ebe5] dark:hover:bg-[#2a211d] active:scale-95 ${
          isToday ? "bg-gradient-to-br from-[#d4a5a5] to-[#c49090] text-white shadow-md" : "text-[#4a3f3f] dark:text-[#d5ccc5]"
        } ${hasEntries && !isToday ? "font-semibold" : ""}`}
      >
        {day}
        {hasEntries && (
          <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ${isToday ? "bg-white" : "bg-[#d4a5a5]"}`} />
        )}
      </button>
    )
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return (
    <Card className="glass-card card-interactive">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="btn-icon"
          >
            <ChevronLeft className="h-5 w-5 text-[#8a7a7a] dark:text-[#9a8a82]" />
          </button>
          <h3 className="heading-sm">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="btn-icon"
          >
            <ChevronRight className="h-5 w-5 text-[#8a7a7a] dark:text-[#9a8a82]" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="h-9 flex items-center justify-center text-xs font-semibold text-[#a08080] uppercase">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </CardContent>
    </Card>
  )
}

function YearlyHeatmap({ entries }: { entries: JournalEntry[] }) {
  const entriesByDate = useMemo(() => {
    const map = new Map<string, number>()
    entries.forEach(entry => {
      const date = new Date(entry.date)
      const key = date.toISOString().split('T')[0]
      map.set(key, (map.get(key) || 0) + 1)
    })
    return map
  }, [entries])

  const weeks = []
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 364)

  for (let w = 0; w < 52; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + w * 7 + d)
      const key = date.toISOString().split('T')[0]
      const count = entriesByDate.get(key) || 0
      
      let intensity = "bg-[#f0ebe5] dark:bg-[#2a221e]"
      if (count >= 3) intensity = "bg-[#c49090] dark:bg-[#a06060]"
      else if (count >= 2) intensity = "bg-[#d4a5a5] dark:bg-[#8a5a5a]"
      else if (count >= 1) intensity = "bg-[#e5c5c5] dark:bg-[#6b4545]"

      week.push(
        <Tooltip key={`${w}-${d}`}>
          <TooltipTrigger asChild>
            <div className={`h-3.5 w-3.5 rounded-[3px] ${intensity} transition-colors duration-200 hover:ring-2 hover:ring-[#d4a5a5]/50 dark:hover:ring-[#c49090]/50 hover:scale-110 cursor-pointer`} />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{date.toLocaleDateString()}: {count} {count === 1 ? 'entry' : 'entries'}</p>
          </TooltipContent>
        </Tooltip>
      )
    }
    weeks.push(
      <div key={w} className="flex flex-col gap-1">
        {week}
      </div>
    )
  }

  return (
    <Card className="glass-card card-interactive">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 dark:from-[#6b4f4f]/25 dark:to-[#5a4040]/35 text-[#c49090]">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="heading-sm">Writing Activity</h3>
            <p className="text-muted">Your year at a glance</p>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-3">
          {weeks}
        </div>
        <div className="flex items-center justify-end gap-3 mt-4 text-xs text-[#8a7a7a] dark:text-[#9a8a82]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="h-3.5 w-3.5 rounded-[3px] bg-[#f0ebe5] dark:bg-[#2a221e]" />
            <div className="h-3.5 w-3.5 rounded-[3px] bg-[#e5c5c5] dark:bg-[#6b4545]" />
            <div className="h-3.5 w-3.5 rounded-[3px] bg-[#d4a5a5] dark:bg-[#8a5a5a]" />
            <div className="h-3.5 w-3.5 rounded-[3px] bg-[#c49090] dark:bg-[#a06060]" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Refined Entry Editor with better UX
function EntryEditor({
  entry,
  stories,
  onSave,
  onClose,
  isOpen,
  initialPrompt,
}: {
  entry?: JournalEntry
  stories: Story[]
  onSave: (entry: Omit<JournalEntry, "id"> & { id?: string }) => void
  onClose: () => void
  isOpen: boolean
  initialPrompt?: string
}) {
  const [title, setTitle] = useState(entry?.title || "")
  const [content, setContent] = useState(entry?.content || initialPrompt || "")
  const [selectedStory, setSelectedStory] = useState(entry?.storyId || "")
  const [photos, setPhotos] = useState<string[]>(entry?.photos || [])
  const [tags, setTags] = useState<string[]>(entry?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [privacy, setPrivacy] = useState<"public" | "private" | "shared">(entry?.privacy || "private")
  const [template, setTemplate] = useState(entry?.template || "")

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPhotos((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleSave = () => {
    const now = new Date()
    onSave({
      id: entry?.id,
      title: title || "Untitled Entry",
      content,
      date: now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      photos,
      storyId: selectedStory || undefined,
      tags,
      privacy,
      isFavorite: entry?.isFavorite || false,
      wordCount,
      template,
    })
    onClose()
  }

  const templates = [
    { id: "blank", name: "Blank", icon: FileText },
    { id: "daily", name: "Daily Reflection", icon: Sparkles },
    { id: "gratitude", name: "Gratitude", icon: Heart },
    { id: "goals", name: "Goals", icon: Target },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-[#faf8f5] dark:bg-[#1a1412] border-l border-[#e8e0da]/80 dark:border-[#2a211d] p-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#faf8f5]/95 dark:bg-[#1a1412]/95 backdrop-blur-md border-b border-[#e8e0da]/60 dark:border-[#2a211d] px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <SheetHeader className="p-0 space-y-0">
              <SheetTitle className="text-2xl font-bold tracking-tight text-[#3d3535] dark:text-[#e8ddd5]">
                {entry ? "Edit Entry" : "New Entry"}
              </SheetTitle>
            </SheetHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 text-xs text-[#a08080] dark:text-[#8a7570]">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {wordCount}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime}m
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8 space-y-7">
          {/* Templates */}
          {!entry && (
            <div className="animate-fade-in">
              <label className="text-subtle block mb-3">
                Template
              </label>
              <div className="flex gap-2 flex-wrap">
                {templates.map((t) => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        template === t.id
                          ? "bg-gradient-to-br from-[#d4a5a5] to-[#c49090] text-white shadow-md shadow-[#d4a5a5]/20"
                          : "bg-[#f5f0eb] dark:bg-[#231c19] text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#ede5de] dark:hover:bg-[#2a211d] border border-[#e8e0da]/60 dark:border-[#3a2f28]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {t.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Title */}
          <div className="animate-fade-in stagger-1">
            <Input
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0 border-b-2 border-[#e8e0da] dark:border-[#3a2f28] rounded-none px-0 text-2xl font-bold bg-transparent focus-visible:ring-0 focus-visible:border-[#d4a5a5] text-[#3d3535] dark:text-[#e8ddd5] placeholder:text-[#c0b0b0] dark:placeholder:text-[#5a4a42] h-auto py-3 tracking-tight"
            />
          </div>

          {/* Content */}
          <div className="animate-fade-in stagger-2">
            <Textarea
              placeholder="Start writing your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none border-[#e8e0da]/80 dark:border-[#3a2f28] bg-[#f5f0eb]/50 dark:bg-[#231c19]/60 text-[#4a3f3f] dark:text-[#d5ccc5] text-base leading-relaxed rounded-2xl focus-visible:ring-2 focus-visible:ring-[#d4a5a5]/40 focus-visible:border-[#d4a5a5]/50 placeholder:text-[#c0b0b0] dark:placeholder:text-[#5a4a42] p-5"
            />
          </div>

          {/* Photos */}
          <div className="animate-fade-in stagger-3">
            <label className="text-subtle block mb-3">
              Photos
            </label>
            <div className="flex flex-wrap gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="group relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="h-24 w-24 rounded-xl object-cover ring-2 ring-white/80 dark:ring-[#3a2f28] shadow-md"
                  />
                  <button
                    onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#3d3535] dark:bg-[#d4a5a5] text-white dark:text-[#1a1412] opacity-0 transition-all group-hover:opacity-100 hover:bg-[#2d2525] dark:hover:bg-[#c49090] shadow-lg"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#d4a5a5]/30 dark:border-[#6b4f4f]/40 transition-all duration-200 hover:border-[#d4a5a5] dark:hover:border-[#c49090] hover:bg-[#d4a5a5]/5 dark:hover:bg-[#6b4f4f]/10 group">
                <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                <Plus className="h-6 w-6 text-[#d4a5a5] dark:text-[#8a6a6a] transition-transform group-hover:scale-110" />
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="animate-fade-in stagger-4">
            <label className="text-subtle block mb-3">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} className="bg-[#f5f0eb] dark:bg-[#2a211d] text-[#6a5f5f] dark:text-[#b0a098] border border-[#e8e0da]/60 dark:border-[#3a2f28] pr-1.5 py-1 text-sm group">
                  <Hash className="h-3 w-3 mr-1 opacity-50" />
                  {tag}
                  <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-1.5 hover:text-[#c49090] transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 bg-[#f5f0eb]/50 dark:bg-[#231c19]/60 border-[#e8e0da]/80 dark:border-[#3a2f28] rounded-xl focus-visible:ring-2 focus-visible:ring-[#d4a5a5]/40 placeholder:text-[#c0b0b0] dark:placeholder:text-[#5a4a42]"
              />
              <button onClick={addTag} className="btn-secondary px-4">
                <Hash className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Privacy */}
          <div className="animate-fade-in stagger-5">
            <label className="text-subtle block mb-3">
              Privacy
            </label>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "private", icon: Lock, label: "Private" },
                { value: "shared", icon: Users, label: "Shared" },
                { value: "public", icon: Globe, label: "Public" },
              ].map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => setPrivacy(option.value as typeof privacy)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      privacy === option.value
                        ? "bg-gradient-to-br from-[#d4a5a5] to-[#c49090] text-white shadow-md shadow-[#d4a5a5]/20"
                        : "bg-[#f5f0eb] dark:bg-[#231c19] text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#ede5de] dark:hover:bg-[#2a211d] border border-[#e8e0da]/60 dark:border-[#3a2f28]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Story */}
          {stories.length > 0 && (
            <div>
              <label className="text-subtle block mb-3">
                Add to Story
              </label>
              <select
                value={selectedStory}
                onChange={(e) => setSelectedStory(e.target.value)}
                className="w-full rounded-xl border border-[#e8e0da]/80 dark:border-[#3a2f28] bg-[#f5f0eb]/50 dark:bg-[#231c19]/60 px-4 py-3 text-sm text-[#4a3f3f] dark:text-[#d5ccc5] focus:ring-2 focus:ring-[#d4a5a5]/40 focus:border-[#d4a5a5]/50 transition-all"
              >
                <option value="">No story</option>
                {stories.map((story) => (
                  <option key={story.id} value={story.id}>{story.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Sticky Footer Actions */}
        <div className="sticky bottom-0 bg-[#faf8f5]/95 dark:bg-[#1a1412]/95 backdrop-blur-md border-t border-[#e8e0da]/60 dark:border-[#2a211d] px-6 py-4 sm:px-8">
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Check className="h-4 w-4" />
              {entry ? "Save Changes" : "Create Entry"}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Navigation Item Component
function NavItem({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  badge,
}: { 
  icon: React.ElementType
  label: string
  isActive: boolean
  onClick: () => void
  badge?: number
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 group ${
        isActive
          ? "bg-gradient-to-r from-[#d4a5a5] to-[#c49090] text-white shadow-lg shadow-[#d4a5a5]/25"
          : "text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#f0ebe5] dark:hover:bg-[#2a211d]"
      }`}
    >
      <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`} />
      <span className="font-medium flex-1 text-left">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-[#d4a5a5]/20 dark:bg-[#6b4f4f]/20 text-[#c49090]"}`}>
          {badge}
        </span>
      )}
    </button>
  )
}

// Main Page Component
export default function JournalPlatform() {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | undefined>()
  const [promptToUse, setPromptToUse] = useState("")
  const [viewingEntry, setViewingEntry] = useState<JournalEntry | undefined>()

  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [streak] = useState(7)
  const [writingGoal] = useState<WritingGoal>({ daily: 500, current: 320 })

  const dailyPrompts = [
    "How did your morning routine set the tone for today?",
    "What small moment made you smile today?",
    "What challenge did you face, and how did you handle it?",
    "Who did you connect with today, and how did it feel?",
    "What are you looking forward to tomorrow?",
  ]
  // Use a fixed default prompt for SSR, then update on mount to avoid hydration mismatch
  const [todayPrompt, setTodayPrompt] = useState(dailyPrompts[0])
  useEffect(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    setTodayPrompt(dailyPrompts[dayOfYear % dailyPrompts.length])
  }, [])

  const totalWords = useMemo(() => entries.reduce((sum, e) => sum + e.wordCount, 0), [entries])
  const totalPhotos = useMemo(() => entries.reduce((sum, e) => sum + e.photos.length, 0), [entries])
  const favoriteCount = useMemo(() => entries.filter(e => e.isFavorite).length, [entries])

  const handleSaveEntry = useCallback((entryData: Omit<JournalEntry, "id"> & { id?: string }) => {
    if (entryData.id) {
      setEntries((prev) => prev.map((e) => (e.id === entryData.id ? { ...entryData, id: e.id } : e)))
    } else {
      const newEntry: JournalEntry = { ...entryData, id: Date.now().toString() }
      setEntries((prev) => [newEntry, ...prev])
      if (entryData.storyId) {
        setStories((prev) => prev.map((s) => s.id === entryData.storyId ? { ...s, entryCount: s.entryCount + 1 } : s))
      }
    }
    setEditingEntry(undefined)
    setPromptToUse("")
  }, [])

  const handleDeleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const entry = prev.find((e) => e.id === id)
      if (entry?.storyId) {
        setStories((prevStories) => prevStories.map((s) => s.id === entry.storyId ? { ...s, entryCount: Math.max(0, s.entryCount - 1) } : s))
      }
      return prev.filter((e) => e.id !== id)
    })
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, isFavorite: !e.isFavorite } : e))
  }, [])

  const filteredEntries = useMemo(() => {
    if (!searchQuery) return entries
    const query = searchQuery.toLowerCase()
    return entries.filter((entry) =>
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }, [entries, searchQuery])

  const allPhotos = useMemo(() => entries.flatMap((entry) =>
    entry.photos.map((photo, index) => ({
      photo,
      entryId: entry.id,
      entryTitle: entry.title,
      date: entry.date,
      index,
    }))
  ), [entries])

  const usePrompt = useCallback(() => {
    setPromptToUse(todayPrompt)
    setEditorOpen(true)
  }, [todayPrompt])

  const bookmarkedEntries = useMemo(() => entries.filter(e => e.isFavorite), [entries])

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "entries", label: "All Entries", icon: BookOpen, badge: entries.length },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark, badge: bookmarkedEntries.length },
    { id: "gallery", label: "Gallery", icon: ImageIcon, badge: totalPhotos },
    { id: "calendar", label: "Calendar", icon: CalendarDays },
    { id: "stories", label: "Stories", icon: FolderOpen, badge: stories.length },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1412]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 glass border-b border-[#e8e0da] dark:border-[#3a2f28]/60 dark:border-[#2a211d] lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setSidebarOpen(true)} className="btn-icon">
              <Menu className="h-5 w-5 text-[#6a5f5f] dark:text-[#b0a098]" />
            </button>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-auto" />
              <span className="font-script text-2xl font-semibold text-[#3d3535] dark:text-[#e8ddd5] leading-none">Unfiltered</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a5a5]/25 to-[#e5c5c5]/35 hover:from-[#d4a5a5]/40 hover:to-[#e5c5c5]/50 dark:from-[#6b4f4f]/30 dark:to-[#5a4040]/40 dark:hover:from-[#6b4f4f]/50 dark:hover:to-[#5a4040]/60">
                <User className="h-4 w-4 text-[#c49090] dark:text-[#c49090]" />
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-80 bg-[#faf8f5] dark:bg-[#1a1412] shadow-2xl animate-slide-in">
              <div className="flex items-center justify-between p-6 border-b border-[#e8e0da] dark:border-[#3a2f28]">
                <div className="flex items-center gap-3">
                  <LogoMark className="h-9 w-auto" />
                  <span className="font-script text-3xl font-semibold text-[#3d3535] dark:text-[#e8ddd5] leading-none">Unfiltered</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="btn-icon">
                  <X className="h-5 w-5 text-[#8a7a7a] dark:text-[#9a8a82]" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeTab === item.id}
                    onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                    badge={item.badge}
                  />
                ))}
              </nav>
              <div className="p-4 border-t border-[#e8e0da] dark:border-[#3a2f28]/60 dark:border-[#2a211d]">
                <Link href="/settings" onClick={() => setSidebarOpen(false)} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#f0ebe5] dark:hover:bg-[#2a211d] group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30">
                    <Settings className="h-5 w-5 text-[#c49090]" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#3d3535] dark:text-[#e8ddd5]">Settings</p>
                    <p className="text-xs text-[#8a7a7a] dark:text-[#9a8a82]">Preferences & account</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#a08080] group-hover:translate-x-0.5" />
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden lg:flex">
          {/* Desktop Sidebar */}
          <aside className="fixed left-0 top-0 h-screen w-72 border-r border-[#e8e0da] dark:border-[#3a2f28]/60 dark:border-[#2a211d] dark:border-[#2a211d] bg-[#faf8f5] dark:bg-[#1a1412] dark:bg-[#1a1412] flex flex-col">
            <div className="flex items-center gap-3 p-6 border-b border-[#e8e0da] dark:border-[#3a2f28]/60 dark:border-[#2a211d]">
              <LogoMark className="h-10 w-auto" />
              <span className="font-script text-3xl font-semibold text-[#3d3535] dark:text-[#e8ddd5] leading-none">Unfiltered</span>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                  badge={item.badge}
                />
              ))}
            </nav>

            <div className="p-4 border-t border-[#e8e0da] dark:border-[#3a2f28]/60 dark:border-[#2a211d]">
              <Link href="/settings" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#f0ebe5] dark:hover:bg-[#2a211d] group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30">
                  <Settings className="h-5 w-5 text-[#c49090]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#3d3535] dark:text-[#e8ddd5]">Settings</p>
                  <p className="text-xs text-[#8a7a7a] dark:text-[#9a8a82]">Preferences & account</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#a08080] group-hover:translate-x-0.5" />
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-72">
            <div className="max-w-6xl mx-auto p-8">
              {/* Top Bar: Search + Account */}
              <div className="flex items-center justify-between gap-6 mb-10">
                <div className="relative max-w-lg flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a08080]" />
                  <Input
                    placeholder="Search entries, tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-white/70 dark:bg-[#231c19]/70 border-[#e8e0da] dark:border-[#3a2f28] rounded-2xl h-12 text-base focus-visible:ring-2 focus-visible:ring-[#d4a5a5]/50 shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ThemeToggle className="h-10 w-10" />
                  <Link href="/profile" className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a5a5]/25 to-[#e5c5c5]/35 hover:from-[#d4a5a5]/40 hover:to-[#e5c5c5]/50 dark:from-[#6b4f4f]/30 dark:to-[#5a4040]/40 dark:hover:from-[#6b4f4f]/50 dark:hover:to-[#5a4040]/60">
                    <User className="h-5 w-5 text-[#c49090]" />
                  </Link>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "home" && (
                <div className="space-y-10 animate-fade-in">
                  <div>
                    <h1 className="heading-xl mb-2">Welcome back</h1>
                    <p className="text-muted text-lg">Ready to capture today&apos;s moments?</p>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StreakCard streak={streak} goal={writingGoal} />
                    <StatsCard icon={BookOpen} label="Total Entries" value={entries.length} trend={entries.length > 0 ? "+1 today" : undefined} />
                    <StatsCard icon={FileText} label="Words Written" value={totalWords.toLocaleString()} />
                    <StatsCard icon={Heart} label="Favorites" value={favoriteCount} />
                  </div>

                  {/* Prompt and Quick Entry */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <DailyPrompt prompt={todayPrompt} onUse={usePrompt} />
                    <Card className="glass-card flex items-center justify-center min-h-[200px] card-interactive">
                      <button
                        onClick={() => setEditorOpen(true)}
                        className="flex flex-col items-center gap-4 p-8 rounded-2xl transition-all duration-300 hover:bg-[#d4a5a5]/10 group"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5] to-[#c49090] text-white shadow-lg shadow-[#d4a5a5]/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                          <Plus className="h-8 w-8" />
                        </div>
                        <div className="text-center">
                          <span className="heading-sm block">New Entry</span>
                          <span className="text-muted">Start writing</span>
                        </div>
                      </button>
                    </Card>
                  </div>

                  {/* Recent Entries */}
                  {entries.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="heading-md">Recent Entries</h2>
                        <button onClick={() => setActiveTab("entries")} className="btn-ghost flex items-center gap-1 text-[#c49090]">
                          View All
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {entries.slice(0, 3).map((entry, i) => (
                          <EntryCard
                            key={entry.id}
                            entry={entry}
                            stories={stories}
                            onEdit={() => { setEditingEntry(entry); setEditorOpen(true) }}
                            onDelete={() => handleDeleteEntry(entry.id)}
                            onToggleFavorite={() => toggleFavorite(entry.id)}
                            onView={() => setViewingEntry(entry)}
                            className={`stagger-${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "entries" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h1 className="heading-lg">All Entries</h1>
                    <button onClick={() => setEditorOpen(true)} className="btn-primary flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Entry
                    </button>
                  </div>

                  {filteredEntries.length === 0 ? (
                    <Card className="glass-card p-16 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090] mx-auto mb-5">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <h3 className="heading-md mb-2">No entries yet</h3>
                      <p className="text-muted mb-8 max-w-sm mx-auto">Start capturing your thoughts and moments. Your journal awaits.</p>
                      <button onClick={() => setEditorOpen(true)} className="btn-primary">
                        Create Your First Entry
                      </button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredEntries.map((entry, i) => (
                        <EntryCard
                          key={entry.id}
                          entry={entry}
                          stories={stories}
                          onEdit={() => { setEditingEntry(entry); setEditorOpen(true) }}
                          onDelete={() => handleDeleteEntry(entry.id)}
                          onToggleFavorite={() => toggleFavorite(entry.id)}
                          onView={() => setViewingEntry(entry)}
                          className={`stagger-${(i % 5) + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "bookmarks" && (
                <div className="space-y-8 animate-fade-in">
                  <h1 className="heading-lg">Bookmarks</h1>
                  
                  {bookmarkedEntries.length === 0 ? (
                    <Card className="glass-card p-16 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090] mx-auto mb-5">
                        <Bookmark className="h-8 w-8" />
                      </div>
                      <h3 className="heading-md mb-2">No bookmarks yet</h3>
                      <p className="text-muted mb-8 max-w-sm mx-auto">Bookmark your favorite entries to find them quickly. Tap the bookmark icon on any entry.</p>
                      <button onClick={() => setActiveTab("entries")} className="btn-primary">
                        Browse Entries
                      </button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {bookmarkedEntries.map((entry, i) => (
                        <EntryCard
                          key={entry.id}
                          entry={entry}
                          stories={stories}
                          onEdit={() => { setEditingEntry(entry); setEditorOpen(true) }}
                          onDelete={() => handleDeleteEntry(entry.id)}
                          onToggleFavorite={() => toggleFavorite(entry.id)}
                          onView={() => setViewingEntry(entry)}
                          className={`stagger-${(i % 5) + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="space-y-8 animate-fade-in">
                  <h1 className="heading-lg">Photo Gallery</h1>
                  
                  {allPhotos.length === 0 ? (
                    <Card className="glass-card p-16 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090] mx-auto mb-5">
                        <ImageIcon className="h-8 w-8" />
                      </div>
                      <h3 className="heading-md mb-2">No photos yet</h3>
                      <p className="text-muted">Photos you add to entries will appear here.</p>
                    </Card>
                  ) : (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
                      {allPhotos.map((item, i) => (
                        <div
                          key={`${item.entryId}-${item.index}`}
                          className={`break-inside-avoid group relative overflow-hidden rounded-2xl animate-scale-in stagger-${(i % 5) + 1} cursor-pointer`}
                        >
                          <img
                            src={item.photo || "/placeholder.svg"}
                            alt={item.entryTitle}
                            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <p className="text-white font-semibold text-sm truncate">{item.entryTitle}</p>
                              <p className="text-white/70 text-xs mt-1">{item.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "calendar" && (
                <div className="space-y-8 animate-fade-in">
                  <h1 className="heading-lg">Calendar</h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MonthlyCalendar entries={entries} />
                    <YearlyHeatmap entries={entries} />
                  </div>
                </div>
              )}

              {activeTab === "stories" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h1 className="heading-lg">Stories</h1>
                    <button className="btn-primary flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Story
                    </button>
                  </div>

                  {stories.length === 0 ? (
                    <Card className="glass-card p-16 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090] mx-auto mb-5">
                        <FolderOpen className="h-8 w-8" />
                      </div>
                      <h3 className="heading-md mb-2">No stories yet</h3>
                      <p className="text-muted max-w-sm mx-auto">Group related entries into stories and collections to organize your journal.</p>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {stories.map((story) => (
                        <Card key={story.id} className="glass-card overflow-hidden group cursor-pointer card-interactive">
                          <div className="h-28 transition-all duration-300 group-hover:h-32" style={{ backgroundColor: story.coverColor }} />
                          <CardContent className="p-5">
                            <h3 className="heading-sm group-hover:text-[#c49090] transition-colors">{story.name}</h3>
                            <p className="text-muted mt-2 line-clamp-2">{story.description}</p>
                            <p className="text-subtle mt-4">{story.entryCount} entries</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Mobile Content */}
        <div className="lg:hidden p-4 pb-24">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-white/70 dark:bg-[#231c19]/70 border border-[#e8e0da] dark:border-[#3a2f28] rounded-2xl p-1.5 mb-6 shadow-sm">
              <TabsTrigger value="home" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a5a5] data-[state=active]:to-[#c49090] data-[state=active]:text-white data-[state=active]:shadow-md py-2.5">
                <Home className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="entries" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a5a5] data-[state=active]:to-[#c49090] data-[state=active]:text-white data-[state=active]:shadow-md py-2.5">
                <BookOpen className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="bookmarks" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a5a5] data-[state=active]:to-[#c49090] data-[state=active]:text-white data-[state=active]:shadow-md py-2.5">
                <Bookmark className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a5a5] data-[state=active]:to-[#c49090] data-[state=active]:text-white data-[state=active]:shadow-md py-2.5">
                <ImageIcon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a5a5] data-[state=active]:to-[#c49090] data-[state=active]:text-white data-[state=active]:shadow-md py-2.5">
                <CalendarDays className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="space-y-6 animate-fade-in">
              <div>
                <h1 className="heading-lg mb-1">Welcome back</h1>
                <p className="text-muted">Ready to capture today&apos;s moments?</p>
              </div>
              <StreakCard streak={streak} goal={writingGoal} />
              <DailyPrompt prompt={todayPrompt} onUse={usePrompt} />
              <div className="grid grid-cols-2 gap-4">
                <StatsCard icon={BookOpen} label="Entries" value={entries.length} />
                <StatsCard icon={FileText} label="Words" value={totalWords.toLocaleString()} />
              </div>
            </TabsContent>

            <TabsContent value="entries" className="space-y-5 animate-fade-in">
              <Input
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/70 dark:bg-[#231c19]/70 border-[#e8e0da] dark:border-[#3a2f28] rounded-2xl h-12 shadow-sm"
              />
              {filteredEntries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  stories={stories}
                  onEdit={() => { setEditingEntry(entry); setEditorOpen(true) }}
                  onDelete={() => handleDeleteEntry(entry.id)}
                  onToggleFavorite={() => toggleFavorite(entry.id)}
                  onView={() => setViewingEntry(entry)}
                />
              ))}
            </TabsContent>

            <TabsContent value="bookmarks" className="space-y-5 animate-fade-in">
              {bookmarkedEntries.length === 0 ? (
                <Card className="glass-card p-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090] mx-auto mb-4">
                    <Bookmark className="h-7 w-7" />
                  </div>
                  <h3 className="heading-sm mb-2">No bookmarks yet</h3>
                  <p className="text-muted text-sm">Tap the bookmark icon on any entry to save it here.</p>
                </Card>
              ) : (
                bookmarkedEntries.map((entry) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    stories={stories}
                    onEdit={() => { setEditingEntry(entry); setEditorOpen(true) }}
                    onDelete={() => handleDeleteEntry(entry.id)}
                    onToggleFavorite={() => toggleFavorite(entry.id)}
                    onView={() => setViewingEntry(entry)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="gallery" className="animate-fade-in">
              <div className="columns-2 gap-4 space-y-4">
                {allPhotos.map((item, i) => (
                  <div key={`${item.entryId}-${item.index}`} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm">
                    <img src={item.photo || "/placeholder.svg"} alt={item.entryTitle} className="w-full object-cover" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-5 animate-fade-in">
              <MonthlyCalendar entries={entries} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setEditorOpen(true)}
              className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5] to-[#c49090] text-white shadow-xl shadow-[#d4a5a5]/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#d4a5a5]/40 active:scale-95 z-50 animate-glow"
            >
              <Plus className="h-7 w-7" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-[#3d3535] text-white border-0 px-3 py-2">
            <p className="font-medium">New Entry</p>
          </TooltipContent>
        </Tooltip>

        {/* Entry Editor */}
        <EntryEditor
          entry={editingEntry}
          stories={stories}
          onSave={handleSaveEntry}
          onClose={() => { setEditorOpen(false); setEditingEntry(undefined); setPromptToUse("") }}
          isOpen={editorOpen}
          initialPrompt={promptToUse}
        />

        {/* Entry Viewer Sheet */}
        <Sheet open={!!viewingEntry} onOpenChange={(open) => !open && setViewingEntry(undefined)}>
          <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-[#faf8f5] dark:bg-[#1a1412] border-l border-[#e8e0da] dark:border-[#3a2f28]">
            {viewingEntry && (
              <>
                <SheetHeader className="mb-6">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="heading-lg pr-8">{viewingEntry.title}</SheetTitle>
                  </div>
                  <div className="flex items-center gap-4 text-muted mt-2">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      {viewingEntry.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {viewingEntry.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      {viewingEntry.wordCount} words
                    </span>
                  </div>
                </SheetHeader>

                {viewingEntry.photos.length > 0 && (
                  <div className="mb-6 -mx-6">
                    <div className="flex gap-3 overflow-x-auto px-6 pb-2">
                      {viewingEntry.photos.map((photo, i) => (
                        <img
                          key={i}
                          src={photo || "/placeholder.svg"}
                          alt={`Photo ${i + 1}`}
                          className="h-48 w-auto rounded-xl object-cover shadow-md flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="prose prose-neutral max-w-none">
                  <p className="text-body whitespace-pre-wrap leading-relaxed">{viewingEntry.content}</p>
                </div>

                {viewingEntry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#e8e0da] dark:border-[#3a2f28]">
                    {viewingEntry.tags.map((tag) => (
                      <Badge key={tag} className="bg-[#f5f0eb] text-[#6a5f5f] dark:text-[#b0a098] border-0 text-sm">
                        <Hash className="h-3 w-3 mr-1 opacity-50" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-8 pt-6 border-t border-[#e8e0da] dark:border-[#3a2f28]">
                  <button
                    onClick={() => { setEditingEntry(viewingEntry); setViewingEntry(undefined); setEditorOpen(true) }}
                    className="btn-secondary flex items-center gap-2 flex-1"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button className="btn-secondary flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}
