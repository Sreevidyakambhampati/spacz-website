import { useRef, useState, type FormEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, CalendarDays, MapPin, Search, Timer } from 'lucide-react'
import { Button } from '../components/Button'
import { Photo } from '../components/Photo'
import { studySpaces } from '../data/studySpaces'
import type { StudySpace } from '../data/studySpaces'

const ease = [0.22, 1, 0.36, 1] as const
const areas = ['Ameerpet', 'SR Nagar', 'Kukatpally', 'Himayatnagar', 'Madhapur', 'Dilsukhnagar']

interface HeroProps {
  onSearch: (area: string) => void
  onOpenSpace: (space: StudySpace) => void
}

export function Hero({ onSearch, onOpenSpace }: HeroProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])

  const [area, setArea] = useState('Ameerpet')
  const [when, setWhen] = useState('Today')
  const [duration, setDuration] = useState('30 days')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(area)
    document.getElementById('explore')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  const rise = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease } }

  return (
    <section ref={ref} id="top" className="grain relative overflow-hidden pb-16 pt-[104px] sm:pt-[120px] lg:pb-24 lg:pt-[132px]">
      {/* Architectural guide lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="container-x relative h-full">
          <div className="absolute inset-y-0 left-5 w-px bg-ink/[0.06] md:left-10 xl:left-14" />
          <div className="absolute inset-y-0 right-5 w-px bg-ink/[0.06] md:right-10 xl:right-14" />
        </div>
      </div>

      <div className="container-x relative">
        <motion.div {...rise(0.05)} className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-mute">
          <span className="text-ink">The study space platform</span>
          <span className="h-px w-8 bg-ink/25" aria-hidden="true" />
          <span>Hyderabad · 17.43° N</span>
        </motion.div>

        <h1 className="display mt-7 text-[54px] text-ink min-[390px]:text-[58px] sm:text-[84px] lg:whitespace-nowrap lg:text-[min(9.2vw,136px)]">
              {['Find a space.', 'Find your focus'].map((line, i) => (
                <span key={line} className={`block overflow-hidden pb-[0.06em] ${i === 1 ? 'lg:pl-[1.15em]' : ''}`}>
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease }}
                  >
                    {line}
                    {i === 1 && (
                      <span
                        className="ml-[0.04em] inline-block h-[0.17em] w-[0.17em] translate-y-[-0.02em] rounded-[0.03em] bg-blue align-baseline"
                        aria-hidden="true"
                      />
                    )}
                    {i === 1 && <span className="sr-only">.</span>}
                  </motion.span>
                </span>
              ))}
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="flex flex-col lg:col-span-4">
            <motion.p {...rise(0.45)} className="max-w-[30rem] text-[17px] leading-[1.6] text-mute sm:text-[19px]">
              SPACZ helps aspirants discover and book study spaces built for long hours, quiet minds and serious preparation.
            </motion.p>

            <motion.div {...rise(0.55)} className="mt-9 flex flex-col gap-3 min-[460px]:flex-row lg:flex-col lg:items-start">
              <Button href="#explore" size="lg">
                Find Your Study Space
              </Button>
              <Button href="#owners" size="lg" variant="secondary">
                List Your Study Hall
              </Button>
            </motion.div>

            <motion.dl {...rise(0.65)} className="mt-12 hidden grid-cols-2 gap-6 border-t border-ink/15 pt-6 lg:mt-auto lg:grid">
              <div>
                <dt className="label text-[10px] text-mute">For aspirants</dt>
                <dd className="mt-2 text-[14.5px] leading-snug">Discover, compare and book a seat.</dd>
              </div>
              <div>
                <dt className="label text-[10px] text-mute">For study halls</dt>
                <dd className="mt-2 text-[14.5px] leading-snug">Seats, pricing and bookings, organised.</dd>
              </div>
            </motion.dl>
          </div>

          {/* Place + product */}
          <motion.div
            className="group/hero relative lg:col-span-8"
            initial={reduce ? false : { opacity: 0, clipPath: 'inset(8% 8% 8% 8%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
          >
            <div className="crop relative text-ink/40">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] sm:aspect-[16/10]">
                <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
                  <Photo
                    name="reading-room"
                    alt="Aspirants studying at long reading tables under desk lamps"
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.6s] ease-calm group-hover/hero:scale-[1.03]"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <span className="crop-mark -left-2 -top-2 border-l border-t" aria-hidden="true" />
              <span className="crop-mark -right-2 -top-2 border-r border-t" aria-hidden="true" />
              <span className="crop-mark -bottom-2 -left-2 border-b border-l" aria-hidden="true" />
              <span className="crop-mark -bottom-2 -right-2 border-b border-r" aria-hidden="true" />
            </div>

            <motion.div style={{ y: cardY }} className="absolute bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:w-[310px] lg:bottom-8 lg:right-8">
              <motion.div {...rise(0.9)}>
                <HeroSpaceCard space={studySpaces[0]} onOpen={onOpenSpace} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Search — the first product moment */}
        <motion.form
          {...rise(0.7)}
          onSubmit={submit}
          className="relative mt-14 grid overflow-hidden rounded-[10px] border border-line bg-[#fbf9f5] shadow-[0_30px_60px_-40px_rgb(18_20_24/0.35)] md:grid-cols-[1.3fr_1fr_1fr_auto] lg:mt-16"
          aria-label="Search study spaces (demo)"
        >
          <SearchField icon={MapPin} label="Where" id="hero-area" value={area} onChange={setArea} options={areas} />
          <SearchField icon={CalendarDays} label="From" id="hero-when" value={when} onChange={setWhen} options={['Today', 'Tomorrow', 'Next Monday']} />
          <SearchField icon={Timer} label="Duration" id="hero-duration" value={duration} onChange={setDuration} options={['15 days', '30 days']} />
          <div className="p-2">
            <button
              type="submit"
              className="flex h-full min-h-14 w-full items-center justify-center gap-2.5 rounded-[6px] bg-ink px-7 text-[15px] font-medium text-paper transition-colors hover:bg-blue md:w-auto"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search spaces
            </button>
          </div>
        </motion.form>
      </div>
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
    <div className="relative border-b border-line px-5 py-3.5 transition-colors focus-within:bg-white hover:bg-white md:border-b-0 md:border-r">
      <label htmlFor={id} className="label flex items-center gap-2 text-[10px] text-mute">
        <Icon className="h-3 w-3" aria-hidden="true" /> {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full cursor-pointer appearance-none bg-transparent pr-6 text-[16px] font-medium tracking-[-0.01em] text-ink outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <svg viewBox="0 0 12 12" className="pointer-events-none absolute bottom-5 right-5 h-3 w-3 text-mute" aria-hidden="true">
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
      className={`rounded-[10px] bg-paper/95 p-4 backdrop-blur-md transition-[transform,box-shadow] duration-700 ease-calm sm:p-5 ${
        hover
          ? '-translate-y-1.5 shadow-[0_40px_70px_-30px_rgb(18_20_24/0.6),0_0_0_1px_rgb(18_20_24/0.08)]'
          : 'shadow-[0_24px_50px_-30px_rgb(18_20_24/0.5),0_0_0_1px_rgb(18_20_24/0.06)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="label text-[10px] text-mute">Study centre</div>
          <div className="mt-1 text-[19px] font-medium tracking-[-0.02em]">{space.name}</div>
          <div className="text-[13px] text-mute">
            {space.area}, {space.city}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[19px] font-medium tracking-[-0.02em] tabular-nums">₹{space.pricePerDay}</div>
          <div className="label text-[9.5px] text-mute">/ day</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-[3px]" aria-hidden="true">
        {pattern.map((occ, i) => (
          <span
            key={i}
            className={`h-[14px] rounded-[2px] border transition-colors duration-500 ${
              hover && i === highlight
                ? 'border-blue bg-blue'
                : occ
                  ? 'border-ink/10 bg-ink/[0.08]'
                  : 'border-ink/35'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px]" aria-live="polite">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className={`absolute inset-0 rounded-full ${hover ? 'bg-blue/50' : 'bg-moss/60'} animate-breathe`} />
            <span className={`relative h-2 w-2 rounded-full transition-colors duration-500 ${hover ? 'bg-blue' : 'bg-moss'}`} />
          </span>
          {hover ? 'A06 is free · window desk' : `${space.seatsAvailable} seats available`}
        </span>
        <button
          type="button"
          onClick={() => onOpen(space)}
          className="flex items-center gap-1 text-[13px] font-medium text-blue hover:text-blue-deep"
        >
          View space <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
