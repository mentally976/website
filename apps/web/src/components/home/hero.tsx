import Image from 'next/image'
import heroMind from '@/assets/hero-mind.jpg'
import { ButtonLink } from '@/components/ui/button'

/** The page's one orchestrated moment: headline, then copy, then the photo settle in. Lessons need an account, so the call to action is sign-up. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page pt-6 md:pt-12">
      <div className="grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
        <h1 id="hero-title" className="animate-rise text-display font-semibold">
          Сэтгэлийн тэнцвэрээ эндээс олоорой
        </h1>

        <div className="animate-rise space-y-7 [animation-delay:120ms] lg:pb-2">
          <p className="max-w-md text-[1.0625rem] leading-relaxed text-muted md:text-lg">
            Мэргэшсэн сэтгэл зүйчийн бэлтгэсэн богино видео хичээлээр түгшүүр, стресс, нойргүйдлээ ойлгож, өдөр тутамдаа хэрэгжүүлэх энгийн аргуудад
            суралцаарай.
          </p>
          <ButtonLink href="/signup" size="lg">
            Хичээл үзэж эхлэх
          </ButtonLink>
        </div>
      </div>

      {/* The illustration is shown whole on a panel of its own background colour, never cropped or upscaled past its 471px height. */}
      <div className="relative mt-9 flex aspect-[4/3] animate-reveal items-center justify-center overflow-hidden rounded-panel bg-[#e2a296] [animation-delay:220ms] sm:aspect-[16/10] md:mt-12 lg:aspect-[21/9]">
        <Image
          src={heroMind}
          alt="Тархины зургийн өмнө нүдээ аниад бясалгаж суугаа эмэгтэй, эргэн тойронд нь навч, цэцэг"
          preload
          placeholder="blur"
          sizes="(min-width: 640px) 651px, 100vw"
          className="h-full max-h-[471px] w-auto max-w-full object-contain"
        />
      </div>
    </section>
  )
}
