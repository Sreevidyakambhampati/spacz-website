import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { exams } from '../data/exams'

export function Aspirants() {
  const [sel, setSel] = useState(0)
  const reduce = useReducedMotion()
  const exam = exams[sel]

  return (
    <section id="aspirants" className="relative py-28 sm:py-36 lg:py-44" aria-labelledby="aspirants-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="aspirants-title"
            className="lg:col-span-8"
            index="06"
            eyebrow="Built for aspirants"
            size="xl"
            lines={['Your preparation', 'has a goal.', <span className="font-light text-ink/55">Your space should support it.</span>]}
          />
          <Reveal className="self-end lg:col-span-4" delay={0.1}>
            <p className="text-[17px] leading-[1.6] text-mute">
              In SPACZ, you tell us what you are preparing for. Your profile, documents and goal stay with you, so finding the right
              hall starts from what your preparation actually needs.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 border-t border-ink/15 pt-10 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="label mb-6 text-mute" id="exam-label">
              I am aspiring for
            </div>
            <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-1" role="listbox" aria-labelledby="exam-label">
              {exams.map((e, i) => {
                const on = i === sel
                return (
                  <li key={e.name} role="option" aria-selected={on} className="flex items-baseline">
                    <button
                      type="button"
                      onClick={() => setSel(i)}
                      className={`group relative rounded-[4px] px-1 text-[30px] font-medium tracking-[-0.035em] transition-colors duration-300 sm:text-[44px] lg:text-[52px] ${
                        on ? 'text-ink' : 'text-ink/25 hover:text-ink/60'
                      }`}
                    >
                      {e.name}
                      <span
                        className={`absolute -top-0.5 right-0 h-2 w-2 rounded-[1.5px] bg-blue transition-all duration-500 ease-calm sm:h-2.5 sm:w-2.5 ${
                          on ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {i < exams.length - 1 && (
                      <span className="px-1 text-[30px] font-light text-ink/15 sm:text-[44px] lg:text-[52px]" aria-hidden="true">
                        /
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="lg:col-span-4" aria-live="polite">
            <div className="rounded-[8px] border border-line bg-[#fbf9f5] p-6 sm:p-7 lg:sticky lg:top-24">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={exam.name}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="label text-[10px] text-mute">Preparing for</div>
                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <span className="text-[28px] font-medium tracking-[-0.03em]">{exam.name}</span>
                    <span className="text-[13px] text-mute">{exam.track}</span>
                  </div>
                  <div className="label mt-7 text-[10px] text-mute">Spaces that tend to suit</div>
                  <ul className="mt-3 space-y-0 border-t border-line">
                    {exam.needs.map((n, i) => (
                      <li key={n} className="flex items-center gap-4 border-b border-line py-3 text-[15px]">
                        <span className="label w-5 text-[10px] text-mute">{String(i + 1).padStart(2, '0')}</span>
                        {n}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
