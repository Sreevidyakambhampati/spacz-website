import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
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

export default function App() {
  const [area, setArea] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero onSearch={setArea} />
        <Problem />
        <SpaceMatters />
        <Experience />
        <StudySpaces area={area} />
        <SeatMapSection />
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
    </>
  )
}
