// DEMO owner console — illustrative figures only, not SPACZ metrics.
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Building2, CalendarClock, IndianRupee, LayoutGrid, LayoutDashboard, Ticket, Sparkles } from 'lucide-react'
import { LogoMark } from './Logo'
import { SeatMap } from './SeatMap'
import { buildBlocks, type Seat } from '../data/seats'

type Tab = 'overview' | 'seats' | 'pricing' | 'timings'

const nav: { key: Tab | 'property' | 'amenities' | 'bookings'; label: string; icon: typeof Building2 }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'property', label: 'Property', icon: Building2 },
  { key: 'amenities', label: 'Amenities', icon: Sparkles },
  { key: 'seats', label: 'Blocks & seats', icon: LayoutGrid },
  { key: 'pricing', label: 'Pricing', icon: IndianRupee },
  { key: 'timings', label: 'Timings', icon: CalendarClock },
  { key: 'bookings', label: 'Bookings', icon: Ticket },
]

const kpis = [
  { k: 'Total seats', v: '96' },
  { k: 'Available', v: '21', tone: 'text-moss' },
  { k: 'Occupied', v: '75' },
  { k: 'Bookings · Oct', v: '64' },
  { k: 'Revenue · Oct', v: '₹1,62,400' },
]

const blocksOcc = [
  { b: 'Block A', occ: 18, total: 24 },
  { b: 'Block B', occ: 20, total: 24 },
  { b: 'Block C · Cabins', occ: 14, total: 16 },
  { b: 'Block D', occ: 23, total: 32 },
]

const bookings = [
  { id: 'SPZ-2TAP3WRWMD', seat: 'E10', dates: '1 Oct – 31 Oct', paid: true },
  { id: 'SPZ-X5G8MBXZTA', seat: 'A05', dates: '30 Sep – 29 Oct', paid: false },
  { id: 'SPZ-K7RM2QPLVE', seat: 'C03', dates: '5 Oct – 19 Oct', paid: true },
  { id: 'SPZ-9WDN4HTYAC', seat: 'B11', dates: '6 Oct – 4 Nov', paid: true },
]

