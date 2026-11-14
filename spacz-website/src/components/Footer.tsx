import { Logo } from './Logo'
import { SUPPORT_EMAIL, studySpaceInquiryHref } from '../lib/contact'

const columns = [
  {
    title: 'Platform',
    links: [
      ['Overview', '#platform'],
      ['Seat Plan', '#seat-map'],
      ['FAQ', '#faq'],
    ],
  },
  {
    title: 'For Aspirants',
    links: [
      ['Find a Study Space', studySpaceInquiryHref],
      ['Choose Your Desk', '#seat-map'],
    ],
  },
  {
    title: 'For Study Halls',
    links: [
      ['List Your Space', '#owners'],
      ['Manage Your Seats', '#property'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '#about'],
      ['Contact', `mailto:${SUPPORT_EMAIL}`],
    ],
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
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-paper/80 hover:text-paper">
              {SUPPORT_EMAIL}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
