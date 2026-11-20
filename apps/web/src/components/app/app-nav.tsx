'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpenText, House, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const APP_NAV = [
  { href: '/dashboard', label: 'Нүүр', icon: House, exact: true },
  { href: '/dashboard/courses', label: 'Хичээлүүд', icon: PlayCircle, exact: false },
  { href: '/dashboard/facts', label: 'Судалгааны баримт', short: 'Баримт', icon: BookOpenText, exact: false },
] as const

/** Without `activePath` (the static shell, before the pathname is known) nothing is active. */
export function isActive(item: (typeof APP_NAV)[number], activePath?: string) {
  if (activePath === undefined) return false
  return item.exact ? activePath === item.href : activePath.startsWith(item.href)
}

/** Vertical list for the desktop sidebar. */
export function AppNavLinks({ activePath }: { activePath?: string }) {
  return (
    <ul className="space-y-1">
      {APP_NAV.map((item) => {
        const active = isActive(item, activePath)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.9375rem] font-medium transition-colors duration-200',
                active ? 'bg-ink text-canvas' : 'text-ink-soft hover:bg-canvas hover:text-ink',
              )}
            >
              <item.icon className="size-[1.125rem] shrink-0" aria-hidden />
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function ActiveAppNav() {
  return <AppNavLinks activePath={usePathname()} />
}