export function OwnerDashboard() {
  const [tab, setTab] = useState<Tab>('overview')
  const reduce = useReducedMotion()
  const blocks = useMemo(() => buildBlocks(11), [])
  const [seat, setSeat] = useState<string | null>(null)

  return (
    <div className="overflow-hidden rounded-[10px] bg-paper text-ink shadow-[0_60px_120px_-50px_rgb(0_0_0/0.8),0_0_0_1px_rgb(243_239_231/0.1)]">
      {/* Window bar */}
      <div className="flex items-center gap-4 border-b border-line bg-paper-2 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </div>
        <div className="label hidden flex-1 text-center text-[10px] text-mute sm:block">SPACZ for Study Halls · Owner console</div>
        <span className="label ml-auto rounded-[3px] bg-ink px-2 py-1 text-[9.5px] text-paper">Demo data</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[210px_1fr]">
        {/* Sidebar */}
        <aside className="min-w-0 border-b border-line bg-paper-2/60 p-3 md:border-b-0 md:border-r md:p-4">
          <div className="hidden items-center gap-2 px-2 pb-5 pt-1 md:flex">
            <LogoMark className="h-5 w-5" />
            <div className="min-w-0">
              <div className="truncate text-[13px] font-medium">Focus Hall</div>
              <div className="text-[11px] text-mute">Ameerpet</div>
            </div>
          </div>
          <ul className="no-scrollbar flex gap-1 overflow-x-auto md:flex-col" role="tablist" aria-label="Owner console sections">
            {nav.map((n) => {
              const interactive = n.key === 'overview' || n.key === 'seats' || n.key === 'pricing' || n.key === 'timings'
              const on = tab === n.key
              const Icon = n.icon
              return (
                <li key={n.key} className="shrink-0">
                  <button
                    role="tab"
                    aria-selected={on}
                    disabled={!interactive}
                    onClick={() => interactive && setTab(n.key as Tab)}
                    className={`flex w-full items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-left text-[13px] transition-colors ${
                      on ? 'bg-ink text-paper' : interactive ? 'text-ink/75 hover:bg-ink/[0.05] hover:text-ink' : 'text-ink/35'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                    {n.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Main */}
        <div className="min-h-[520px] min-w-0 p-4 sm:p-6 lg:p-8" role="tabpanel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === 'overview' && (
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[22px] font-medium tracking-[-0.025em]">Good morning</h3>
                    <span className="label text-[10px] text-mute">Tue, 7 Oct · Live</span>
                  </div>
                  <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-3 xl:grid-cols-5">
                    {kpis.map((x) => (
                      <div key={x.k} className="bg-[#fbf9f5] p-4">
                        <dt className="label text-[9.5px] text-mute">{x.k}</dt>
                        <dd className={`mt-2 text-[24px] font-medium tracking-[-0.03em] tabular-nums ${x.tone ?? ''}`}>{x.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.25fr]">
                    <div className="rounded-[6px] border border-line p-5">
                      <div className="label text-[10px] text-mute">Occupancy by block</div>
                      <ul className="mt-5 space-y-4">
                        {blocksOcc.map((b) => (
                          <li key={b.b}>
                            <div className="flex justify-between text-[13px]">
                              <span>{b.b}</span>
                              <span className="tabular-nums text-mute">
                                {b.occ}/{b.total}
                              </span>
                            </div>
                            <div className="mt-2 h-[6px] overflow-hidden rounded-full bg-paper-3">
                              <motion.div
                                className="h-full rounded-full bg-ink"
                                initial={{ width: reduce ? `${(b.occ / b.total) * 100}%` : 0 }}
                                whileInView={{ width: `${(b.occ / b.total) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-[6px] border border-line p-5">
                      <div className="label text-[10px] text-mute">Recent bookings</div>
                      <table className="mt-3 w-full text-left text-[13px]">
                        <caption className="sr-only">Recent bookings (demo)</caption>
                        <thead className="sr-only">
                          <tr>
                            <th>Booking</th>
                            <th>Seat</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((b) => (
                            <tr key={b.id} className="border-b border-line last:border-0">
                              <td className="py-3">
                                <div className="font-mono text-[11.5px]">{b.id}</div>
                                <div className="text-[12px] text-mute">{b.dates}</div>
                              </td>
                              <td className="py-3 font-mono text-[12.5px]">{b.seat}</td>
                              <td className="py-3 text-right">
                                <span
                                  className={`rounded-[4px] px-2 py-1 text-[11px] font-medium ${
                                    b.paid ? 'bg-moss/12 text-moss' : 'bg-[#c4473a]/10 text-[#b0392d]'
                                  }`}
                                >
                                  {b.paid ? 'Paid' : 'Not paid'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'seats' && (
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[22px] font-medium tracking-[-0.025em]">Blocks &amp; seats</h3>
                    <span className="text-[13px] text-mute">
                      {seat ? `Seat ${seat} selected — edit, block or reassign` : 'Select a seat to manage it'}
                    </span>
                  </div>
                  <div className="mt-6 pb-6">
                    <SeatMap blocks={blocks} selected={seat} onSelect={(s: Seat) => setSeat(s.id)} tone="light" compact />
                  </div>
                </div>
              )}

              {tab === 'pricing' && (
                <div>
                  <h3 className="text-[22px] font-medium tracking-[-0.025em]">Pricing</h3>
                  <table className="mt-6 w-full text-left text-[14px]">
                    <caption className="sr-only">Seat pricing (demo)</caption>
                    <thead>
                      <tr className="label border-b border-line text-[10px] text-mute">
                        <th className="pb-3 font-normal">Seat type</th>
                        <th className="pb-3 font-normal">Per day</th>
                        <th className="pb-3 font-normal">15 days</th>
                        <th className="pb-3 font-normal">30 days</th>
                      </tr>
                    </thead>
                    <tbody className="tabular-nums">
                      {[
                        ['Open desk', '₹120', '₹1,400', '₹2,500'],
                        ['Window desk', '₹130', '₹1,500', '₹2,700'],
                        ['Private cabin', '₹170', '₹1,950', '₹3,500'],
                      ].map((r) => (
                        <tr key={r[0]} className="border-b border-line">
                          {r.map((c, i) => (
                            <td key={i} className={`py-4 ${i === 0 ? 'font-medium' : ''}`}>
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-5 text-[13px] text-mute">Discounts, platform charges and taxes appear in each aspirant’s price breakup.</p>
                </div>
              )}

              {tab === 'timings' && (
                <div>
                  <h3 className="text-[22px] font-medium tracking-[-0.025em]">Operating timings</h3>
                  <ul className="mt-6 border-t border-line">
                    {[
                      ['Monday – Friday', '6:00 AM – 11:00 PM'],
                      ['Saturday', '6:00 AM – 11:00 PM'],
                      ['Sunday', '7:00 AM – 9:00 PM'],
                      ['Exam weeks', 'Extended to 12:00 AM'],
                    ].map(([d, h]) => (
                      <li key={d} className="flex items-center justify-between border-b border-line py-4 text-[14px]">
                        <span>{d}</span>
                        <span className="tabular-nums text-mute">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
