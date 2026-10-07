import { SectionHeading } from '../components/SectionHeading'
import { FAQ } from '../components/FAQ'
import { Reveal } from '../components/Reveal'
import { faqs } from '../data/faqs'

export function FAQSection() {
  return (
    <section id="faq" className="relative py-28 sm:py-36" aria-labelledby="faq-title">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" index="12" eyebrow="Questions" lines={['Asked,', 'answered.']} />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[20rem] text-[16px] leading-[1.6] text-mute">
                Something else on your mind? Write to{' '}
                <a href="mailto:support@spacz.com" className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                  support@spacz.com
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <FAQ items={faqs} />
        </Reveal>
      </div>
    </section>
  )
}
