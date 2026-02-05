"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  MoreVertical,
  Edit3,
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
  Tag,
  Sparkles,
  TrendingUp,
  FileText,
  Lightbulb,
  CheckCircle2,
  PenLine,
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

// Sunrise Logo Component
function SunriseLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unfiltered Logo"
    >
      {/* Sun rays */}
      <line x1="50" y1="10" x2="50" y2="25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="30" x2="30" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="80" y1="30" x2="70" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="55" x2="25" y2="55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="90" y1="55" x2="75" y2="55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Half sun */}
      <path
        d="M 25 70 Q 25 40 50 40 Q 75 40 75 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Horizon line */}
      <line x1="15" y1="70" x2="85" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

// Progress Ring Component
function ProgressRing({ 
  progress, 
  size = 80, 
  strokeWidth = 6,
  color = "#d4a5a5"
}: { 
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="progress-ring">
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
        stroke={color}
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

// Writing Prompt Component
function DailyPrompt({ prompt, onUse }: { prompt: string; onUse: () => void }) {
  return (
    <Card className="glass-card border-0 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a5a5]/20 text-[#c49090]">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[#a08080] mb-2">
              Today&apos;s Prompt
            </p>
            <p className="text-[#4a3f3f] font-medium leading-relaxed">{prompt}</p>
          </div>
        </div>
        <Button 
          onClick={onUse}
          className="mt-4 w-full bg-[#d4a5a5] hover:bg-[#c49090] text-white rounded-lg"
        >
          <PenLine className="h-4 w-4 mr-2" />
          Write About This
        </Button>
      </CardContent>
    </Card>
  )
}

// Stats Card Component
function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  subtext 
}: { 
  icon: React.ElementType
  label: string
  value: string | number
  subtext?: string
}) {
  return (
    <Card className="glass-card border-0">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a5a5]/20 text-[#c49090]">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#3d3535]">{value}</p>
            <p className="text-xs text-[#8a7a7a]">{label}</p>
            {subtext && <p className="text-xs text-[#a08080]">{subtext}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Streak Card Component
function StreakCard({ streak, goal }: { streak: number; goal: WritingGoal }) {
  const progress = Math.min((goal.current / goal.daily) * 100, 100)
  
  return (
    <Card className="glass-card border-0 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-5 w-5 text-[#e07a5f]" />
              <span className="text-3xl font-bold text-[#3d3535]">{streak}</span>
            </div>
            <p className="text-sm text-[#8a7a7a]">Day Streak</p>
            <p className="text-xs text-[#a08080] mt-1">Keep it going!</p>
          </div>
          <div className="relative flex items-center justify-center">
            <ProgressRing progress={progress} size={70} color="#d4a5a5" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-[#3d3535]">{goal.current}</span>
              <span className="text-xs text-[#8a7a7a]">/ {goal.daily}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#e8e0da]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8a7a7a]">Daily Goal</span>
            <span className="font-medium text-[#4a3f3f]">{goal.daily} words</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Entry Card Component
function EntryCard({
  entry,
  onEdit,
  onDelete,
  onToggleFavorite,
  stories,
  style,
}: {
  entry: JournalEntry
  onEdit: () => void
  onDelete: () => void
  onToggleFavorite: () => void
  stories: Story[]
  style?: React.CSSProperties
}) {
  const story = stories.find((s) => s.id === entry.storyId)
  const readingTime = Math.max(1, Math.ceil(entry.wordCount / 200))

  const PrivacyIcon = entry.privacy === "public" ? Globe : entry.privacy === "shared" ? Users : Lock

  return (
    <Card 
      className="glass-card border-0 group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in"
      style={style}
    >
      {entry.photos.length > 0 && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={entry.photos[0] || "/placeholder.svg"}
            alt={entry.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {entry.photos.length > 1 && (
            <Badge className="absolute bottom-2 right-2 bg-black/60 text-white border-0">
              +{entry.photos.length - 1}
            </Badge>
          )}
          <div className="absolute top-2 left-2 flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#8a7a7a]">
                    <PrivacyIcon className="h-3.5 w-3.5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="capitalize">{entry.privacy}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 transition-colors hover:bg-white"
          >
            {entry.isFavorite ? (
              <BookmarkCheck className="h-3.5 w-3.5 text-[#d4a5a5]" />
            ) : (
              <Bookmark className="h-3.5 w-3.5 text-[#8a7a7a]" />
            )}
          </button>
        </div>
      )}

      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-[#3d3535] line-clamp-1 group-hover:text-[#c49090] transition-colors">
              {entry.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-3 text-xs text-[#8a7a7a]">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {entry.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readingTime} min read
              </span>
            </div>
          </div>

          {entry.photos.length === 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                className="rounded-lg p-1.5 transition-colors hover:bg-[#f0ebe5]"
              >
                {entry.isFavorite ? (
                  <BookmarkCheck className="h-4 w-4 text-[#d4a5a5]" />
                ) : (
                  <Bookmark className="h-4 w-4 text-[#8a7a7a]" />
                )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-lg p-1.5 opacity-0 transition-all hover:bg-[#f0ebe5] group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4 text-[#8a7a7a]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Entry
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onDelete} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {entry.content && (
          <p className="mb-3 text-sm text-[#6a5f5f] line-clamp-3 leading-relaxed">
            {entry.content}
          </p>
        )}

        {entry.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {entry.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-[#f5f0eb] text-[#8a7a7a] border-0 text-xs font-normal"
              >
                #{tag}
              </Badge>
            ))}
            {entry.tags.length > 3 && (
              <Badge variant="secondary" className="bg-[#f5f0eb] text-[#8a7a7a] border-0 text-xs">
                +{entry.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          {story && (
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: story.coverColor }}
              />
              <span className="text-xs text-[#8a7a7a]">{story.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-[#a08080]">
            <FileText className="h-3 w-3" />
            {entry.wordCount} words
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Calendar Components
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
    days.push(<div key={`empty-${i}`} className="h-10" />)
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    const hasEntries = entriesByDate.has(dateStr)
    const entryCount = entriesByDate.get(dateStr) || 0
    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

    days.push(
      <div
        key={day}
        className={`relative flex h-10 items-center justify-center rounded-lg text-sm transition-all cursor-pointer hover:bg-[#f0ebe5] ${
          isToday ? "bg-[#d4a5a5] text-white font-semibold" : "text-[#4a3f3f]"
        } ${hasEntries && !isToday ? "font-medium" : ""}`}
      >
        {day}
        {hasEntries && (
          <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ${isToday ? "bg-white" : "bg-[#d4a5a5]"}`} />
        )}
      </div>
    )
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return (
    <Card className="glass-card border-0">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 rounded-lg hover:bg-[#f0ebe5] transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-[#8a7a7a]" />
          </button>
          <h3 className="font-semibold text-[#3d3535]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 rounded-lg hover:bg-[#f0ebe5] transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-[#8a7a7a]" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="h-8 flex items-center justify-center text-xs font-medium text-[#a08080]">
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
              <div className={`h-3 w-3 rounded-sm ${intensity} transition-colors hover:ring-2 hover:ring-[#d4a5a5]/50`} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{date.toLocaleDateString()}: {count} entries</p>
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
    <Card className="glass-card border-0">
      <CardContent className="p-5">
        <h3 className="font-semibold text-[#3d3535] mb-4">Writing Activity</h3>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {weeks}
        </div>
        <div className="flex items-center justify-end gap-2 mt-3 text-xs text-[#8a7a7a]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-sm bg-[#f5f0eb]" />
            <div className="h-3 w-3 rounded-sm bg-[#e5c5c5]" />
            <div className="h-3 w-3 rounded-sm bg-[#d4a5a5]" />
            <div className="h-3 w-3 rounded-sm bg-[#c49090]" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Entry Editor Sheet
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
    { id: "goals", name: "Goals & Progress", icon: Target },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-[#faf8f5]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl text-[#3d3535]">
            {entry ? "Edit Entry" : "New Entry"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Templates */}
          {!entry && (
            <div>
              <label className="mb-3 block text-sm font-medium text-[#6a5f5f]">
                Choose Template
              </label>
              <div className="flex gap-2 flex-wrap">
                {templates.map((t) => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                        template === t.id
                          ? "bg-[#d4a5a5] text-white"
                          : "bg-white text-[#6a5f5f] hover:bg-[#f0ebe5]"
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
          <div>
            <Input
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0 border-b border-[#e8e0da] rounded-none px-0 text-xl font-semibold bg-transparent focus-visible:ring-0 focus-visible:border-[#d4a5a5] text-[#3d3535] placeholder:text-[#b0a0a0]"
            />
          </div>

          {/* Content */}
          <div>
            <Textarea
              placeholder="Start writing your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[250px] resize-none border-[#e8e0da] bg-white/50 text-[#4a3f3f] text-base leading-relaxed rounded-lg focus-visible:ring-[#d4a5a5] placeholder:text-[#b0a0a0]"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-[#8a7a7a]">
              <span>{wordCount} words</span>
              <span>{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="mb-3 block text-sm font-medium text-[#6a5f5f]">
              Photos
            </label>
            <div className="flex flex-wrap gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="group relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <button
                    onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                    className="absolute -right-2 -top-2 rounded-full bg-[#3d3535] p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-[#d4a5a5]/50 transition-all hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/5">
                <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                <Plus className="h-5 w-5 text-[#d4a5a5]" />
              </label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-3 block text-sm font-medium text-[#6a5f5f]">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} className="bg-[#f5f0eb] text-[#6a5f5f] border-0 pr-1">
                  #{tag}
                  <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-1 hover:text-[#c49090]">
                    <X className="h-3 w-3" />
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
                className="flex-1 bg-white/50 border-[#e8e0da] rounded-lg focus-visible:ring-[#d4a5a5]"
              />
              <Button onClick={addTag} variant="outline" className="border-[#d4a5a5] text-[#c49090] hover:bg-[#d4a5a5]/10 rounded-lg bg-transparent">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <label className="mb-3 block text-sm font-medium text-[#6a5f5f]">
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                      privacy === option.value
                        ? "bg-[#d4a5a5] text-white"
                        : "bg-white text-[#6a5f5f] hover:bg-[#f0ebe5]"
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
              <label className="mb-3 block text-sm font-medium text-[#6a5f5f]">
                Add to Story
              </label>
              <select
                value={selectedStory}
                onChange={(e) => setSelectedStory(e.target.value)}
                className="w-full rounded-lg border border-[#e8e0da] bg-white/50 px-4 py-2.5 text-sm text-[#4a3f3f] focus:ring-[#d4a5a5] focus:border-[#d4a5a5]"
              >
                <option value="">No story</option>
                {stories.map((story) => (
                  <option key={story.id} value={story.id}>{story.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e0da]">
            <Button variant="outline" onClick={onClose} className="rounded-lg border-[#e8e0da] text-[#6a5f5f] hover:bg-[#f0ebe5] bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="rounded-lg bg-[#d4a5a5] hover:bg-[#c49090] text-white">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {entry ? "Save Changes" : "Create Entry"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
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

  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [streak, setStreak] = useState(7)
  const [writingGoal] = useState<WritingGoal>({ daily: 500, current: 320 })

  const dailyPrompts = [
    "How did your morning routine set the tone for today?",
    "What small moment made you smile today?",
    "What challenge did you face, and how did you handle it?",
    "Who did you connect with today, and how did it feel?",
    "What are you looking forward to tomorrow?",
  ]
  const [todayPrompt] = useState(dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)])

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

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#faf8f5]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 glass border-b border-[#e8e0da] lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-[#f0ebe5] transition-colors">
              <Menu className="h-5 w-5 text-[#6a5f5f]" />
            </button>
            <div className="flex items-center gap-2">
              <SunriseLogo className="h-7 w-7 text-[#d4a5a5]" />
              <span className="text-lg font-bold text-[#3d3535]">Unfiltered</span>
            </div>
            <div className="w-9" />
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-72 bg-[#faf8f5] shadow-xl animate-slide-in">
              <div className="flex items-center justify-between p-6 border-b border-[#e8e0da]">
                <div className="flex items-center gap-3">
                  <SunriseLogo className="h-8 w-8 text-[#d4a5a5]" />
                  <span className="text-xl font-bold text-[#3d3535]">Unfiltered</span>
                </div>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5 text-[#8a7a7a]" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {[
                  { id: "home", label: "Home", icon: Sparkles },
                  { id: "entries", label: "All Entries", icon: BookOpen },
                  { id: "gallery", label: "Gallery", icon: ImageIcon },
                  { id: "calendar", label: "Calendar", icon: Calendar },
                  { id: "stories", label: "Stories", icon: Layers },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                        activeTab === item.id
                          ? "bg-[#d4a5a5] text-white"
                          : "text-[#6a5f5f] hover:bg-[#f0ebe5]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Desktop Layout */}
        <div className="hidden lg:flex">
          {/* Desktop Sidebar */}
          <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e8e0da] bg-[#faf8f5] flex flex-col">
            <div className="flex items-center gap-3 p-6 border-b border-[#e8e0da]">
              <SunriseLogo className="h-9 w-9 text-[#d4a5a5] animate-float" />
              <span className="text-xl font-bold text-[#3d3535]">Unfiltered</span>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {[
                { id: "home", label: "Home", icon: Sparkles },
                { id: "entries", label: "All Entries", icon: BookOpen },
                { id: "gallery", label: "Gallery", icon: ImageIcon },
                { id: "calendar", label: "Calendar", icon: Calendar },
                { id: "stories", label: "Stories", icon: Layers },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                      activeTab === item.id
                        ? "bg-[#d4a5a5] text-white shadow-md"
                        : "text-[#6a5f5f] hover:bg-[#f0ebe5]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Account */}
            <div className="p-4 border-t border-[#e8e0da]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-[#f0ebe5]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4a5a5]/20">
                      <User className="h-5 w-5 text-[#c49090]" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-[#3d3535]">Your Account</p>
                      <p className="text-xs text-[#8a7a7a]">Settings</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#a08080]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-64">
            <div className="max-w-6xl mx-auto p-6 lg:p-8">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a08080]" />
                  <Input
                    placeholder="Search entries, tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 bg-white/60 border-[#e8e0da] rounded-xl h-11 focus-visible:ring-[#d4a5a5]"
                  />
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "home" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h1 className="text-3xl font-bold text-[#3d3535] mb-2">Welcome back</h1>
                    <p className="text-[#8a7a7a]">Ready to capture today&apos;s moments?</p>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StreakCard streak={streak} goal={writingGoal} />
                    <StatsCard icon={BookOpen} label="Total Entries" value={entries.length} />
                    <StatsCard icon={FileText} label="Words Written" value={totalWords.toLocaleString()} />
                    <StatsCard icon={Heart} label="Favorites" value={favoriteCount} />
                  </div>

                  {/* Prompt and Quick Entry */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DailyPrompt prompt={todayPrompt} onUse={usePrompt} />
                    <Card className="glass-card border-0 flex items-center justify-center min-h-[180px]">
                      <button
                        onClick={() => setEditorOpen(true)}
                        className="flex flex-col items-center gap-3 p-6 rounded-2xl transition-all hover:bg-[#d4a5a5]/10"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a5a5] text-white shadow-lg">
                          <Plus className="h-7 w-7" />
                        </div>
                        <span className="font-semibold text-[#3d3535]">New Entry</span>
                      </button>
                    </Card>
                  </div>

                  {/* Recent Entries */}
                  {entries.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[#3d3535]">Recent Entries</h2>
                        <Button variant="ghost" onClick={() => setActiveTab("entries")} className="text-[#c49090] hover:text-[#b08080] hover:bg-[#d4a5a5]/10">
                          View All
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {entries.slice(0, 3).map((entry, i) => (
                          <EntryCard
                            key={entry.id}
                            entry={entry}
                            stories={stories}
                            onEdit={() => { setEditingEntry(entry); setEditorOpen(true) }}
                            onDelete={() => handleDeleteEntry(entry.id)}
                            onToggleFavorite={() => toggleFavorite(entry.id)}
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "entries" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-[#3d3535]">All Entries</h1>
                    <Button onClick={() => setEditorOpen(true)} className="rounded-lg bg-[#d4a5a5] hover:bg-[#c49090] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      New Entry
                    </Button>
                  </div>

                  {filteredEntries.length === 0 ? (
                    <Card className="glass-card border-0 p-12 text-center">
                      <BookOpen className="h-12 w-12 mx-auto text-[#d4a5a5] mb-4" />
                      <h3 className="text-lg font-semibold text-[#3d3535] mb-2">No entries yet</h3>
                      <p className="text-[#8a7a7a] mb-6">Start capturing your thoughts and moments.</p>
                      <Button onClick={() => setEditorOpen(true)} className="rounded-lg bg-[#d4a5a5] hover:bg-[#c49090] text-white">
                        Create Your First Entry
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredEntries.map((entry, i) => (
                        <EntryCard
                          key={entry.id}
                          entry={entry}
                          stories={stories}
                          onEdit={() => { setEditingEntry(entry); setEditorOpen(true) }}
                          onDelete={() => handleDeleteEntry(entry.id)}
                          onToggleFavorite={() => toggleFavorite(entry.id)}
                          style={{ animationDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="space-y-6 animate-fade-in">
                  <h1 className="text-2xl font-bold text-[#3d3535]">Photo Gallery</h1>
                  
                  {allPhotos.length === 0 ? (
                    <Card className="glass-card border-0 p-12 text-center">
                      <ImageIcon className="h-12 w-12 mx-auto text-[#d4a5a5] mb-4" />
                      <h3 className="text-lg font-semibold text-[#3d3535] mb-2">No photos yet</h3>
                      <p className="text-[#8a7a7a]">Photos you add to entries will appear here.</p>
                    </Card>
                  ) : (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                      {allPhotos.map((item, i) => (
                        <div
                          key={`${item.entryId}-${item.index}`}
                          className="break-inside-avoid group relative overflow-hidden rounded-xl animate-scale-in"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <img
                            src={item.photo || "/placeholder.svg"}
                            alt={item.entryTitle}
                            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <p className="text-white font-medium text-sm truncate">{item.entryTitle}</p>
                              <p className="text-white/70 text-xs">{item.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "calendar" && (
                <div className="space-y-6 animate-fade-in">
                  <h1 className="text-2xl font-bold text-[#3d3535]">Calendar</h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MonthlyCalendar entries={entries} />
                    <YearlyHeatmap entries={entries} />
                  </div>
                </div>
              )}

              {activeTab === "stories" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-[#3d3535]">Stories</h1>
                    <Button className="rounded-lg bg-[#d4a5a5] hover:bg-[#c49090] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      New Story
                    </Button>
                  </div>

                  {stories.length === 0 ? (
                    <Card className="glass-card border-0 p-12 text-center">
                      <Layers className="h-12 w-12 mx-auto text-[#d4a5a5] mb-4" />
                      <h3 className="text-lg font-semibold text-[#3d3535] mb-2">No stories yet</h3>
                      <p className="text-[#8a7a7a]">Group related entries into stories and collections.</p>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stories.map((story) => (
                        <Card key={story.id} className="glass-card border-0 overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                          <div className="h-24" style={{ backgroundColor: story.coverColor }} />
                          <CardContent className="p-5">
                            <h3 className="font-semibold text-[#3d3535] group-hover:text-[#c49090] transition-colors">{story.name}</h3>
                            <p className="text-sm text-[#8a7a7a] mt-1 line-clamp-2">{story.description}</p>
                            <p className="text-xs text-[#a08080] mt-3">{story.entryCount} entries</p>
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
        <div className="lg:hidden p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-white/60 border border-[#e8e0da] rounded-xl p-1 mb-6">
              <TabsTrigger value="home" className="flex-1 rounded-lg data-[state=active]:bg-[#d4a5a5] data-[state=active]:text-white">
                <Sparkles className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="entries" className="flex-1 rounded-lg data-[state=active]:bg-[#d4a5a5] data-[state=active]:text-white">
                <BookOpen className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex-1 rounded-lg data-[state=active]:bg-[#d4a5a5] data-[state=active]:text-white">
                <ImageIcon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex-1 rounded-lg data-[state=active]:bg-[#d4a5a5] data-[state=active]:text-white">
                <Calendar className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-[#3d3535] mb-1">Welcome back</h1>
                <p className="text-sm text-[#8a7a7a]">Ready to capture today&apos;s moments?</p>
              </div>
              <StreakCard streak={streak} goal={writingGoal} />
              <DailyPrompt prompt={todayPrompt} onUse={usePrompt} />
              <div className="grid grid-cols-2 gap-3">
                <StatsCard icon={BookOpen} label="Entries" value={entries.length} />
                <StatsCard icon={FileText} label="Words" value={totalWords.toLocaleString()} />
              </div>
            </TabsContent>

            <TabsContent value="entries" className="space-y-4 animate-fade-in">
              <Input
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/60 border-[#e8e0da] rounded-xl"
              />
              {filteredEntries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  stories={stories}
                  onEdit={() => { setEditingEntry(entry); setEditorOpen(true) }}
                  onDelete={() => handleDeleteEntry(entry.id)}
                  onToggleFavorite={() => toggleFavorite(entry.id)}
                />
              ))}
            </TabsContent>

            <TabsContent value="gallery" className="animate-fade-in">
              <div className="columns-2 gap-3 space-y-3">
                {allPhotos.map((item, i) => (
                  <div key={`${item.entryId}-${item.index}`} className="break-inside-avoid rounded-xl overflow-hidden">
                    <img src={item.photo || "/placeholder.svg"} alt={item.entryTitle} className="w-full object-cover" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4 animate-fade-in">
              <MonthlyCalendar entries={entries} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setEditorOpen(true)}
              className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a5a5] text-white shadow-lg transition-all hover:bg-[#c49090] hover:scale-110 hover:shadow-xl active:scale-95 z-50"
            >
              <Plus className="h-6 w-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>New Entry</p>
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
      </div>
    </TooltipProvider>
  )
}
