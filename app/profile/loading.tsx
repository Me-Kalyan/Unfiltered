export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        {/* Header skeleton */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 w-10 rounded-xl bg-[#e8e0da]/60 animate-pulse" />
          <div className="h-6 w-24 rounded-lg bg-[#e8e0da]/60 animate-pulse" />
        </div>

        {/* Profile card skeleton */}
        <div className="rounded-2xl bg-white/80 border border-[#e8e0da]/30 p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-2xl bg-[#e8e0da]/50 animate-pulse" />
            <div className="space-y-3 flex-1">
              <div className="h-7 w-48 rounded-lg bg-[#e8e0da]/50 animate-pulse" />
              <div className="h-4 w-64 rounded-lg bg-[#e8e0da]/30 animate-pulse" />
              <div className="flex gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="h-6 w-12 rounded-lg bg-[#e8e0da]/50 animate-pulse" />
                    <div className="h-3 w-16 rounded-lg bg-[#e8e0da]/30 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 rounded-xl bg-[#e8e0da]/50 animate-pulse"
              style={{ width: `${70 + i * 10}px`, animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/80 border border-[#e8e0da]/30 p-5 h-32 animate-pulse"
              style={{ animationDelay: `${i * 70}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
