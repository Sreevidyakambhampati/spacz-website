import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Check, Clock, MapPin, X } from 'lucide-react'
import { amenityByKey } from '../data/amenities'
import { buildBlocks, seatPrice, type Seat } from '../data/seats'
import { inr, type StudySpace } from '../data/studySpaces'
import { SeatLegend, SeatMap } from './SeatMap'
import { Button } from './Button'

type Step = 'detail' | 'schedule' | 'seat' | 'summary' | 'done'
const order: Step[] = ['detail', 'schedule', 'seat', 'summary', 'done']
const stepNames: Record<Step, string> = {
  detail: 'Study centre',
  schedule: 'Select date',
  seat: 'Select seat',
  summary: 'Price break up',
  done: 'Reserved',
}

const toInput = (d: Date) => d.toISOString().slice(0, 10)
const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`

function bookingId(seed: string) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let h = 0
  for (const c of seed) h = (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0
  let out = ''
  for (let i = 0; i < 10; i++) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0
    out += chars[(h >>> 16) % chars.length]
  }
  return `SPZ-${out}`
}

interface Props {
  space: StudySpace | null
  onClose: () => void
}

export function BookingDemo({ space, onClose }: Props) {
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<Step>('detail')
  const [from, setFrom] = useState(() => toInput(new Date()))
  const [days, setDays] = useState<15 | 30>(30)
  const [seat, setSeat] = useState<Seat | null>(null)
  const blocks = useMemo(() => buildBlocks(space ? space.id.length * 13 + space.seatsAvailable : 7), [space])

  useEffect(() => {
    if (!space) return
    setStep('detail')
    setSeat(null)
    setDays(30)
    const prev = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [space, onClose])

  const idx = order.indexOf(step)
  const back = () => setStep(order[Math.max(0, idx - 1)])
  const base = space ? (days === 30 ? space.price30 : space.price15) : 0
  const total = seat ? (seat.cabin ? seatPrice(seat, base) : base) : base
  const start = new Date(from + 'T00:00:00')
  const end = new Date(start)
  end.setDate(end.getDate() + days - 1)

  return (
    <AnimatePresence>
      {space && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-demo-title"
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 top-10 flex flex-col overflow-hidden rounded-t-[14px] bg-paper outline-none sm:inset-y-0 sm:left-auto sm:right-0 sm:top-0 sm:w-[520px] sm:rounded-none"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              {idx > 0 && step !== 'done' ? (
                <button
                  onClick={back}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-2 hover:bg-paper-3"
                  aria-label="Back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="label text-[10px] text-mute">
                  Interactive demo · {String(Math.min(idx + 1, 4)).padStart(2, '0')}/04
                </div>
                <h2 id="booking-demo-title" className="truncate text-[17px] font-medium tracking-[-0.02em]">
                  {stepNames[step]}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-paper-2"
                aria-label="Close demo"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <div className="h-[2px] bg-line" aria-hidden="true">
              <motion.div
                className="h-full bg-blue"
                animate={{ width: `${(Math.min(idx + 1, 4) / 4) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 pb-8 pt-5"
                >
                  {step === 'detail' && (
                    <div>
                      <div className="aspect-[16/10] overflow-hidden rounded-[8px] bg-paper-3">
                        <img src={space.image} alt={space.imageAlt} className="h-full w-full object-cover" />
                      </div>
                      <h3 className="mt-5 text-[26px] font-medium tracking-[-0.03em]">{space.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-[14px] text-mute">
                        <MapPin className="h-3.5 w-3.5" /> {space.area}, {space.city} · {space.distanceKm} km away
                      </p>
                      <dl className="mt-6 grid grid-cols-3 border-y border-line text-[13px]">
                        <div className="py-3 pr-3">
                          <dt className="label text-[9.5px] text-mute">Available</dt>
                          <dd className="mt-1 text-[17px] font-medium tabular-nums">
                            {space.seatsAvailable}
                            <span className="text-mute">/{space.seatsTotal}</span>
                          </dd>
                        </div>
                        <div className="border-x border-line px-3 py-3">
                          <dt className="label text-[9.5px] text-mute">Per day</dt>
                          <dd className="mt-1 text-[17px] font-medium tabular-nums">{inr(space.pricePerDay)}</dd>
                        </div>
                        <div className="py-3 pl-3">
                          <dt className="label text-[9.5px] text-mute">30 days</dt>
                          <dd className="mt-1 text-[17px] font-medium tabular-nums">{inr(space.price30)}</dd>
                        </div>
                      </dl>
                      <p className="mt-5 flex items-center gap-2 text-[14px] text-ink">
                        <Clock className="h-4 w-4 text-mute" /> {space.timings}
                      </p>
                      <h4 className="label mt-6 text-mute">Amenities</h4>
                      <ul className="mt-3 grid grid-cols-2 gap-2">
                        {space.amenities.map((k) => {
                          const a = amenityByKey[k]
                          const Icon = a.icon
                          return (
                            <li key={k} className="flex items-center gap-2.5 rounded-[6px] border border-line px-3 py-2.5 text-[13.5px]">
                              <Icon className="h-4 w-4 text-mute" aria-hidden="true" /> {a.name}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}

                  {step === 'schedule' && (
                    <div>
                      <label htmlFor="demo-from" className="text-[14px] font-medium text-mute">
                        Select from date
                      </label>
                      <div className="mt-2 flex gap-2">
                        <input
                          id="demo-from"
                          type="date"
                          value={from}
                          min={toInput(new Date())}
                          onChange={(e) => e.target.value && setFrom(e.target.value)}
                          className="h-12 flex-1 rounded-[8px] border border-line bg-white px-4 text-[15px] tabular-nums outline-none focus:border-blue"
                        />
                        <button
                          onClick={() => setFrom(toInput(new Date()))}
                          className="h-12 rounded-[8px] bg-blue-soft px-4 text-[14px] font-medium text-blue hover:bg-[#d4e2fb]"
                        >
                          Today
                        </button>
                      </div>
                      <fieldset className="mt-7">
                        <legend className="text-[14px] font-medium text-mute">Select duration</legend>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {([15, 30] as const).map((d) => (
                            <button
                              key={d}
                              onClick={() => setDays(d)}
                              aria-pressed={days === d}
                              className={`h-14 rounded-[8px] border text-[16px] font-medium transition-colors ${
                                days === d ? 'border-blue bg-blue-soft text-blue' : 'border-line bg-white text-mute hover:border-stone'
                              }`}
                            >
                              {d} days
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <div className="mt-7 rounded-[8px] border border-dashed border-stone p-4 text-[14px]">
                        <div className="label text-[9.5px] text-mute">Your window</div>
                        <div className="mt-2 flex items-center justify-between tabular-nums">
                          <span className="font-medium">{fmt(start)}</span>
                          <span className="mx-3 h-px flex-1 bg-stone" aria-hidden="true" />
                          <span className="font-medium">{fmt(end)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 'seat' && (
                    <div>
                      <p className="text-[14px] text-mute">
                        Pick an open desk at {space.name}. Window desks are in Block A; Block C has private cabins.
                      </p>
                      <div className="mt-5 pb-6">
                        <SeatMap blocks={blocks} selected={seat?.id ?? null} onSelect={setSeat} tone="light" compact />
                      </div>
                      <div className="mt-4">
                        <SeatLegend tone="light" />
                      </div>
                      <div className="mt-5 min-h-[56px] rounded-[8px] bg-white p-4 text-[14px] ring-1 ring-line" aria-live="polite">
                        {seat ? (
                          <span>
                            Seat <b className="font-mono font-medium">{seat.id}</b> · {seat.cabin ? 'Private cabin' : seat.window ? 'Window desk' : 'Open desk'} ·{' '}
                            {inr(seat.cabin ? seatPrice(seat, base) : base)} for {days} days
                          </span>
                        ) : (
                          <span className="text-mute">No seat selected yet.</span>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 'summary' && seat && (
                    <div>
                      <div className="text-[20px] font-medium">{seat.id}</div>
                      <div className="text-[14px] text-mute">
                        1 Seat × {inr(total)} · {days} days
                      </div>
                      <dl className="mt-5 space-y-3 border-y border-line py-5 text-[15px]">
                        {[
                          ['Discount', '−₹0'],
                          ['Platform charges', '₹0'],
                          ['Taxes', '₹0'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between">
                            <dt className="text-mute">{k}</dt>
                            <dd className="tabular-nums">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-5 flex items-baseline justify-between">
                        <span className="text-[16px] font-medium">Total</span>
                        <span className="text-[28px] font-medium tracking-[-0.03em] tabular-nums">{inr(total)}</span>
                      </div>
                      <p className="mt-6 text-[13px] leading-relaxed text-mute">
                        In the SPACZ app, your seat is reserved and you complete payment to confirm the booking. Nothing is charged in this demo.
                      </p>
                    </div>
                  )}

                  {step === 'done' && seat && (
                    <div className="text-center">
                      <motion.div
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-white"
                      >
                        <Check className="h-6 w-6" />
                      </motion.div>
                      <h3 className="mt-5 text-[24px] font-medium tracking-[-0.03em]">Seat reserved</h3>
                      <p className="mx-auto mt-2 max-w-xs text-[14px] text-mute">
                        In the app, you'd complete payment next to confirm your booking.
                      </p>
                      <div className="label mt-6 text-[10px] text-mute">Booking ID</div>
                      <div className="font-mono text-[15px] tracking-wider">{bookingId(space.id + seat.id + from + days)}</div>

                      <div className="mt-6 overflow-hidden rounded-[10px] text-left ring-1 ring-line">
                        <div className="flex items-center justify-between bg-ink px-5 py-4 text-paper">
                          <div>
                            <div className="text-[22px] font-medium">{seat.id}</div>
                            <div className="label text-[9.5px] text-mute-dark">Seat number</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[14px] font-medium">{space.name}</div>
                            <div className="text-[12.5px] text-mute-dark">{space.area}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 bg-white px-5 py-4 text-[14px]">
                          <div>
                            <div className="font-medium tabular-nums">{fmt(start)}</div>
                            <div className="label text-[9.5px] text-mute">Valid from</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium tabular-nums">{fmt(end)}</div>
                            <div className="label text-[9.5px] text-mute">Valid to</div>
                          </div>
                          <div>
                            <div className="font-medium tabular-nums">{inr(total)}</div>
                            <div className="label text-[9.5px] text-mute">Amount</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{days === 30 ? '1 Month' : '15 Days'}</div>
                            <div className="label text-[9.5px] text-mute">Duration</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer action */}
            <div className="border-t border-line bg-paper px-5 py-4">
              {step === 'detail' && (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setStep('schedule')}
                  disabled={space.seatsAvailable === 0}
                >
                  {space.seatsAvailable === 0 ? 'Fully booked' : 'Book now'}
                </Button>
              )}
              {step === 'schedule' && (
                <Button className="w-full" size="lg" onClick={() => setStep('seat')}>
                  Next
                </Button>
              )}
              {step === 'seat' && (
                <Button className="w-full" size="lg" onClick={() => setStep('summary')} disabled={!seat}>
                  {seat ? `Continue with ${seat.id}` : 'Select a seat'}
                </Button>
              )}
              {step === 'summary' && (
                <Button className="w-full" size="lg" onClick={() => setStep('done')}>
                  Book now
                </Button>
              )}
              {step === 'done' && (
                <Button className="w-full" size="lg" variant="secondary" arrow={false} onClick={onClose}>
                  Close demo
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
