import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { type Database } from '@mentally/db'
import { supabaseKey, supabaseUrl } from './env'

/**
 * Cookie-less client for public, cacheable reads (the course catalogue) inside 'use cache' functions.
 * It always acts as the `anon` role, so Row Level Security only lets it see published content.
 */
export function createPublicClient() {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
}
