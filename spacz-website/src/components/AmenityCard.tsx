import type { Amenity } from '../data/amenities'

/** One cell of the amenities specification sheet. */
export function AmenityCard({ amenity }: { amenity: Amenity }) {
  const Icon = amenity.icon
  return (
    <div className="group relative flex h-full flex-col bg-paper-2 p-6 transition-colors duration-500 ease-calm hover:bg-[#f7f4ee] sm:p-8">
      <div className="flex items-start justify-between">
        <span className="label text-[10px] text-mute">{amenity.code}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-ink transition-all duration-500 ease-calm group-hover:border-blue group-hover:bg-blue group-hover:text-white">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
        </span>
      </div>
      <h3 className="mt-8 text-[24px] font-medium tracking-[-0.025em] sm:mt-20">{amenity.name}</h3>
      <p className="mt-1.5 text-[15.5px] text-ink/80">{amenity.line}</p>
      <p className="label mt-5 border-t border-ink/10 pt-4 text-[10px] text-mute">{amenity.spec}</p>
    </div>
  )
}
