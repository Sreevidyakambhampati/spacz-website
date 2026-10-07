import { useEffect, useRef, useState, type ComponentType } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { PhoneFrame } from '../components/PhoneFrame'
import { BookScreen, ChooseScreen, DiscoverScreen, FocusScreen } from '../components/AppScreens'
import { Photo } from '../components/Photo'
import type { PhotoKey } from '../lib/photos'

interface Step {
  key: string
  title: string
  line: string
  body: string
  points: string[]
  Screen: ComponentType
  backdrop: PhotoKey | 'plan' | 'calendar'
  screenLabel: string
}

const steps: Step[] = [
  {
    key: 'discover',
    title: 'Discover',
    line: 'Find study centres around you.',
    body: 'Start from where you are. Search by area or let SPACZ find study halls nearby, with distance, price and open seats visible at a glance.',
    points: ['Location-aware results', 'Search by area or name', 'Filters for A/C, Wi-Fi, 24/7'],
    Screen: DiscoverScreen,
    backdrop: 'plan',
    screenLabel: 'SPACZ app: list of study centres near Ameerpet with a map and filters',
  },
  {
    key: 'choose',
    title: 'Choose',
    line: 'Compare the space before you commit.',
    body: 'See the hall, its timings, what it costs and what it offers — seats available, amenities, location — before you ever climb the stairs.',
    points: ['Seats available, live', 'Day and monthly pricing', 'Amenities and timings'],
    Screen: ChooseScreen,
    backdrop: 'hall-bright',
    screenLabel: 'SPACZ app: Focus Hall details with seats, pricing and amenities',
  },
  {
    key: 'book',
    title: 'Book',
    line: 'Reserve the space that works for you.',
    body: 'Pick a start date and a duration that fits your preparation, choose your exact desk from the seat plan, and review the price breakup.',
    points: ['Start date and duration', 'Pick your exact seat', 'Clear price breakup'],
    Screen: BookScreen,
    backdrop: 'calendar',
    screenLabel: 'SPACZ app: selecting a start date, a 30-day duration and seat A05',
  },
  {
    key: 'focus',
    title: 'Focus',
    line: 'Then get back to what matters.',
    body: 'Your seat is reserved with a booking ID, dates and seat number in your pocket. Walk in, sit down, and spend the hours on preparation instead of logistics.',
    points: ['Booking ID and seat number', 'Valid from and to dates', 'Offers and updates from your hall'],
    Screen: FocusScreen,
    backdrop: 'solo-study',
    screenLabel: 'SPACZ app: booking reserved for seat A05 at Focus Hall',
  },
]

