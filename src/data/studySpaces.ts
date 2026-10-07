// DEMO DATA — illustrative study centres used to demonstrate the SPACZ product.
// These are not real listings and not SPACZ statistics.

import { photo } from '../lib/photos'

export type AmenityKey =
  | 'wifi'
  | 'water'
  | 'parking'
  | 'security'
  | 'cabins'
  | 'lockers'
  | 'ac'
  | 'power'
  | 'newspaper'

export interface StudySpace {
  id: string
  name: string
  area: string
  city: string
  distanceKm: number
  seatsAvailable: number
  seatsTotal: number
  pricePerDay: number
  price15: number
  price30: number
  open24x7: boolean
  timings: string
  amenities: AmenityKey[]
  image: string
  imageAlt: string
  note: string
}

export const studySpaces: StudySpace[] = [
  {
    id: 'focus-hall',
    name: 'Focus Hall',
    area: 'Ameerpet',
    city: 'Hyderabad',
    distanceKm: 0.8,
    seatsAvailable: 21,
    seatsTotal: 96,
    pricePerDay: 120,
    price15: 1400,
    price30: 2500,
    open24x7: false,
    timings: '6:00 AM – 11:00 PM',
    amenities: ['wifi', 'ac', 'water', 'lockers', 'power', 'security'],
    image: photo('hall-bright', 900),
    imageAlt: 'A bright reading hall with long rows of desks and tall windows',
    note: 'Silent floor · Window desks',
  },
  {
    id: 'study-haven',
    name: 'Study Haven',
    area: 'SR Nagar',
    city: 'Hyderabad',
    distanceKm: 1.6,
    seatsAvailable: 12,
    seatsTotal: 60,
    pricePerDay: 150,
    price15: 1750,
    price30: 3200,
    open24x7: true,
    timings: 'Open 24 hours',
    amenities: ['wifi', 'ac', 'cabins', 'lockers', 'power', 'water', 'parking'],
    image: photo('hall-white', 900),
    imageAlt: 'A white study room with rows of desks beside glass-fronted shelves',
    note: 'Private cabins · Night shift',
  },
  {
    id: 'reading-room',
    name: 'The Reading Room',
    area: 'Kukatpally',
    city: 'Hyderabad',
    distanceKm: 4.2,
    seatsAvailable: 34,
    seatsTotal: 120,
    pricePerDay: 100,
    price15: 1150,
    price30: 2100,
    open24x7: false,
    timings: '5:30 AM – 10:30 PM',
    amenities: ['wifi', 'water', 'newspaper', 'power', 'parking'],
    image: photo('stacks', 900),
    imageAlt: 'Students at desks between tall bookshelves',
    note: 'Newspaper corner · Large hall',
  },
  {
    id: 'north-light',
    name: 'North Light Study Centre',
    area: 'Himayatnagar',
    city: 'Hyderabad',
    distanceKm: 2.9,
    seatsAvailable: 17,
    seatsTotal: 72,
    pricePerDay: 130,
    price15: 1500,
    price30: 2700,
    open24x7: false,
    timings: '6:00 AM – 12:00 AM',
    amenities: ['wifi', 'ac', 'lockers', 'power', 'water', 'security'],
    image: photo('window-room', 900),
    imageAlt: 'A modern study room with desks facing a large window',
    note: 'Daylight desks · Quiet block',
  },
  {
    id: 'quiet-quarter',
    name: 'Quiet Quarter',
    area: 'Dilsukhnagar',
    city: 'Hyderabad',
    distanceKm: 9.4,
    seatsAvailable: 0,
    seatsTotal: 48,
    pricePerDay: 110,
    price15: 1300,
    price30: 2300,
    open24x7: true,
    timings: 'Open 24 hours',
    amenities: ['wifi', 'ac', 'water', 'power', 'newspaper'],
    image: photo('dim-desks', 900),
    imageAlt: 'Desks and chairs in a calm, dimly lit room',
    note: 'Fully booked this week',
  },
  {
    id: 'margin',
    name: 'Margin Library',
    area: 'Madhapur',
    city: 'Hyderabad',
    distanceKm: 6.1,
    seatsAvailable: 8,
    seatsTotal: 40,
    pricePerDay: 180,
    price15: 2100,
    price30: 3900,
    open24x7: true,
    timings: 'Open 24 hours',
    amenities: ['wifi', 'ac', 'cabins', 'lockers', 'power', 'water', 'parking', 'security'],
    image: photo('cabins', 900),
    imageAlt: 'Study cabins and shelving seen from above',
    note: 'Cabins only · Members lounge',
  },
]

export type FilterKey = 'near' | 'available' | 'under150' | 'allday' | 'ac' | 'wifi'

export const filters: { key: FilterKey; label: string; test: (s: StudySpace) => boolean }[] = [
  { key: 'near', label: 'Near me', test: (s) => s.distanceKm <= 3 },
  { key: 'available', label: 'Available now', test: (s) => s.seatsAvailable > 0 },
  { key: 'under150', label: 'Under ₹150/day', test: (s) => s.pricePerDay < 150 },
  { key: 'allday', label: '24/7', test: (s) => s.open24x7 },
  { key: 'ac', label: 'A/C', test: (s) => s.amenities.includes('ac') },
  { key: 'wifi', label: 'Wi-Fi', test: (s) => s.amenities.includes('wifi') },
]

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
