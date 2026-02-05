import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Search, BookOpen, Coffee, Camera, Pen, Heart, MapPin } from 'lucide-react'

// Simple Logo Component
function UnfilteredLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
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
      />
      <line 
        x1="20" 
        y1="80" 
        x2="80" 
        y2="20" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <UnfilteredLogo className="h-20 w-20 text-orange-600 md:h-24 md:w-24" />
            <div className="text-center">
              <h1 className="font-sans text-4xl font-bold text-gray-900 md:text-5xl">
                Unfiltered
              </h1>
              <p className="mt-2 text-lg text-gray-600 md:text-xl">
                Authentic stories, honest perspectives
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-orange-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
          <h2 className="text-balance font-sans text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Real Life, Real Stories
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-gray-700 md:text-xl">
            A personal lifestyle journal sharing genuine experiences and perspectives on everyday life.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold px-8"
            >
              Explore Articles
            </Button>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="h-11 pl-10 border-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-balance font-sans text-3xl font-bold text-gray-900 md:text-4xl">
            Recent Articles
          </h2>
          <p className="mt-3 text-pretty text-lg leading-relaxed text-gray-600">
            Latest writings and reflections
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Empty State - Ready for Content */}
          <Card className="border-2 border-dashed border-gray-300">
            <div className="aspect-[16/10] bg-gray-50 flex items-center justify-center">
              <Pen className="h-12 w-12 text-gray-300" />
            </div>
            <CardContent className="p-6">
              <p className="text-center text-sm text-gray-500 leading-relaxed">
                Your first article will appear here
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-gray-300">
            <div className="aspect-[16/10] bg-gray-50 flex items-center justify-center">
              <Pen className="h-12 w-12 text-gray-300" />
            </div>
            <CardContent className="p-6">
              <p className="text-center text-sm text-gray-500 leading-relaxed">
                Article space ready
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-gray-300">
            <div className="aspect-[16/10] bg-gray-50 flex items-center justify-center">
              <Pen className="h-12 w-12 text-gray-300" />
            </div>
            <CardContent className="p-6">
              <p className="text-center text-sm text-gray-500 leading-relaxed">
                Article space ready
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content Categories Section */}
      <section className="border-y bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance font-sans text-3xl font-bold text-gray-900 md:text-4xl">
              Topics
            </h2>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-gray-600">
              Explore different areas of interest
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group cursor-pointer border-2 transition-all hover:border-orange-600 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="rounded-full bg-orange-100 p-4 transition-colors group-hover:bg-orange-600">
                  <BookOpen className="h-8 w-8 text-orange-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold text-gray-900">Lifestyle</h3>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer border-2 transition-all hover:border-orange-600 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="rounded-full bg-orange-100 p-4 transition-colors group-hover:bg-orange-600">
                  <Heart className="h-8 w-8 text-orange-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold text-gray-900">Mindfulness</h3>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer border-2 transition-all hover:border-orange-600 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="rounded-full bg-orange-100 p-4 transition-colors group-hover:bg-orange-600">
                  <MapPin className="h-8 w-8 text-orange-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold text-gray-900">Travel</h3>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer border-2 transition-all hover:border-orange-600 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="rounded-full bg-orange-100 p-4 transition-colors group-hover:bg-orange-600">
                  <Camera className="h-8 w-8 text-orange-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold text-gray-900">Creative</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Author Bio Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Card className="border-2">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 border-orange-600 bg-gray-100">
                <div className="text-center">
                  <Camera className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-xs text-gray-500">Add photo</p>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-balance font-sans text-2xl font-bold text-gray-900 md:text-3xl">
                  About the Author
                </h2>
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-full max-w-2xl rounded bg-gray-100 mx-auto md:mx-0" />
                  <div className="h-4 w-5/6 max-w-2xl rounded bg-gray-100 mx-auto md:mx-0" />
                  <div className="h-4 w-4/6 max-w-2xl rounded bg-gray-100 mx-auto md:mx-0" />
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Add your bio and connect with readers
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-300 text-gray-600 hover:border-orange-600 hover:text-orange-600 bg-transparent"
                  >
                    Social Link
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-300 text-gray-600 hover:border-orange-600 hover:text-orange-600 bg-transparent"
                  >
                    Social Link
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-300 text-gray-600 hover:border-orange-600 hover:text-orange-600 bg-transparent"
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <a href="#" className="transition-colors hover:text-orange-600">About</a>
              <a href="#" className="transition-colors hover:text-orange-600">Contact</a>
              <a href="#" className="transition-colors hover:text-orange-600">Privacy</a>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              © 2024 Unfiltered. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
