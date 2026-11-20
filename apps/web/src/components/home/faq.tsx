import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { FAQ } from '@/content/faq'

/** Native <details>: works without JavaScript and is keyboard accessible by default. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-page py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading id="faq-title" title="Түгээмэл асуулт" className="self-start md:grid-cols-1 lg:sticky lg:top-28" />
        <div className="border-t border-line">
          {FAQ.map((item) => (
            <details key={item.q} name="faq" className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus aria-hidden className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-ink" />
              </summary>
              <p className="max-w-2xl pr-10 pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
