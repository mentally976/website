import { SectionHeading } from '@/components/ui/section-heading'
import { STEPS } from '@/content/site'

/** A real sequence, so it is numbered. */
export function Steps() {
  return (
    <section aria-labelledby="steps-title" className="container-page py-20 md:py-28">
      <SectionHeading id="steps-title" title="Хэрхэн эхлэх вэ?" intro="Бүртгүүлснээс хойш хэдхэн минутын дараа эхний хичээлээ үзэж эхэлнэ." />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-card bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-10 bg-canvas p-6 md:p-7">
            <span className="font-display text-sm font-medium text-sky">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
