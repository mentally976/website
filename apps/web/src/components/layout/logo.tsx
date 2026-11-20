import Link from 'next/link'
import { cn } from '@/lib/utils'

/** Two overlapping circles: two people meeting, or a mind finding its balance. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn('size-7', className)}>
      <circle cx="12" cy="16" r="9" fill="currentColor" />
      <circle cx="21" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

type LogoProps = { className?: string; tone?: 'dark' | 'light'; href?: string }

export function Logo({ className, tone = 'dark', href = '/' }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Mentally — нүүр хуудас"
      className={cn(
        'inline-flex items-center gap-2 font-display text-[1.0625rem] font-bold tracking-tight',
        tone === 'light' ? 'text-canvas' : 'text-ink',
        className,
      )}
    >
      <LogoMark />
      mentally
    </Link>
  )
}
