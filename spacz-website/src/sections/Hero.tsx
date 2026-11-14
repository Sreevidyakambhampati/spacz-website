import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, CalendarDays, Check, Mail, MapPin, Timer } from 'lucide-react'
import { Button } from '../components/Button'
import { Photo } from '../components/Photo'
import { STUDY_SPACE_INQUIRY_SUBJECT, mailto, studySpaceInquiryHref } from '../lib/contact'
import { studySpaces } from '../data/studySpaces'
import type { StudySpace } from '../data/studySpaces'

const ease = [0.22, 1, 0.36, 1] as const
const areas = ['Ameerpet', 'SR Nagar', 'Kukatpally', 'Himayatnagar', 'Madhapur', 'Dilsukhnagar']
const words = ['focus.', 'flow.', 'seat.', 'quiet.']
const perks = ['See the seat layout', '15 & 30-day passes', 'Open-late & 24×7 halls']
const steps = ['Find a hall', 'Pick a desk', 'Choose your pass']

interface HeroProps {
  onOpenSpace: (space: StudySpace) => void
  /** false while the intro loader is on screen; entrance animations wait for it */
  ready?: boolean
}

export function Hero({ onOpenSpace, ready = true }: HeroProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2])

  // Cursor spotlight + gentle 3D tilt on the visual
  const mx = useMotionValue(50)
  const my = useMotionValue(30)
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgb(77 140 255 / 0.16), transparent 60%)`
  const tiltX = useSpring(useTransform(my, [0, 100], [5, -5]), { stiffness: 120, damping: 20 })
  const tiltY = useSpring(useTransform(mx, [0, 100], [-7, 7]), { stiffness: 120, damping: 20 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  // Rotating headline word
  const [word, setWord] = useState(0)
  useEffect(() => {
    if (reduce || !ready) return
    const id = setInterval(() => setWord((w) => (w + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [reduce, ready])

  // Inquiry — the chosen preferences are sent to SPACZ by email
  const [area, setArea] = useState('Ameerpet')
  const [when, setWhen] = useState('Today')
  const [duration, setDuration] = useState('30 days')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    window.location.href = mailto(
      STUDY_SPACE_INQUIRY_SUBJECT,
      `Hi SPACZ team,\n\nI'm looking for a study space.\n\nArea: ${area}\nFrom: ${when}\nDuration: ${duration}\n\nThanks!`,
    )
  }

  const show = ready ? 'show' : 'hidden'
  const rise = (delay: number) => ({
    initial: reduce ? false : ('hidden' as const),
    animate: reduce ? ('show' as const) : show,
    variants: {
      hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
      show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, delay, ease } },
    },
  })

  return (
    <section
      ref={ref}
      id="top"
      data-nav="dark"
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
      aria-labelledby="hero-title"
    >
      {/* ── Backdrop ─────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.18 }}
          animate={ready ? { scale: 1.04 } : undefined}
          transition={{ duration: 2.6, ease }}
        >
          <Photo name="reading-room" alt="" priority sizes="100vw" className="h-full w-full !bg-ink" imgClassName="opacity-40" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </motion.div>

      {/* Drifting light */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-40 top-[10%] h-[520px] w-[520px] rounded-full bg-blue/30 blur-[120px]"
          animate={reduce ? undefined : { x: [0, 120, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-32 bottom-[5%] h-[460px] w-[460px] rounded-full bg-blue-bright/20 blur-[130px]"
          animate={reduce ? undefined : { x: [0, -100, 0], y: [0, -70, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" style={{ background: spotlight }} aria-hidden="true" />

      {/* ── Content ──────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-x relative flex flex-1 flex-col justify-center pb-10 pt-[108px] sm:pt-[124px] lg:pb-14"
      >
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div
              {...rise(0.05)}
              className="inline-flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/[0.06] py-1.5 pl-2 pr-4 backdrop-blur-md"
            >
              <span className="relative flex h-5 items-center rounded-full bg-blue px-2 text-[10.5px] font-semibold uppercase tracking-[0.08em]">
                New
              </span>
              <span className="text-[13px] text-paper/80">The study space platform · India</span>
            </motion.div>

            <h1 id="hero-title" className="display mt-7 text-[50px] min-[390px]:text-[56px] sm:text-[84px] lg:text-[min(7.4vw,112px)]">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={ready ? { y: '0%' } : undefined}
                  transition={{ duration: 1.2, delay: 0.1, ease }}
                >
                  Find a space.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="flex flex-wrap items-baseline gap-x-[0.25em]"
                  initial={reduce ? false : { y: '110%' }}
                  animate={ready ? { y: '0%' } : undefined}
                  transition={{ duration: 1.2, delay: 0.22, ease }}
                >
                  <span className="font-light text-paper/55">Find your</span>
                  <span className="relative inline-grid">
                    {/* invisible widest word keeps the line from jumping */}
                    <span className="invisible col-start-1 row-start-1" aria-hidden="true">
                      quiet.
                    </span>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={words[word]}
                        className="col-start-1 row-start-1 bg-gradient-to-r from-blue-bright via-[#8fb6ff] to-paper bg-clip-text text-transparent"
                        initial={{ y: '70%', opacity: 0, filter: 'blur(8px)' }}
                        animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: '-70%', opacity: 0, filter: 'blur(8px)' }}
                        transition={{ duration: 0.7, ease }}
                      >
                        {words[word]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.span>
              </span>
            </h1>

            <motion.p {...rise(0.4)} className="mt-7 max-w-[34rem] text-[17px] leading-[1.6] text-paper/65 sm:text-[19px]">
              Discover study spaces built for long hours, quiet minds and serious preparation — and see how SPACZ takes you
              from finding a hall to choosing your desk.
            </motion.p>

            <motion.div {...rise(0.5)} className="mt-9 flex flex-col gap-3 min-[460px]:flex-row">
              <Button href={studySpaceInquiryHref} size="lg">
                Find Your Study Space
              </Button>
              <Button href="#owners" size="lg" variant="secondary-dark">
                List Your Study Hall
              </Button>
            </motion.div>

            <motion.ul {...rise(0.6)} className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[14px] text-paper/70">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue/20 text-blue-bright">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <div className="relative lg:col-span-5 [perspective:1400px]">
            <motion.div
              style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
              initial={reduce ? false : { opacity: 0, y: 60, rotateX: 18 }}
              animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
              transition={{ duration: 1.4, delay: 0.3, ease }}
              className="relative mx-auto max-w-[460px]"
            >
              {/* glow behind the card */}
              <div className="absolute -inset-6 -z-10 rounded-[28px] bg-blue/25 blur-3xl" aria-hidden="true" />

              <div className="relative overflow-hidden rounded-[20px] border border-paper/15 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.8)]">
                <div className="aspect-[4/5]">
                  <Photo
                    name="evening-desk"
                    alt="A lamp-lit study desk in the evening"
                    priority
                    sizes="(min-width: 1024px) 460px, 90vw"
                    className="h-full w-full !bg-graphite"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />
                {/* scan line */}
                {!reduce && (
                  <motion.div
                    className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-blue-bright/15 to-transparent"
                    animate={{ top: ['-20%', '110%'] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4" style={{ transform: 'translateZ(40px)' }}>
                  <HeroSpaceCard space={studySpaces[0]} onOpen={onOpenSpace} />
                </div>
              </div>

              {/* Floating chips */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -30, scale: 0.9 }}
                animate={ready ? { opacity: 1, x: 0, scale: 1 } : undefined}
                transition={{ duration: 0.9, delay: 1.1, ease }}
                className="absolute left-2 top-4 sm:-left-10 sm:top-8"
                style={{ z: 70 }}
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-2xl border border-paper/15 bg-ink/70 px-3.5 py-3 shadow-2xl backdrop-blur-xl"
                >
                  <span className="label block text-[9.5px] text-paper/50">How booking works</span>
                  <ol className="mt-2 space-y-1.5">
                    {steps.map((s, i) => (
                      <li key={s} className="flex items-center gap-2.5 text-[12.5px] font-medium leading-none">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue/25 font-mono text-[10px] text-blue-bright">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: 30, scale: 0.9 }}
                animate={ready ? { opacity: 1, x: 0, scale: 1 } : undefined}
                transition={{ duration: 0.9, delay: 1.3, ease }}
                className="absolute right-2 top-[38%] sm:-right-8"
                style={{ z: 90 }}
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-2xl border border-paper/15 bg-paper/10 px-3.5 py-2.5 shadow-2xl backdrop-blur-xl"
                >
                  <span className="label block text-[9.5px] text-paper/55">Open</span>
                  <span className="block whitespace-nowrap text-[15px] font-medium tabular-nums">6 AM – 11 PM</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Search */}
        <motion.form
          {...rise(0.75)}
          onSubmit={submit}
          className="relative mt-14 grid overflow-hidden rounded-2xl border border-paper/15 bg-paper/[0.07] p-1.5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)] backdrop-blur-xl md:grid-cols-[1.3fr_1fr_1fr_auto] lg:mt-16"
          aria-label="Request a study space by email"
        >
          <SearchField icon={MapPin} label="Where" id="hero-area" value={area} onChange={setArea} options={areas} />
          <SearchField icon={CalendarDays} label="From" id="hero-when" value={when} onChange={setWhen} options={['Today', 'Tomorrow', 'Next Monday']} />
          <SearchField icon={Timer} label="Duration" id="hero-duration" value={duration} onChange={setDuration} options={['15 days', '30 days']} />
          <button
            type="submit"
            className="group relative mt-1.5 flex min-h-14 items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-blue px-8 text-[15px] font-medium text-white transition-colors hover:bg-blue-deep md:mt-0"
          >
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-calm group-hover:translate-x-full"
              aria-hidden="true"
            />
            <Mail className="relative h-4 w-4" aria-hidden="true" />
            <span className="relative">Send inquiry</span>
          </button>
        </motion.form>
      </motion.div>

      {/* Area marquee */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1 }}
        className="relative border-t border-paper/10 py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...areas, ...areas, ...areas, ...areas].map((a, i) => (
            <span key={i} className="label flex items-center gap-10 text-[11px] text-paper/40">
              {a}
              <span className="h-1 w-1 rounded-full bg-blue-bright/60" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function SearchField({
  icon: Icon,
  label,
  id,
  value,
  onChange,
  options,
}: {
  icon: typeof MapPin
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <div className="relative rounded-xl px-5 py-3 transition-colors focus-within:bg-paper/[0.08] hover:bg-paper/[0.06]">
      <label htmlFor={id} className="label flex items-center gap-2 text-[10px] text-paper/50">
        <Icon className="h-3 w-3" aria-hidden="true" /> {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full cursor-pointer appearance-none bg-transparent pr-6 text-[16px] font-medium tracking-[-0.01em] text-paper outline-none [&>option]:text-ink"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <svg viewBox="0 0 12 12" className="pointer-events-none absolute bottom-4 right-5 h-3 w-3 text-paper/50" aria-hidden="true">
        <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </div>
  )
}

/** Floating study-space card — the product sitting on top of the place. */
function HeroSpaceCard({ space, onOpen }: { space: StudySpace; onOpen: (s: StudySpace) => void }) {
  const [hover, setHover] = useState(false)
  // 12 desks of Block A; occupied pattern is illustrative
  const pattern = [1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0]
  const highlight = 5
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="rounded-2xl border border-paper/15 bg-ink/65 p-4 text-paper shadow-2xl backdrop-blur-xl sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="label text-[10px] text-paper/50">Example listing</div>
          <div className="mt-1 text-[18px] font-medium tracking-[-0.02em]">{space.name}</div>
          <div className="text-[13px] text-paper/55">
            {space.area}, {space.city}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[18px] font-medium tracking-[-0.02em] tabular-nums">₹{space.pricePerDay}</div>
          <div className="label text-[9.5px] text-paper/50">/ day</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-[3px]" aria-hidden="true">
        {pattern.map((occ, i) => (
          <span
            key={i}
            className={`h-[14px] rounded-[3px] border transition-colors duration-500 ${
              hover && i === highlight ? 'border-blue-bright bg-blue' : occ ? 'border-paper/10 bg-paper/[0.12]' : 'border-paper/35'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] text-paper/70">
          <span className={`h-2 w-2 rounded-[2px] transition-colors duration-500 ${hover ? 'bg-blue-bright' : 'bg-paper/35'}`} aria-hidden="true" />
          {hover ? 'A06 · window desk' : 'Example seat layout'}
        </span>
        <button
          type="button"
          onClick={() => onOpen(space)}
          className="flex items-center gap-1 text-[13px] font-medium text-blue-bright hover:text-white"
        >
          See the process <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
