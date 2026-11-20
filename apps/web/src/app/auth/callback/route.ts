import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { safeNext } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

/**
 * Landing URL for Supabase email links.
 * Handles both the PKCE `?code=` link (default template) and the `?token_hash=&type=` link (custom template).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const next = safeNext(searchParams.get('next'))
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  const supabase = await createClient()
  let failed = true

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    failed = Boolean(error)
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    failed = Boolean(error)
  }

  if (failed) return NextResponse.redirect(new URL('/login?error=link', origin))
  return NextResponse.redirect(new URL(next, origin))
}
