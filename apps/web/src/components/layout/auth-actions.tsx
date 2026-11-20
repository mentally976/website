import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { signOut } from '@/app/(auth)/actions'
import { ButtonLink } from '@/components/ui/button'
import { getUser } from '@/lib/auth'
import { initials } from '@/lib/utils'

/** Header actions that depend on the session. Rendered inside <Suspense>. */
export async function AuthActions() {
  const user = await getUser()

  if (!user) {
    return (
      <>
        <ButtonLink href="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">
          Нэвтрэх
        </ButtonLink>
        <ButtonLink href="/signup" size="sm">
          Бүртгүүлэх
        </ButtonLink>
      </>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <Link href="/dashboard" className="flex items-center gap-2.5 rounded-full py-1 pr-1 pl-1 transition-colors hover:bg-ink/5 sm:pr-4">
        <span className="grid size-8 place-items-center rounded-full bg-sky text-xs font-semibold text-white">{initials(user.name)}</span>
        <span className="hidden text-sm font-medium sm:inline">Миний хичээлүүд</span>
      </Link>
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

export function AuthActionsFallback() {
  return <div aria-hidden className="h-9 w-24 animate-pulse rounded-full bg-ink/5 sm:w-44" />
}
