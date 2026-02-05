"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  FolderPlus,
  X,
  ChevronRight,
  Menu,
  LogOut,
  Settings,
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
  mood?: string
}

interface Story {
  id: string
  name: string
  description: string
  entryCount: number
  coverColor: string
}

// Logo Component
function UnfilteredLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unfiltered Logo"
    >
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
      <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

// Sidebar Navigation
function Sidebar({
  activeView,
  setActiveView,
  stories,
  isOpen,
  setIsOpen,
}: {
  activeView: string
  setActiveView: (view: string) => void
  stories: Story[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const navItems = [
    { id: "entries", label: "All Entries", icon: BookOpen },
    { id: "photos", label: "Photo Gallery", icon: ImageIcon },
    { id: "stories", label: "Stories", icon: Layers },
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-3">
              <UnfilteredLogo className="h-8 w-8 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">Unfiltered</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeView === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id)
                      setIsOpen(false)
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {stories.length > 0 && (
              <>
                <Separator className="my-6" />
                <div className="mb-3 flex items-center justify-between px-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Your Stories
                  </span>
                </div>
                <div className="space-y-1">
                  {stories.map((story) => (
                    <button
                      key={story.id}
                      onClick={() => {
                        setActiveView(`story-${story.id}`)
                        setIsOpen(false)
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition-colors ${
                        activeView === `story-${story.id}`
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: story.coverColor }}
                      />
                      <span className="truncate text-sm">{story.name}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        {story.entryCount}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </nav>

          <div className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-gray-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Your Account</p>
                    <p className="text-xs text-gray-500">Manage profile</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
        </div>
      </aside>
    </>
  )
}

// Entry Editor Dialog
function EntryEditor({
  entry,
  stories,
  onSave,
  onClose,
  isOpen,
}: {
  entry?: JournalEntry
  stories: Story[]
  onSave: (entry: Omit<JournalEntry, "id"> & { id?: string }) => void
  onClose: () => void
  isOpen: boolean
}) {
  const [title, setTitle] = useState(entry?.title || "")
  const [content, setContent] = useState(entry?.content || "")
  const [selectedStory, setSelectedStory] = useState(entry?.storyId || "")
  const [photos, setPhotos] = useState<string[]>(entry?.photos || [])

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

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const now = new Date()
    onSave({
      id: entry?.id,
      title: title || "Untitled Entry",
      content,
      date: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      photos,
      storyId: selectedStory || undefined,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {entry ? "Edit Entry" : "New Journal Entry"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div>
            <Input
              placeholder="Entry title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0 border-b rounded-none px-0 text-2xl font-semibold focus-visible:ring-0 focus-visible:border-gray-900"
            />
          </div>

          <div>
            <Textarea
              placeholder="Write your thoughts, experiences, or stories..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none border-gray-200 text-base leading-relaxed"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Add Photos
            </label>
            <div className="flex flex-wrap gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="group relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-gray-900 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400 hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Plus className="h-6 w-6 text-gray-400" />
              </label>
            </div>
          </div>

          {stories.length > 0 && (
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Add to Story (optional)
              </label>
              <select
                value={selectedStory}
                onChange={(e) => setSelectedStory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm"
              >
                <option value="">No story</option>
                {stories.map((story) => (
                  <option key={story.id} value={story.id}>
                    {story.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gray-900 hover:bg-gray-800">
              {entry ? "Save Changes" : "Create Entry"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Story Creator Dialog
function StoryCreator({
  onSave,
  isOpen,
  onClose,
}: {
  onSave: (story: Omit<Story, "id" | "entryCount">) => void
  isOpen: boolean
  onClose: () => void
}) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [coverColor, setCoverColor] = useState("#374151")

  const colors = ["#374151", "#DC2626", "#2563EB", "#059669", "#7C3AED", "#DB2777"]

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, description, coverColor })
      setName("")
      setDescription("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Story</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Story Name
            </label>
            <Input
              placeholder="e.g., Summer Adventures"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              placeholder="What is this story about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cover Color
            </label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCoverColor(color)}
                  className={`h-8 w-8 rounded-full transition-transform ${
                    coverColor === color ? "scale-110 ring-2 ring-gray-900 ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gray-900 hover:bg-gray-800">
              Create Story
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Entry Card Component
function EntryCard({
  entry,
  onEdit,
  onDelete,
  stories,
}: {
  entry: JournalEntry
  onEdit: () => void
  onDelete: () => void
  stories: Story[]
}) {
  const story = stories.find((s) => s.id === entry.storyId)

  return (
    <Card className="group border border-gray-200 transition-all hover:border-gray-300 hover:shadow-md">
      {entry.photos.length > 0 && (
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={entry.photos[0] || "/placeholder.svg"}
            alt={entry.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {entry.photos.length > 1 && (
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
              +{entry.photos.length - 1} more
            </Badge>
          )}
        </div>
      )}

      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{entry.title}</h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {entry.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {entry.time}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-lg p-1 opacity-0 transition-opacity hover:bg-gray-100 group-hover:opacity-100">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {entry.content && (
          <p className="mb-3 text-sm text-gray-600 line-clamp-3">{entry.content}</p>
        )}

        {story && (
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: story.coverColor }}
            />
            <span className="text-xs text-gray-500">{story.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Main Page Component
export default function JournalPlatform() {
  const [activeView, setActiveView] = useState("entries")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [editorOpen, setEditorOpen] = useState(false)
  const [storyCreatorOpen, setStoryCreatorOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | undefined>()

  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [stories, setStories] = useState<Story[]>([])

  const handleSaveEntry = (entryData: Omit<JournalEntry, "id"> & { id?: string }) => {
    if (entryData.id) {
      setEntries((prev) =>
        prev.map((e) => (e.id === entryData.id ? { ...entryData, id: e.id } : e))
      )
    } else {
      const newEntry: JournalEntry = {
        ...entryData,
        id: Date.now().toString(),
      }
      setEntries((prev) => [newEntry, ...prev])

      if (entryData.storyId) {
        setStories((prev) =>
          prev.map((s) =>
            s.id === entryData.storyId ? { ...s, entryCount: s.entryCount + 1 } : s
          )
        )
      }
    }
    setEditingEntry(undefined)
  }

  const handleDeleteEntry = (id: string) => {
    const entry = entries.find((e) => e.id === id)
    setEntries((prev) => prev.filter((e) => e.id !== id))
    if (entry?.storyId) {
      setStories((prev) =>
        prev.map((s) =>
          s.id === entry.storyId ? { ...s, entryCount: Math.max(0, s.entryCount - 1) } : s
        )
      )
    }
  }

  const handleCreateStory = (storyData: Omit<Story, "id" | "entryCount">) => {
    const newStory: Story = {
      ...storyData,
      id: Date.now().toString(),
      entryCount: 0,
    }
    setStories((prev) => [...prev, newStory])
  }

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeView === "entries") return matchesSearch
    if (activeView.startsWith("story-")) {
      const storyId = activeView.replace("story-", "")
      return entry.storyId === storyId && matchesSearch
    }
    return matchesSearch
  })

  const allPhotos = entries.flatMap((entry) =>
    entry.photos.map((photo, index) => ({
      photo,
      entryId: entry.id,
      entryTitle: entry.title,
      index,
    }))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        stories={stories}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activeView === "stories" && (
                <Button
                  variant="outline"
                  onClick={() => setStoryCreatorOpen(true)}
                  className="gap-2"
                >
                  <FolderPlus className="h-4 w-4" />
                  New Story
                </Button>
              )}
              <Button
                onClick={() => {
                  setEditingEntry(undefined)
                  setEditorOpen(true)
                }}
                className="gap-2 bg-gray-900 hover:bg-gray-800"
              >
                <Plus className="h-4 w-4" />
                New Entry
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Entries View */}
          {(activeView === "entries" || activeView.startsWith("story-")) && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeView === "entries"
                    ? "All Entries"
                    : stories.find((s) => s.id === activeView.replace("story-", ""))
                        ?.name || "Story"}
                </h1>
                <p className="mt-1 text-gray-600">
                  {filteredEntries.length} {filteredEntries.length === 1 ? "entry" : "entries"}
                </p>
              </div>

              {filteredEntries.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="mb-4 rounded-full bg-gray-100 p-4">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      No entries yet
                    </h3>
                    <p className="mb-6 text-center text-gray-600">
                      Start documenting your journey by creating your first entry.
                    </p>
                    <Button
                      onClick={() => {
                        setEditingEntry(undefined)
                        setEditorOpen(true)
                      }}
                      className="gap-2 bg-gray-900 hover:bg-gray-800"
                    >
                      <Plus className="h-4 w-4" />
                      Create Entry
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredEntries.map((entry) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      stories={stories}
                      onEdit={() => {
                        setEditingEntry(entry)
                        setEditorOpen(true)
                      }}
                      onDelete={() => handleDeleteEntry(entry.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Photos View */}
          {activeView === "photos" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
                <p className="mt-1 text-gray-600">
                  {allPhotos.length} {allPhotos.length === 1 ? "photo" : "photos"}
                </p>
              </div>

              {allPhotos.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="mb-4 rounded-full bg-gray-100 p-4">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      No photos yet
                    </h3>
                    <p className="mb-6 text-center text-gray-600">
                      Add photos to your journal entries to see them here.
                    </p>
                    <Button
                      onClick={() => {
                        setEditingEntry(undefined)
                        setEditorOpen(true)
                      }}
                      className="gap-2 bg-gray-900 hover:bg-gray-800"
                    >
                      <Plus className="h-4 w-4" />
                      Create Entry with Photos
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {allPhotos.map((item, index) => (
                    <div
                      key={`${item.entryId}-${item.index}`}
                      className="group relative aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={item.photo || "/placeholder.svg"}
                        alt={`Photo from ${item.entryTitle}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="truncate text-sm font-medium text-white">
                            {item.entryTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Stories View */}
          {activeView === "stories" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Stories</h1>
                <p className="mt-1 text-gray-600">
                  Group related entries into meaningful collections
                </p>
              </div>

              {stories.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="mb-4 rounded-full bg-gray-100 p-4">
                      <Layers className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      No stories yet
                    </h3>
                    <p className="mb-6 text-center text-gray-600">
                      Create stories to organize your entries into meaningful collections.
                    </p>
                    <Button
                      onClick={() => setStoryCreatorOpen(true)}
                      className="gap-2 bg-gray-900 hover:bg-gray-800"
                    >
                      <FolderPlus className="h-4 w-4" />
                      Create Story
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {stories.map((story) => (
                    <Card
                      key={story.id}
                      className="group cursor-pointer border border-gray-200 transition-all hover:border-gray-300 hover:shadow-md"
                      onClick={() => setActiveView(`story-${story.id}`)}
                    >
                      <div
                        className="h-24 rounded-t-lg transition-all group-hover:h-28"
                        style={{ backgroundColor: story.coverColor }}
                      />
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-gray-900">{story.name}</h3>
                        {story.description && (
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {story.description}
                          </p>
                        )}
                        <p className="mt-3 text-xs text-gray-500">
                          {story.entryCount} {story.entryCount === 1 ? "entry" : "entries"}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Entry Editor */}
      <EntryEditor
        entry={editingEntry}
        stories={stories}
        onSave={handleSaveEntry}
        onClose={() => {
          setEditorOpen(false)
          setEditingEntry(undefined)
        }}
        isOpen={editorOpen}
      />

      {/* Story Creator */}
      <StoryCreator
        onSave={handleCreateStory}
        isOpen={storyCreatorOpen}
        onClose={() => setStoryCreatorOpen(false)}
      />
    </div>
  )
}
