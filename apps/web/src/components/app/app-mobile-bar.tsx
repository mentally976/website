'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Logo } from '@/components/layout/logo'
import { cn } from '@/lib/utils'

type Props = {
  /** Server-rendered initials shown on the account button. */
  avatar: ReactNode
  /** Server-rendered account panel: user, sign out, crisis line. */
  children: ReactNode
}

/** Top bar of the student app on small screens: logo plus an account menu. Navigation lives in the bottom tab bar. */
export function AppMobileBar({ avatar, children }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70 lg:hidden">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Logo href="/dashboard" />
        <button
          type="button"
          aria-expanded={open}
          aria-controls="account-menu"
          aria-label={open ? 'Бүртгэлийн цэс хаах' : 'Бүртгэлийн цэс нээх'}
          onClick={() => setOpen((value) => !value)}
          className="size-10 cursor-pointer rounded-full p-0.5 ring-1 ring-line transition-transform active:scale-95"
        >
          {avatar}
        </button>
      </div>

      {/* Absolute, not fixed: the bar's backdrop-filter would trap a fixed child. Tapping outside the panel closes it. */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn('absolute inset-x-0 top-full h-dvh bg-ink/20 transition-opacity duration-300', open ? 'opacity-100' : 'pointer-events-none opacity-0')}
      />
      <div
        id="account-menu"
        inert={!open}
        className={cn(
          'absolute top-[calc(100%+0.5rem)] right-4 w-[min(20rem,calc(100vw-2rem))] rounded-card bg-surface p-3 shadow-xl ring-1 ring-line sm:right-6',
          'origin-top-right transition-[opacity,transform] duration-200 ease-[var(--ease-out-soft)]',
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        {children}
      </div>
    </div>
  )
}
