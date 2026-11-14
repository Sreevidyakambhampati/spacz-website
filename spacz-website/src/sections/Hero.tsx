import { useRef, useState, type FormEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { CalendarDays, Mail, MapPin, Timer } from 'lucide-react'
import { Button } from '../components/Button'
import { Photo } from '../components/Photo'
import { STUDY_SPACE_INQUIRY_SUBJECT, mailto, studySpaceInquiryHref } from '../lib/contact'

const ease = [0.22, 1, 0.36, 1] as const
const areas = ['Ameerpet', 'SR Nagar', 'Kukatpally', 'Himayatnagar', 'Madhapur', 'Dilsukhnagar']

interface HeroProps {
  /** false while the intro loader is on screen; entrance animations wait for it */
  ready?: boolean
}

export function Hero({ ready = true }: HeroProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])

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

  const rise = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: ready ? { opacity: 1, y: 0 } : undefined,
          transition: { duration: 1, delay: d, ease },
        }

  return (
    <section ref={ref} id="top" className="grain relative overflow-hidden pb-16 pt-[104px] sm:pt-[120px] lg:pb-24 lg:pt-[132px]">
      <div className="container-x relative">
        <motion.div {...rise(0.05)} className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-mute">
          <span className="text-ink">The study space platform</span>
          <span className="h-px w-8 bg-ink/25" aria-hidden="true" />
          <span>India · 17.43° N</span>
        </motion.div>

        <h1 className="display mt-7 text-[54px] text-ink min-[390px]:text-[58px] sm:text-[84px] lg:whitespace-nowrap lg:text-[min(9.2vw,136px)]">
          {['Find a space.', 'Find your focus'].map((line, i) => (
            <span key={line} className={`block overflow-hidden pb-[0.06em] ${i === 1 ? 'lg:pl-[1.15em]' : ''}`}>
              <motion.span
                className="block"
                initial={reduce ? false : { y: '110%' }}
                animate={ready ? { y: '0%' } : undefined}
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
              <Button href={studySpaceInquiryHref} size="lg">
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

          {/* Place */}
          <motion.div
            className="group/hero relative lg:col-span-8"
            initial={reduce ? false : { opacity: 0, clipPath: 'inset(8% 8% 8% 8%)' }}
            animate={ready ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
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
          </motion.div>
        </div>

        {/* Inquiry — the first product moment */}
        <motion.form
          {...rise(0.7)}
          onSubmit={submit}
          className="relative mt-14 grid overflow-hidden rounded-[10px] border border-line bg-[#fbf9f5] shadow-[0_30px_60px_-40px_rgb(18_20_24/0.35)] md:grid-cols-[1.3fr_1fr_1fr_auto] lg:mt-16"
          aria-label="Request a study space by email"
        >
          <SearchField icon={MapPin} label="Where" id="hero-area" value={area} onChange={setArea} options={areas} />
          <SearchField icon={CalendarDays} label="From" id="hero-when" value={when} onChange={setWhen} options={['Today', 'Tomorrow', 'Next Monday']} />
          <SearchField icon={Timer} label="Duration" id="hero-duration" value={duration} onChange={setDuration} options={['15 days', '30 days']} />
          <div className="p-2">
            <button
              type="submit"
              className="flex h-full min-h-14 w-full items-center justify-center gap-2.5 rounded-[6px] bg-ink px-7 text-[15px] font-medium text-paper transition-colors hover:bg-blue md:w-auto"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Send inquiry
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
