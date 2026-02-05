"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"

// Skeleton base component
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[#e8e0da]/60 rounded ${className}`} />
  )
}

// Entry Card Skeleton
export function EntryCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" | "featured" }) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 p-4 bg-white/40 rounded-xl border border-[#e8e0da]/40">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
    )
  }

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden bg-white/40 border-[#e8e0da]/40">
        <Skeleton className="h-48 rounded-none" />
        <CardContent className="p-5 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/40 border-[#e8e0da]/40">
      <CardContent className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-18 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

// Grid of Entry Card Skeletons
export function EntryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <EntryCardSkeleton key={i} />
      ))}
    </div>
  )
}

// List of Entry Card Skeletons
export function EntryListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <EntryCardSkeleton key={i} variant="compact" />
      ))}
    </div>
  )
}

// Sidebar Skeleton
export function SidebarSkeleton() {
  return (
    <div className="w-64 p-4 space-y-6">
      {/* Logo */}
      <div className="flex items-center gap-2 p-2">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-5 w-24" />
      </div>
      
      {/* Nav Items */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
      
      {/* Stories Section */}
      <div className="space-y-3 pt-4 border-t border-[#e8e0da]/40">
        <Skeleton className="h-4 w-16" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Profile Header Skeleton
export function ProfileHeaderSkeleton() {
  return (
    <div className="space-y-6">
      {/* Cover */}
      <Skeleton className="h-48 rounded-2xl" />
      
      {/* Profile Info */}
      <div className="flex items-end gap-4 -mt-16 px-6">
        <Skeleton className="h-32 w-32 rounded-2xl border-4 border-[#faf8f5]" />
        <div className="flex-1 flex justify-between items-center pb-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
      
      {/* Bio */}
      <div className="px-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

// Stats Grid Skeleton
export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="bg-white/40 border-[#e8e0da]/40">
          <CardContent className="p-5 space-y-3">
            <div className="flex justify-between items-start">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Editor Skeleton
export function EditorSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-white/40 rounded-lg">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded" />
        ))}
      </div>
      
      {/* Title */}
      <Skeleton className="h-10 w-2/3" />
      
      {/* Tags */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
      
      {/* Content */}
      <div className="space-y-3 pt-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    </div>
  )
}

// Full Page Loading
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      <SidebarSkeleton />
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <StatsGridSkeleton />
        <EntryGridSkeleton />
      </div>
    </div>
  )
}

// Inline Loading Spinner
export function LoadingSpinner({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    default: "w-6 h-6 border-2",
    large: "w-8 h-8 border-3",
  }

  return (
    <div className={`${sizeClasses[size]} border-[#d4a5a5] border-t-transparent rounded-full animate-spin`} />
  )
}

// Loading Button State
export function LoadingButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LoadingSpinner size="small" />
      <span>{children}</span>
    </div>
  )
}

// Saving Indicator
export function SavingIndicator({ saved = false }: { saved?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#8a7a7a]">
      {saved ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Saved</span>
        </>
      ) : (
        <>
          <LoadingSpinner size="small" />
          <span>Saving...</span>
        </>
      )}
    </div>
  )
}
