import { Suspense } from 'react'
import { AuthActions, AuthActionsFallback } from './auth-actions'
import { Logo } from './logo'
import { MobileAuth } from './mobile-auth'
import { MobileNav } from './mobile-nav'
import { ActiveNavLinks, NavLinks } from './nav-links'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Үндсэн цэс" className="hidden lg:block">
          <Suspense fallback={<NavLinks />}>
            <ActiveNavLinks />
          </Suspense>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Suspense fallback={<AuthActionsFallback />}>
            <AuthActions />
          </Suspense>
          <MobileNav
            footer={
              <Suspense>
                <MobileAuth />
              </Suspense>
            }
          />
        </div>
      </div>
    </header>
  )
}
