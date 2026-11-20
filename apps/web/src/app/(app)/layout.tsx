import type { Metadata } from 'next'
import { Suspense, type ReactNode } from 'react'
import { AppMobileBar } from '@/components/app/app-mobile-bar'
import { AppAccount, AppSidebarNav, AppTabBar } from '@/components/app/app-shell'
import { AppAvatar } from '@/components/app/app-user'
import { Logo } from '@/components/layout/logo'

export const metadata: Metadata = {
  robots: { index: false },
}

/**
 * Student app shell, with no marketing header or footer.
 * Desktop: sidebar. Mobile: top bar with an account menu, and a bottom tab bar for navigation.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1">
      <a href="#main" className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Үндсэн агуулга руу шилжих
      </a>

      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col overflow-y-auto border-r border-line bg-surface px-4 py-6 lg:flex">
        <Logo href="/dashboard" className="px-3" />
        <div className="mt-10 flex-1">
          <AppSidebarNav />
        </div>
        <div className="pt-8">
          <AppAccount />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppMobileBar
          avatar={
            <Suspense fallback={<span className="block size-full animate-pulse rounded-full bg-ink/10" />}>
              <AppAvatar />
            </Suspense>
          }
        >
          <AppAccount />
        </AppMobileBar>
        {/* Bottom padding keeps the last content clear of the fixed mobile tab bar. */}
        <main id="main" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
      </div>

      <AppTabBar />
    </div>
  )
}
