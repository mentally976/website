import { Suspense } from 'react'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { ActiveNavLinks, NavLinks } from './nav-links'

/**
 * Header of the public site. Signed-in visitors never see it (proxy.ts sends them to /dashboard), so it shows the
 * guest actions without reading the session. That keeps every public page fully static and cacheable by the CDN.
 */
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
          <ButtonLink href="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Нэвтрэх
          </ButtonLink>
          <ButtonLink href="/signup" size="sm">
            Бүртгүүлэх
          </ButtonLink>
          <MobileNav
            footer={
              <div className="grid grid-cols-2 gap-3">
                <ButtonLink href="/login" variant="secondary" size="lg">
                  Нэвтрэх
                </ButtonLink>
                <ButtonLink href="/signup" size="lg">
                  Бүртгүүлэх
                </ButtonLink>
              </div>
            }
          />
        </div>
      </div>
    </header>
  )
}
