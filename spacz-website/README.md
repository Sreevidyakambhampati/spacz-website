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
- `src/components/` — reusable pieces: `SeatMap`, `BookingDemo`, `OwnerDashboard`, `AppScreens`, `FAQ`, …
- `src/data/` — **demo** data (study spaces, seats, amenities, FAQs). Names, prices and dashboard figures are illustrative, not SPACZ metrics.
- `src/lib/photos.ts` — photography (Unsplash CDN). Swap for partner photography when available.
- `src/index.css` — design tokens (ink / paper / stone / SPACZ blue, Geist + Geist Mono).

## Placeholders to replace before launch
- Social, Privacy and Terms links were removed from the footer (they pointed to `#`); add them back in `src/components/Footer.tsx` once real URLs exist.
- "Find a Study Space" (navbar, hero, closing CTA, hero inquiry form) and "List Your Study Hall" (Owners section) open emails to support@spacz.com — the address lives in `src/lib/contact.ts`.
