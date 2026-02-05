'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Search, BookOpen, Camera, Pen, Heart, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

// Simple Logo Component with hover animation
function UnfilteredLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} transition-all duration-500 hover:rotate-180 hover:scale-110`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unfiltered Logo"
    >
      <circle 
        cx="50" 
        cy="50" 
        r="40" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="4"
        className="transition-all duration-500"
      />
      <line 
        x1="20" 
        y1="80" 
        x2="80" 
        y2="20" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round"
        className="transition-all duration-500"
      />
    </svg>
  )
}

export default function Page() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const categories = [
    { name: 'Lifestyle', icon: BookOpen, color: 'orange' },
    { name: 'Mindfulness', icon: Heart, color: 'orange' },
    { name: 'Travel', icon: MapPin, color: 'orange' },
    { name: 'Creative', icon: Camera, color: 'orange' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-white">
      {/* Header Section with sophisticated entrance */}
      <header className="border-b backdrop-blur-sm bg-white/80 sticky top-0 z-50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
          <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000">
            <UnfilteredLogo className="h-20 w-20 text-orange-600 md:h-24 md:w-24" />
            <div className="text-center">
              <h1 className="font-sans text-4xl font-bold text-gray-900 md:text-5xl tracking-tight">
                Unfiltered
              </h1>
              <p className="mt-2 text-lg text-gray-600 md:text-xl font-light">
                Authentic stories, honest perspectives
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with gradient animation */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-pink-50/30 to-white animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,146,60,0.1),transparent)]" />
        
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center md:py-32">
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <Badge 
              variant="outline" 
              className="mb-6 border-orange-300 bg-white/80 text-orange-700 px-4 py-1.5 text-sm font-medium backdrop-blur-sm hover:bg-orange-50 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Welcome to something real
            </Badge>
            
            <h2 className="text-balance font-sans text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl tracking-tight">
              Real Life,{' '}
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Real Stories
              </span>
            </h2>
            
            <p className="mt-6 text-pretty text-lg leading-relaxed text-gray-700 md:text-xl max-w-2xl mx-auto font-light">
              A personal lifestyle journal sharing genuine experiences and perspectives on everyday life.
            </p>
            
            <div className="mt-12 flex flex-col items-center gap-6">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white text-base font-semibold px-10 py-6 text-lg shadow-lg shadow-orange-600/30 hover:shadow-xl hover:shadow-orange-600/40 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Articles
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
              
              <div className={`relative w-full max-w-md transition-all duration-500 ${searchFocused ? 'scale-105' : 'scale-100'}`}>
                <Search className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ${searchFocused ? 'text-orange-600' : 'text-gray-400'}`} />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className={`h-14 pl-12 pr-4 border-2 text-base rounded-xl transition-all duration-300 ${searchFocused ? 'border-orange-600 shadow-lg shadow-orange-600/20 bg-white' : 'border-gray-200 bg-white/80 backdrop-blur-sm'}`}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section with stagger animation */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mb-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-balance font-sans text-4xl font-bold text-gray-900 md:text-5xl tracking-tight">
            Recent Articles
          </h2>
          <p className="mt-4 text-pretty text-xl leading-relaxed text-gray-600 font-light">
            Latest writings and reflections
          </p>
          <Separator className="mt-6 max-w-24 h-1 bg-gradient-to-r from-orange-600 to-transparent" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item, index) => (
            <Card 
              key={item}
              className="group border-2 border-gray-200 transition-all duration-500 hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-600/10 hover:-translate-y-2 cursor-pointer overflow-hidden"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Pen className="h-14 w-14 text-orange-300 transition-all duration-500 group-hover:scale-125 group-hover:text-orange-500 relative z-10" />
              </div>
              <CardContent className="p-7">
                <div className="space-y-2">
                  <div className="h-3 w-full rounded-full bg-gradient-to-r from-gray-200 to-transparent" />
                  <div className="h-3 w-5/6 rounded-full bg-gradient-to-r from-gray-200 to-transparent" />
                </div>
                <p className="mt-4 text-center text-sm text-gray-500 leading-relaxed font-light">
                  {index === 0 ? 'Your first article will appear here' : 'Article space ready'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Content Categories Section with hover effects */}
      <section className="relative border-y overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-orange-50/30 to-gray-50/50" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-balance font-sans text-4xl font-bold text-gray-900 md:text-5xl tracking-tight">
              Topics
            </h2>
            <p className="mt-4 text-pretty text-xl leading-relaxed text-gray-600 font-light">
              Explore different areas of interest
            </p>
            <Separator className="mt-6 max-w-24 h-1 bg-gradient-to-r from-orange-600 to-transparent mx-auto" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              const isHovered = hoveredCategory === category.name
              
              return (
                <Card 
                  key={category.name}
                  className="group cursor-pointer border-2 transition-all duration-500 hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-600/20 hover:-translate-y-2 overflow-hidden bg-white/80 backdrop-blur-sm"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    opacity: 0
                  }}
                >
                  <CardContent className="flex flex-col items-center p-10 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className={`relative rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 p-5 transition-all duration-500 ${isHovered ? 'bg-gradient-to-br from-orange-600 to-pink-600 scale-110 rotate-3' : ''}`}>
                      <Icon className={`h-10 w-10 transition-all duration-500 ${isHovered ? 'text-white scale-110' : 'text-orange-600'}`} />
                    </div>
                    
                    <h3 className="relative mt-6 font-sans text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-orange-600">
                      {category.name}
                    </h3>
                    
                    <div className={`mt-2 h-1 rounded-full bg-orange-600 transition-all duration-500 ${isHovered ? 'w-12' : 'w-0'}`} />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Author Bio Section with premium styling */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <Card className="group border-2 transition-all duration-500 hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-600/10 overflow-hidden bg-gradient-to-br from-white to-orange-50/30">
          <CardContent className="p-10 md:p-16">
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
              <div className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-4 border-orange-600 bg-gradient-to-br from-orange-50 to-pink-50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-orange-600/20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-center relative z-10">
                  <Camera className="mx-auto h-10 w-10 text-orange-400 transition-all duration-300 group-hover:scale-110" />
                  <p className="mt-2 text-xs text-gray-500 font-medium">Add photo</p>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-balance font-sans text-3xl font-bold text-gray-900 md:text-4xl tracking-tight">
                  About the Author
                </h2>
                
                <div className="mt-6 space-y-3">
                  <div className="h-4 w-full max-w-2xl rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-transparent mx-auto md:mx-0 animate-pulse" />
                  <div className="h-4 w-5/6 max-w-2xl rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-transparent mx-auto md:mx-0 animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="h-4 w-4/6 max-w-2xl rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-transparent mx-auto md:mx-0 animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
                
                <p className="mt-6 text-sm text-gray-500 font-light">
                  Add your bio and connect with readers
                </p>
                
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  {['Social Link', 'Social Link', 'Contact'].map((label, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      size="sm" 
                      className="border-2 border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50 bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer with elegant styling */}
      <footer className="border-t bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <UnfilteredLogo className="mx-auto h-12 w-12 text-orange-600 mb-6" />
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 font-medium">
              <a href="#" className="transition-all duration-300 hover:text-orange-600 hover:scale-110">About</a>
              <div className="h-4 w-px bg-gray-300" />
              <a href="#" className="transition-all duration-300 hover:text-orange-600 hover:scale-110">Contact</a>
              <div className="h-4 w-px bg-gray-300" />
              <a href="#" className="transition-all duration-300 hover:text-orange-600 hover:scale-110">Privacy</a>
            </div>
            
            <Separator className="my-8 max-w-md mx-auto" />
            
            <p className="text-sm text-gray-500 font-light">
              © 2024 Unfiltered. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
