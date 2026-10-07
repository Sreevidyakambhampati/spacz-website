import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { OwnerDashboard } from '../components/OwnerDashboard'

const manage = [
  'Property information',
  'Amenities',
  'Blocks',
  'Seats',
  'Pricing',
  'Operating hours',
  'Bookings',
  'Customers',
]

export function Owners() {
  return (
    <section id="owners" data-nav="dark" className="relative overflow-hidden bg-ink pb-16 pt-28 text-paper sm:pt-36" aria-labelledby="owners-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="owners-title"
            tone="paper"
            className="lg:col-span-7"
            index="08"
            eyebrow="For study halls"
            size="xl"
            lines={['Your study hall', 'deserves more than', 'empty seats.']}
          />
          <div className="self-end lg:col-span-4 lg:col-start-9">
            <Reveal>
              <p className="text-[17px] leading-[1.6] text-mute-dark">
                SPACZ helps study-centre owners bring their space online, in front of aspirants who are already looking, and keep
                it organised once they arrive.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 grid grid-cols-2 border-t border-paper/15">
                {manage.map((m, i) => (
                  <li key={m} className="flex items-baseline gap-3 border-b border-paper/15 py-3 text-[14.5px] odd:pr-3">
                    <span className="label text-[10px] text-mute-dark">{String(i + 1).padStart(2, '0')}</span>
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9">
                <Button href="mailto:support@spacz.com?subject=List%20my%20study%20hall%20on%20SPACZ" size="lg">
                  List Your Study Hall
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-20 lg:mt-24" y={40}>
          <OwnerDashboard />
          <p className="label mt-4 text-[10px] text-mute-dark">
            Illustrative owner console with demo figures. Try Overview, Blocks &amp; seats, Pricing and Timings.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
