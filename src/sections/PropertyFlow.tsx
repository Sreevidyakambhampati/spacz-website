import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2 } as const

const stages: { title: string; body: string; art: ReactNode }[] = [
  {
    title: 'Property',
    body: 'Name, address, photos and the story of your hall.',
    art: (
      <g {...S}>
        <path d="M30 78V30l30-14 30 14v48" />
        <path d="M22 78h76" />
        {[40, 55, 70].map((x) => [36, 50].map((y) => <rect key={`${x}${y}`} x={x - 4} y={y} width="8" height="9" />))}
        <path d="M54 78V66h12v12" />
      </g>
    ),
  },
  {
    title: 'Amenities',
    body: 'Wi-Fi, A/C, lockers, power backup — what aspirants can count on.',
    art: (
      <g {...S}>
        {[22, 38, 54, 70].map((y, i) => (
          <g key={y}>
            <rect x="26" y={y - 5} width="10" height="10" rx="1.5" />
            {i < 3 && <path d={`M28.5 ${y} l2.2 2.4 4-4.6`} />}
            <path d={`M44 ${y}h${48 - i * 7}`} />
          </g>
        ))}
      </g>
    ),
  },
  {
    title: 'Blocks',
    body: 'Divide the floor the way it is built: silent zones, cabins, reading tables.',
    art: (
      <g {...S}>
        <rect x="20" y="16" width="80" height="62" />
        <path d="M60 16v62M20 47h80" strokeDasharray="3 3" />
        {[
          ['A', 36, 34],
          ['B', 76, 34],
          ['C', 36, 65],
          ['D', 76, 65],
        ].map(([t, x, y]) => (
          <text key={t as string} x={x as number} y={y as number} fill="currentColor" stroke="none" fontSize="10" fontFamily="Geist Mono">
            {t}
          </text>
        ))}
      </g>
    ),
  },
  {
    title: 'Seats',
    body: 'Number every desk, so availability is exact, not approximate.',
    art: (
      <g {...S}>
        {Array.from({ length: 12 }, (_, i) => {
          const x = 24 + (i % 4) * 19
          const y = 20 + Math.floor(i / 4) * 20
          return <rect key={i} x={x} y={y} width="14" height="10" rx="1.5" fill={i === 6 ? '#4d8cff' : 'none'} stroke={i === 6 ? '#4d8cff' : 'currentColor'} />
        })}
      </g>
    ),
  },
  {
    title: 'Pricing',
    body: 'Daily and duration-based pricing, by seat type, with timings.',
    art: (
      <g {...S}>
        {[26, 46, 66].map((y, i) => (
          <g key={y}>
            <path d={`M24 ${y}h40`} />
            <text x="76" y={y + 3.5} fill="currentColor" stroke="none" fontSize="10" fontFamily="Geist Mono">
              ₹{['120', '1.4k', '2.5k'][i]}
            </text>
          </g>
        ))}
      </g>
    ),
  },
  {
    title: 'Live',
    body: 'Your hall is discoverable, bookable and organised — in one place.',
    art: (
      <g {...S}>
        <rect x="42" y="12" width="36" height="68" rx="6" />
        <circle cx="60" cy="42" r="12" stroke="#4d8cff" strokeDasharray="2 3" />
        <path d="M60 50c-5-6-7-9-7-12a7 7 0 0 1 14 0c0 3-2 6-7 12Z" fill="#4d8cff" stroke="none" />
        <circle cx="60" cy="38" r="2.4" fill="#121418" stroke="none" />
      </g>
    ),
  },
]

export function PropertyFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])

  return (
    <section id="property" data-nav="dark" className="plan-grid-dark relative bg-ink pb-28 pt-24 text-paper sm:pb-36" aria-labelledby="property-title">
      <div className="container-x">
        <div className="grid gap-8 border-t border-paper/10 pt-20 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="property-title"
            tone="paper"
            className="lg:col-span-7"
            index="09"
            eyebrow="Property setup"
            lines={['From a physical hall', 'to a live digital space.']}
          />
          <p className="text-[17px] leading-[1.6] text-mute-dark lg:col-span-4 lg:col-start-9">
            The owner workflow in SPACZ follows the building itself. Describe the property, then its blocks, then every seat — and the
            hall goes live.
          </p>
        </div>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* Progress rule */}
          <div className="absolute left-[27px] top-0 h-full w-px bg-paper/12 lg:left-0 lg:top-[27px] lg:h-px lg:w-full" aria-hidden="true">
            <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-blue-bright lg:hidden" />
            <motion.div style={{ scaleX: fill }} className="hidden h-full w-full origin-left bg-blue-bright lg:block" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-6 lg:gap-5">
            {stages.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="relative flex gap-6 lg:block">
                <span
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-mono text-[12px] ${
                    i === stages.length - 1 ? 'border-blue-bright bg-blue text-white' : 'border-paper/25 bg-ink text-paper'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 lg:mt-8">
                  <div className="aspect-[4/3] rounded-[4px] border border-paper/12 bg-ink-2 text-paper/60">
                    <svg viewBox="0 0 120 92" className="h-full w-full" aria-hidden="true">
                      {s.art}
                    </svg>
                  </div>
                  <h3 className="mt-5 text-[20px] font-medium tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-mute-dark">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
