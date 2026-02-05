"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  ImageIcon,
  Lock,
  Sparkles,
  PenLine,
  ArrowRight,
  Check,
  Star,
  Zap,
  Shield,
  Smartphone,
  Users,
  BarChart3,
  Bell,
  Layers,
  Quote,
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

// Feature Card Component
function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType
  title: string
  description: string 
}) {
  return (
    <Card className="group bg-white/60 border-[#e8e0da]/60 hover:bg-white hover:shadow-lg hover:shadow-[#d4a5a5]/10 transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-xl bg-[#faf5f0] flex items-center justify-center mb-4 group-hover:bg-[#d4a5a5]/10 transition-colors">
          <Icon className="w-6 h-6 text-[#d4a5a5]" />
        </div>
        <h3 className="text-lg font-semibold text-[#3d3535] mb-2">{title}</h3>
        <p className="text-[#6a5f5f] text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

// Testimonial Card
function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string
  author: string
  role: string
}) {
  return (
    <Card className="bg-white/80 border-[#e8e0da]/60">
      <CardContent className="p-6">
        <Quote className="w-8 h-8 text-[#d4a5a5]/40 mb-4" />
        <p className="text-[#4a3f3f] leading-relaxed mb-4 italic">"{quote}"</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#d4a5a5]/20 flex items-center justify-center">
            <span className="text-sm font-medium text-[#d4a5a5]">{author[0]}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#3d3535]">{author}</p>
            <p className="text-xs text-[#8a7a7a]">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Pricing Card
function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
}: {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}) {
  return (
    <Card className={`relative ${highlighted ? 'bg-[#3d3535] text-white border-[#3d3535]' : 'bg-white border-[#e8e0da]'}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#d4a5a5] text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardContent className="p-6">
        <h3 className={`text-xl font-bold mb-1 ${highlighted ? 'text-white' : 'text-[#3d3535]'}`}>{name}</h3>
        <p className={`text-sm mb-4 ${highlighted ? 'text-white/70' : 'text-[#8a7a7a]'}`}>{description}</p>
        <div className="mb-6">
          <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-[#3d3535]'}`}>{price}</span>
          {price !== "Free" && <span className={`text-sm ${highlighted ? 'text-white/70' : 'text-[#8a7a7a]'}`}>/month</span>}
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${highlighted ? 'text-[#d4a5a5]' : 'text-[#d4a5a5]'}`} />
              <span className={`text-sm ${highlighted ? 'text-white/90' : 'text-[#4a3f3f]'}`}>{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className={`w-full ${highlighted 
            ? 'bg-[#d4a5a5] hover:bg-[#c49090] text-white' 
            : 'bg-[#3d3535] hover:bg-[#2d2525] text-white'
          }`}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/80 backdrop-blur-md border-b border-[#e8e0da]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-auto" />
              <span className="font-script text-2xl font-semibold text-[#3d3535]">Unfiltered</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-[#6a5f5f] hover:text-[#3d3535] transition-colors">Features</a>
              <a href="#testimonials" className="text-sm text-[#6a5f5f] hover:text-[#3d3535] transition-colors">Testimonials</a>
              <a href="#pricing" className="text-sm text-[#6a5f5f] hover:text-[#3d3535] transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" className="text-[#6a5f5f] hover:text-[#3d3535] hover:bg-[#f0ebe5]">
                  Sign In
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-[#3d3535] hover:bg-[#2d2525] text-white">
                  Start Writing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#d4a5a5]/10 text-[#c49090] px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Your personal space for authentic expression
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3d3535] mb-6 leading-tight animate-fade-in stagger-1" style={{ animationDelay: '0.1s' }}>
              Write freely.<br />
              <span className="text-[#d4a5a5]">Live authentically.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#6a5f5f] mb-8 leading-relaxed animate-fade-in stagger-2" style={{ animationDelay: '0.2s' }}>
              Unfiltered is a beautiful, private journal where you can capture your thoughts, 
              photos, and stories without judgment. Start your journey of self-discovery today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-3" style={{ animationDelay: '0.3s' }}>
              <div className="flex w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none border-r-0 bg-white border-[#e8e0da] focus:border-[#d4a5a5] h-12 w-full sm:w-72"
                />
                <Button className="rounded-l-none bg-[#d4a5a5] hover:bg-[#c49090] text-white h-12 px-6">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-[#8a7a7a] mt-4 animate-fade-in stagger-4" style={{ animationDelay: '0.4s' }}>
              Free forever. No credit card required.
            </p>
          </div>

          {/* Hero Image/Preview */}
          <div className="mt-16 relative animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white rounded-2xl shadow-2xl shadow-[#d4a5a5]/10 border border-[#e8e0da]/60 overflow-hidden">
              <div className="bg-[#faf5f0] px-4 py-3 border-b border-[#e8e0da]/60 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#e8e0da]" />
                  <div className="w-3 h-3 rounded-full bg-[#e8e0da]" />
                  <div className="w-3 h-3 rounded-full bg-[#e8e0da]" />
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-white to-[#faf8f5]">
                <div className="flex gap-6">
                  {/* Sidebar Preview */}
                  <div className="hidden md:block w-48 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-6">
                      <LogoMark className="h-6 w-auto" />
                      <span className="font-script text-lg font-semibold text-[#3d3535]">Unfiltered</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-[#d4a5a5]/10 text-[#d4a5a5] px-3 py-2 rounded-lg text-sm">
                        <PenLine className="w-4 h-4" />
                        <span>Entries</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#8a7a7a] px-3 py-2 text-sm">
                        <ImageIcon className="w-4 h-4" />
                        <span>Photos</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#8a7a7a] px-3 py-2 text-sm">
                        <Layers className="w-4 h-4" />
                        <span>Stories</span>
                      </div>
                    </div>
                  </div>
                  {/* Content Preview */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-[#3d3535]">Good morning</h3>
                        <p className="text-sm text-[#8a7a7a]">What will you write today?</p>
                      </div>
                      <div className="flex items-center gap-2 bg-[#faf5f0] px-3 py-1.5 rounded-full">
                        <Zap className="w-4 h-4 text-[#d4a5a5]" />
                        <span className="text-sm font-medium text-[#3d3535]">7 day streak</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#e8e0da]/60">
                        <div className="text-xs text-[#8a7a7a] mb-2">Today's Prompt</div>
                        <p className="text-sm text-[#4a3f3f]">What small moment made you smile today?</p>
                      </div>
                      <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#e8e0da]/60">
                        <div className="text-xs text-[#8a7a7a] mb-2">This Week</div>
                        <p className="text-2xl font-bold text-[#3d3535]">2,847 <span className="text-sm font-normal text-[#8a7a7a]">words</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d3535] mb-4">
              Everything you need to journal mindfully
            </h2>
            <p className="text-[#6a5f5f]">
              Powerful features designed to help you reflect, grow, and express yourself authentically.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={PenLine}
              title="Rich Text Editor"
              description="Write beautifully with markdown support, formatting tools, and auto-save that never loses your words."
            />
            <FeatureCard
              icon={ImageIcon}
              title="Photo Memories"
              description="Attach photos to your entries and create visual stories of your most precious moments."
            />
            <FeatureCard
              icon={Lock}
              title="Private & Secure"
              description="Your journal is yours alone. End-to-end encryption keeps your thoughts completely private."
            />
            <FeatureCard
              icon={BarChart3}
              title="Writing Insights"
              description="Track your writing habits, word counts, and streaks. See how your practice grows over time."
            />
            <FeatureCard
              icon={Bell}
              title="Gentle Reminders"
              description="Set daily prompts and reminders that encourage consistent journaling without pressure."
            />
            <FeatureCard
              icon={Smartphone}
              title="Write Anywhere"
              description="Access your journal from any device. Your entries sync seamlessly across all platforms."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#3d3535] mb-1">50K+</div>
              <div className="text-sm text-[#8a7a7a]">Active Writers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#3d3535] mb-1">2M+</div>
              <div className="text-sm text-[#8a7a7a]">Entries Written</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#3d3535] mb-1">4.9</div>
              <div className="text-sm text-[#8a7a7a]">App Store Rating</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#3d3535] mb-1">99.9%</div>
              <div className="text-sm text-[#8a7a7a]">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#faf5f0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d3535] mb-4">
              Loved by journalers worldwide
            </h2>
            <p className="text-[#6a5f5f]">
              See what our community has to say about their journaling journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Unfiltered has completely changed my morning routine. The daily prompts help me start each day with intention and clarity."
              author="Sarah M."
              role="Writer & Teacher"
            />
            <TestimonialCard
              quote="Finally, a journal app that feels personal. The design is beautiful and the writing experience is incredibly smooth."
              author="James K."
              role="Software Engineer"
            />
            <TestimonialCard
              quote="I've tried many journaling apps, but Unfiltered is the only one that stuck. The streak feature keeps me motivated!"
              author="Emily R."
              role="Wellness Coach"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d3535] mb-4">
              Simple, honest pricing
            </h2>
            <p className="text-[#6a5f5f]">
              Start free and upgrade when you need more. No hidden fees, cancel anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <PricingCard
              name="Free"
              price="Free"
              description="Perfect for getting started"
              features={[
                "Unlimited entries",
                "5 photo uploads/month",
                "Basic writing prompts",
                "7-day entry history",
                "Mobile & web access"
              ]}
            />
            <PricingCard
              name="Pro"
              price="$9"
              description="For dedicated journalers"
              features={[
                "Everything in Free",
                "Unlimited photos",
                "Advanced analytics",
                "Multiple journals",
                "Export to PDF/Markdown",
                "Priority support"
              ]}
              highlighted
            />
            <PricingCard
              name="Lifetime"
              price="$99"
              description="One-time payment"
              features={[
                "Everything in Pro",
                "Lifetime access",
                "Early access to features",
                "End-to-end encryption",
                "API access"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#3d3535]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start your journaling journey today
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Join thousands of writers who have made Unfiltered part of their daily practice.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-[#d4a5a5] hover:bg-[#c49090] text-white h-12 px-8">
              Start Writing Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#faf8f5] border-t border-[#e8e0da]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-auto" />
              <span className="font-script text-2xl font-semibold text-[#3d3535]">Unfiltered</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#6a5f5f]">
              <a href="#" className="hover:text-[#3d3535] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#3d3535] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#3d3535] transition-colors">Contact</a>
              <a href="#" className="hover:text-[#3d3535] transition-colors">Blog</a>
            </div>
            <div className="text-sm text-[#8a7a7a]">
              2024 Unfiltered. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
