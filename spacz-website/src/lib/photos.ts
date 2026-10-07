// Photography is served from Unsplash's image CDN (free licence), sized per use.
// Swap these for SPACZ partner photography when available.

const ids = {
  'reading-room': '1784359065403-93da31c36115', // students at lamp-lit reading tables
  'sun-blinds': '1773625688491-6110ff9f1e4f', // sunlight through blinds onto desks
  'solo-study': '1756032433560-56547efed550', // person studying at a desk
  'hall-bright': '1662866804024-c9ba0a31939c',
  'hall-white': '1789654499250-ca7c57434bca',
  stacks: '1767102060241-130cb9260718',
  'window-room': '1757194455329-541f39364057',
  'dim-desks': '1757193714674-198c16c4724c',
  cabins: '1789654499248-bf7d80de86d4',
  'evening-desk': '1671104695361-8b16c458b552', // lamp-lit desk at night
} as const

export type PhotoKey = keyof typeof ids

export function photo(key: PhotoKey, width = 1600, quality = 70) {
  return `https://images.unsplash.com/photo-${ids[key]}?w=${width}&q=${quality}&auto=format&fit=crop`
}

export function photoSet(key: PhotoKey, widths: number[] = [640, 1024, 1600, 2200]) {
  return widths.map((w) => `${photo(key, w)} ${w}w`).join(', ')
}
