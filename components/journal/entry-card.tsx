"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
  Lock,
  Globe,
  Users,
  Bookmark,
  BookmarkCheck,
  Hash,
  ImageIcon,
  Heart,
} from "lucide-react"

interface EntryCardProps {
  id: string
  title: string
  content: string
  date: string
  time: string
  photos?: string[]
  tags?: string[]
  privacy?: "public" | "private" | "shared"
  isFavorite?: boolean
  wordCount?: number
  onEdit?: () => void
  onDelete?: () => void
  onToggleFavorite?: () => void
  onClick?: () => void
  variant?: "default" | "compact" | "featured"
}

export function EntryCard({
  id,
  title,
  content,
  date,
  time,
  photos = [],
  tags = [],
  privacy = "private",
  isFavorite = false,
  wordCount = 0,
  onEdit,
  onDelete,
  onToggleFavorite,
  onClick,
  variant = "default",
}: EntryCardProps) {
  const privacyConfig = {
    private: { icon: Lock, label: "Private", color: "text-[#8a7a7a]" },
    public: { icon: Globe, label: "Public", color: "text-emerald-600" },
    shared: { icon: Users, label: "Shared", color: "text-blue-600" },
  }

  const PrivacyIcon = privacyConfig[privacy].icon

  if (variant === "compact") {
    return (
      <div
        onClick={onClick}
        className="group flex items-center gap-4 p-4 bg-white/95 hover:bg-white rounded-xl border border-[#ddd4cc] hover:border-[#d4a5a5]/40 hover:shadow-md shadow-sm transition-all cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-[#3d3535] truncate">{title}</h3>
            {isFavorite && <Heart className="w-4 h-4 text-[#d4a5a5] fill-[#d4a5a5] flex-shrink-0" />}
          </div>
          <p className="text-sm text-[#6a5f5f] line-clamp-1">{content}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#8a7a7a] flex-shrink-0">
          {photos.length > 0 && (
            <span className="flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              {photos.length}
            </span>
          )}
          <span>{date}</span>
        </div>
      </div>
    )
  }

  if (variant === "featured") {
    return (
      <Card
        onClick={onClick}
        className="group overflow-hidden bg-white/95 border-[#ddd4cc] hover:border-[#d4a5a5]/40 shadow-sm hover:shadow-xl hover:shadow-[#d4a5a5]/10 transition-all cursor-pointer"
      >
        {photos.length > 0 && (
          <div className="relative h-48 bg-[#f0ebe5] overflow-hidden">
            <img
              src={photos[0] || "/placeholder.svg"}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <Badge className="bg-white/90 text-[#3d3535] hover:bg-white">
                <ImageIcon className="w-3 h-3 mr-1" />
                {photos.length} photo{photos.length > 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-[#3d3535] truncate group-hover:text-[#d4a5a5] transition-colors">
                  {title}
                </h3>
                {isFavorite && <Heart className="w-4 h-4 text-[#d4a5a5] fill-[#d4a5a5] flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#8a7a7a]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {time}
                </span>
                <span>{wordCount} words</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8a7a7a] hover:bg-[#f0ebe5] hover:text-[#6a5f5f] transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleFavorite}>
                  {isFavorite ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 mr-2" />
                      Remove from favorites
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 mr-2" />
                      Add to favorites
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="text-[#4a3f3f] line-clamp-3 mb-4 leading-relaxed">{content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#f0ebe5] text-[#6a5f5f] hover:bg-[#e8e0da]"
                >
                  <Hash className="w-3 h-3 mr-0.5" />
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="bg-[#f0ebe5] text-[#6a5f5f]">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
            <div className={`flex items-center gap-1 ${privacyConfig[privacy].color}`}>
              <PrivacyIcon className="w-3 h-3" />
              <span className="text-xs">{privacyConfig[privacy].label}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card
      onClick={onClick}
      className="group bg-white/95 hover:bg-white border-[#ddd4cc] hover:border-[#d4a5a5]/40 shadow-sm hover:shadow-lg hover:shadow-[#d4a5a5]/10 transition-all cursor-pointer"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-[#3d3535] truncate group-hover:text-[#d4a5a5] transition-colors">
                {title}
              </h3>
              {isFavorite && <Heart className="w-4 h-4 text-[#d4a5a5] fill-[#d4a5a5] flex-shrink-0" />}
              <PrivacyIcon className={`w-3 h-3 flex-shrink-0 ${privacyConfig[privacy].color}`} />
            </div>
            <div className="flex items-center gap-3 text-xs text-[#8a7a7a]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {time}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8a7a7a] hover:bg-[#f0ebe5] hover:text-[#6a5f5f] opacity-0 group-hover:opacity-100 transition-all"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleFavorite}>
                {isFavorite ? <BookmarkCheck className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
                {isFavorite ? "Remove favorite" : "Add favorite"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-[#4a3f3f] text-sm line-clamp-2 mb-3">{content}</p>
        
        {photos.length > 0 && (
          <div className="flex gap-2 mb-3">
            {photos.slice(0, 3).map((photo, i) => (
              <div key={i} className="w-16 h-16 rounded-lg bg-[#f0ebe5] overflow-hidden">
                <img src={photo || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {photos.length > 3 && (
              <div className="w-16 h-16 rounded-lg bg-[#f0ebe5] flex items-center justify-center">
                <span className="text-sm font-medium text-[#6a5f5f]">+{photos.length - 3}</span>
              </div>
            )}
          </div>
        )}
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-[#f0ebe5]/70 text-[#8a7a7a] text-xs px-2 py-0.5"
              >
                <Hash className="w-2.5 h-2.5 mr-0.5" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
