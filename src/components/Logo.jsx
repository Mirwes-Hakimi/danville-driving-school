export default function Logo({ theme = 'light', iconSize = 44, compact = false }) {
  const isDark = theme === 'dark'

  return (
    <div className="flex items-center gap-3">
      {/* Emblem */}
      <svg width={iconSize} height={iconSize} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'bounding-box', display: 'block' }}>
        {/* Red outer ring */}
        <circle cx="26" cy="26" r="26" fill="#dc2626"/>
        {/* Dark inner circle */}
        <circle cx="26" cy="26" r="22" fill="#0f172a"/>
        {/* Thin red accent ring */}
        <circle cx="26" cy="26" r="19.5" fill="none" stroke="#ef4444" strokeWidth="0.75" opacity="0.45"/>

        {/* Car body — white */}
        <path d="M8 33 L8 27 L11 27 L15 20 L30 20 L35 24 L42 24 L44 26 L44 33 Z" fill="white"/>

        {/* Window — red */}
        <path d="M12.5 27 L16 21 L29 21 L33.5 25 L12.5 25 Z" fill="#dc2626"/>

        {/* Subtle door seam */}
        <line x1="22" y1="20.5" x2="22" y2="33" stroke="#e2e8f0" strokeWidth="0.6" opacity="0.25"/>

        {/* Rear wheel */}
        <circle cx="16" cy="34" r="5.5" fill="#334155"/>
        <circle cx="16" cy="34" r="3.2" fill="none" stroke="white" strokeWidth="1" opacity="0.75"/>
        <circle cx="16" cy="34" r="1.1" fill="white" opacity="0.8"/>

        {/* Front wheel */}
        <circle cx="37" cy="34" r="5.5" fill="#334155"/>
        <circle cx="37" cy="34" r="3.2" fill="none" stroke="white" strokeWidth="1" opacity="0.75"/>
        <circle cx="37" cy="34" r="1.1" fill="white" opacity="0.8"/>

        {/* EST. 1989 */}
        <text x="26" y="47" textAnchor="middle" fontSize="4.2" fill="white" opacity="0.5"
          fontFamily="system-ui, sans-serif" letterSpacing="1.8" fontWeight="600">
          EST. 1989
        </text>
      </svg>

      {/* Wordmark */}
      {!compact && (
        <div className="leading-none">
          <p className={`font-black text-sm tracking-[0.22em] uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Danville
          </p>
          <p className="font-bold text-[10px] tracking-[0.18em] uppercase text-red-600 mt-0.5">
            Driving School
          </p>
          <p className={`text-[8px] tracking-[0.15em] mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Est. 1989
          </p>
        </div>
      )}
    </div>
  )
}
