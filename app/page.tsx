import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, BookOpen, Coffee, Camera, Pen, Heart, MapPin } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-balance font-sans text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Stories That Speak to the Soul
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 md:text-xl">
              A personal journal exploring life, creativity, and everything in between. Join me on a journey through thoughts, experiences, and moments worth sharing.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 text-base font-semibold">
                Start Reading
              </Button>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 bg-white/95 border-white/20 placeholder:text-gray-500 h-11"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-balance font-sans text-3xl font-bold text-foreground md:text-4xl">
            Featured Stories
          </h2>
          <p className="mt-3 text-pretty text-lg text-muted-foreground leading-relaxed">
            Dive into the latest thoughts and explorations
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Article 1 */}
          <Card className="group overflow-hidden border-2 hover:border-orange-500 transition-colors">
            <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100">
              <div className="flex h-full items-center justify-center">
                <Camera className="h-16 w-16 text-orange-500/30" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  Lifestyle
                </Badge>
                <span className="text-sm text-muted-foreground">5 min read</span>
              </div>
              <h3 className="text-balance font-sans text-xl font-bold leading-snug group-hover:text-orange-600 transition-colors">
                Finding Beauty in Everyday Moments
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                How learning to pause and observe transformed my perspective on daily life and helped me appreciate the small things.
              </p>
              <Button variant="link" className="mt-4 px-0 text-orange-600 hover:text-orange-700">
                Read more →
              </Button>
            </CardContent>
          </Card>

          {/* Article 2 */}
          <Card className="group overflow-hidden border-2 hover:border-pink-500 transition-colors">
            <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
              <div className="flex h-full items-center justify-center">
                <Coffee className="h-16 w-16 text-pink-500/30" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  Mindfulness
                </Badge>
                <span className="text-sm text-muted-foreground">7 min read</span>
              </div>
              <h3 className="text-balance font-sans text-xl font-bold leading-snug group-hover:text-pink-600 transition-colors">
                The Art of Slow Living
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Why rushing through life made me miss what truly matters, and how slowing down opened up a world of new possibilities.
              </p>
              <Button variant="link" className="mt-4 px-0 text-pink-600 hover:text-pink-700">
                Read more →
              </Button>
            </CardContent>
          </Card>

          {/* Article 3 */}
          <Card className="group overflow-hidden border-2 hover:border-purple-500 transition-colors">
            <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
              <div className="flex h-full items-center justify-center">
                <MapPin className="h-16 w-16 text-purple-500/30" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Travel
                </Badge>
                <span className="text-sm text-muted-foreground">6 min read</span>
              </div>
              <h3 className="text-balance font-sans text-xl font-bold leading-snug group-hover:text-purple-600 transition-colors">
                Wandering Without a Map
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                My journey to discovering hidden gems and authentic experiences by letting go of rigid travel plans and embracing spontaneity.
              </p>
              <Button variant="link" className="mt-4 px-0 text-purple-600 hover:text-purple-700">
                Read more →
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content Categories Section */}
      <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance font-sans text-3xl font-bold text-foreground md:text-4xl">
              Explore Topics
            </h2>
            <p className="mt-3 text-pretty text-lg text-muted-foreground leading-relaxed">
              Discover stories across different themes
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group cursor-pointer border-2 hover:border-orange-500 hover:shadow-lg transition-all">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-500 transition-colors">
                  <BookOpen className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold">Lifestyle</h3>
                <p className="mt-2 text-sm text-muted-foreground">Daily reflections and personal growth</p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer border-2 hover:border-pink-500 hover:shadow-lg transition-all">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="rounded-full bg-pink-100 p-4 group-hover:bg-pink-500 transition-colors">
                  <Heart className="h-8 w-8 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold">Mindfulness</h3>
                <p className="mt-2 text-sm text-muted-foreground">Living with intention and presence</p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer border-2 hover:border-purple-500 hover:shadow-lg transition-all">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="rounded-full bg-purple-100 p-4 group-hover:bg-purple-500 transition-colors">
                  <MapPin className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold">Travel</h3>
                <p className="mt-2 text-sm text-muted-foreground">Adventures and wanderlust stories</p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer border-2 hover:border-orange-500 hover:shadow-lg transition-all">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="rounded-full bg-orange-100 p-4 group-hover:bg-orange-500 transition-colors">
                  <Pen className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold">Creative</h3>
                <p className="mt-2 text-sm text-muted-foreground">Writing, art, and inspiration</p>
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
              <Avatar className="h-32 w-32 border-4 border-orange-500">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Author" />
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white text-3xl font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-balance font-sans text-2xl font-bold md:text-3xl">
                  About the Author
                </h2>
                <h3 className="mt-2 text-xl font-semibold text-orange-600">Jane Doe</h3>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground max-w-2xl">
                  I'm a writer, dreamer, and chronic coffee enthusiast based in the Pacific Northwest. This journal is where I share my musings on life, creativity, and the art of finding joy in the ordinary. When I'm not writing, you'll find me hiking forest trails, trying new recipes, or curled up with a good book.
                </p>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground max-w-2xl">
                  Through this space, I hope to inspire you to slow down, embrace authenticity, and find your own unique path through this beautiful, messy journey called life.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <Button variant="outline" size="sm" className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent">
                    Follow on Instagram
                  </Button>
                  <Button variant="outline" size="sm" className="border-pink-500 text-pink-600 hover:bg-pink-50 bg-transparent">
                    Connect on Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent">
                    Email Me
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance font-sans text-3xl font-bold text-foreground md:text-4xl">
              What Readers Say
            </h2>
            <p className="mt-3 text-pretty text-lg text-muted-foreground leading-relaxed">
              Join a growing community of mindful readers
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 text-2xl text-orange-500">★★★★★</div>
                <p className="text-pretty leading-relaxed text-foreground italic">
                  "This journal has completely changed how I view my daily routine. The writing is beautiful, honest, and deeply relatable."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-orange-100 text-orange-700 font-semibold">SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">Sarah Miller</p>
                    <p className="text-xs text-muted-foreground">Reader since 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 text-2xl text-pink-500">★★★★★</div>
                <p className="text-pretty leading-relaxed text-foreground italic">
                  "Every post feels like a conversation with a good friend. I look forward to each new article and always come away inspired."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-pink-100 text-pink-700 font-semibold">MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">Michael Kim</p>
                    <p className="text-xs text-muted-foreground">Reader since 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 text-2xl text-purple-500">★★★★★</div>
                <p className="text-pretty leading-relaxed text-foreground italic">
                  "Authentic, thoughtful, and beautifully written. This journal has become my go-to source for meaningful content."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">EP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">Emily Parker</p>
                    <p className="text-xs text-muted-foreground">Reader since 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-sans text-3xl font-bold text-foreground">
              Stay Connected
            </h2>
            <p className="mt-3 text-pretty text-lg text-muted-foreground leading-relaxed">
              Get new stories delivered straight to your inbox. Join the community.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                className="sm:w-80 h-11"
              />
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 The Journal. All rights reserved.</p>
            <div className="mt-4 flex items-center justify-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
