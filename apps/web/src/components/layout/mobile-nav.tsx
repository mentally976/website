'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { EMERGENCY_NUMBER, NAV_LINKS } from '@/content/links'
import { cn } from '@/lib/utils'

/** Full-height menu under the header on small screens. `footer` is a server-rendered auth slot. */
export function MobileNav({ footer }: { footer?: ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 cursor-pointer place-items-center rounded-full bg-surface ring-1 ring-line transition-transform active:scale-95"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        <span className="sr-only">{open ? 'Цэс хаах' : 'Цэс нээх'}</span>
      </button>

      {/* Absolute, not fixed: the header's backdrop-filter would trap a fixed child. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          'absolute inset-x-0 top-full flex h-[calc(100dvh-4.5rem)] flex-col justify-between bg-canvas px-4 pt-4 pb-8 sm:px-6',
          'origin-top transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)]',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0',
        )}
      >
        <nav aria-label="Гар утасны цэс">
          <ul className="divide-y divide-line border-y border-line">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-5 text-2xl font-semibold tracking-tight">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-5" onClick={() => setOpen(false)}>
          {footer}
          <p className="text-sm text-muted">
            Яаралтай тусламж хэрэгтэй бол{' '}
            <a href={`tel:${EMERGENCY_NUMBER}`} className="font-semibold text-ink underline underline-offset-4">
              {EMERGENCY_NUMBER}
            </a>{' '}
            дугаарт залгана уу.
          </p>
        </div>
      </div>
    </div>
  )
}
