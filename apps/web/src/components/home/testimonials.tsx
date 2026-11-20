import Image from 'next/image'
import { TESTIMONIALS } from '@/content/site'

export function Testimonials() {
  return (
    <section aria-labelledby="stories-title" className="bg-ink py-20 text-canvas md:py-28">
      <div className="container-page">
        <h2 id="stories-title" className="max-w-2xl text-title font-semibold">
          Суралцагчдын түүх
        </h2>
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col justify-between gap-10 rounded-card bg-canvas/[0.06] p-6 ring-1 ring-canvas/10 md:p-8">
                <blockquote className="text-lg leading-relaxed text-canvas/90">“{item.quote}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <Image src={item.image.url} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
                  <span className="text-sm">
                    <span className="block font-medium text-canvas">{item.name}</span>
                    <span className="block text-canvas/60">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
