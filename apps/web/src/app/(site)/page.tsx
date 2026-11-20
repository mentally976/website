import { AboutBand } from '@/components/home/about-band'
import { ClosingCta } from '@/components/home/closing-cta'
import { Conditions } from '@/components/home/conditions'
import { Faq } from '@/components/home/faq'
import { FeaturedCourses } from '@/components/home/featured-courses'
import { Hero } from '@/components/home/hero'
import { Services } from '@/components/home/services'
import { Steps } from '@/components/home/steps'
import { Testimonials } from '@/components/home/testimonials'
import { TherapistsPreview } from '@/components/home/therapists-preview'
import { Wordmark } from '@/components/home/wordmark'
import { SectionHeading } from '@/components/ui/section-heading'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Wordmark />
      <AboutBand />

      <section aria-labelledby="conditions-title" className="container-page py-20 md:py-28">
        <SectionHeading
          id="conditions-title"
          tag="Бид юунд тусалдаг вэ"
          title="Таны амьдралд анхаарал тавина"
          intro="Сэтгэл санааны хүндрэл бүр өөр. Хамгийн түгээмэл асуудлуудаар хичээл, зөвлөгөө бэлтгэсэн."
          className="mb-12"
        />
        <Conditions />
      </section>

      <FeaturedCourses />
      <Services />
      <Steps />
      <TherapistsPreview />
      <Testimonials />
      <Faq />
      <ClosingCta />
    </>
  )
}
