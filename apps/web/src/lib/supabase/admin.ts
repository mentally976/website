import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { type Database } from '@mentally/db'
import { supabaseUrl } from './env'

/**
 * Service client for the Auth admin API (listing users). It bypasses Row Level Security, so only call it
 * after `requireAdmin()`. The secret key must never get a NEXT_PUBLIC_ prefix.
 * Returns null when SUPABASE_SECRET_KEY is not configured, so the admin page can explain the setup step.
 */
export function createAdminClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY
  if (!secretKey) return null
  return createClient<Database>(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
}
