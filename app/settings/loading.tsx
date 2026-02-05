export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        {/* Header skeleton */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 w-10 rounded-xl bg-[#e8e0da]/60 animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-32 rounded-lg bg-[#e8e0da]/60 animate-pulse" />
            <div className="h-4 w-48 rounded-lg bg-[#e8e0da]/40 animate-pulse" />
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 rounded-xl bg-[#e8e0da]/50 animate-pulse"
              style={{ width: `${60 + i * 10}px`, animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/80 border border-[#e8e0da]/30 p-6 space-y-4"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="h-5 w-40 rounded-lg bg-[#e8e0da]/50 animate-pulse" />
              <div className="h-4 w-64 rounded-lg bg-[#e8e0da]/30 animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-[#e8e0da]/20 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
