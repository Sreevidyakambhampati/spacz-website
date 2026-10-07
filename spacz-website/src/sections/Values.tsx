import { Reveal } from '../components/Reveal'
import { Eyebrow } from '../components/SectionHeading'

const values = [
  ['Aspirants', 'Designed around the way aspirants actually study.'],
  ['Long hours', 'Built for the people who spend hours preparing.'],
  ['Study halls', 'Made for study halls that want to stay organised.'],
]

// Testimonial slots. Replace `quote` and `role` with real, attributed stories when available.
const voices: { quote: string; role: string; placeholder: boolean }[] = [
  { quote: 'SPACZ makes it easier to find a place where I can actually concentrate.', role: 'Aspirant', placeholder: true },
  { quote: 'I could see which desks were free before I left home.', role: 'Aspirant', placeholder: true },
  { quote: 'Seats, timings and bookings finally live in one place.', role: 'Study hall owner', placeholder: true },
]

export function Values() {
  return (
    <section className="relative bg-paper-2 py-28 sm:py-36" aria-labelledby="values-title">
      <div className="container-x">
        <Reveal>
          <Eyebrow index="11">What SPACZ stands for</Eyebrow>
        </Reveal>
        <h2 id="values-title" className="sr-only">
          What SPACZ stands for
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {values.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.08}>
              <div className="border-t border-ink pt-6">
                <div className="label text-mute">{k}</div>
                <p className="mt-6 text-[28px] font-medium leading-[1.12] tracking-[-0.03em] sm:text-[34px]">{v}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 lg:mt-32">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/15 pb-5">
              <h3 className="text-[22px] font-medium tracking-[-0.02em]">In their words</h3>
              <span className="label text-[10px] text-mute">Placeholder quotes — real stories will appear here</span>
            </div>
          </Reveal>
          <ul className="grid lg:grid-cols-3">
            {voices.map((v, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.08}
                className="border-b border-ink/15 py-10 lg:border-b-0 lg:border-r lg:px-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <figure>
                  <svg viewBox="0 0 24 18" className="h-4 w-5 text-blue" aria-hidden="true">
                    <path fill="currentColor" d="M0 18V9.6C0 4 2.9.8 8.4 0l1 2.4C6.6 3.3 5.3 5 5.2 7.6H9.6V18H0Zm14.4 0V9.6C14.4 4 17.3.8 22.8 0l1 2.4c-2.8.9-4.1 2.6-4.2 5.2H24V18h-9.6Z" />
                  </svg>
                  <blockquote className="mt-6 text-[20px] leading-[1.4] tracking-[-0.015em]">{v.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 text-[14px] text-mute">
                    <span className="h-px w-6 bg-ink/30" aria-hidden="true" />
                    {v.role}
                    {v.placeholder && <span className="label rounded-[3px] border border-ink/15 px-1.5 py-0.5 text-[9px]">Demo</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
