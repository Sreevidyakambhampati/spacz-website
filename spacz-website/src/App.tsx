import { useCallback, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BookingDemo } from './components/BookingDemo'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { SpaceMatters } from './sections/SpaceMatters'
import { Experience } from './sections/Experience'
import { StudySpaces } from './sections/StudySpaces'
import { SeatMapSection } from './sections/SeatMapSection'
import { Aspirants } from './sections/Aspirants'
import { Amenities } from './sections/Amenities'
import { Owners } from './sections/Owners'
import { PropertyFlow } from './sections/PropertyFlow'
import { HowItWorks } from './sections/HowItWorks'
import { Values } from './sections/Values'
import { FAQSection } from './sections/FAQSection'
import { FinalCTA } from './sections/FinalCTA'
import type { StudySpace } from './data/studySpaces'

export default function App() {
  const [area, setArea] = useState<string | null>(null)
  const [openSpace, setOpenSpace] = useState<StudySpace | null>(null)
  const close = useCallback(() => setOpenSpace(null), [])

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero onSearch={setArea} onOpenSpace={setOpenSpace} />
        <Problem />
        <SpaceMatters />
        <Experience />
        <StudySpaces area={area} onOpen={setOpenSpace} />
        <SeatMapSection onOpen={setOpenSpace} />
        <Aspirants />
        <Amenities />
        <Owners />
        <PropertyFlow />
        <HowItWorks />
        <Values />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <BookingDemo space={openSpace} onClose={close} />
    </>
  )
}
