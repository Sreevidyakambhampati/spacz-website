import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

const steps = [
  ['Discover', 'Find study spaces around you.'],
  ['Explore', 'Compare seats, pricing, amenities and location.'],
  ['Book', 'Choose your date, duration and seat.'],
  ['Focus', 'Show up and get to work.'],
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 sm:py-36" aria-labelledby="hiw-title">
      <div className="container-x">
        <SectionHeading id="hiw-title" index="10" eyebrow="How SPACZ works" lines={['Four steps.', 'No phone calls.']} />

        <ol className="mt-16 grid border-t border-ink sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {steps.map(([title, body], i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.08}
              className="group relative border-b border-ink/15 py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:py-10 lg:pl-0 lg:last:border-r-0 [&:not(:first-child)]:lg:pl-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink font-mono text-[12px] transition-colors duration-500 group-hover:bg-ink group-hover:text-paper">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-ink/15 lg:block" aria-hidden="true" />}
              </div>
              <h3 className="mt-10 text-[34px] font-medium tracking-[-0.035em] lg:mt-16">{title}</h3>
              <p className="mt-2 max-w-[16rem] text-[15.5px] leading-[1.55] text-mute">{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
