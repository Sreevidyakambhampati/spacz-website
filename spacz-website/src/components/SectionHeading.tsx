import type { ReactNode } from 'react'
import { Reveal, RevealLines } from './Reveal'

interface EyebrowProps {
  index?: string
  children: ReactNode
  tone?: 'ink' | 'paper'
}

/** Drawing-sheet style label: "03 — FOR ASPIRANTS" */
export function Eyebrow({ index, children, tone = 'ink' }: EyebrowProps) {
  const muted = tone === 'ink' ? 'text-mute' : 'text-mute-dark'
  return (
    <div className={`label flex items-center gap-3 ${muted}`}>
      {index && <span className={tone === 'ink' ? 'text-ink' : 'text-paper'}>{index}</span>}
      {index && <span className={`h-px w-8 ${tone === 'ink' ? 'bg-ink/25' : 'bg-paper/25'}`} aria-hidden="true" />}
      <span>{children}</span>
    </div>
  )
}

interface SectionHeadingProps {
  index?: string
  eyebrow: string
  lines: ReactNode[]
  intro?: ReactNode
  tone?: 'ink' | 'paper'
  className?: string
  size?: 'lg' | 'xl'
  id?: string
}

export function SectionHeading({ index, eyebrow, lines, intro, tone = 'ink', className = '', size = 'lg', id }: SectionHeadingProps) {
  const sizeCls =
    size === 'xl' ? 'text-[44px] sm:text-[60px] lg:text-[80px]' : 'text-[38px] sm:text-[48px] lg:text-[60px]'
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <h2 id={id} className={`headline mt-6 ${sizeCls} ${tone === 'ink' ? 'text-ink' : 'text-paper'}`}>
        <RevealLines lines={lines} />
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <div className={`mt-6 max-w-[34rem] text-[17px] leading-[1.6] ${tone === 'ink' ? 'text-mute' : 'text-mute-dark'}`}>
            {intro}
          </div>
        </Reveal>
      )}
    </div>
  )
}
