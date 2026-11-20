'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { safeNext } from '@/lib/auth'
import { authErrorMessage } from '@/lib/auth-errors'
import { createClient } from '@/lib/supabase/server'

export type AuthState = {
  error?: string
  notice?: string
  email?: string
  name?: string
} | null

const MIN_PASSWORD = 8

function read(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = read(formData, 'email')
  const password = formData.get('password')
  const next = safeNext(formData.get('next'))

  if (!email || typeof password !== 'string' || !password) {
    return { error: 'Имэйл хаяг болон нууц үгээ оруулна уу.', email }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: authErrorMessage(error), email }

  redirect(next)
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = read(formData, 'name')
  const email = read(formData, 'email')
  const password = formData.get('password')

  if (!name || !email || typeof password !== 'string') {
    return { error: 'Нэр, имэйл, нууц үгээ бүрэн оруулна уу.', email, name }
  }
  if (password.length < MIN_PASSWORD) {
    return { error: `Нууц үг дор хаяж ${MIN_PASSWORD} тэмдэгттэй байна.`, email, name }
  }

  const origin = await siteOrigin()
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  })
  if (error) return { error: authErrorMessage(error), email, name }

  // Email confirmation is on: Supabase returns a user without a session until the link is clicked.
  if (!data.session) {
    return { notice: `${email} хаяг руу баталгаажуулах холбоос илгээлээ. Холбоос дээр дарж бүртгэлээ идэвхжүүлнэ үү.` }
  }
  redirect('/dashboard')
}

/**
 * Starts the Google OAuth (PKCE) flow. Supabase sends the user to Google, then back to /auth/callback,
 * which exchanges the code for a session and redirects to `next`.
 */
export async function signInWithGoogle(formData: FormData) {
  const next = safeNext(formData.get('next'))
  const origin = await siteOrigin()
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      queryParams: { prompt: 'select_account' },
    },
  })
  if (error || !data.url) redirect('/login?error=oauth')
  redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

async function siteOrigin() {
  return (await headers()).get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}
