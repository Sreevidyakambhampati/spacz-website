import {
  Wifi,
  Droplets,
  SquareParking,
  ShieldCheck,
  DoorClosed,
  Lock,
  AirVent,
  BatteryCharging,
  Newspaper,
  type LucideIcon,
} from 'lucide-react'
import type { AmenityKey } from './studySpaces'

export interface Amenity {
  key: AmenityKey
  code: string
  name: string
  line: string
  spec: string
  icon: LucideIcon
}

export const amenities: Amenity[] = [
  { key: 'wifi', code: 'AM-01', name: 'Wi-Fi', line: 'Always connected.', spec: 'Lectures, mocks, research', icon: Wifi },
  { key: 'ac', code: 'AM-02', name: 'A/C', line: 'Cool enough to think clearly.', spec: 'Climate-controlled halls', icon: AirVent },
  { key: 'power', code: 'AM-03', name: 'Power Backup', line: 'Keep your preparation uninterrupted.', spec: 'Lights and sockets stay on', icon: BatteryCharging },
  { key: 'water', code: 'AM-04', name: '24/7 Water', line: 'Essential, always available.', spec: 'Drinking water on every floor', icon: Droplets },
  { key: 'lockers', code: 'AM-05', name: 'Lockers', line: 'Leave your belongings safely.', spec: 'Books stay, bag goes home', icon: Lock },
  { key: 'cabins', code: 'AM-06', name: 'Cabins', line: 'A door between you and distraction.', spec: 'Private, partitioned desks', icon: DoorClosed },
  { key: 'security', code: 'AM-07', name: 'Security', line: 'Study late with peace of mind.', spec: 'Staffed entry, monitored halls', icon: ShieldCheck },
  { key: 'parking', code: 'AM-08', name: 'Parking', line: 'Arrive, park, begin.', spec: 'Two-wheeler and car space', icon: SquareParking },
  { key: 'newspaper', code: 'AM-09', name: 'Newspaper', line: 'Current affairs, every morning.', spec: 'Daily papers in the hall', icon: Newspaper },
]

export const amenityByKey = Object.fromEntries(amenities.map((a) => [a.key, a])) as Record<AmenityKey, Amenity>
