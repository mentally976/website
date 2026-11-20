import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  /** Small pill above the title that names the section, like the reference's "Consultation Services". */
  tag?: string
  title: ReactNode
  intro?: ReactNode
  aside?: ReactNode
  className?: string
  id?: string
}

/** Title on the left, optional intro or action on the right; stacks on mobile. */
export function SectionHeading({ tag, title, intro, aside, className, id }: Props) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-12', className)}>
      <div>
        {tag && (
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-soft ring-1 ring-line">
            <span aria-hidden className="size-1.5 rounded-full bg-sky" />
            {tag}
          </p>
        )}
        <h2 id={id} className="text-title font-semibold">
          {title}
        </h2>
      </div>
      {(intro || aside) && (
        <div className="flex flex-col gap-5 md:items-start md:pb-1.5">
          {intro && <p className="max-w-md text-[1.0625rem] leading-relaxed text-muted">{intro}</p>}
          {aside}
        </div>
      )}
    </div>
  )
}
