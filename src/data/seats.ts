// DEMO seat plan — a study hall described as blocks of desks, as owners configure it in SPACZ.

export type SeatStatus = 'available' | 'occupied'

export interface Seat {
  id: string
  block: string
  status: SeatStatus
  window: boolean
  cabin: boolean
}

export interface Block {
  id: string
  name: string
  zone: string
  cols: number
  cabin?: boolean
  seats: Seat[]
}

// Small deterministic PRNG so the plan is stable between renders.
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

interface BlockSpec {
  id: string
  zone: string
  rows: number
  cols: number
  cabin?: boolean
  occupancy: number
}

const specs: BlockSpec[] = [
  { id: 'A', zone: 'Silent zone · window side', rows: 3, cols: 4, occupancy: 0.55 },
  { id: 'B', zone: 'Silent zone', rows: 3, cols: 4, occupancy: 0.7 },
  { id: 'C', zone: 'Private cabins', rows: 2, cols: 4, cabin: true, occupancy: 0.6 },
  { id: 'D', zone: 'Reading tables', rows: 3, cols: 4, occupancy: 0.45 },
]

export function buildBlocks(seed = 7): Block[] {
  const rand = rng(seed)
  return specs.map((b) => {
    const seats: Seat[] = []
    for (let r = 0; r < b.rows; r++) {
      for (let c = 0; c < b.cols; c++) {
        const n = r * b.cols + c + 1
        seats.push({
          id: `${b.id}${String(n).padStart(2, '0')}`,
          block: b.id,
          status: rand() < b.occupancy ? 'occupied' : 'available',
          window: b.id === 'A' && r === 0,
          cabin: !!b.cabin,
        })
      }
    }
    return { id: b.id, name: `Block ${b.id}`, zone: b.zone, cols: b.cols, cabin: b.cabin, seats }
  })
}

export function seatPrice(seat: Seat, base30: number) {
  return seat.cabin ? Math.round((base30 * 1.4) / 100) * 100 : base30
}
