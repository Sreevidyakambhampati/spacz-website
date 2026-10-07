// Recreations of SPACZ app screens, redrawn for the website. Content is demo data.
import { Check, Clock, MapPin, Search, SlidersHorizontal, Star } from 'lucide-react'
import { amenityByKey } from '../data/amenities'
import { studySpaces } from '../data/studySpaces'
import { photo } from '../lib/photos'
import { AppHeader } from './PhoneFrame'

const BLUE = 'bg-[#1a73e8]'

export function DiscoverScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#7a7f87]">Your location</div>
            <div className="flex items-center gap-1 text-[13px] font-semibold text-ink">
              <MapPin className="h-3 w-3 text-[#1a73e8]" /> Ameerpet, Hyderabad
            </div>
          </div>
          <span className="h-7 w-7 rounded-full bg-[#eef1f5]" />
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-[#e6e8eb] px-3 py-2.5 text-[11.5px] text-[#8a8f97]">
          <Search className="h-3.5 w-3.5" /> Search study centres
          <SlidersHorizontal className="ml-auto h-3.5 w-3.5 text-ink" />
        </div>
        <div className="mt-3 flex gap-1.5 overflow-hidden text-[10px]">
          {['Near me', 'Available', 'A/C', 'Wi-Fi', '24/7'].map((c, i) => (
            <span
              key={c}
              className={`shrink-0 rounded-full border px-2.5 py-1 ${i === 0 ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8]' : 'border-[#e6e8eb] text-[#5f646c]'}`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      {/* map strip */}
      <div className="relative mx-4 mt-3 h-[92px] overflow-hidden rounded-[10px] bg-[#eef0ec]">
        <svg viewBox="0 0 260 92" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60 C60 50 90 70 140 52 S220 30 260 40" stroke="#fff" strokeWidth="7" fill="none" />
          <path d="M70 0 L95 92" stroke="#fff" strokeWidth="5" />
          <path d="M180 0 L170 92" stroke="#fff" strokeWidth="4" />
          <path d="M0 20 L260 28" stroke="#fff" strokeWidth="3" />
        </svg>
        {[
          [32, 30, 'Focus Hall'],
          [62, 58, ''],
          [78, 22, ''],
        ].map(([x, y, n], i) => (
          <span key={i} className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center" style={{ left: `${x}%`, top: `${y}%` }}>
            {n && <span className="mb-0.5 rounded bg-ink px-1.5 py-0.5 text-[8px] font-medium text-white">{n}</span>}
            <span className={`h-3 w-3 rounded-full border-2 border-white ${i === 0 ? BLUE : 'bg-ink'}`} />
          </span>
        ))}
      </div>
      <div className="mt-3 px-4 text-[11px] font-semibold text-ink">Study centres near you</div>
      <div className="mt-2 flex-1 space-y-2 overflow-hidden px-4">
        {studySpaces.slice(0, 3).map((s) => (
          <div key={s.id} className="flex gap-2.5 rounded-[10px] border border-[#eceef1] p-2">
            <img src={photo(s.id === 'focus-hall' ? 'hall-bright' : s.id === 'study-haven' ? 'hall-white' : 'stacks', 200)} alt="" className="h-12 w-12 rounded-[7px] object-cover" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11.5px] font-semibold text-ink">{s.name}</div>
              <div className="text-[9.5px] text-[#7a7f87]">
                {s.area} · {s.distanceKm} km
              </div>
              <div className="mt-1 flex items-center justify-between text-[9.5px]">
                <span className="text-[#1e8e5a]">{s.seatsAvailable} seats</span>
                <span className="font-semibold text-ink">₹{s.pricePerDay}/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChooseScreen() {
  const s = studySpaces[0]
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative h-[150px]">
        <img src={photo('hall-bright', 500)} alt="" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
          <svg viewBox="0 0 16 16" className="h-3 w-3"><path d="M10 3 5 8l5 5" fill="none" stroke="#121418" strokeWidth="1.8" /></svg>
        </span>
      </div>
      <div className="flex-1 px-4 pt-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[15px] font-semibold text-ink">{s.name}</div>
            <div className="flex items-center gap-1 text-[10px] text-[#7a7f87]">
              <MapPin className="h-2.5 w-2.5" /> {s.area}, {s.city}
            </div>
          </div>
          <span className="flex items-center gap-0.5 rounded-full bg-[#f4f5f7] px-1.5 py-0.5 text-[9.5px] font-medium">
            <Star className="h-2.5 w-2.5 fill-ink" /> 4.6
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 rounded-[10px] border border-[#eceef1] text-center">
          {[
            [`${s.seatsAvailable}`, 'Available'],
            [`₹${s.pricePerDay}`, 'Per day'],
            ['₹2,500', '30 days'],
          ].map(([v, k], i) => (
            <div key={k} className={`py-2 ${i === 1 ? 'border-x border-[#eceef1]' : ''}`}>
              <div className="text-[12.5px] font-semibold text-ink">{v}</div>
              <div className="text-[8.5px] text-[#7a7f87]">{k}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#5f646c]">
          <Clock className="h-3 w-3" /> {s.timings}
        </div>
        <div className="mt-3 text-[10.5px] font-semibold text-ink">Amenities</div>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {s.amenities.map((k) => {
            const a = amenityByKey[k]
            const Icon = a.icon
            return (
              <div key={k} className="flex flex-col items-center gap-1 rounded-[8px] bg-[#f6f7f9] py-2 text-[8.5px] text-[#454a52]">
                <Icon className="h-3.5 w-3.5" /> {a.name}
              </div>
            )
          })}
        </div>
      </div>
      <div className="p-3">
        <div className={`rounded-[10px] ${BLUE} py-2.5 text-center text-[12px] font-semibold text-white`}>Book Now</div>
      </div>
    </div>
  )
}

export function BookScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <AppHeader title="Select Date" />
      <div className="px-4">
        <div className="mt-2 text-[10.5px] font-medium text-[#6b7079]">Select from Date</div>
        <div className="mt-1.5 flex gap-2">
          <div className="flex-1 rounded-[9px] border border-[#e3e5e8] px-3 py-2.5 text-[12px] tabular-nums text-ink">07-10-2026</div>
          <div className="rounded-[9px] bg-[#e8f0fe] px-3 py-2.5 text-[11.5px] font-medium text-[#1a73e8]">Today</div>
        </div>
        <div className="mt-4 text-[10.5px] font-medium text-[#6b7079]">Select Duration</div>
        <div className="mt-1.5 grid grid-cols-2 gap-2 text-[12.5px] font-medium">
          <div className="rounded-[9px] border border-[#e3e5e8] py-3 text-center text-[#6b7079]">15 days</div>
          <div className="rounded-[9px] border border-[#1a73e8] bg-[#e8f0fe] py-3 text-center text-[#1a73e8]">30 days</div>
        </div>
        <div className="mt-4 text-[10.5px] font-medium text-[#6b7079]">Select Seat · Block A</div>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {Array.from({ length: 12 }, (_, i) => {
            const occ = [0, 2, 3, 6, 9, 10].includes(i)
            const sel = i === 4
            return (
              <div
                key={i}
                className={`rounded-[5px] border py-1.5 text-center font-mono text-[9px] ${
                  sel ? 'border-[#1a73e8] bg-[#1a73e8] text-white' : occ ? 'border-[#eef0f2] bg-[#f3f4f6] text-[#b5b9c0]' : 'border-[#d5d8dd] text-ink'
                }`}
              >
                A{String(i + 1).padStart(2, '0')}
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-auto p-3">
        <div className={`rounded-[10px] ${BLUE} py-2.5 text-center text-[12px] font-semibold text-white`}>Next</div>
      </div>
    </div>
  )
}

export function FocusScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-4 pt-5 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#12b981] text-white">
        <Check className="h-5 w-5" />
      </span>
      <div className="mt-2 text-[14px] font-semibold text-ink">Booking</div>
      <div className="mx-auto mt-1 max-w-[200px] text-[9.5px] leading-snug text-[#7a7f87]">
        Your seat has been reserved. Complete the payment to confirm your booking.
      </div>
      <div className="mt-2 text-[8.5px] text-[#9aa0a8]">Booking ID</div>
      <div className="text-[11px] font-semibold tracking-wide text-ink">SPZ-X5G8MBXZTA</div>
      <div className="mt-3 overflow-hidden rounded-[12px] text-left shadow-[0_6px_20px_-8px_rgb(0_0_0/0.25)] ring-1 ring-[#eceef1]">
        <div className={`${BLUE} flex items-center gap-2 px-3 py-2.5 text-white`}>
          <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-white/20 text-[11px]">◎</span>
          <div>
            <div className="text-[14px] font-semibold leading-none">A05</div>
            <div className="text-[8.5px] opacity-80">Seat Number</div>
          </div>
        </div>
        <div className="space-y-2.5 px-3 py-3">
          <div>
            <div className="text-[11.5px] font-semibold text-ink">Focus Hall Ameerpet</div>
            <div className="text-[9px] text-[#7a7f87]">Hyderabad</div>
          </div>
          <div className="flex justify-between text-[10.5px] font-semibold tabular-nums text-ink">
            <span>07-10-2026</span>
            <span className="text-[#b0b4ba]">→</span>
            <span>05-11-2026</span>
          </div>
          <div className="flex justify-between border-t border-[#f0f1f3] pt-2 text-[10.5px] font-semibold text-ink">
            <span>₹2,500</span>
            <span>1 Month</span>
          </div>
        </div>
      </div>
      <div className="mt-auto pb-4">
        <div className="rounded-[10px] border border-[#1a73e8] py-2 text-[11.5px] font-semibold text-[#1a73e8]">Back to Home</div>
      </div>
    </div>
  )
}
