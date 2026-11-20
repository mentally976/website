import type { Metadata } from 'next'
import { type ReactNode } from 'react'
import { AdminMobileBar, AdminSidebar } from '@/components/admin/admin-shell'

export const metadata: Metadata = {
  robots: { index: false },
}

/** Admin shell for the site owner only (see lib/admin.ts). No marketing header or footer. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1">
      <a href="#main" className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Үндсэн агуулга руу шилжих
      </a>
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileBar />
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
