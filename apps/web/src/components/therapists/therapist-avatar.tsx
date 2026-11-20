import Image from 'next/image'
import { type Therapist } from '@mentally/db'
import { cn, initials } from '@/lib/utils'

type Props = {
  therapist: Pick<Therapist, 'name' | 'photoUrl' | 'photoAlt'>
  /** Rendered pixel size, for the image request. Set the visible size with `className`. */
  size: number
  className?: string
  /** True when the name is already written next to the avatar. */
  decorative?: boolean
}

/** Round photo of the psychologist, or their initials until a photo is supplied. */
export function TherapistAvatar({ therapist, size, className, decorative = false }: Props) {
  if (therapist.photoUrl) {
    return (
      <Image
        src={therapist.photoUrl}
        alt={decorative ? '' : therapist.photoAlt}
        width={size}
        height={size}
        className={cn('shrink-0 rounded-full object-cover', className)}
      />
    )
  }

  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : therapist.name}
      aria-hidden={decorative || undefined}
      className={cn('grid shrink-0 place-items-center rounded-full bg-sky-soft font-semibold text-sky', className)}
    >
      {initials(therapist.name)}
    </span>
  )
}
