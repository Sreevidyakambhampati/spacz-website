import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

const ease = [0.76, 0, 0.24, 1] as const
const MIN_MS = 1900 // long enough to enjoy the mark, short enough not to annoy
const MAX_MS = 4500 // never block the page for longer than this

/** Resolves once fonts and the window load event are done (or after MAX_MS). */
function pageReady() {
  const load = new Promise<void>((r) =>
    document.readyState === 'complete' ? r() : window.addEventListener('load', () => r(), { once: true }),
  )
  const fonts = document.fonts?.ready.then(() => undefined) ?? Promise.resolve()
  const timeout = new Promise<void>((r) => setTimeout(r, MAX_MS))
  return Promise.race([Promise.all([load, fonts]).then(() => undefined), timeout])
}

/**
 * Full-screen intro: the SPACZ desk-plan mark draws itself, the blue seat
 * drops into place ("your seat"), a counter runs to 100, then a curtain lifts.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(true)
  const progress = useMotionValue(0)
  const count = useTransform(progress, (v) => String(Math.round(v)).padStart(3, '0'))
  const bar = useTransform(progress, [0, 100], ['0%', '100%'])

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const minWait = new Promise<void>((r) => setTimeout(r, reduce ? 300 : MIN_MS))
    // Run to ~85% on its own, then finish once the page is actually ready.
    const run = animate(progress, 85, { duration: reduce ? 0.2 : 1.5, ease: 'easeOut' })
    let cancelled = false
    Promise.all([minWait, pageReady()]).then(async () => {
      if (cancelled) return
      await animate(progress, 100, { duration: reduce ? 0.1 : 0.35, ease: 'easeOut' })
      if (cancelled) return
      onDone() // hero starts animating in as the curtain lifts
      setShow(false)
    })
    return () => {
      cancelled = true
      run.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = ''
      }}
    >
      {show && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading SPACZ"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink text-paper"
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduce ? 0.3 : 1, ease }}
        >
          <div className="plan-grid-dark pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" aria-hidden="true" />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/25 blur-[110px]"
            animate={reduce ? undefined : { scale: [0.8, 1.1, 0.95], opacity: [0.5, 1, 0.7] }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          <motion.div
            className="relative flex flex-col items-center"
            exit={reduce ? undefined : { y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <DeskMark reduce={!!reduce} />

            <div className="mt-8 overflow-hidden">
              <motion.div
                className="text-[22px] font-semibold tracking-[0.42em] text-paper"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                SPACZ
              </motion.div>
            </div>
            <motion.div
              className="label mt-3 text-[10px] text-paper/45"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Finding your space
            </motion.div>
          </motion.div>

          <div className="absolute inset-x-5 bottom-8 flex items-end justify-between gap-6 md:inset-x-10 md:bottom-10">
            <span className="label text-[10px] text-paper/40">Study spaces · India</span>
            <div className="flex flex-1 items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden bg-paper/10">
                <motion.div className="absolute inset-y-0 left-0 bg-blue-bright" style={{ width: bar }} />
              </div>
              <motion.span className="font-mono text-[13px] tabular-nums text-paper/80">{count}</motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** The logo mark, animated: three desks outline themselves, then your seat drops in. */
function DeskMark({ reduce }: { reduce: boolean }) {
  const desks = [
    { x: 2.75, y: 2.75 },
    { x: 13.25, y: 2.75 },
    { x: 2.75, y: 13.25 },
  ]
  return (
    <svg viewBox="0 0 24 24" className="h-20 w-20 overflow-visible sm:h-24 sm:w-24" aria-hidden="true">
      {desks.map((d, i) => (
        <motion.rect
          key={i}
          x={d.x}
          y={d.y}
          width="8"
          height="8"
          rx="1.6"
          fill="none"
          stroke="#F3EFE7"
          strokeWidth="1.1"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.14, ease: 'easeInOut' }}
        />
      ))}
      {/* empty outline where your seat will land */}
      <motion.rect
        x="13.25"
        y="13.25"
        width="8"
        height="8"
        rx="1.6"
        fill="none"
        stroke="#4D8CFF"
        strokeWidth="0.6"
        strokeDasharray="1.2 1.2"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? { opacity: 0 } : { opacity: [0, 0.9, 0] }}
        transition={{ duration: 1, delay: 0.45 }}
      />
      <motion.rect
        x="12.5"
        y="12.5"
        width="9.5"
        height="9.5"
        rx="1.9"
        fill="#1F6BEF"
        style={{ transformOrigin: '17.25px 17.25px', transformBox: 'view-box' }}
        initial={reduce ? false : { y: -14, scale: 0.4, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.85 }}
      />
      {/* ripple when the seat lands */}
      {!reduce && (
        <motion.rect
          x="12.5"
          y="12.5"
          width="9.5"
          height="9.5"
          rx="1.9"
          fill="none"
          stroke="#4D8CFF"
          strokeWidth="0.5"
          style={{ transformOrigin: '17.25px 17.25px', transformBox: 'view-box' }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 1.9], opacity: [0.9, 0] }}
          transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut', repeat: 1, repeatDelay: 0.4 }}
        />
      )}
    </svg>
  )
}
