"use client"

import React, { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Badge } from "@/components/ui/badge"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  ChevronDown,
  Save,
  X,
  Check,
  Clock,
  Hash,
  Lock,
  Globe,
  Users,
  Sparkles,
  MoreHorizontal,
  ArrowLeft,
  Calendar,
  FileText,
  Type,
  Minus,
  CheckSquare,
} from "lucide-react"
import Link from "next/link"
import { LogoMark } from "@/components/logo-mark"
import { ThemeToggle } from "@/components/theme-toggle"

// Toolbar Button Component
function ToolbarButton({
  icon: Icon,
  label,
  active = false,
  onClick,
  disabled = false,
}: {
  icon: React.ElementType
  label: string
  active?: boolean
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            disabled={disabled}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              active
                ? "bg-[#d4a5a5] text-white"
                : "text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#f0ebe5] dark:hover:bg-[#2a211d] hover:text-[#3d3535] dark:text-[#e8ddd5]"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Icon className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Toolbar Divider
function ToolbarDivider() {
  return <div className="w-px h-6 bg-[#e8e0da] mx-1" />
}

export default function EditorPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [privacy, setPrivacy] = useState<"private" | "shared" | "public">("private")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showTagInput, setShowTagInput] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const editorRef = useRef<HTMLDivElement>(null)

  // Format state
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  })

  // Update word and character count
  const updateCounts = useCallback((text: string) => {
    setCharCount(text.length)
    const words = text.trim().split(/\s+/).filter(Boolean).length
    setWordCount(words)
  }, [])

  // Handle content change
  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText || ""
    setContent(e.currentTarget.innerHTML)
    updateCounts(text)
  }

  // Execute formatting command
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateActiveFormats()
  }

  // Update active format states
  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikethrough"),
    })
  }

  // Handle tag addition
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
    setShowTagInput(false)
  }

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  // Save entry
  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastSaved(new Date())
    setIsSaving(false)
  }

  // Privacy icons
  const privacyIcons = {
    private: Lock,
    shared: Users,
    public: Globe,
  }
  const PrivacyIcon = privacyIcons[privacy]

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1412] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5] dark:bg-[#1a1412]/95 backdrop-blur-md border-b border-[#e8e0da] dark:border-[#3a2f28]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Back & Logo */}
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#f0ebe5] dark:hover:bg-[#2a211d] hover:text-[#3d3535] dark:text-[#e8ddd5] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <LogoMark className="h-7 w-auto" />
                <span className="font-script text-xl font-semibold text-[#3d3535] dark:text-[#e8ddd5]">Unfiltered</span>
              </div>
            </div>

            {/* Center: Save Status */}
            <div className="flex items-center gap-2 text-sm text-[#8a7a7a] dark:text-[#9a8a82]">
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : lastSaved ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  <span>Draft</span>
                </>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Privacy Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#f0ebe5] dark:hover:bg-[#2a211d]">
                    <PrivacyIcon className="w-4 h-4 mr-1.5" />
                    <span className="hidden sm:inline capitalize">{privacy}</span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setPrivacy("private")}>
                    <Lock className="w-4 h-4 mr-2" />
                    Private
                    {privacy === "private" && <Check className="w-4 h-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPrivacy("shared")}>
                    <Users className="w-4 h-4 mr-2" />
                    Shared
                    {privacy === "shared" && <Check className="w-4 h-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPrivacy("public")}>
                    <Globe className="w-4 h-4 mr-2" />
                    Public
                    {privacy === "public" && <Check className="w-4 h-4 ml-auto" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            <ThemeToggle />
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#d4a5a5] hover:bg-[#c49090] text-white"
            >
                <Save className="w-4 h-4 mr-1.5" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="sticky top-[57px] z-40 bg-[#faf8f5] dark:bg-[#1a1412]/95 backdrop-blur-md border-b border-[#e8e0da] dark:border-[#3a2f28]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {/* Text Formatting */}
            <ToolbarButton icon={Bold} label="Bold (Ctrl+B)" active={activeFormats.bold} onClick={() => execCommand("bold")} />
            <ToolbarButton icon={Italic} label="Italic (Ctrl+I)" active={activeFormats.italic} onClick={() => execCommand("italic")} />
            <ToolbarButton icon={Underline} label="Underline (Ctrl+U)" active={activeFormats.underline} onClick={() => execCommand("underline")} />
            <ToolbarButton icon={Strikethrough} label="Strikethrough" active={activeFormats.strikethrough} onClick={() => execCommand("strikethrough")} />

            <ToolbarDivider />

            {/* Headings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 px-2 rounded-lg flex items-center gap-1 text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#f0ebe5] dark:hover:bg-[#2a211d] hover:text-[#3d3535] dark:text-[#e8ddd5] transition-colors">
                  <Type className="w-4 h-4" />
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => execCommand("formatBlock", "p")}>
                  <Type className="w-4 h-4 mr-2" />
                  Paragraph
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execCommand("formatBlock", "h1")}>
                  <Heading1 className="w-4 h-4 mr-2" />
                  Heading 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execCommand("formatBlock", "h2")}>
                  <Heading2 className="w-4 h-4 mr-2" />
                  Heading 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execCommand("formatBlock", "h3")}>
                  <Heading3 className="w-4 h-4 mr-2" />
                  Heading 3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ToolbarDivider />

            {/* Lists */}
            <ToolbarButton icon={List} label="Bullet List" onClick={() => execCommand("insertUnorderedList")} />
            <ToolbarButton icon={ListOrdered} label="Numbered List" onClick={() => execCommand("insertOrderedList")} />
            <ToolbarButton icon={CheckSquare} label="Checklist" onClick={() => execCommand("insertUnorderedList")} />

            <ToolbarDivider />

            {/* Block Elements */}
            <ToolbarButton icon={Quote} label="Quote" onClick={() => execCommand("formatBlock", "blockquote")} />
            <ToolbarButton icon={Code} label="Code" onClick={() => execCommand("formatBlock", "pre")} />
            <ToolbarButton icon={Minus} label="Divider" onClick={() => execCommand("insertHorizontalRule")} />

            <ToolbarDivider />

            {/* Alignment */}
            <ToolbarButton icon={AlignLeft} label="Align Left" onClick={() => execCommand("justifyLeft")} />
            <ToolbarButton icon={AlignCenter} label="Align Center" onClick={() => execCommand("justifyCenter")} />
            <ToolbarButton icon={AlignRight} label="Align Right" onClick={() => execCommand("justifyRight")} />

            <ToolbarDivider />

            {/* Insert */}
            <ToolbarButton icon={LinkIcon} label="Insert Link" onClick={() => {
              const url = prompt("Enter URL:")
              if (url) execCommand("createLink", url)
            }} />
            <ToolbarButton icon={ImageIcon} label="Insert Image" onClick={() => {
              const url = prompt("Enter image URL:")
              if (url) execCommand("insertImage", url)
            }} />

            <div className="flex-1" />

            {/* Undo/Redo */}
            <ToolbarButton icon={Undo} label="Undo (Ctrl+Z)" onClick={() => execCommand("undo")} />
            <ToolbarButton icon={Redo} label="Redo (Ctrl+Y)" onClick={() => execCommand("redo")} />
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-[#8a7a7a] dark:text-[#9a8a82] mb-4">
          <Calendar className="w-4 h-4" />
          <span>{currentDate}</span>
        </div>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your entry a title..."
          className="w-full text-3xl sm:text-4xl font-bold text-[#3d3535] dark:text-[#e8ddd5] placeholder:text-[#c4b8b8] bg-transparent border-none outline-none mb-6"
        />

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-[#f0ebe5] text-[#6a5f5f] dark:text-[#b0a098] hover:bg-[#e8e0da] pl-2 pr-1"
            >
              <Hash className="w-3 h-3 mr-1" />
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 p-0.5 rounded hover:bg-[#d4a5a5]/20"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {showTagInput ? (
            <div className="flex items-center gap-1">
              <Input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTag()
                  if (e.key === "Escape") setShowTagInput(false)
                }}
                placeholder="Add tag..."
                className="h-7 w-24 text-sm bg-white dark:bg-[#231c19] border-[#e8e0da] dark:border-[#3a2f28]"
                autoFocus
              />
              <button
                onClick={addTag}
                className="w-6 h-6 rounded flex items-center justify-center text-[#d4a5a5] hover:bg-[#d4a5a5]/10"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowTagInput(true)}
              className="flex items-center gap-1 text-sm text-[#8a7a7a] dark:text-[#9a8a82] hover:text-[#6a5f5f] dark:text-[#b0a098] transition-colors"
            >
              <Hash className="w-3 h-3" />
              Add tag
            </button>
          )}
        </div>

        {/* Editor Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          className="min-h-[400px] prose prose-lg max-w-none text-[#4a3f3f] outline-none
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[#3d3535] dark:text-[#e8ddd5] [&_h1]:mb-4 [&_h1]:mt-6
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#3d3535] dark:text-[#e8ddd5] [&_h2]:mb-3 [&_h2]:mt-5
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#3d3535] dark:text-[#e8ddd5] [&_h3]:mb-2 [&_h3]:mt-4
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#d4a5a5] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#6a5f5f] dark:text-[#b0a098]
            [&_pre]:bg-[#f0ebe5] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
            [&_code]:bg-[#f0ebe5] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_li]:mb-1
            [&_a]:text-[#d4a5a5] [&_a]:underline
            [&_hr]:border-[#e8e0da] dark:border-[#3a2f28] [&_hr]:my-6
            [&_img]:rounded-lg [&_img]:my-4
          "
          data-placeholder="Start writing your thoughts..."
          suppressContentEditableWarning
        />

        {/* Empty State Placeholder */}
        {!content && (
          <div className="pointer-events-none absolute mt-[-400px] text-[#c4b8b8]">
            Start writing your thoughts...
          </div>
        )}
      </main>

      {/* Footer Stats */}
      <footer className="sticky bottom-0 bg-[#faf8f5] dark:bg-[#1a1412]/95 backdrop-blur-md border-t border-[#e8e0da] dark:border-[#3a2f28]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between text-sm text-[#8a7a7a] dark:text-[#9a8a82]">
            <div className="flex items-center gap-4">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
              <span>~{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4a5a5]" />
              <span>AI suggestions available</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
