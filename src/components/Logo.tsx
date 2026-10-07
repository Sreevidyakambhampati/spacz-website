// The SPACZ mark: a 2×2 desk plan with one seat taken — yours.
export function LogoMark({ className = '', tone = 'ink' }: { className?: string; tone?: 'ink' | 'paper' }) {
  const stroke = tone === 'ink' ? '#121418' : '#F3EFE7'
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2.75" y="2.75" width="8" height="8" rx="1.6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x="13.25" y="2.75" width="8" height="8" rx="1.6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x="2.75" y="13.25" width="8" height="8" rx="1.6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1.9" fill="#1F6BEF" />
    </svg>
  )
}

export function Logo({ tone = 'ink', className = '' }: { tone?: 'ink' | 'paper'; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-[22px] w-[22px]" tone={tone} />
      <span
        className={`text-[17px] font-semibold tracking-[0.14em] ${tone === 'ink' ? 'text-ink' : 'text-paper'}`}
      >
        SPACZ
      </span>
    </span>
  )
}
