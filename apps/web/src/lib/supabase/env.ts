function required(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing ${name}. Copy apps/web/.env.example to apps/web/.env.local and fill it in.`)
  }
  return value
}

// Accessed as literals so Next.js can inline them into the client bundle.
export const supabaseUrl = required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL)
export const supabaseKey = required('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