export function Experience() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const current = steps[active]

  return (
    <section id="platform" className="relative bg-paper-2 py-28 sm:py-36" aria-labelledby="experience-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            id="experience-title"
            className="lg:col-span-8"
            index="03"
            eyebrow="The SPACZ experience"
            lines={['Everything between', 'you and your desk.']}
          />
          <p className="self-end text-[17px] leading-[1.6] text-mute lg:col-span-4">
            One flow, built on the way the SPACZ app actually works — from the first search to the seat number in your pocket.
          </p>
        </div>

        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          {/* Steps */}
          <div className="lg:col-span-6">
            {steps.map((s, i) => (
              <div
                key={s.key}
                ref={(el) => {
                  refs.current[i] = el
                }}
                data-index={i}
                className="flex flex-col justify-center border-t border-ink/15 py-14 first:border-t-0 first:pt-0 lg:min-h-[78vh] lg:border-t-0 lg:py-0"
              >
                <div
                  className={`transition-opacity duration-700 ease-calm ${active === i ? 'lg:opacity-100' : 'lg:opacity-30'}`}
                >
                  <div className="label flex items-center gap-3 text-mute">
                    <span className={active === i ? 'text-blue' : ''}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-8 bg-ink/25" aria-hidden="true" />
                    <span>{s.line}</span>
                  </div>
                  <h3 className="display mt-5 text-[64px] sm:text-[88px] lg:text-[104px]">{s.title}</h3>
                  <p className="mt-6 max-w-[30rem] text-[17px] leading-[1.65] text-mute">{s.body}</p>
                  <ul className="mt-7 grid max-w-[30rem] gap-px overflow-hidden rounded-[6px] border border-ink/10 bg-ink/10 sm:grid-cols-3">
                    {s.points.map((p) => (
                      <li key={p} className="bg-paper-2 px-3.5 py-3 text-[13px] leading-snug text-ink">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile / tablet: each step carries its own screen */}
                <div className="mt-12 lg:hidden">
                  <StagePanel step={s} />
                </div>
              </div>
            ))}
          </div>

          {/* Sticky stage */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[11vh] h-[78vh]">
              <div className="relative h-full overflow-hidden rounded-[4px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.key + '-bg'}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Backdrop kind={current.backdrop} />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PhoneFrame label={current.screenLabel} className="!w-[272px] xl:!w-[290px]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={current.key}
                        className="absolute inset-0"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <current.Screen />
                      </motion.div>
                    </AnimatePresence>
                  </PhoneFrame>
                </div>
                <div className="label absolute bottom-4 left-4 flex items-center gap-3 rounded-[3px] bg-paper/90 px-2.5 py-1.5 text-ink backdrop-blur">
                  <span className="tabular-nums">{String(active + 1).padStart(2, '0')} / 04</span>
                  <span className="text-mute">{current.title}</span>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-1.5" aria-hidden="true">
                  {steps.map((s, i) => (
                    <span key={s.key} className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-blue' : 'w-1.5 bg-paper/80'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StagePanel({ step }: { step: Step }) {
  return (
    <div className="relative overflow-hidden rounded-[4px] py-10">
      <div className="absolute inset-0">
        <Backdrop kind={step.backdrop} />
      </div>
      <div className="relative">
        <PhoneFrame label={step.screenLabel} className="!w-[250px]">
          <step.Screen />
        </PhoneFrame>
      </div>
    </div>
  )
}

function Backdrop({ kind }: { kind: Step['backdrop'] }) {
  if (kind === 'plan') {
    return (
      <div className="plan-grid relative h-full w-full bg-paper-3">
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-ink/25" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="120" cy="140" r="60" strokeDasharray="3 5" />
            <circle cx="120" cy="140" r="120" strokeDasharray="3 5" />
            <circle cx="120" cy="140" r="190" strokeDasharray="3 5" />
            <path d="M0 330 C120 300 200 360 400 300" strokeWidth="10" stroke="rgb(255 255 255 / 0.7)" />
            <path d="M260 0 L300 500" strokeWidth="8" stroke="rgb(255 255 255 / 0.7)" />
          </g>
          <circle cx="120" cy="140" r="6" fill="#1F6BEF" />
          <circle cx="120" cy="140" r="14" fill="#1F6BEF" opacity="0.15" />
          {[
            [300, 120],
            [80, 380],
            [340, 410],
            [210, 250],
          ].map(([x, y], i) => (
            <rect key={i} x={x - 5} y={y - 5} width="10" height="10" rx="2" fill="#121418" />
          ))}
        </svg>
      </div>
    )
  }
  if (kind === 'calendar') {
    const days = Array.from({ length: 35 }, (_, i) => i - 2)
    return (
      <div className="relative h-full w-full bg-ink p-8">
        <div className="grid h-full grid-cols-7 gap-1.5 opacity-90" aria-hidden="true">
          {days.map((d, i) => {
            const inRange = d >= 7 && d <= 31
            return (
              <div
                key={i}
                className={`flex items-start justify-end rounded-[2px] p-1.5 font-mono text-[10px] ${
                  d < 1 ? 'text-transparent' : inRange ? 'bg-blue/25 text-paper' : 'bg-paper/[0.04] text-paper/40'
                } ${d === 7 ? '!bg-blue text-white' : ''}`}
              >
                {d > 0 ? d : ''}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return <Photo name={kind} alt="" className="h-full w-full" sizes="50vw" />
}
