"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Palette,
  Download,
  Trash2,
  Shield,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Key,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  LogOut,
  CreditCard,
  Zap,
  Settings,
  ChevronRight,
  Camera,
  Check,
  HelpCircle,
  FileText,
  Languages,
  Monitor,
  Volume2,
  Clock,
  Calendar,
  Hash,
  Link2,
  Bookmark,
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

// Toggle Switch Component
function Toggle({ 
  enabled, 
  onToggle,
  disabled = false 
}: { 
  enabled: boolean
  onToggle: () => void
  disabled?: boolean 
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      disabled={disabled}
      className={`w-12 h-7 rounded-full transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a5a5] focus-visible:ring-offset-2 ${
        enabled ? "bg-[#d4a5a5]" : "bg-[#e8e0da]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md"}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 absolute top-1 ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`} />
    </button>
  )
}

// Setting Row Component
function SettingRow({
  icon: Icon,
  title,
  description,
  children,
  onClick,
  showChevron = false,
}: {
  icon?: React.ElementType
  title: string
  description?: string
  children?: React.ReactNode
  onClick?: () => void
  showChevron?: boolean
}) {
  const content = (
    <div className={`flex items-center justify-between py-4 border-b border-[#e8e0da]/60 last:border-0 ${onClick ? 'cursor-pointer hover:bg-[#f5f0eb]/50 -mx-4 px-4 rounded-lg transition-colors' : ''}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-[#f5f0eb] flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#6a5f5f]" />
          </div>
        )}
        <div className="min-w-0">
          <div className="font-medium text-[#3d3535]">{title}</div>
          {description && <div className="text-sm text-[#8a7a7a] mt-0.5 truncate">{description}</div>}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        {children}
        {showChevron && <ChevronRight className="w-5 h-5 text-[#8a7a7a]" />}
      </div>
    </div>
  )

  if (onClick) {
    return <button type="button" onClick={onClick} className="w-full text-left">{content}</button>
  }
  return content
}

// Account Card Component (matching the reference image style)
function AccountCard({ 
  name, 
  email, 
  avatarUrl,
  onClick 
}: { 
  name: string
  email: string
  avatarUrl?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-white/90 border border-[#e8e0da] rounded-xl hover:bg-[#f5f0eb]/50 hover:border-[#d4a5a5]/30 transition-all duration-200 group"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f0ebe5] to-[#e8e0da] flex items-center justify-center overflow-hidden flex-shrink-0">
        {avatarUrl ? (
          <img src={avatarUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-[#8a7a7a]" />
        )}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="font-semibold text-[#3d3535] truncate">{name}</div>
        <div className="text-sm text-[#8a7a7a]">Settings & more</div>
      </div>
      <ChevronRight className="w-5 h-5 text-[#8a7a7a] group-hover:text-[#6a5f5f] group-hover:translate-x-0.5 transition-all" />
    </button>
  )
}

// Settings Menu Dropdown (matching reference image)
function SettingsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg hover:bg-[#f0ebe5]">
          <Settings className="w-5 h-5 text-[#6a5f5f]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border-[#e8e0da]">
        <DropdownMenuItem className="cursor-pointer gap-2 py-2.5">
          <Settings className="w-4 h-4 text-[#6a5f5f]" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#e8e0da]" />
        <DropdownMenuItem className="cursor-pointer gap-2 py-2.5 text-red-600 focus:text-red-600">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Section Header
function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-[#3d3535]">{title}</h3>
      {description && <p className="text-sm text-[#8a7a7a] mt-1">{description}</p>}
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  
  const [settings, setSettings] = useState({
    // Profile
    name: "Alexandra Chen",
    email: "alex@example.com",
    username: "alexwrites",
    bio: "Finding beauty in everyday moments.",
    avatarUrl: "",
    
    // Notifications
    dailyReminder: true,
    reminderTime: "09:00",
    streakAlerts: true,
    weeklyDigest: true,
    emailNotifications: false,
    pushNotifications: true,
    soundEffects: true,
    
    // Privacy
    defaultPrivacy: "private",
    showProfile: true,
    allowComments: false,
    showActivityStatus: true,
    
    // Appearance
    theme: "light",
    fontSize: "medium",
    language: "en",
    compactMode: false,
    
    // Writing
    autoSave: true,
    spellCheck: true,
    wordCountGoal: 500,
    showWordCount: true,
  })

  const updateSetting = (key: string, value: string | boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setSaveStatus("saving")
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#faf8f5]">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8e0da]/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
<button
  onClick={() => router.back()}
  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#6a5f5f] hover:bg-[#f0ebe5] hover:text-[#3d3535]"
  >
  <ArrowLeft className="w-5 h-5" />
  </button>
                <div className="flex items-center gap-2.5">
                  <LogoMark className="h-8 w-auto" />
                  <span className="font-script text-2xl font-semibold text-[#3d3535]">Unfiltered</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SettingsDropdown />
                <Button 
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  className="bg-[#d4a5a5] hover:bg-[#c49090] text-white transition-all"
                >
                  {saveStatus === "saving" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : saveStatus === "saved" ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3d3535] mb-2">Settings</h1>
            <p className="text-[#6a5f5f]">Manage your account settings and preferences.</p>
          </div>

          {/* Account Card - Prominent at top */}
          <div className="mb-8">
            <AccountCard 
              name={settings.name}
              email={settings.email}
              avatarUrl={settings.avatarUrl}
              onClick={() => setActiveTab("account")}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-[#f0ebe5]/80 p-1.5 rounded-xl flex-wrap h-auto gap-1 w-full sm:w-auto">
              <TabsTrigger 
                value="account" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2.5 transition-all"
              >
                <User className="w-4 h-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2.5 transition-all"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2.5 transition-all"
              >
                <Lock className="w-4 h-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2.5 transition-all"
              >
                <Palette className="w-4 h-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger 
                value="data" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2.5 transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Data
              </TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6 animate-fade-in">
              {/* Profile Photo */}
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Profile Photo</CardTitle>
                  <CardDescription>Upload a photo to personalize your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f0ebe5] to-[#e8e0da] flex items-center justify-center overflow-hidden">
                        {settings.avatarUrl ? (
                          <img src={settings.avatarUrl || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-10 h-10 text-[#8a7a7a]" />
                        )}
                      </div>
                      <button 
                        type="button"
                        className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Camera className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent hover:bg-[#f5f0eb]">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      <span className="text-xs text-[#8a7a7a]">JPG, PNG or GIF. Max 2MB.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Information */}
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#3d3535] font-medium">Full Name</Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => updateSetting("name", e.target.value)}
                        className="bg-white border-[#e8e0da] focus:border-[#d4a5a5] focus:ring-[#d4a5a5]/20 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-[#3d3535] font-medium">Username</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7a7a]">@</span>
                        <Input
                          id="username"
                          value={settings.username}
                          onChange={(e) => updateSetting("username", e.target.value)}
                          className="bg-white border-[#e8e0da] focus:border-[#d4a5a5] focus:ring-[#d4a5a5]/20 pl-8 h-11"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#3d3535] font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSetting("email", e.target.value)}
                      className="bg-white border-[#e8e0da] focus:border-[#d4a5a5] focus:ring-[#d4a5a5]/20 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-[#3d3535] font-medium">Bio</Label>
                    <Textarea
                      id="bio"
                      value={settings.bio}
                      onChange={(e) => updateSetting("bio", e.target.value)}
                      className="bg-white border-[#e8e0da] focus:border-[#d4a5a5] focus:ring-[#d4a5a5]/20 resize-none min-h-[100px]"
                      placeholder="Tell us a bit about yourself..."
                    />
                    <span className="text-xs text-[#8a7a7a]">{settings.bio.length}/160 characters</span>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#d4a5a5]" />
                    Security
                  </CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-[#3d3535] font-medium">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="bg-white border-[#e8e0da] focus:border-[#d4a5a5] focus:ring-[#d4a5a5]/20 pr-10 h-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7a7a] hover:text-[#6a5f5f] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-[#3d3535] font-medium">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        className="bg-white border-[#e8e0da] focus:border-[#d4a5a5] focus:ring-[#d4a5a5]/20 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-[#3d3535] font-medium">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        className="bg-white border-[#e8e0da] focus:border-[#d4a5a5] focus:ring-[#d4a5a5]/20 h-11"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent hover:bg-[#f5f0eb]">
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* Subscription */}
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#d4a5a5]" />
                    Subscription
                  </CardTitle>
                  <CardDescription>Manage your subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#d4a5a5]/10 to-[#e5c5c5]/10 rounded-xl border border-[#d4a5a5]/20">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#3d3535]">Pro Plan</span>
                        <span className="px-2 py-0.5 bg-[#d4a5a5] text-white text-xs rounded-full">Active</span>
                      </div>
                      <div className="text-sm text-[#8a7a7a] mt-1">$9/month - Renews Feb 15, 2026</div>
                    </div>
                    <Button variant="outline" className="border-[#e8e0da] bg-white hover:bg-[#f5f0eb]">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Connected Accounts */}
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-[#d4a5a5]" />
                    Connected Accounts
                  </CardTitle>
                  <CardDescription>Manage your connected services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <SettingRow
                    icon={Globe}
                    title="Google"
                    description="Connected as alex@gmail.com"
                    showChevron
                  >
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Connected</span>
                  </SettingRow>
                  <SettingRow
                    icon={Globe}
                    title="Apple"
                    description="Not connected"
                    showChevron
                  >
                    <Button variant="outline" size="sm" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent h-8">
                      Connect
                    </Button>
                  </SettingRow>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6 animate-fade-in">
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Writing Reminders</CardTitle>
                  <CardDescription>Get gentle nudges to keep your journaling habit</CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingRow
                    icon={Bell}
                    title="Daily Writing Reminder"
                    description="Receive a reminder to write each day"
                  >
                    <Toggle 
                      enabled={settings.dailyReminder} 
                      onToggle={() => updateSetting("dailyReminder", !settings.dailyReminder)} 
                    />
                  </SettingRow>
                  {settings.dailyReminder && (
                    <SettingRow
                      icon={Clock}
                      title="Reminder Time"
                      description="When should we remind you?"
                    >
                      <Select 
                        value={settings.reminderTime} 
                        onValueChange={(v) => updateSetting("reminderTime", v)}
                      >
                        <SelectTrigger className="w-[130px] bg-white border-[#e8e0da] h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </SettingRow>
                  )}
                  <SettingRow
                    icon={Zap}
                    title="Streak Alerts"
                    description="Get notified when your streak is at risk"
                  >
                    <Toggle 
                      enabled={settings.streakAlerts} 
                      onToggle={() => updateSetting("streakAlerts", !settings.streakAlerts)} 
                    />
                  </SettingRow>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Communication</CardTitle>
                  <CardDescription>Choose how we contact you</CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingRow
                    icon={Calendar}
                    title="Weekly Digest"
                    description="Get a summary of your writing activity"
                  >
                    <Toggle 
                      enabled={settings.weeklyDigest} 
                      onToggle={() => updateSetting("weeklyDigest", !settings.weeklyDigest)} 
                    />
                  </SettingRow>
                  <SettingRow
                    icon={Mail}
                    title="Email Notifications"
                    description="Receive updates and tips via email"
                  >
                    <Toggle 
                      enabled={settings.emailNotifications} 
                      onToggle={() => updateSetting("emailNotifications", !settings.emailNotifications)} 
                    />
                  </SettingRow>
                  <SettingRow
                    icon={Smartphone}
                    title="Push Notifications"
                    description="Receive notifications on your device"
                  >
                    <Toggle 
                      enabled={settings.pushNotifications} 
                      onToggle={() => updateSetting("pushNotifications", !settings.pushNotifications)} 
                    />
                  </SettingRow>
                  <SettingRow
                    icon={Volume2}
                    title="Sound Effects"
                    description="Play sounds for actions and achievements"
                  >
                    <Toggle 
                      enabled={settings.soundEffects} 
                      onToggle={() => updateSetting("soundEffects", !settings.soundEffects)} 
                    />
                  </SettingRow>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy */}
            <TabsContent value="privacy" className="space-y-6 animate-fade-in">
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Entry Privacy</CardTitle>
                  <CardDescription>Control who can see your journal entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingRow
                    icon={Lock}
                    title="Default Privacy"
                    description="Privacy setting for new entries"
                  >
                    <Select 
                      value={settings.defaultPrivacy} 
                      onValueChange={(v) => updateSetting("defaultPrivacy", v)}
                    >
                      <SelectTrigger className="w-[140px] bg-white border-[#e8e0da] h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="shared">Shared</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingRow>
                  <SettingRow
                    icon={Globe}
                    title="Public Profile"
                    description="Allow others to view your profile"
                  >
                    <Toggle 
                      enabled={settings.showProfile} 
                      onToggle={() => updateSetting("showProfile", !settings.showProfile)} 
                    />
                  </SettingRow>
                  <SettingRow
                    icon={Shield}
                    title="Allow Comments"
                    description="Let others comment on public entries"
                  >
                    <Toggle 
                      enabled={settings.allowComments} 
                      onToggle={() => updateSetting("allowComments", !settings.allowComments)} 
                    />
                  </SettingRow>
                  <SettingRow
                    icon={Eye}
                    title="Activity Status"
                    description="Show when you were last active"
                  >
                    <Toggle 
                      enabled={settings.showActivityStatus} 
                      onToggle={() => updateSetting("showActivityStatus", !settings.showActivityStatus)} 
                    />
                  </SettingRow>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance */}
            <TabsContent value="appearance" className="space-y-6 animate-fade-in">
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Theme & Display</CardTitle>
                  <CardDescription>Customize how Unfiltered looks</CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingRow
                    icon={Monitor}
                    title="Theme"
                    description="Choose your preferred color scheme"
                  >
                    <div className="flex gap-2">
                      {[
                        { id: "light", icon: Sun, label: "Light" },
                        { id: "dark", icon: Moon, label: "Dark" },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => updateSetting("theme", theme.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                            settings.theme === theme.id
                              ? "border-[#d4a5a5] bg-[#d4a5a5]/10 text-[#d4a5a5]"
                              : "border-[#e8e0da] text-[#6a5f5f] hover:border-[#d4a5a5]/50"
                          }`}
                        >
                          <theme.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </SettingRow>
                  <SettingRow
                    icon={Languages}
                    title="Language"
                    description="Select your preferred language"
                  >
                    <Select 
                      value={settings.language} 
                      onValueChange={(v) => updateSetting("language", v)}
                    >
                      <SelectTrigger className="w-[140px] bg-white border-[#e8e0da] h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingRow>
                  <SettingRow
                    title="Font Size"
                    description="Adjust the reading font size"
                  >
                    <Select 
                      value={settings.fontSize} 
                      onValueChange={(v) => updateSetting("fontSize", v)}
                    >
                      <SelectTrigger className="w-[130px] bg-white border-[#e8e0da] h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingRow>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Writing Preferences</CardTitle>
                  <CardDescription>Customize your writing experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingRow
                    icon={Save}
                    title="Auto-Save"
                    description="Automatically save entries while writing"
                  >
                    <Toggle 
                      enabled={settings.autoSave} 
                      onToggle={() => updateSetting("autoSave", !settings.autoSave)} 
                    />
                  </SettingRow>
                  <SettingRow
                    icon={FileText}
                    title="Spell Check"
                    description="Highlight spelling errors"
                  >
                    <Toggle 
                      enabled={settings.spellCheck} 
                      onToggle={() => updateSetting("spellCheck", !settings.spellCheck)} 
                    />
                  </SettingRow>
                  <SettingRow
                    icon={Hash}
                    title="Show Word Count"
                    description="Display word count while writing"
                  >
                    <Toggle 
                      enabled={settings.showWordCount} 
                      onToggle={() => updateSetting("showWordCount", !settings.showWordCount)} 
                    />
                  </SettingRow>
                  <SettingRow
                    title="Daily Word Goal"
                    description="Set your daily writing target"
                  >
                    <Select 
                      value={String(settings.wordCountGoal)} 
                      onValueChange={(v) => updateSetting("wordCountGoal", Number(v))}
                    >
                      <SelectTrigger className="w-[140px] bg-white border-[#e8e0da] h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="250">250 words</SelectItem>
                        <SelectItem value="500">500 words</SelectItem>
                        <SelectItem value="750">750 words</SelectItem>
                        <SelectItem value="1000">1000 words</SelectItem>
                      </SelectContent>
                    </Select>
                  </SettingRow>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data */}
            <TabsContent value="data" className="space-y-6 animate-fade-in">
              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Export Data</CardTitle>
                  <CardDescription>Download your journal entries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent hover:bg-[#f5f0eb] h-12">
                      <Download className="w-4 h-4 mr-2" />
                      Export as PDF
                    </Button>
                    <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent hover:bg-[#f5f0eb] h-12">
                      <Download className="w-4 h-4 mr-2" />
                      Export as Markdown
                    </Button>
                    <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent hover:bg-[#f5f0eb] h-12">
                      <Download className="w-4 h-4 mr-2" />
                      Export as JSON
                    </Button>
                  </div>
                  <p className="text-sm text-[#8a7a7a]">
                    Your export will include all entries, photos, and metadata.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-[#e8e0da]/60 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-[#d4a5a5]" />
                    Import Data
                  </CardTitle>
                  <CardDescription>Import entries from other apps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-[#e8e0da] rounded-xl p-8 text-center hover:border-[#d4a5a5]/50 transition-colors cursor-pointer">
                    <Download className="w-10 h-10 text-[#8a7a7a] mx-auto mb-3" />
                    <p className="font-medium text-[#3d3535] mb-1">Drop files here or click to upload</p>
                    <p className="text-sm text-[#8a7a7a]">Supports Day One, Journey, or JSON exports</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border-red-100 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Irreversible actions - please be careful</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-red-50/50 rounded-xl border border-red-100">
                    <div>
                      <div className="font-medium text-[#3d3535]">Delete All Entries</div>
                      <div className="text-sm text-[#8a7a7a]">Permanently delete all your journal entries</div>
                    </div>
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-red-50/50 rounded-xl border border-red-100">
                    <div>
                      <div className="font-medium text-[#3d3535]">Delete Account</div>
                      <div className="text-sm text-[#8a7a7a]">Permanently delete your account and all data</div>
                    </div>
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Help & Support */}
          <div className="mt-8 pt-8 border-t border-[#e8e0da]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f5f0eb] flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-[#6a5f5f]" />
                </div>
                <div>
                  <div className="font-medium text-[#3d3535]">Need help?</div>
                  <div className="text-sm text-[#8a7a7a]">Check our FAQ or contact support</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent hover:bg-[#f5f0eb]">
                  View FAQ
                </Button>
                <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent hover:bg-[#f5f0eb]">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
