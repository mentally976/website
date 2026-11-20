import Image from 'next/image'
import { images } from '@mentally/db/mock'
import { getCatalogueStats } from '@/lib/data'

/** Dark band under the wordmark: what Mentally is, in one sentence, with the real catalogue numbers. */
export async function AboutBand() {
  const stats = await getCatalogueStats()
  const figures = [
    { value: stats.courses, label: 'видео хичээлийн цуврал' },
    { value: stats.lessons, label: 'богино хичээл' },
    { value: stats.topics, label: 'сэдэв' },
  ]

  return (
    <section aria-label="Mentally-ийн тухай" className="bg-ink text-canvas">
      <div className="container-page py-16 md:py-24">
        <p className="max-w-4xl text-statement font-medium">
          Mentally нь мэргэшсэн сэтгэл зүйчийн бэлтгэсэн видео хичээл, хувийн зөвлөгөөг нэг дор авчирч, сэтгэлийн эрүүл мэндийн тусламжийг хүн бүрт ойртуулна.
        </p>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-[1.6fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-card md:aspect-auto md:min-h-80">
            <Image src={images.steppe.url} alt={images.steppe.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card md:aspect-auto">
            <Image src={images.mindfulness.url} alt={images.mindfulness.alt} fill sizes="(min-width: 768px) 38vw, 100vw" className="object-cover" />
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-canvas/15 pt-8 md:mt-16">
          {figures.map((figure) => (
            <div key={figure.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-sm leading-snug text-canvas/60 md:text-base">{figure.label}</dt>
              <dd className="font-display text-3xl font-medium tracking-tight md:text-5xl">{figure.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
