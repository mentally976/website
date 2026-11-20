import { Suspense } from 'react'
import { LogOut } from 'lucide-react'
import { signOut } from '@/app/(auth)/actions'
import { Logo } from '@/components/layout/logo'
import { getRequestTime, requireAdmin } from '@/lib/admin'
import { formatLongDate } from '@/lib/admin-stats'
import { initials } from '@/lib/utils'
import { ActiveAdminNav, AdminNavLinks } from './admin-nav'
import { AdminSearch, AdminSearchField } from './admin-search'

function SignOutButton({ compact = false }: { compact?: boolean }) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        aria-label={compact ? 'Гарах' : undefined}
        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
      >
        <LogOut className="size-[1.125rem] shrink-0" aria-hidden />
        {compact ? null : 'Гарах'}
      </button>
    </form>
  )
}

function AdminBadge() {
  return <span className="rounded-full bg-chart-1/10 px-2 py-0.5 text-xs font-semibold text-chart-1">Админ</span>
}

/** Desktop sidebar. */
export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col overflow-y-auto border-r border-line bg-surface px-4 py-6 lg:flex">
      <div className="flex items-center gap-2 px-3">
        <Logo href="/admin" />
        <AdminBadge />
      </div>
      <nav aria-label="Админ цэс" className="mt-10 flex-1">
        <Suspense fallback={<AdminNavLinks />}>
          <ActiveAdminNav />
        </Suspense>
      </nav>
      <SignOutButton />
    </aside>
  )
}

/** Small screens: logo, sign out and the navigation as a row of tabs. */
export function AdminMobileBar() {
  return (
    <div className="border-b border-line bg-surface px-4 pt-3 pb-2 sm:px-6 lg:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo href="/admin" />
          <AdminBadge />
        </div>
        <SignOutButton compact />
      </div>
      <nav aria-label="Админ цэс" className="-mx-4 mt-2 [scrollbar-width:none] overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <Suspense fallback={<AdminNavLinks layout="horizontal" />}>
          <ActiveAdminNav layout="horizontal" />
        </Suspense>
      </nav>
    </div>
  )
}

/** Page title with today's date, user search and the signed-in admin. */
export function AdminTopbar({ title }: { title: string }) {
  return (
    <header className="flex flex-col gap-4 border-b border-line bg-surface px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <Suspense fallback={<div aria-hidden className="mt-1 h-5 w-40 animate-pulse rounded-full bg-ink/5" />}>
          <Today />
        </Suspense>
      </div>
      <div className="flex items-center gap-4">
        <Suspense fallback={<AdminSearchField />}>
          <AdminSearch />
        </Suspense>
        <Suspense fallback={<div aria-hidden className="hidden size-10 shrink-0 animate-pulse rounded-full bg-ink/5 md:block" />}>
          <AdminIdentity />
        </Suspense>
      </div>
    </header>
  )
}

async function Today() {
  return <p className="mt-0.5 text-sm text-muted">{formatLongDate(await getRequestTime())}</p>
}

async function AdminIdentity() {
  const admin = await requireAdmin()
  return (
    <div className="hidden shrink-0 items-center gap-3 md:flex">
      <span aria-hidden className="grid size-10 place-items-center rounded-full bg-chart-1 text-sm font-semibold text-white">
        {initials(admin.name)}
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold">{admin.name}</p>
        <p className="text-xs text-muted">Сайтын админ</p>
      </div>
    </div>
  )
}
