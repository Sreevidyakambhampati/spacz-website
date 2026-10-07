import type { ReactNode } from 'react'

/** A restrained device frame for recreated SPACZ app screens. */
export function PhoneFrame({ children, className = '', label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div
      className={`relative mx-auto w-[280px] rounded-[44px] bg-ink p-[9px] shadow-[0_40px_80px_-30px_rgb(18_20_24/0.55),0_0_0_1px_rgb(18_20_24/0.9),inset_0_0_0_1.5px_rgb(255_255_255/0.08)] sm:w-[300px] ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[36px] bg-white">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
        <div className="flex h-8 items-end justify-between px-7 pb-0.5 text-[10px] font-medium text-ink" aria-hidden="true">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] bg-ink/80" />
            <span className="h-2 w-4 rounded-[2px] border border-ink/70" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 top-8">{children}</div>
      </div>
    </div>
  )
}

/** App-style header row: back chip + title, mirroring the SPACZ app. */
export function AppHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-3 pb-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f3f5]" aria-hidden="true">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
          <path d="M10 3 5 8l5 5" fill="none" stroke="#121418" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</span>
    </div>
  )
}
