import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { StudySpaceCard } from '../components/StudySpaceCard'
import { filters, studySpaces, type FilterKey, type StudySpace } from '../data/studySpaces'

interface Props {
  area: string | null
  onOpen: (space: StudySpace) => void
}

export function StudySpaces({ area, onOpen }: Props) {
  const [active, setActive] = useState<FilterKey[]>([])
  const [query, setQuery] = useState('')
  const rail = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = studySpaces.filter(
      (s) =>
        active.every((k) => filters.find((f) => f.key === k)!.test(s)) &&
        (!q || s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q)),
    )
    if (area) list.sort((a, b) => Number(b.area === area) - Number(a.area === area))
    return list
  }, [active, query, area])

  const toggle = (k: FilterKey) => setActive((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))
  const scroll = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 760), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section id="explore" className="relative overflow-hidden py-28 sm:py-36" aria-labelledby="explore-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="explore-title"
            className="lg:col-span-7"
            index="04"
            eyebrow="Explore study spaces"
            lines={['Compare spaces,', 'not pamphlets.']}
          />
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[17px] leading-[1.6] text-mute">
              Try it. Filter, compare and open any study centre to walk through booking a seat, exactly as you would in the app.
            </p>
            <p className="label mt-4 text-[10px] text-mute">Demo listings · illustrative names and prices</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-14 flex flex-col gap-4 border-y border-ink/15 py-4 lg:flex-row lg:items-center">
          <label className="relative flex items-center lg:w-[280px]">
            <span className="sr-only">Search study centres</span>
            <Search className="pointer-events-none absolute left-0 h-4 w-4 text-mute" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search study centres"
              className="h-10 w-full bg-transparent pl-7 text-[15px] outline-none placeholder:text-mute"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-0 p-1 text-mute hover:text-ink" aria-label="Clear search">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <div className="hidden h-6 w-px bg-ink/15 lg:block" aria-hidden="true" />
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-1 lg:px-0" role="group" aria-label="Filters">
            {filters.map((f) => {
              const on = active.includes(f.key)
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(f.key)}
                  className={`shrink-0 rounded-[5px] border px-3.5 py-2 text-[13.5px] transition-colors duration-300 ${
                    on ? 'border-blue bg-blue text-white' : 'border-ink/15 text-ink hover:border-ink/40'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <span className="label text-mute" aria-live="polite">
              {results.length} {results.length === 1 ? 'space' : 'spaces'}
              {area ? ` · near ${area}` : ''}
            </span>
            <div className="flex gap-2">
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => scroll(d)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  aria-label={d === -1 ? 'Scroll to previous spaces' : 'Scroll to more spaces'}
                >
                  {d === -1 ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rail — aligned to the container on the left, bleeding off the right */}
      <div
        ref={rail}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pl-5 pr-5 scroll-pl-5 md:pl-10 md:scroll-pl-10 xl:pl-[max(56px,calc((100vw-1320px)/2+56px))] xl:scroll-pl-[max(56px,calc((100vw-1320px)/2+56px))]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {results.map((s) => (
            <motion.div
              key={s.id}
              layout={!reduce}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-[82vw] max-w-[360px] shrink-0 snap-start sm:w-[340px]"
            >
              <StudySpaceCard space={s} onOpen={onOpen} />
            </motion.div>
          ))}
        </AnimatePresence>
        {results.length === 0 && (
          <div className="flex h-[420px] w-full max-w-[1208px] flex-col items-start justify-center rounded-[10px] border border-dashed border-stone p-10">
            <p className="text-[22px] font-medium tracking-[-0.02em]">No spaces match every filter.</p>
            <p className="mt-2 text-mute">Try removing one — study halls rarely tick every box.</p>
            <button onClick={() => { setActive([]); setQuery('') }} className="mt-6 text-[14px] font-medium text-blue hover:underline">
              Clear filters
            </button>
          </div>
        )}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>
    </section>
  )
}
