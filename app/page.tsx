"use client"

import React, { useState, useMemo } from "react"
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

// Rising Sun Logo - Perfect half-circle with playful dotted rays
// Clean geometric sun with 5 dashed/dotted rays for a playful feel
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unfiltered Logo"
    >
      {/* 5 Dotted/dashed rays - playful broken lines */}
      <g 
        stroke="#3d3535" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        strokeDasharray="4 3"
        fill="none"
      >
        {/* Center ray */}
        <line x1="40" y1="4" x2="40" y2="20" />
        {/* Inner left ray */}
        <line x1="22" y1="10" x2="28" y2="22" />
        {/* Inner right ray */}
        <line x1="58" y1="10" x2="52" y2="22" />
        {/* Outer left ray */}
        <line x1="8" y1="26" x2="20" y2="30" />
        {/* Outer right ray */}
        <line x1="72" y1="26" x2="60" y2="30" />
      </g>
      
      {/* Perfect half-circle sun */}
      <path
        d="M 16 42 A 24 24 0 0 1 64 42 Z"
        fill="#d4a5a5"
      />
      
      {/* Horizon line */}
      <line
        x1="6"
        y1="42"
        x2="74"
        y2="42"
        stroke="#3d3535"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
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
    <Card className="glass-card border-0 overflow-hidden card-interactive card-highlight">
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
    <Card className="glass-card border-0 card-interactive group">
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
          <p className="text-3xl font-bold text-[#3d3535] tracking-tight">{value}</p>
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
    <Card className="glass-card border-0 overflow-hidden card-interactive card-highlight">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isComplete ? "bg-[#e07a5f]/20" : "bg-[#e07a5f]/10"}`}>
                <Flame className={`h-5 w-5 text-[#e07a5f] ${isComplete ? "animate-bounce-subtle" : ""}`} />
              </div>
              <span className="text-4xl font-bold text-[#3d3535] tracking-tight">{streak}</span>
            </div>
            <p className="text-muted">Day Streak</p>
            <p className="text-subtle mt-2">
              {isComplete ? "Goal reached!" : "Keep going!"}
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <ProgressRing progress={progress} size={76} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-[#3d3535]">{goal.current}</span>
              <span className="text-xs text-[#8a7a7a]">/ {goal.daily}</span>
            </div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-[#e8e0da]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted">
              <Target className="h-4 w-4" />
              <span>Daily Goal</span>
            </div>
            <span className="font-semibold text-[#4a3f3f]">{goal.daily} words</span>
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
      className={`glass-card border-0 group overflow-hidden card-interactive cursor-pointer ${className}`}
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#8a7a7a] shadow-sm">
                    <PrivacyIcon className="h-4 w-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="capitalize">{entry.privacy}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95 shadow-sm"
          >
            {entry.isFavorite ? (
              <BookmarkCheck className="h-4 w-4 text-[#d4a5a5]" />
            ) : (
              <Bookmark className="h-4 w-4 text-[#8a7a7a]" />
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
                  <Bookmark className="h-4 w-4 text-[#8a7a7a]" />
                )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="btn-icon h-8 w-8 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4 text-[#8a7a7a]" />
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
                className="bg-[#f5f0eb] text-[#8a7a7a] border-0 text-xs font-normal px-2.5 py-0.5 hover:bg-[#ebe5df] transition-colors"
              >
                <Hash className="h-3 w-3 mr-1 opacity-60" />
                {tag}
              </Badge>
            ))}
            {entry.tags.length > 3 && (
              <Badge variant="secondary" className="bg-[#f5f0eb] text-[#8a7a7a] border-0 text-xs px-2.5 py-0.5">
                +{entry.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[#e8e0da]/50">
          {story ? (
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full ring-2 ring-white"
                style={{ backgroundColor: story.coverColor }}
              />
              <span className="text-xs text-[#8a7a7a] font-medium">{story.name}</span>
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
        className={`relative flex h-11 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 hover:bg-[#f0ebe5] active:scale-95 ${
          isToday ? "bg-gradient-to-br from-[#d4a5a5] to-[#c49090] text-white shadow-md" : "text-[#4a3f3f]"
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
    <Card className="glass-card border-0 card-interactive">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="btn-icon"
          >
            <ChevronLeft className="h-5 w-5 text-[#8a7a7a]" />
          </button>
          <h3 className="heading-sm">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="btn-icon"
          >
            <ChevronRight className="h-5 w-5 text-[#8a7a7a]" />
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
      
      let intensity = "bg-[#f5f0eb]"
      if (count >= 3) intensity = "bg-[#c49090]"
      else if (count >= 2) intensity = "bg-[#d4a5a5]"
      else if (count >= 1) intensity = "bg-[#e5c5c5]"

      week.push(
        <TooltipProvider key={`${w}-${d}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`h-3.5 w-3.5 rounded-[3px] ${intensity} transition-all duration-200 hover:ring-2 hover:ring-[#d4a5a5]/50 hover:scale-125 cursor-pointer`} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{date.toLocaleDateString()}: {count} {count === 1 ? 'entry' : 'entries'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    weeks.push(
      <div key={w} className="flex flex-col gap-1">
        {week}
      </div>
    )
  }

  return (
    <Card className="glass-card border-0 card-interactive">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090]">
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
        <div className="flex items-center justify-end gap-3 mt-4 text-xs text-[#8a7a7a]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="h-3.5 w-3.5 rounded-[3px] bg-[#f5f0eb]" />
            <div className="h-3.5 w-3.5 rounded-[3px] bg-[#e5c5c5]" />
            <div className="h-3.5 w-3.5 rounded-[3px] bg-[#d4a5a5]" />
            <div className="h-3.5 w-3.5 rounded-[3px] bg-[#c49090]" />
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
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-[#faf8f5] border-l border-[#e8e0da]">
        <SheetHeader className="mb-8">
          <SheetTitle className="heading-lg">
            {entry ? "Edit Entry" : "New Entry"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8">
          {/* Templates */}
          {!entry && (
            <div className="animate-fade-in">
              <label className="text-subtle block mb-3">
                Choose Template
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
                          ? "bg-gradient-to-br from-[#d4a5a5] to-[#c49090] text-white shadow-md"
                          : "bg-white text-[#6a5f5f] hover:bg-[#f0ebe5] border border-[#e8e0da]"
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
              className="border-0 border-b-2 border-[#e8e0da] rounded-none px-0 text-2xl font-bold bg-transparent focus-visible:ring-0 focus-visible:border-[#d4a5a5] text-[#3d3535] placeholder:text-[#c0b0b0] h-auto py-3 tracking-tight"
            />
          </div>

          {/* Content */}
          <div className="animate-fade-in stagger-2">
            <Textarea
              placeholder="Start writing your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[280px] resize-none border-[#e8e0da] bg-white/60 text-[#4a3f3f] text-base leading-relaxed rounded-xl focus-visible:ring-2 focus-visible:ring-[#d4a5a5]/50 placeholder:text-[#c0b0b0] p-5"
            />
            <div className="mt-3 flex items-center justify-between text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  {wordCount} words
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime} min read
                </span>
              </div>
            </div>
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
                    className="h-24 w-24 rounded-xl object-cover ring-2 ring-white shadow-md"
                  />
                  <button
                    onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#3d3535] text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-[#2d2525] shadow-lg"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#d4a5a5]/40 transition-all duration-200 hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/5 group">
                <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                <Plus className="h-6 w-6 text-[#d4a5a5] transition-transform group-hover:scale-110" />
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
                <Badge key={tag} className="bg-[#f5f0eb] text-[#6a5f5f] border-0 pr-1.5 py-1 text-sm group">
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
                className="flex-1 bg-white/60 border-[#e8e0da] rounded-xl focus-visible:ring-2 focus-visible:ring-[#d4a5a5]/50"
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
            <div className="flex gap-2">
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
                        ? "bg-gradient-to-br from-[#d4a5a5] to-[#c49090] text-white shadow-md"
                        : "bg-white text-[#6a5f5f] hover:bg-[#f0ebe5] border border-[#e8e0da]"
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
                className="w-full rounded-xl border border-[#e8e0da] bg-white/60 px-4 py-3 text-sm text-[#4a3f3f] focus:ring-2 focus:ring-[#d4a5a5]/50 focus:border-[#d4a5a5] transition-all"
              >
                <option value="">No story</option>
                {stories.map((story) => (
                  <option key={story.id} value={story.id}>{story.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-[#e8e0da]">
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
          : "text-[#6a5f5f] hover:bg-[#f0ebe5]"
      }`}
    >
      <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`} />
      <span className="font-medium flex-1 text-left">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-[#d4a5a5]/20 text-[#c49090]"}`}>
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
  // Use date-based index to avoid hydration mismatch (same prompt all day)
  const getDailyPromptIndex = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    return dayOfYear % dailyPrompts.length
  }
  const [todayPrompt] = useState(dailyPrompts[getDailyPromptIndex()])

  const totalWords = entries.reduce((sum, e) => sum + e.wordCount, 0)
  const totalPhotos = entries.reduce((sum, e) => sum + e.photos.length, 0)
  const favoriteCount = entries.filter(e => e.isFavorite).length

  const handleSaveEntry = (entryData: Omit<JournalEntry, "id"> & { id?: string }) => {
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
  }

  const handleDeleteEntry = (id: string) => {
    const entry = entries.find((e) => e.id === id)
    setEntries((prev) => prev.filter((e) => e.id !== id))
    if (entry?.storyId) {
      setStories((prev) => prev.map((s) => s.id === entry.storyId ? { ...s, entryCount: Math.max(0, s.entryCount - 1) } : s))
    }
  }

  const toggleFavorite = (id: string) => {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, isFavorite: !e.isFavorite } : e))
  }

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const allPhotos = entries.flatMap((entry) =>
    entry.photos.map((photo, index) => ({
      photo,
      entryId: entry.id,
      entryTitle: entry.title,
      date: entry.date,
      index,
    }))
  )

  const usePrompt = () => {
    setPromptToUse(todayPrompt)
    setEditorOpen(true)
  }

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "entries", label: "All Entries", icon: BookOpen, badge: entries.length },
    { id: "gallery", label: "Gallery", icon: ImageIcon, badge: totalPhotos },
    { id: "calendar", label: "Calendar", icon: CalendarDays },
    { id: "stories", label: "Stories", icon: FolderOpen, badge: stories.length },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#faf8f5]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 glass border-b border-[#e8e0da]/60 lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setSidebarOpen(true)} className="btn-icon">
              <Menu className="h-5 w-5 text-[#6a5f5f]" />
            </button>
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-auto" />
              <span className="font-script text-2xl font-semibold text-[#3d3535]">Unfiltered</span>
            </div>
            <div className="w-10" />
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-80 bg-[#faf8f5] shadow-2xl animate-slide-in">
              <div className="flex items-center justify-between p-6 border-b border-[#e8e0da]">
                <div className="flex items-center gap-3">
                  <LogoMark className="h-11 w-auto" />
                  <span className="font-script text-2xl font-semibold text-[#3d3535]">Unfiltered</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="btn-icon">
                  <X className="h-5 w-5 text-[#8a7a7a]" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
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
            </aside>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden lg:flex">
          {/* Desktop Sidebar */}
          <aside className="fixed left-0 top-0 h-screen w-72 border-r border-[#e8e0da]/60 bg-[#faf8f5] flex flex-col">
            <div className="flex items-center gap-3 p-6 border-b border-[#e8e0da]/60">
              <LogoMark className="h-12 w-auto" />
              <span className="font-script text-3xl font-semibold text-[#3d3535]">Unfiltered</span>
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

            {/* Account */}
            <div className="p-4 border-t border-[#e8e0da]/60">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-[#f0ebe5] group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4a5a5]/30 to-[#e5c5c5]/40">
                      <User className="h-5 w-5 text-[#c49090]" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-[#3d3535]">Your Account</p>
                      <p className="text-xs text-[#8a7a7a]">Settings & more</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#a08080] transition-transform group-hover:translate-x-0.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem className="py-2.5">
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-2.5 text-red-600 focus:text-red-600">
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-72">
            <div className="max-w-6xl mx-auto p-8">
              {/* Search Bar */}
              <div className="mb-10">
                <div className="relative max-w-lg">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a08080]" />
                  <Input
                    placeholder="Search entries, tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-white/70 border-[#e8e0da] rounded-2xl h-12 text-base focus-visible:ring-2 focus-visible:ring-[#d4a5a5]/50 shadow-sm"
                  />
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
                    <Card className="glass-card border-0 flex items-center justify-center min-h-[200px] card-interactive">
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
                    <Card className="glass-card border-0 p-16 text-center">
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

              {activeTab === "gallery" && (
                <div className="space-y-8 animate-fade-in">
                  <h1 className="heading-lg">Photo Gallery</h1>
                  
                  {allPhotos.length === 0 ? (
                    <Card className="glass-card border-0 p-16 text-center">
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
                    <Card className="glass-card border-0 p-16 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/30 text-[#c49090] mx-auto mb-5">
                        <FolderOpen className="h-8 w-8" />
                      </div>
                      <h3 className="heading-md mb-2">No stories yet</h3>
                      <p className="text-muted max-w-sm mx-auto">Group related entries into stories and collections to organize your journal.</p>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {stories.map((story) => (
                        <Card key={story.id} className="glass-card border-0 overflow-hidden group cursor-pointer card-interactive">
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
            <TabsList className="w-full bg-white/70 border border-[#e8e0da] rounded-2xl p-1.5 mb-6 shadow-sm">
              <TabsTrigger value="home" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a5a5] data-[state=active]:to-[#c49090] data-[state=active]:text-white data-[state=active]:shadow-md py-2.5">
                <Home className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="entries" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4a5a5] data-[state=active]:to-[#c49090] data-[state=active]:text-white data-[state=active]:shadow-md py-2.5">
                <BookOpen className="h-4 w-4" />
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
                className="bg-white/70 border-[#e8e0da] rounded-2xl h-12 shadow-sm"
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
          <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-[#faf8f5] border-l border-[#e8e0da]">
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
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#e8e0da]">
                    {viewingEntry.tags.map((tag) => (
                      <Badge key={tag} className="bg-[#f5f0eb] text-[#6a5f5f] border-0 text-sm">
                        <Hash className="h-3 w-3 mr-1 opacity-50" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-8 pt-6 border-t border-[#e8e0da]">
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
