# SPACZ — marketing website

The showcase site for SPACZ, the platform for discovering and booking study spaces.

```bash
npm install
npm run dev
```

## Stack
React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide icons.

## Structure
- `src/sections/` — one file per page section, in page order (see `App.tsx`)
- `src/components/` — reusable pieces: `SeatMap`, `StudySpaceCard`, `BookingDemo`, `OwnerDashboard`, `AppScreens`, `FAQ`, …
- `src/data/` — **demo** data (study spaces, seats, amenities, exams, FAQs). Names, prices and dashboard figures are illustrative, not SPACZ metrics.
- `src/lib/photos.ts` — photography (Unsplash CDN). Swap for partner photography when available.
- `src/index.css` — design tokens (ink / paper / stone / SPACZ blue, Geist + Geist Mono).

## Placeholders to replace before launch
- Testimonials in `src/sections/Values.tsx` (marked "Demo").
- Social links in `src/components/Footer.tsx` (currently `#`).
- "List Your Study Hall" opens an email to support@spacz.com.
