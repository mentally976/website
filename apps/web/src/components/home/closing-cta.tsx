import Image from 'next/image'
import { images } from '@mentally/db/mock'
import { ButtonLink } from '@/components/ui/button'

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="container-page pb-20 md:pb-28">
      <div className="relative isolate overflow-hidden rounded-panel bg-ink px-6 py-16 text-canvas md:px-14 md:py-24">
        <Image src={images.forest.url} alt="" fill sizes="(min-width: 82rem) 77rem, 100vw" className="-z-10 object-cover opacity-45" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
        <div className="max-w-xl">
          <h2 id="cta-title" className="text-title font-semibold">
            Эхний алхмаа өнөөдөр хийгээрэй
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-canvas/75">Бүртгэл үнэгүй. Хичээлээ сонгоод, өөрт тохирох цагтаа, өөрийн хурдаар үзээрэй.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/signup" variant="light" size="lg">
              Үнэгүй бүртгүүлэх
            </ButtonLink>
            <ButtonLink href="/login" variant="outlineLight" size="lg">
              Нэвтрэх
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
