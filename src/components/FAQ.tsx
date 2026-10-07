import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface FAQProps {
  items: { q: string; a: string }[]
}

export function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  const reduce = useReducedMotion()

  return (
    <ul className="border-t border-ink/15">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${base}-q-${i}`
        const panelId = `${base}-a-${i}`
        return (
          <li key={item.q} className="border-b border-ink/15">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-5 py-6 text-left sm:gap-8"
              >
                <span className="label mt-[7px] w-6 shrink-0 text-mute">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`flex-1 text-[18px] font-medium tracking-[-0.02em] transition-colors sm:text-[21px] ${
                    isOpen ? 'text-ink' : 'text-ink/80 group-hover:text-ink'
                  }`}
                >
                  {item.q}
                </span>
                <span className="relative mt-2 h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-ink" />
                  <span
                    className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-ink transition-transform duration-500 ease-calm ${
                      isOpen ? 'scale-y-0' : 'scale-y-100'
                    }`}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[40rem] pb-7 pl-11 text-[16px] leading-[1.65] text-mute sm:pl-14">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
