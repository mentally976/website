import 'server-only'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export type SessionUser = {
  id: string
  email: string
  name: string
}

/**
 * Data Access Layer for the session. Reads cookies, so call it only inside a <Suspense> boundary.
 * `getClaims` verifies the JWT signature, unlike `getSession`, so it is safe for authorization.
 */
export const getUser = cache(async (): Promise<SessionUser | null> => {
  // getClaims checks the token's expiry against Date.now(). Without this, a runtime prefetch (cookies resolved)
  // reaches that clock read while prerendering and Next.js reports "unstable value `Date.now()`".
  await connection()
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims
  if (!claims) return null

  const email = typeof claims.email === 'string' ? claims.email : ''
  const meta = (claims.user_metadata ?? {}) as { full_name?: unknown }
  const fullName = typeof meta.full_name === 'string' ? meta.full_name.trim() : ''
  return { id: claims.sub, email, name: fullName || email.split('@')[0] || 'Хэрэглэгч' }
})

export async function requireUser(next = '/dashboard') {
  const user = await getUser()
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`)
  return user
}

/** Only allow same-site relative redirects after login. */
export function safeNext(value: unknown, fallback = '/dashboard') {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return fallback
  }
  return value
}
