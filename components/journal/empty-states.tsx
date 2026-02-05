"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  ImageIcon,
  Search,
  Layers,
  FileText,
  Heart,
  Hash,
  Calendar,
  Plus,
  Sparkles,
  PenLine,
} from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ElementType
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

function EmptyStateBase({
  title,
  description,
  icon: Icon = FileText,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      <div className="w-20 h-20 rounded-2xl bg-[#d4a5a5]/10 flex items-center justify-center mb-6 animate-pulse-ring">
        <Icon className="w-10 h-10 text-[#d4a5a5]" />
      </div>
      <h3 className="text-xl font-semibold text-[#3d3535] mb-2">{title}</h3>
      <p className="text-[#6a5f5f] max-w-sm mb-6 leading-relaxed">{description}</p>
      {action && (
        <Button 
          onClick={action.onClick}
          className="bg-[#d4a5a5] hover:bg-[#c49090] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {action.label}
        </Button>
      )}
    </div>
  )
}

// Specific Empty States
export function EmptyEntries({ onCreateEntry }: { onCreateEntry?: () => void }) {
  return (
    <EmptyStateBase
      icon={PenLine}
      title="Start your journaling journey"
      description="Your journal is empty. Write your first entry and begin capturing your thoughts, memories, and reflections."
      action={onCreateEntry ? { label: "Write First Entry", onClick: onCreateEntry } : undefined}
    />
  )
}

export function EmptyPhotos({ onAddPhoto }: { onAddPhoto?: () => void }) {
  return (
    <EmptyStateBase
      icon={ImageIcon}
      title="No photos yet"
      description="Photos you add to your entries will appear here. Capture moments that matter and bring your journal to life."
      action={onAddPhoto ? { label: "Add Photos", onClick: onAddPhoto } : undefined}
    />
  )
}

export function EmptyStories({ onCreateStory }: { onCreateStory?: () => void }) {
  return (
    <EmptyStateBase
      icon={Layers}
      title="Create your first story"
      description="Stories help you organize entries around themes, projects, or life chapters. Group related entries together."
      action={onCreateStory ? { label: "Create Story", onClick: onCreateStory } : undefined}
    />
  )
}

export function EmptyFavorites() {
  return (
    <EmptyStateBase
      icon={Heart}
      title="No favorites yet"
      description="Mark entries as favorites to quickly find your most meaningful moments. They'll appear here for easy access."
    />
  )
}

export function EmptySearchResults({ query }: { query: string }) {
  return (
    <EmptyStateBase
      icon={Search}
      title="No results found"
      description={`We couldn't find any entries matching "${query}". Try different keywords or check your spelling.`}
    />
  )
}

export function EmptyTags() {
  return (
    <EmptyStateBase
      icon={Hash}
      title="No tags yet"
      description="Add tags to your entries to organize and find them easily. Tags help you discover patterns in your writing."
    />
  )
}

export function EmptyCalendarDay({ date }: { date: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-14 h-14 rounded-xl bg-[#f0ebe5] flex items-center justify-center mb-4">
        <Calendar className="w-7 h-7 text-[#8a7a7a]" />
      </div>
      <h4 className="font-medium text-[#3d3535] mb-1">No entries on {date}</h4>
      <p className="text-sm text-[#8a7a7a]">This day is waiting for your thoughts</p>
    </div>
  )
}

// Welcome State for New Users
export function WelcomeState({ 
  userName, 
  onStartWriting 
}: { 
  userName?: string
  onStartWriting?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4a5a5]/20 to-[#e5c5c5]/20 flex items-center justify-center mb-8 animate-float">
        <Sparkles className="w-12 h-12 text-[#d4a5a5]" />
      </div>
      <h2 className="text-2xl font-bold text-[#3d3535] mb-3">
        Welcome{userName ? `, ${userName}` : ""}!
      </h2>
      <p className="text-[#6a5f5f] max-w-md mb-8 leading-relaxed">
        This is your personal space for authentic expression. Capture thoughts, 
        memories, and moments that matter to you. Your journey begins with a single entry.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onStartWriting}
          className="bg-[#d4a5a5] hover:bg-[#c49090] text-white px-6"
        >
          <PenLine className="w-4 h-4 mr-2" />
          Write Your First Entry
        </Button>
        <Button 
          variant="outline"
          className="border-[#e8e0da] text-[#6a5f5f] hover:bg-[#f0ebe5] bg-transparent"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Explore Prompts
        </Button>
      </div>
    </div>
  )
}

// Writing Prompt State
export function WritingPromptState({
  prompt,
  onUsePrompt,
  onNewPrompt,
}: {
  prompt: string
  onUsePrompt?: () => void
  onNewPrompt?: () => void
}) {
  return (
    <div className="bg-gradient-to-br from-[#d4a5a5]/10 to-[#e5c5c5]/10 rounded-2xl p-8 text-center">
      <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-6 h-6 text-[#d4a5a5]" />
      </div>
      <h3 className="text-sm font-medium text-[#8a7a7a] uppercase tracking-wider mb-3">
        Today's Prompt
      </h3>
      <p className="text-xl font-medium text-[#3d3535] mb-6 max-w-md mx-auto leading-relaxed">
        "{prompt}"
      </p>
      <div className="flex justify-center gap-3">
        <Button 
          onClick={onUsePrompt}
          className="bg-[#d4a5a5] hover:bg-[#c49090] text-white"
        >
          <PenLine className="w-4 h-4 mr-2" />
          Start Writing
        </Button>
        <Button 
          onClick={onNewPrompt}
          variant="outline"
          className="border-[#e8e0da] text-[#6a5f5f] hover:bg-white bg-transparent"
        >
          New Prompt
        </Button>
      </div>
    </div>
  )
}
