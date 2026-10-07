import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Photo } from '../components/Photo'
import { Button } from '../components/Button'
import { RevealLines, Reveal } from '../components/Reveal'

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section ref={ref} data-nav="dark" className="relative overflow-hidden bg-ink text-paper" aria-labelledby="cta-title">
      <div className="grid lg:grid-cols-2">
        <div className="relative order-2 flex flex-col justify-center px-5 py-24 sm:px-10 sm:py-32 lg:order-1 lg:py-40 lg:pl-[max(56px,calc((100vw-1320px)/2+56px))] lg:pr-16">
          <div className="label text-mute-dark">13 — Begin</div>
          <h2 id="cta-title" className="headline mt-8 text-[42px] sm:text-[60px] lg:text-[50px] xl:text-[68px]">
            <RevealLines lines={['Your next productive', 'hour starts with', 'the right space.']} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[26rem] text-[17px] leading-[1.6] text-mute-dark">
              Find a study space that fits your routine, your location and your preparation.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="#explore" size="lg">
                Find Your Study Space
              </Button>
              <Button href="#owners" size="lg" variant="secondary-dark">
                List Your Study Hall
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="relative order-1 h-[52vh] overflow-hidden lg:order-2 lg:h-auto lg:min-h-[720px]">
          <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
            <Photo name="evening-desk" alt="A desk lit by a single lamp late in the evening" className="h-full w-full" sizes="(min-width:1024px) 50vw, 100vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:bg-gradient-to-r" aria-hidden="true" />
          <div className="label absolute right-5 top-5 rounded-[3px] bg-ink/60 px-2 py-1 text-[10px] text-paper/80 backdrop-blur">Desk A06 · 21:40</div>
        </div>
      </div>
    </section>
  )
}
