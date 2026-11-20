'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { APP_NAV, isActive } from './app-nav'

/** Bottom navigation bar for the student app on small screens. */
export function AppTabBarLinks({ activePath }: { activePath?: string }) {
  return (
    <ul className="grid" style={{ gridTemplateColumns: `repeat(${APP_NAV.length}, minmax(0, 1fr))` }}>
      {APP_NAV.map((item) => {
        const active = isActive(item, activePath)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center gap-1 pt-2 pb-2.5 text-xs font-medium transition-colors duration-200',
                active ? 'text-ink' : 'text-muted hover:text-ink',
              )}
            >
              <span
                className={cn('grid h-8 w-14 place-items-center rounded-full transition-colors duration-200', active ? 'bg-ink text-canvas' : 'bg-transparent')}
              >
                <item.icon className="size-5" aria-hidden />
              </span>
              {'short' in item ? item.short : item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function ActiveAppTabBar() {
  return <AppTabBarLinks activePath={usePathname()} />
}
