import 'server-only'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { cache } from 'react'
import { type User } from '@supabase/supabase-js'
import { isAdminEmail } from '@/lib/admin-access'
import { getUser } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { type AdminUser } from './admin-stats'

/**
 * The real admin check (proxy.ts only redirects optimistically). Reads the session, so call it inside <Suspense>.
 * The email must be on ADMIN_EMAILS and confirmed according to the Auth server, not just present in the token.
 */
export const requireAdmin = cache(async () => {
  const user = await getUser()
  if (!user) redirect('/login?next=%2Fadmin')
  if (!isAdminEmail(user.email)) redirect('/dashboard')

  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user?.email_confirmed_at || !isAdminEmail(data.user.email)) redirect('/dashboard')
  return user
})

/** Current time for this request. connection() keeps the clock read out of prerendering. */
export async function getRequestTime() {
  await connection()
  return Date.now()
}

export type AdminUsersResult = { status: 'ok'; users: AdminUser[] } | { status: 'missing-key' } | { status: 'error'; message: string }

const PER_PAGE = 1000
const MAX_PAGES = 20

/** Every registered user, newest first. Admin only. */
export const getAdminUsers = cache(async (): Promise<AdminUsersResult> => {
  await requireAdmin()
  const admin = createAdminClient()
  if (!admin) return { status: 'missing-key' }

  const users: AdminUser[] = []
  for (let page = 1; page <= MAX_PAGES; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: PER_PAGE })
    if (error) return { status: 'error', message: error.message }
    users.push(...data.users.map(toAdminUser))
    if (data.users.length < PER_PAGE) break
  }
  users.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  return { status: 'ok', users }
})

function toAdminUser(user: User): AdminUser {
  const email = user.email ?? ''
  const meta = (user.user_metadata ?? {}) as { full_name?: unknown; name?: unknown }
  const name = [meta.full_name, meta.name].find((value): value is string => typeof value === 'string' && value.trim() !== '')
  const provider = typeof user.app_metadata?.provider === 'string' ? user.app_metadata.provider : 'email'
  return {
    id: user.id,
    email,
    name: name?.trim() || email.split('@')[0] || 'Нэргүй',
    provider,
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at ?? null,
    confirmed: Boolean(user.email_confirmed_at),
  }
}
