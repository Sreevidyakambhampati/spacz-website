import { SectionHeading } from '../components/SectionHeading'
import { AmenityCard } from '../components/AmenityCard'
import { Reveal } from '../components/Reveal'
import { amenities } from '../data/amenities'

export function Amenities() {
  return (
    <section id="amenities" className="relative bg-paper-2 py-28 sm:py-36" aria-labelledby="amenities-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="amenities-title"
            className="lg:col-span-7"
            index="07"
            eyebrow="Amenities"
            lines={['The details that decide', 'whether you stay.']}
          />
          <p className="text-[17px] leading-[1.6] text-mute lg:col-span-4 lg:col-start-9">
            Every study centre on SPACZ lists what it provides, so you know what to expect before you walk in.
          </p>
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <div className="grid gap-px overflow-hidden rounded-[6px] border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((a) => (
              <AmenityCard key={a.key} amenity={a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
