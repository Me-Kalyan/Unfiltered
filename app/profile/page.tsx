"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Edit2,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Instagram,
  BookOpen,
  ImageIcon,
  Flame,
  Target,
  Award,
  Clock,
  ArrowLeft,
  Save,
  X,
  Check,
  Star,
  TrendingUp,
  FileText,
  Heart,
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
function ProgressRing({ progress, size = 80, strokeWidth = 6 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="progress-ring">
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

// Achievement Badge Component
function AchievementBadge({ 
  icon: Icon, 
  title, 
  unlocked = false 
}: { 
  icon: React.ElementType
  title: string
  unlocked?: boolean 
}) {
  return (
    <div className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
      unlocked ? "bg-[#d4a5a5]/10" : "bg-[#f0ebe5] opacity-50"
    }`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        unlocked ? "bg-[#d4a5a5]" : "bg-[#e8e0da]"
      }`}>
        <Icon className={`w-6 h-6 ${unlocked ? "text-white" : "text-[#8a7a7a]"}`} />
      </div>
      <span className="text-xs text-center text-[#6a5f5f] font-medium">{title}</span>
    </div>
  )
}

// Stat Card Component
function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  trend 
}: { 
  label: string
  value: string | number
  icon: React.ElementType
  trend?: string 
}) {
  return (
    <Card className="bg-white/80 border-[#e8e0da]/60">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Icon className="w-5 h-5 text-[#d4a5a5]" />
          {trend && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold text-[#3d3535]">{value}</div>
        <div className="text-sm text-[#8a7a7a]">{label}</div>
      </CardContent>
    </Card>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alexandra Chen",
    username: "alexwrites",
    bio: "Finding beauty in everyday moments. Writer, dreamer, and perpetual optimist. Documenting life one entry at a time.",
    location: "San Francisco, CA",
    website: "alexchen.me",
    twitter: "alexwrites",
    instagram: "alex.creates",
    joinedDate: "January 2024",
  })

  const stats = {
    entries: 147,
    words: 52847,
    photos: 89,
    streak: 23,
    longestStreak: 45,
  }

  const recentEntries = [
    { id: 1, title: "Morning Reflections", date: "Today", preview: "The sunrise this morning reminded me..." },
    { id: 2, title: "A Walk in the Park", date: "Yesterday", preview: "Sometimes the best therapy is..." },
    { id: 3, title: "Grateful", date: "2 days ago", preview: "Three things I'm grateful for today..." },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/80 backdrop-blur-md border-b border-[#e8e0da]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
<button onClick={() => router.back()} className="flex items-center gap-2 text-[#6a5f5f] hover:text-[#3d3535]">
  <ArrowLeft className="w-5 h-5" />
  <span className="hidden sm:inline">Back to Journal</span>
  </button>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-auto" />
              <span className="font-script text-2xl font-semibold text-[#3d3535]">Unfiltered</span>
            </div>
            <div className="w-[100px]" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover Area */}
          <div className="h-32 sm:h-48 bg-gradient-to-br from-[#d4a5a5]/30 via-[#e5c5c5]/20 to-[#f0ebe5] rounded-2xl" />
          
          {/* Profile Info */}
          <div className="relative px-4 sm:px-6 -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#d4a5a5] border-4 border-[#faf8f5] flex items-center justify-center overflow-hidden">
                  <span className="text-4xl font-bold text-white">AC</span>
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#f0ebe5] transition-colors">
                  <Camera className="w-4 h-4 text-[#6a5f5f]" />
                </button>
              </div>

              {/* Name & Actions */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#3d3535]">{profile.name}</h1>
                  <p className="text-[#8a7a7a]">@{profile.username}</p>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className={isEditing 
                    ? "bg-[#d4a5a5] hover:bg-[#c49090] text-white" 
                    : "border-[#e8e0da] text-[#6a5f5f] hover:bg-[#f0ebe5]"
                  }
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="mt-6 space-y-4">
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="bg-white border-[#e8e0da] focus:border-[#d4a5a5] resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-[#4a3f3f] leading-relaxed">{profile.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-[#6a5f5f]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {isEditing ? (
                    <Input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="h-8 w-40 bg-white border-[#e8e0da]"
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <LinkIcon className="w-4 h-4" />
                  {isEditing ? (
                    <Input
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="h-8 w-40 bg-white border-[#e8e0da]"
                    />
                  ) : (
                    <a href={`https://${profile.website}`} className="text-[#d4a5a5] hover:underline">
                      {profile.website}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profile.joinedDate}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-lg bg-[#f0ebe5] flex items-center justify-center text-[#6a5f5f] hover:bg-[#e8e0da] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-lg bg-[#f0ebe5] flex items-center justify-center text-[#6a5f5f] hover:bg-[#e8e0da] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FileText} label="Entries" value={stats.entries} trend="+12" />
          <StatCard icon={BookOpen} label="Words Written" value={stats.words.toLocaleString()} trend="+2.4k" />
          <StatCard icon={ImageIcon} label="Photos" value={stats.photos} />
          <StatCard icon={Flame} label="Current Streak" value={`${stats.streak} days`} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#f0ebe5] p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white">Achievements</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-white">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Writing Goals */}
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#d4a5a5]" />
                  Weekly Writing Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <ProgressRing progress={68} size={100} strokeWidth={8} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-[#3d3535]">68%</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-[#3d3535]">3,420 / 5,000</div>
                    <div className="text-sm text-[#8a7a7a]">words this week</div>
                    <div className="mt-2 text-sm text-[#6a5f5f]">
                      Keep it up! You're on track to hit your goal by Sunday.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Entries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 rounded-xl bg-[#faf8f5] hover:bg-[#f0ebe5] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-[#3d3535]">{entry.title}</h4>
                      <span className="text-xs text-[#8a7a7a]">{entry.date}</span>
                    </div>
                    <p className="text-sm text-[#6a5f5f] line-clamp-1">{entry.preview}</p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-[#d4a5a5] hover:bg-[#d4a5a5]/10">
                  View All Entries
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#d4a5a5]" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  <AchievementBadge icon={FileText} title="First Entry" unlocked />
                  <AchievementBadge icon={Flame} title="7 Day Streak" unlocked />
                  <AchievementBadge icon={Flame} title="30 Day Streak" unlocked />
                  <AchievementBadge icon={BookOpen} title="10k Words" unlocked />
                  <AchievementBadge icon={BookOpen} title="50k Words" unlocked />
                  <AchievementBadge icon={ImageIcon} title="Photo Pro" unlocked />
                  <AchievementBadge icon={Star} title="100 Entries" />
                  <AchievementBadge icon={Heart} title="Year of Writing" />
                  <AchievementBadge icon={Award} title="Perfectionist" />
                  <AchievementBadge icon={Target} title="Goal Crusher" />
                </div>
                <div className="mt-6 p-4 bg-[#faf8f5] rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-[#d4a5a5]" />
                    <span className="font-medium text-[#3d3535]">Next Achievement</span>
                  </div>
                  <p className="text-sm text-[#6a5f5f]">
                    Write <strong>3 more entries</strong> to unlock "100 Entries" badge!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#d4a5a5]" />
                  Writing Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Activity Heatmap Placeholder */}
                <div className="mb-6">
                  <div className="text-sm text-[#8a7a7a] mb-3">Last 12 weeks</div>
                  <div className="grid grid-cols-12 gap-1">
                    {Array.from({ length: 84 }).map((_, i) => {
                      const intensity = Math.random()
                      let bgColor = "bg-[#f0ebe5]"
                      if (intensity > 0.8) bgColor = "bg-[#d4a5a5]"
                      else if (intensity > 0.6) bgColor = "bg-[#d4a5a5]/70"
                      else if (intensity > 0.4) bgColor = "bg-[#d4a5a5]/40"
                      else if (intensity > 0.2) bgColor = "bg-[#d4a5a5]/20"
                      return (
                        <div
                          key={i}
                          className={`w-full aspect-square rounded-sm ${bgColor}`}
                        />
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-2 text-xs text-[#8a7a7a]">
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

                {/* Best Writing Times */}
                <div className="p-4 bg-[#faf8f5] rounded-xl">
                  <div className="text-sm font-medium text-[#3d3535] mb-3">Your Best Writing Times</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#6a5f5f]">Morning (6am-12pm)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-[#e8e0da] rounded-full overflow-hidden">
                          <div className="h-full bg-[#d4a5a5] rounded-full" style={{ width: "65%" }} />
                        </div>
                        <span className="text-sm text-[#3d3535] font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#6a5f5f]">Afternoon (12pm-6pm)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-[#e8e0da] rounded-full overflow-hidden">
                          <div className="h-full bg-[#d4a5a5] rounded-full" style={{ width: "20%" }} />
                        </div>
                        <span className="text-sm text-[#3d3535] font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#6a5f5f]">Evening (6pm-12am)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-[#e8e0da] rounded-full overflow-hidden">
                          <div className="h-full bg-[#d4a5a5] rounded-full" style={{ width: "15%" }} />
                        </div>
                        <span className="text-sm text-[#3d3535] font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
