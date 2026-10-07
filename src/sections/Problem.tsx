import { Eyebrow } from '../components/SectionHeading'
import { Reveal, RevealLines } from '../components/Reveal'
import { LogoMark } from '../components/Logo'

const searches = [
  ['A quiet room', 'that stays quiet after 6 PM.'],
  ['A seat that is actually free', 'not “come and check”.'],
  ['Pricing up front', 'before you climb three floors to ask.'],
  ['The right location', 'near home, coaching or the metro.'],
  ['Things that simply work', 'Wi-Fi, power, water, A/C.'],
  ['The right environment', 'one that takes preparation seriously.'],
]

export function Problem() {
  return (
    <section id="about" className="relative border-t border-ink/[0.07] py-28 sm:py-36 lg:py-44" aria-labelledby="problem-title">
      <div className="container-x">
        <Reveal>
          <Eyebrow index="01">Why SPACZ exists</Eyebrow>
        </Reveal>

        <h2 id="problem-title" className="headline mt-8 max-w-[24ch] text-[44px] sm:text-[68px] lg:text-[92px]">
          <RevealLines
            lines={[
              'Studying is hard enough.',
              <span className="font-light text-ink/55">Finding the right place shouldn’t be.</span>,
            ]}
          />
        </h2>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="text-[18px] leading-[1.65] text-mute">
              Ask an aspirant how they found their study hall. A friend’s tip. A pamphlet outside a coaching centre. A walk from
              building to building, asking if a seat is free.
            </p>
            <p className="mt-5 text-[18px] leading-[1.65] text-mute">
              Before a single hour of preparation, days go into looking.
            </p>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <div className="label mb-4 text-mute">What aspirants are searching for</div>
            </Reveal>
            <ol className="border-t border-ink/15">
              {searches.map(([title, note], i) => (
                <Reveal as="li" key={title} delay={i * 0.05}>
                  <div className="group flex items-baseline gap-5 border-b border-ink/15 py-5 sm:gap-8">
                    <span className="label w-6 shrink-0 text-mute">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
                      <span className="block text-[20px] font-medium tracking-[-0.02em] sm:text-[24px]">{title}</span>
                      <span className="mt-1 block text-[15px] text-mute sm:mt-0 sm:text-right">{note}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2}>
              <p className="mt-12 flex items-start gap-4 text-[26px] font-medium leading-[1.2] tracking-[-0.03em] sm:text-[34px]">
                <LogoMark className="mt-1.5 h-7 w-7 shrink-0 sm:mt-2 sm:h-8 sm:w-8" />
                <span>
                  SPACZ brings all of it into one place, <span className="text-mute">so the search ends and the work begins.</span>
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
