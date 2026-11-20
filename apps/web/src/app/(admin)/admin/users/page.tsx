import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { AdminNotice } from '@/components/admin/admin-notice'
import { AdminTopbar } from '@/components/admin/admin-shell'
import { UsersTable } from '@/components/admin/users-table'
import { getAdminUsers } from '@/lib/admin'

export const metadata: Metadata = {
  title: 'Хэрэглэгчид',
}

export default function AdminUsersPage({ searchParams }: PageProps<'/admin/users'>) {
  return (
    <>
      <AdminTopbar title="Хэрэглэгчид" />
      <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Suspense fallback={<div aria-hidden className="h-96 animate-pulse rounded-card bg-ink/5" />}>
          <UserList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  )
}

async function UserList({ searchParams }: Pick<PageProps<'/admin/users'>, 'searchParams'>) {
  const result = await getAdminUsers()
  if (result.status !== 'ok') return <AdminNotice result={result} />

  const { q } = await searchParams
  const query = typeof q === 'string' ? q.trim() : ''
  const needle = query.toLowerCase()
  const users = needle ? result.users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(needle)) : result.users

  return (
    <section aria-labelledby="users-title" className="rounded-card bg-surface p-5 ring-1 ring-line md:p-6">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="users-title" className="font-semibold">
          {query ? `«${query}» хайлтын үр дүн` : 'Бүх хэрэглэгч'}
        </h2>
        <p className="text-sm text-muted" aria-live="polite">
          {query ? `${users.length} хэрэглэгч олдлоо (нийт ${result.users.length})` : `Нийт ${users.length} хэрэглэгч`}
          {query && (
            <Link href="/admin/users" className="ml-3 font-medium text-ink underline underline-offset-4">
              Хайлтыг арилгах
            </Link>
          )}
        </p>
      </div>
      <UsersTable users={users} caption="Бүртгэлтэй хэрэглэгчид" />
    </section>
  )
}
