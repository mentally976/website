import { LogOut } from 'lucide-react'
import { signOut } from '@/app/(auth)/actions'
import { requireUser } from '@/lib/auth'
import { initials } from '@/lib/utils'

/** Signed-in student with a sign-out button. Reads the session, so render it inside <Suspense>. */
export async function AppUser() {
  // proxy.ts already redirects guests; this re-checks on the server for every app page.
  const user = await requireUser()

  return (
    <div className="flex items-center gap-3 rounded-card bg-canvas p-3">
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-sky text-xs font-semibold text-white">
        {initials(user.name)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{user.name}</p>
        <p className="truncate text-xs text-muted">{user.email}</p>
      </div>
      <form action={signOut}>
        <button
          type="submit"
          aria-label="Гарах"
          title="Гарах"
          className="grid size-9 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <LogOut className="size-4" aria-hidden />
        </button>
      </form>
    </div>
  )
}

export function AppUserSkeleton() {
  return <div aria-hidden className="h-15 animate-pulse rounded-card bg-ink/5" />
}

/** Initials circle for the mobile account button. Reads the session, so render it inside <Suspense>. */
export async function AppAvatar() {
  const user = await requireUser()
  return <span className="grid size-full place-items-center rounded-full bg-sky text-xs font-semibold text-white">{initials(user.name)}</span>
}
