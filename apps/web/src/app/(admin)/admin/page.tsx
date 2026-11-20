import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight } from 'lucide-react'
import { AdminNotice } from '@/components/admin/admin-notice'
import { AdminTopbar } from '@/components/admin/admin-shell'
import { DonutChart } from '@/components/admin/donut-chart'
import { SignupsChart } from '@/components/admin/signups-chart'
import { StatTiles } from '@/components/admin/stat-tiles'
import { UsersTable } from '@/components/admin/users-table'
import { getAdminUsers, getRequestTime } from '@/lib/admin'
import { buildOverview } from '@/lib/admin-stats'

export const metadata: Metadata = {
  title: 'Хянах самбар',
}

export default function AdminOverviewPage() {
  return (
    <>
      <AdminTopbar title="Хянах самбар" />
      <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Suspense fallback={<OverviewSkeleton />}>
          <Overview />
        </Suspense>
      </div>
    </>
  )
}

async function Overview() {
  // getAdminUsers runs requireAdmin first, which also opts this render into request time.
  const result = await getAdminUsers()
  if (result.status !== 'ok') return <AdminNotice result={result} />
  const overview = buildOverview(result.users, await getRequestTime())

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <SignupsChart data={overview.chart} />
      <StatTiles stats={overview.stats} />

      <section aria-labelledby="recent-title" className="rounded-card bg-surface p-5 ring-1 ring-line md:p-6">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h2 id="recent-title" className="font-semibold">
            Сүүлд бүртгүүлсэн хэрэглэгчид
          </h2>
          <Link href="/admin/users" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink">
            Бүгдийг харах
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <UsersTable users={overview.recent} caption="Сүүлд бүртгүүлсэн хэрэглэгчид" />
      </section>

      <section aria-labelledby="mix-title" className="self-start rounded-card bg-surface p-5 ring-1 ring-line md:p-6">
        <h2 id="mix-title" className="font-semibold">
          Хэрэглэгчдийн бүтэц
        </h2>
        <div className="mt-6 space-y-8">
          <DonutChart title="Нэвтрэх арга" centerLabel="Нийт" slices={overview.providers} />
          <DonutChart title="Идэвх" centerLabel="Нийт" slices={overview.activity} />
        </div>
      </section>
    </div>
  )
}

function OverviewSkeleton() {
  return (
    <div aria-hidden className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="h-96 animate-pulse rounded-card bg-ink/5" />
      <div className="grid grid-cols-2 gap-4 self-start">
        {[0, 1, 2, 3].map((key) => (
          <div key={key} className="h-36 animate-pulse rounded-card bg-ink/5" />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-card bg-ink/5" />
      <div className="h-80 animate-pulse rounded-card bg-ink/5" />
    </div>
  )
}
