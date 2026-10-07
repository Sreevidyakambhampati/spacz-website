import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'span' | 'p'
}

/** Fades content up once as it enters the viewport. Respects reduced motion. */
export function Reveal({ children, delay = 0, y = 18, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}

/** Splits a headline into lines that rise in sequence. */
export function RevealLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  // The observer sits on the unclipped wrapper; lines inherit its state via variants.
  return (
    <motion.span
      className={`block ${className}`}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: '105%' }, show: { y: '0%' } }}
            transition={{ duration: 1.05, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
