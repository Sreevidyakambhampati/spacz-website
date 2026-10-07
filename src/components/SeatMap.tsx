import { motion, useReducedMotion } from 'framer-motion'
import type { Block, Seat } from '../data/seats'

type Tone = 'dark' | 'light'

interface SeatMapProps {
  blocks: Block[]
  selected: string | null
  onSelect: (seat: Seat) => void
  tone?: Tone
  compact?: boolean
}

const palette = {
  dark: {
    wall: 'border-paper/30',
    room: 'border-paper/15',
    label: 'text-paper',
    sub: 'text-mute-dark',
    desk: 'border-paper/35 text-paper/80 hover:border-blue-bright hover:text-paper',
    chair: 'bg-paper/30',
    occupied: 'border-paper/10 text-paper/25',
    hatch: 'rgb(243 239 231 / 0.09)',
    window: 'border-blue-bright/60',
  },
  light: {
    wall: 'border-ink/40',
    room: 'border-ink/12',
    label: 'text-ink',
    sub: 'text-mute',
    desk: 'border-ink/35 text-ink/80 hover:border-blue hover:text-ink',
    chair: 'bg-ink/25',
    occupied: 'border-ink/10 text-ink/30',
    hatch: 'rgb(18 20 24 / 0.07)',
    window: 'border-blue/50',
  },
}

/**
 * A study-hall floor plan: blocks of desks, each desk a selectable seat.
 * Drawn like an architectural plan rather than a cinema grid.
 */
export function SeatMap({ blocks, selected, onSelect, tone = 'dark', compact = false }: SeatMapProps) {
  const p = palette[tone]
  const reduce = useReducedMotion()

  return (
    <div className={`relative rounded-[3px] border-[1.5px] ${p.wall} ${compact ? 'p-3' : 'p-4 sm:p-6'}`}>
      {/* Window wall along the top */}
      <div className={`pointer-events-none absolute -top-[3px] left-[8%] right-[52%] border-y ${p.window} h-[5px]`} aria-hidden="true" />
      <div className={`pointer-events-none absolute -top-[3px] left-[58%] right-[8%] border-y ${p.window} h-[5px]`} aria-hidden="true" />
      {/* Entrance gap */}
      <div className={`pointer-events-none absolute -bottom-[2px] left-1/2 h-[3px] w-16 -translate-x-1/2 ${tone === 'dark' ? 'bg-ink' : 'bg-white'}`} aria-hidden="true" />
      <span className={`label pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] ${p.sub}`} aria-hidden="true">
        Entrance
      </span>

      <div className={`grid ${compact ? 'gap-3' : 'gap-4 sm:gap-x-10 sm:gap-y-8'} sm:grid-cols-2`}>
        {blocks.map((block) => {
          const free = block.seats.filter((s) => s.status === 'available').length
          return (
            <fieldset key={block.id} className={`min-w-0 rounded-[2px] border ${p.room} ${compact ? 'p-2.5' : 'p-3 sm:p-4'}`}>
              <legend className="sr-only">
                {block.name}, {block.zone}, {free} of {block.seats.length} seats available
              </legend>
              <div className="mb-3 flex items-baseline justify-between gap-2" aria-hidden="true">
                <span className={`shrink-0 whitespace-nowrap text-[13px] font-medium ${p.label}`}>{block.name}</span>
                <span className={`label truncate text-[9.5px] ${p.sub}`}>
                  {block.zone} · {free}/{block.seats.length}
                </span>
              </div>
              <div className="grid gap-x-2 gap-y-3" style={{ gridTemplateColumns: `repeat(${block.cols}, minmax(0, 1fr))` }}>
                {block.seats.map((seat) => {
                  const isSel = seat.id === selected
                  const occ = seat.status === 'occupied'
                  return (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={occ}
                      aria-pressed={isSel}
                      aria-label={`Seat ${seat.id}${seat.cabin ? ', cabin' : ''}${seat.window ? ', window side' : ''}, ${occ ? 'occupied' : isSel ? 'selected' : 'available'}`}
                      onClick={() => onSelect(seat)}
                      className="group/seat relative flex flex-col items-center gap-[3px] disabled:cursor-not-allowed"
                    >
                      <motion.span
                        layout={false}
                        animate={isSel && !reduce ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative flex w-full items-center justify-center rounded-[3px] border font-mono tabular-nums transition-colors duration-200 ${
                          compact ? 'h-7 text-[9px]' : 'h-8 text-[10px] sm:h-9'
                        } ${seat.cabin ? 'border-x-[2.5px]' : ''} ${
                          isSel ? 'border-blue bg-blue text-white' : occ ? p.occupied : p.desk
                        }`}
                        style={
                          occ
                            ? { backgroundImage: `repeating-linear-gradient(135deg, ${p.hatch} 0 2px, transparent 2px 6px)` }
                            : undefined
                        }
                      >
                        {seat.id}
                      </motion.span>
                      <span
                        className={`h-[5px] w-[42%] rounded-b-full transition-colors duration-200 ${
                          isSel ? 'bg-blue' : occ ? (tone === 'dark' ? 'bg-paper/10' : 'bg-ink/10') : p.chair
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )
        })}
      </div>
    </div>
  )
}

export function SeatLegend({ tone = 'dark' }: { tone?: Tone }) {
  const p = palette[tone]
  const item = 'flex items-center gap-2'
  return (
    <ul className={`label flex flex-wrap gap-x-5 gap-y-2 ${p.sub}`}>
      <li className={item}>
        <span className={`h-3 w-4 rounded-[2px] border ${tone === 'dark' ? 'border-paper/40' : 'border-ink/40'}`} /> Available
      </li>
      <li className={item}>
        <span className="h-3 w-4 rounded-[2px] bg-blue" /> Selected
      </li>
      <li className={item}>
        <span
          className={`h-3 w-4 rounded-[2px] border ${tone === 'dark' ? 'border-paper/15' : 'border-ink/15'}`}
          style={{ backgroundImage: `repeating-linear-gradient(135deg, ${p.hatch.replace('0.09', '0.3').replace('0.07', '0.25')} 0 2px, transparent 2px 5px)` }}
        />{' '}
        Occupied
      </li>
      <li className={item}>
        <span className={`h-3 w-4 rounded-[2px] border border-x-[2.5px] ${tone === 'dark' ? 'border-paper/40' : 'border-ink/40'}`} /> Cabin
      </li>
    </ul>
  )
}
