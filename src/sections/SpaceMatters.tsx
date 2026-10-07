import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Photo } from '../components/Photo'

const statements = ['Quiet enough to think.', 'Comfortable enough to stay.', 'Structured enough to focus.']

/** A deliberately slow, image-led pause in the page. */
export function SpaceMatters() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1])
  const headOpacity = useTransform(scrollYProgress, [0, 0.12], reduce ? [1, 1] : [0, 1])
  const headY = useTransform(scrollYProgress, [0, 0.12], reduce ? [0, 0] : [30, 0])

  return (
    <section ref={ref} data-nav="dark" className="relative h-[260vh] bg-ink" aria-labelledby="space-matters-title">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Photo
            name="sun-blinds"
            alt="Late-afternoon sunlight falling through window blinds across empty wooden desks"
            className="h-full w-full"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" aria-hidden="true" />

        <div className="container-x relative flex h-full flex-col justify-end pb-16 sm:pb-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div style={{ opacity: headOpacity, y: headY }} className="lg:col-span-7">
              <div className="label text-paper/60">02 — The space matters</div>
              <h2
                id="space-matters-title"
                className="headline mt-6 text-[44px] text-paper sm:text-[68px] lg:text-[88px]"
              >
                The right environment changes how you work.
              </h2>
            </motion.div>
            <ul className="space-y-3 lg:col-span-4 lg:col-start-9 lg:pb-3">
              {statements.map((s, i) => (
                <Statement key={s} text={s} index={i} progress={scrollYProgress} reduce={!!reduce} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Statement({ text, index, progress, reduce }: { text: string; index: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = 0.3 + index * 0.18
  const opacity = useTransform(progress, [start, start + 0.12], reduce ? [1, 1] : [0.18, 1])
  const x = useTransform(progress, [start, start + 0.12], reduce ? [0, 0] : [16, 0])
  return (
    <motion.li style={{ opacity, x }} className="flex items-baseline gap-4 border-t border-paper/20 pt-3">
      <span className="label text-paper/50">{String(index + 1).padStart(2, '0')}</span>
      <span className="text-[22px] font-medium tracking-[-0.02em] text-paper sm:text-[26px]">{text}</span>
    </motion.li>
  )
}
