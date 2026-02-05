export default function Loading() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Logo placeholder */}
        <svg
          viewBox="0 0 32 22"
          className="h-10 w-auto opacity-60 animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#d4a5a5" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 1.5" fill="none">
            <line x1="16" y1="1" x2="16" y2="7" />
            <line x1="9" y1="3" x2="11" y2="8" />
            <line x1="23" y1="3" x2="21" y2="8" />
            <line x1="3" y1="10" x2="7" y2="11" />
            <line x1="29" y1="10" x2="25" y2="11" />
          </g>
          <path d="M 6 18 A 10 10 0 0 1 26 18 Z" fill="#d4a5a5" />
          <line x1="2" y1="18" x2="30" y2="18" stroke="#d4a5a5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="h-1 w-16 rounded-full bg-[#e8e0da] overflow-hidden">
          <div className="h-full w-8 rounded-full bg-[#d4a5a5] animate-[shimmer_1s_ease-in-out_infinite]" style={{ animation: "loading-bar 1s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  )
}
