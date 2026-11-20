import Image from 'next/image'
import { SectionHeading } from '@/components/ui/section-heading'
import { SERVICES } from '@/content/site'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          tag="Зөвлөгөөний үйлчилгээ"
          title="Сэтгэл зүйн зөвлөгөөний цогц үйлчилгээ"
          intro="Видео хичээлээс гадна сэтгэл зүйчтэй биечлэн, бүлгээр эсвэл онлайнаар уулзаж, өөрт тохирсон эмчилгээний аргыг хамтдаа сонгоно."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.title} className="overflow-hidden rounded-card bg-canvas">
              <div className="relative aspect-[16/10]">
                <Image
                  src={service.image.url}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{service.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
