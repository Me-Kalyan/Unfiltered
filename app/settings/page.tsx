"use client"

import React, { useState } from "react"
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
  Check,
  AlertTriangle,
  LogOut,
  CreditCard,
  Zap,
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
      onClick={onToggle}
      disabled={disabled}
      className={`w-11 h-6 rounded-full transition-colors relative ${
        enabled ? "bg-[#d4a5a5]" : "bg-[#e8e0da]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
        enabled ? "translate-x-[22px]" : "translate-x-0.5"
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
}: {
  icon?: React.ElementType
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-[#e8e0da]/60 last:border-0">
      <div className="flex gap-3">
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-[#f0ebe5] flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-[#6a5f5f]" />
          </div>
        )}
        <div>
          <div className="font-medium text-[#3d3535]">{title}</div>
          {description && <div className="text-sm text-[#8a7a7a] mt-0.5">{description}</div>}
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Profile
    name: "Alexandra Chen",
    email: "alex@example.com",
    username: "alexwrites",
    bio: "Finding beauty in everyday moments.",
    
    // Notifications
    dailyReminder: true,
    reminderTime: "09:00",
    streakAlerts: true,
    weeklyDigest: true,
    emailNotifications: false,
    pushNotifications: true,
    
    // Privacy
    defaultPrivacy: "private",
    showProfile: true,
    allowComments: false,
    
    // Appearance
    theme: "light",
    fontSize: "medium",
    
    // Writing
    autoSave: true,
    spellCheck: true,
    wordCountGoal: 500,
  })

  const updateSetting = (key: string, value: string | boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/80 backdrop-blur-md border-b border-[#e8e0da]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6a5f5f] hover:bg-[#f0ebe5] hover:text-[#3d3535] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2.5">
                <LogoMark className="h-8 w-auto" />
                <span className="font-script text-2xl font-semibold text-[#3d3535]">Unfiltered</span>
              </div>
            </div>
            <Button className="bg-[#d4a5a5] hover:bg-[#c49090] text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3d3535] mb-2">Settings</h1>
          <p className="text-[#6a5f5f]">Manage your account settings and preferences.</p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-[#f0ebe5] p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="account" className="data-[state=active]:bg-white">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-white">
              <Lock className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-white">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-white">
              <Download className="w-4 h-4 mr-2" />
              Data
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => updateSetting("name", e.target.value)}
                      className="bg-white border-[#e8e0da]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={settings.username}
                      onChange={(e) => updateSetting("username", e.target.value)}
                      className="bg-white border-[#e8e0da]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSetting("email", e.target.value)}
                    className="bg-white border-[#e8e0da]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => updateSetting("bio", e.target.value)}
                    className="bg-white border-[#e8e0da] resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
                <CardTitle className="text-lg">Security</CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="bg-white border-[#e8e0da] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7a7a] hover:text-[#6a5f5f]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      className="bg-white border-[#e8e0da]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-white border-[#e8e0da]"
                    />
                  </div>
                </div>
                <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent">
                  <Key className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#d4a5a5]" />
                  Subscription
                </CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-[#d4a5a5]/10 rounded-xl">
                  <div>
                    <div className="font-semibold text-[#3d3535]">Pro Plan</div>
                    <div className="text-sm text-[#8a7a7a]">$9/month - Renews Feb 15, 2024</div>
                  </div>
                  <Button variant="outline" className="border-[#e8e0da] bg-transparent">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
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
                    title="Reminder Time"
                    description="When should we remind you?"
                  >
                    <Select 
                      value={settings.reminderTime} 
                      onValueChange={(v) => updateSetting("reminderTime", v)}
                    >
                      <SelectTrigger className="w-[120px] bg-white border-[#e8e0da]">
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

            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
                <CardTitle className="text-lg">Communication</CardTitle>
                <CardDescription>Choose how we contact you</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
                  icon={Mail}
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
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
                    <SelectTrigger className="w-[130px] bg-white border-[#e8e0da]">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
                <CardTitle className="text-lg">Theme & Display</CardTitle>
                <CardDescription>Customize how Unfiltered looks</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
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
                        onClick={() => updateSetting("theme", theme.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                          settings.theme === theme.id
                            ? "border-[#d4a5a5] bg-[#d4a5a5]/10 text-[#d4a5a5]"
                            : "border-[#e8e0da] text-[#6a5f5f] hover:border-[#d4a5a5]/50"
                        }`}
                      >
                        <theme.icon className="w-4 h-4" />
                        <span className="text-sm">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </SettingRow>
                <SettingRow
                  title="Font Size"
                  description="Adjust the reading font size"
                >
                  <Select 
                    value={settings.fontSize} 
                    onValueChange={(v) => updateSetting("fontSize", v)}
                  >
                    <SelectTrigger className="w-[120px] bg-white border-[#e8e0da]">
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

            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
                <CardTitle className="text-lg">Writing Preferences</CardTitle>
                <CardDescription>Customize your writing experience</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
                  title="Auto-Save"
                  description="Automatically save entries while writing"
                >
                  <Toggle 
                    enabled={settings.autoSave} 
                    onToggle={() => updateSetting("autoSave", !settings.autoSave)} 
                  />
                </SettingRow>
                <SettingRow
                  title="Spell Check"
                  description="Highlight spelling errors"
                >
                  <Toggle 
                    enabled={settings.spellCheck} 
                    onToggle={() => updateSetting("spellCheck", !settings.spellCheck)} 
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
                    <SelectTrigger className="w-[130px] bg-white border-[#e8e0da]">
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
          <TabsContent value="data" className="space-y-6">
            <Card className="bg-white/80 border-[#e8e0da]/60">
              <CardHeader>
                <CardTitle className="text-lg">Export Data</CardTitle>
                <CardDescription>Download your journal entries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export as PDF
                  </Button>
                  <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export as Markdown
                  </Button>
                  <Button variant="outline" className="border-[#e8e0da] text-[#6a5f5f] bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export as JSON
                  </Button>
                </div>
                <p className="text-sm text-[#8a7a7a]">
                  Your export will include all entries, photos, and metadata.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <div>
                    <div className="font-medium text-[#3d3535]">Delete All Entries</div>
                    <div className="text-sm text-[#8a7a7a]">Permanently delete all your journal entries</div>
                  </div>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete All
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
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

        {/* Logout Button */}
        <div className="mt-8 pt-8 border-t border-[#e8e0da]">
          <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </main>
    </div>
  )
}
