import { useCallback, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BookingDemo } from './components/BookingDemo'
import { Loader } from './components/Loader'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { SpaceMatters } from './sections/SpaceMatters'
import { Experience } from './sections/Experience'
import { SeatMapSection } from './sections/SeatMapSection'
import { Owners } from './sections/Owners'
import { PropertyFlow } from './sections/PropertyFlow'
import { FAQSection } from './sections/FAQSection'
import { FinalCTA } from './sections/FinalCTA'
import type { StudySpace } from './data/studySpaces'

export default function App() {
  const [openSpace, setOpenSpace] = useState<StudySpace | null>(null)
  const [ready, setReady] = useState(false)
  const close = useCallback(() => setOpenSpace(null), [])
  const onLoaded = useCallback(() => setReady(true), [])

  return (
    <>
      <Loader onDone={onLoaded} />
      <Navbar />
      <main id="main">
        <Hero ready={ready} />
        <Problem />
        <SpaceMatters />
        <Experience />
        <SeatMapSection onOpen={setOpenSpace} />
        <Owners />
        <PropertyFlow />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <BookingDemo space={openSpace} onClose={close} />
    </>
  )
}
