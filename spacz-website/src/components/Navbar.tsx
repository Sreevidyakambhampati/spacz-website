import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Logo } from './Logo'
import { Button } from './Button'

export const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Aspirants', href: '#aspirants' },
  { label: 'For Study Halls', href: '#owners' },
  { label: 'About', href: '#about' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const probe = 32
      setOverDark(
        [...document.querySelectorAll('[data-nav="dark"]')].some((el) => {
          const r = el.getBoundingClientRect()
          return r.top <= probe && r.bottom >= probe
        }),
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = overDark && !open

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-calm ${
          open
            ? 'border-b border-transparent bg-ink'
            : scrolled
              ? dark
                ? 'border-b border-paper/[0.08] bg-ink/75 backdrop-blur-xl backdrop-saturate-150'
                : 'border-b border-ink/[0.07] bg-paper/80 backdrop-blur-xl backdrop-saturate-150'
              : 'border-b border-transparent'
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <nav
          className={`container-x flex items-center justify-between transition-[height] duration-500 ease-calm ${
            scrolled ? 'h-[60px]' : 'h-[76px]'
          }`}
          aria-label="Primary"
        >
          <a href="#top" aria-label="SPACZ home" className="relative z-10">
            <Logo tone={open || dark ? 'paper' : 'ink'} />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative rounded-[4px] px-3 py-2 text-[14px] transition-colors duration-500 ${
                    dark ? 'text-paper/70 hover:text-paper' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 transition-transform duration-500 ease-calm group-hover:scale-x-100 ${
                      dark ? 'bg-paper' : 'bg-ink'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="#owners"
              className={`hidden rounded-[6px] px-3.5 py-2 text-[14px] font-medium transition-colors duration-500 xl:inline-flex ${
                dark ? 'text-paper hover:bg-paper/[0.08]' : 'text-ink hover:bg-ink/[0.05]'
              }`}
            >
              List Your Study Hall
            </a>
            <Button href="#explore" className={scrolled ? '!h-9 !px-4' : ''}>
              Find a Study Space
            </Button>
          </div>

          <button
            type="button"
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-6 transition-all duration-500 ease-calm ${open ? 'top-1/2 rotate-45 bg-paper' : `top-0 ${dark ? 'bg-paper' : 'bg-ink'}`}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] transition-all duration-500 ease-calm ${open ? 'top-1/2 w-6 -rotate-45 bg-paper' : `top-full w-4 ${dark ? 'bg-paper' : 'bg-ink'}`}`}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-8 pt-24 text-paper lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="plan-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <ul className="relative space-y-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-paper/10 py-4"
                  >
                    <span className="label text-mute-dark">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[30px] font-medium tracking-[-0.03em]">{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-auto grid gap-3">
              <Button href="#explore" size="lg" onClick={() => setOpen(false)}>
                Find a Study Space
              </Button>
              <Button href="#owners" size="lg" variant="secondary-dark" onClick={() => setOpen(false)}>
                List Your Study Hall
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
