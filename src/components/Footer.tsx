import { Logo } from './Logo'

const columns = [
  {
    title: 'Platform',
    links: [
      ['Find a Study Space', '#explore'],
      ['How It Works', '#how-it-works'],
      ['Features', '#platform'],
    ],
  },
  {
    title: 'For Aspirants',
    links: [
      ['Discover', '#explore'],
      ['Book', '#seat-map'],
      ['Your Profile', '#aspirants'],
    ],
  },
  {
    title: 'For Study Halls',
    links: [
      ['List Your Space', '#owners'],
      ['Manage Your Seats', '#property'],
      ['Manage Bookings', '#owners'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '#about'],
      ['Contact', 'mailto:support@spacz.com'],
      ['Privacy', '#'],
      ['Terms', '#'],
    ],
  },
]

// Social profile URLs are placeholders until SPACZ's official handles are confirmed.
const socials = [
  {
    label: 'Instagram',
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.2-1.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  },
  {
    label: 'LinkedIn',
    path: 'M4.5 9h3v11h-3V9Zm1.5-5a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4Zm4 5h2.9v1.5h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2 3.61 4.6V20h-3v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.86V20H10V9Z',
  },
  {
    label: 'X',
    path: 'M17.6 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.7 3h6.4l4.4 5.9L17.6 3Zm-1.1 16.2h1.7L7.6 4.7H5.8l10.7 14.5Z',
  },
  {
    label: 'YouTube',
    path: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z',
  },
]

export function Footer() {
  return (
    <footer data-nav="dark" className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x pb-10 pt-20 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tone="paper" />
            <p className="mt-6 max-w-[18rem] text-[22px] font-medium leading-[1.2] tracking-[-0.025em]">
              Spaces for serious preparation.
            </p>
            <ul className="mt-8 flex gap-2" aria-label="Social media (links coming soon)">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    aria-label={`SPACZ on ${s.label} (coming soon)`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors hover:border-paper/50 hover:text-paper"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h3 className="label text-mute-dark">{c.title}</h3>
                <ul className="mt-5 space-y-3">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="text-[14.5px] text-paper/75 transition-colors hover:text-paper">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 select-none" aria-hidden="true">
          <div className="text-[23vw] font-semibold leading-[0.78] tracking-[0.02em] text-paper/[0.06] lg:text-[268px]">SPACZ</div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-paper/10 pt-6 text-[13px] text-mute-dark sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} SPACZ. All rights reserved.</span>
          <span>
            Support:{' '}
            <a href="mailto:support@spacz.com" className="text-paper/80 hover:text-paper">
              support@spacz.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
