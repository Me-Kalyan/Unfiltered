export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 22"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unfiltered Logo"
    >
      {/* 5 Dotted rays */}
      <g
        className="stroke-[#3d3535] dark:stroke-[#e8ddd5]"
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

      {/* Half-circle sun */}
      <path
        d="M 6 18 A 10 10 0 0 1 26 18 Z"
        fill="#d4a5a5"
      />

      {/* Horizon line */}
      <line
        x1="2"
        y1="18"
        x2="30"
        y2="18"
        className="stroke-[#3d3535] dark:stroke-[#e8ddd5]"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
