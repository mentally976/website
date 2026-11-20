'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/content/site'
import { cn } from '@/lib/utils'

export function NavLinks({ activePath }: { activePath?: string }) {
  return (
    <ul className="flex items-center gap-0.5 rounded-full bg-surface p-1 ring-1 ring-line">
      {NAV_LINKS.map((link) => {
        const active = !link.href.includes('#') && activePath?.startsWith(link.href)
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'block rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-200',
                active ? 'bg-ink text-canvas' : 'hover:bg-canvas hover:text-ink',
              )}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function ActiveNavLinks() {
  const pathname = usePathname()
  return <NavLinks activePath={pathname} />
}
