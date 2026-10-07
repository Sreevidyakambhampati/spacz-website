import { ArrowUpRight, MapPin } from 'lucide-react'
import { amenityByKey } from '../data/amenities'
import { inr, type StudySpace } from '../data/studySpaces'

interface Props {
  space: StudySpace
  onOpen: (space: StudySpace) => void
}

export function StudySpaceCard({ space, onOpen }: Props) {
  const full = space.seatsAvailable === 0
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[10px] border border-line bg-[#fbf9f5] transition-[transform,box-shadow,border-color] duration-500 ease-calm hover:-translate-y-1 hover:border-stone hover:shadow-[0_24px_48px_-28px_rgb(18_20_24/0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
        <img
          src={space.image}
          alt={space.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-calm group-hover:scale-[1.045]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="label rounded-[3px] bg-paper/90 px-2 py-1 text-[10px] text-ink backdrop-blur-sm">
            {space.distanceKm} km
          </span>
          {space.open24x7 && (
            <span className="label rounded-[3px] bg-ink/80 px-2 py-1 text-[10px] text-paper backdrop-blur-sm">24/7</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[19px] font-medium tracking-[-0.02em] text-ink">{space.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-[13.5px] text-mute">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {space.area}, {space.city}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[19px] font-medium tracking-[-0.02em] tabular-nums text-ink">{inr(space.pricePerDay)}</div>
            <div className="label text-[9.5px] text-mute">per day</div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className={`flex items-center gap-2 text-[13.5px] ${full ? 'text-mute' : 'text-ink'}`}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              {!full && <span className="absolute inset-0 animate-breathe rounded-full bg-moss/60" />}
              <span className={`relative h-2 w-2 rounded-full ${full ? 'bg-stone' : 'bg-moss'}`} />
            </span>
            {full ? 'Fully booked' : `${space.seatsAvailable} seats available`}
          </span>
          <span className="label text-[10px] text-mute">{space.seatsTotal} desks</span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Amenities">
          {space.amenities.slice(0, 5).map((k) => {
            const a = amenityByKey[k]
            const Icon = a.icon
            return (
              <li
                key={k}
                className="flex items-center gap-1.5 rounded-[4px] border border-line px-2 py-1 text-[11.5px] text-mute"
              >
                <Icon className="h-3 w-3" aria-hidden="true" />
                {a.name}
              </li>
            )
          })}
          {space.amenities.length > 5 && (
            <li className="rounded-[4px] px-1.5 py-1 text-[11.5px] text-mute">+{space.amenities.length - 5}</li>
          )}
        </ul>

        <button
          type="button"
          onClick={() => onOpen(space)}
          className="mt-auto flex items-center justify-between pt-6 text-left text-[14px] font-medium text-ink after:absolute after:inset-0 after:content-['']"
          aria-label={`View ${space.name}, ${space.area}`}
        >
          <span className="transition-colors group-hover:text-blue">View space</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    </article>
  )
}
