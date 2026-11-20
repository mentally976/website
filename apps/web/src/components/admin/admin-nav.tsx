'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const ADMIN_NAV = [
  { href: '/admin', label: 'Хянах самбар', icon: LayoutDashboard, exact: true },
  { href: '/admin/users', label: 'Хэрэглэгчид', icon: Users, exact: false },
] as const

type Props = { activePath?: string; layout?: 'vertical' | 'horizontal' }

/** Admin navigation. Without `activePath` (the static shell) nothing is highlighted. */
export function AdminNavLinks({ activePath, layout = 'vertical' }: Props) {
  return (
    <ul className={layout === 'vertical' ? 'space-y-1' : 'flex gap-1.5'}>
      {ADMIN_NAV.map((item) => {
        const active = activePath !== undefined && (item.exact ? activePath === item.href : activePath.startsWith(item.href))
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200',
                layout === 'vertical' ? 'px-3.5 py-2.5' : 'px-3.5 py-2 text-sm',
                active ? 'bg-chart-1/10 text-chart-1' : 'text-ink-soft hover:bg-canvas hover:text-ink',
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

export function ActiveAdminNav({ layout }: Pick<Props, 'layout'>) {
  return <AdminNavLinks activePath={usePathname()} layout={layout} />
}
