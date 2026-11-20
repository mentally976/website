import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { type Database } from '@mentally/db'
import { isAdminEmail } from '@/lib/admin-access'
import { supabaseKey, supabaseUrl } from './env'

const PROTECTED_PREFIXES = ['/dashboard', '/admin']
const GUEST_ONLY = ['/login', '/signup']

/** Refreshes the Supabase session cookie on every request and does optimistic route checks. */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  let signedIn = false
  let email: unknown

  // Guests carry no Supabase auth cookie (`sb-<ref>-auth-token`, maybe chunked): skip the client for a session that can't exist.
  if (request.cookies.getAll().some(({ name }) => name.startsWith('sb-') && name.includes('-auth-token'))) {
    const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value))
        },
      },
    })

    // Do not run code between createServerClient and getClaims: it validates and refreshes the session.
    const { data } = await supabase.auth.getClaims()
    signedIn = Boolean(data?.claims)
    email = data?.claims?.email
  }
  // Optimistic only: lib/admin.ts re-checks the admin on the server (and with the Auth server) before any data.
  const admin = signedIn && isAdminEmail(email)
  const { pathname, search } = request.nextUrl

  // Old public catalogue links: courses now live only in the student app, which guests reach through sign-in.
  if (pathname === '/courses' || pathname.startsWith('/courses/')) {
    const target = `/dashboard${pathname}`
    return signedIn
      ? redirectWithCookies(request, response, target, Object.fromEntries(request.nextUrl.searchParams))
      : redirectWithCookies(request, response, '/login', { next: target + search })
  }
  if (!signedIn && PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return redirectWithCookies(request, response, '/login', { next: pathname + search })
  }
  if (signedIn && GUEST_ONLY.includes(pathname)) {
    return redirectWithCookies(request, response, admin ? '/admin' : '/dashboard')
  }
  if (signedIn && !admin && (pathname === '/admin' || pathname.startsWith('/admin/'))) {
    return redirectWithCookies(request, response, '/dashboard')
  }
  // Signed-in students live in the app shell, so public pages send them to their twin there; the admin lands on /admin.
  // GET only: a server action posted from an open public tab must still reach its page.
  const appPath = signedIn && request.method === 'GET' ? signedInPath(pathname, admin) : null
  if (appPath) {
    return redirectWithCookies(request, response, appPath, Object.fromEntries(request.nextUrl.searchParams))
  }
  return response
}

/** Where a signed-in visitor of `pathname` belongs, or null to stay. The public pages are for visitors only. */
function signedInPath(pathname: string, admin: boolean) {
  if (admin && (pathname === '/' || pathname === '/dashboard')) return '/admin'
  if (pathname === '/' || pathname === '/therapists') return '/dashboard'
  return null
}

function redirectWithCookies(request: NextRequest, from: NextResponse, pathname: string, params: Record<string, string> = {}) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  url.search = new URLSearchParams(params).toString()
  const redirect = NextResponse.redirect(url)
  from.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie))
  return redirect
}
