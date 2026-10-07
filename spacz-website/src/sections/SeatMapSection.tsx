import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { DoorClosed, PlugZap, Sun, Users } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { SeatLegend, SeatMap } from '../components/SeatMap'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { buildBlocks, seatPrice, type Seat } from '../data/seats'
import { inr, studySpaces, type StudySpace } from '../data/studySpaces'

const hall = studySpaces[0]

export function SeatMapSection({ onOpen }: { onOpen: (s: StudySpace) => void }) {
  const blocks = useMemo(() => buildBlocks(7), [])
  const firstFree = blocks[0].seats.find((s) => s.status === 'available')!
  const [seat, setSeat] = useState<Seat>(firstFree)
  const [days, setDays] = useState<15 | 30>(30)
  const reduce = useReducedMotion()

  const totalFree = blocks.reduce((n, b) => n + b.seats.filter((s) => s.status === 'available').length, 0)
  const totalSeats = blocks.reduce((n, b) => n + b.seats.length, 0)
  const block = blocks.find((b) => b.id === seat.block)!
  const base = days === 30 ? hall.price30 : hall.price15
  const price = seat.cabin ? seatPrice(seat, base) : base

  const features = [
    seat.window && { icon: Sun, text: 'Window side, daylight desk' },
    seat.cabin && { icon: DoorClosed, text: 'Private cabin with partitions' },
    { icon: PlugZap, text: 'Power socket at desk' },
    { icon: Users, text: `${block.seats.filter((s) => s.status === 'available').length} of ${block.seats.length} free in ${block.name}` },
  ].filter(Boolean) as { icon: typeof Sun; text: string }[]

  return (
    <section id="seat-map" data-nav="dark" className="plan-grid-dark relative bg-ink py-28 text-paper sm:py-36" aria-labelledby="seatmap-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="seatmap-title"
            tone="paper"
            className="lg:col-span-7"
            index="05"
            eyebrow="Seat plan"
            lines={['Choose the desk,', 'not just the hall.']}
          />
          <p className="text-[17px] leading-[1.6] text-mute-dark lg:col-span-4 lg:col-start-9">
            Study halls on SPACZ are mapped the way they are built: blocks, rows and desks. Choose a window desk, a silent block or a
            private cabin, and see what is free right now.
          </p>
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <div className="grid gap-10 rounded-[6px] border border-paper/10 bg-ink-2/80 p-4 backdrop-blur-sm sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
            {/* Plan */}
            <div className="lg:col-span-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="label text-mute-dark">Floor plan · demo</div>
                  <div className="mt-1 text-[20px] font-medium tracking-[-0.02em]">
                    {hall.name}, {hall.area} — Floor 1
                  </div>
                </div>
                <div className="label text-mute-dark">
                  <span className="text-paper">{totalFree}</span> / {totalSeats} desks free
                </div>
              </div>
              <div className="pb-6">
                <SeatMap blocks={blocks} selected={seat.id} onSelect={setSeat} tone="dark" />
              </div>
              <div className="mt-6">
                <SeatLegend tone="dark" />
              </div>
            </div>

            {/* Seat detail */}
            <aside className="flex flex-col border-t border-paper/10 pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" aria-live="polite">
              <div className="label text-mute-dark">Selected seat</div>
              <div className="relative mt-3 h-[84px] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={seat.id}
                    initial={reduce ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-mono text-[76px] font-medium leading-none tracking-[-0.04em]"
                  >
                    {seat.id}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-2 text-[15px] text-mute-dark">
                {block.name} · {block.zone}
              </div>

              <ul className="mt-7 space-y-3 border-t border-paper/10 pt-6">
                {features.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-[14.5px] text-paper/85">
                    <Icon className="h-4 w-4 text-mute-dark" aria-hidden="true" /> {text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-1 rounded-[6px] bg-paper/[0.06] p-1" role="group" aria-label="Duration">
                {([15, 30] as const).map((d) => (
                  <button
                    key={d}
                    aria-pressed={days === d}
                    onClick={() => setDays(d)}
                    className={`rounded-[4px] py-2 text-[13.5px] transition-colors ${days === d ? 'bg-paper text-ink' : 'text-paper/70 hover:text-paper'}`}
                  >
                    {d} days
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <span className="text-[14px] text-mute-dark">Price for {days} days</span>
                <span className="text-[32px] font-medium tracking-[-0.03em] tabular-nums">{inr(price)}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[13px] text-moss">
                <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden="true" /> Available from today
              </div>

              <div className="mt-8 lg:mt-auto lg:pt-8">
                <Button className="w-full" size="lg" onClick={() => onOpen(hall)}>
                  Try booking in the demo
                </Button>
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
