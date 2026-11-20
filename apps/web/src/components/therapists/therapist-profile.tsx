import Image from 'next/image'
import { type ReactNode } from 'react'
import { type Therapist } from '@mentally/db'
import { initials } from '@/lib/utils'

type Props = {
  therapist: Therapist & { courseCount?: number }
  /** `h1` on the therapist page, `h2` when the profile is a section of another page. */
  as?: 'h1' | 'h2'
  id?: string
  eyebrow?: string
  /** Load the photo eagerly when the profile is the top of the page. */
  preload?: boolean
  /** Call-to-action buttons under the text. */
  children?: ReactNode
}

/** Photo and introduction of Mentally's psychologist, who prepares every course. */
export function TherapistProfile({ therapist, as: Heading = 'h2', id, eyebrow = 'Таны сэтгэл зүйч', preload, children }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-center md:gap-14">
      {therapist.photoUrl ? (
        <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-line">
          <Image
            src={therapist.photoUrl}
            alt={therapist.photoAlt}
            fill
            preload={preload}
            sizes="(min-width: 82rem) 34rem, (min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        // No photo yet: initials, never a stand-in picture of someone else.
        <div role="img" aria-label={therapist.name} className="grid aspect-square place-items-center rounded-panel bg-sky-soft">
          <span aria-hidden className="font-display text-7xl font-bold tracking-tight text-sky md:text-8xl">
            {initials(therapist.name)}
          </span>
        </div>
      )}

      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-[0.8125rem] font-medium text-ink-soft ring-1 ring-line">
          <span aria-hidden className="size-1.5 rounded-full bg-sky" />
          {eyebrow}
        </p>
        <Heading id={id} className="mt-5 text-title font-semibold">
          {therapist.name}
        </Heading>
        <p className="mt-2 text-lg text-muted">
          {therapist.yearsExperience ? `${therapist.title}, ${therapist.yearsExperience} жилийн туршлагатай` : therapist.title}
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{therapist.bio}</p>

        {therapist.specialties.length > 0 && (
          <ul aria-label="Мэргэшил" className="mt-6 flex flex-wrap gap-2">
            {therapist.specialties.map((specialty) => (
              <li key={specialty} className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-ink-soft ring-1 ring-line">
                {specialty}
              </li>
            ))}
          </ul>
        )}

        {therapist.courseCount ? (
          <p className="mt-6 text-muted">Mentally дээрх {therapist.courseCount} хичээлийг бүгдийг нь өөрөө бэлтгэсэн.</p>
        ) : null}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  )
}
