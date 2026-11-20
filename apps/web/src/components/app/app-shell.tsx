import { Suspense } from 'react'
import { EMERGENCY_NUMBER } from '@/content/site'
import { ActiveAppNav, AppNavLinks } from './app-nav'
import { ActiveAppTabBar, AppTabBarLinks } from './app-tab-bar'
import { AppUser, AppUserSkeleton } from './app-user'

/** Desktop sidebar navigation. */
export function AppSidebarNav() {
  return (
    <nav aria-label="Суралцагчийн цэс">
      <Suspense fallback={<AppNavLinks />}>
        <ActiveAppNav />
      </Suspense>
    </nav>
  )
}

/** Mobile bottom navigation, fixed to the bottom of the screen. */
export function AppTabBar() {
  return (
    <nav
      aria-label="Суралцагчийн цэс"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-surface/75 lg:hidden"
    >
      <Suspense fallback={<AppTabBarLinks />}>
        <ActiveAppTabBar />
      </Suspense>
    </nav>
  )
}

/** Crisis line and account box: bottom of the desktop sidebar, inside the mobile account menu. */
export function AppAccount() {
  return (
    <div className="space-y-3">
      <Suspense fallback={<AppUserSkeleton />}>
        <AppUser />
      </Suspense>
      <p className="rounded-card p-3 text-sm leading-relaxed text-muted ring-1 ring-line">
        Яаралтай тусламж хэрэгтэй бол{' '}
        <a href={`tel:${EMERGENCY_NUMBER}`} className="font-semibold text-ink underline underline-offset-4">
          {EMERGENCY_NUMBER}
        </a>{' '}
        дугаарт залгана уу.
      </p>
    </div>
  )
}
