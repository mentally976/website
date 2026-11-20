import { signOut } from '@/app/(auth)/actions'
import { Button, ButtonLink } from '@/components/ui/button'
import { getUser } from '@/lib/auth'

/** Auth buttons at the bottom of the mobile menu. Rendered inside <Suspense>. */
export async function MobileAuth() {
  const user = await getUser()

  if (!user) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <ButtonLink href="/login" variant="secondary" size="lg">
          Нэвтрэх
        </ButtonLink>
        <ButtonLink href="/signup" size="lg">
          Бүртгүүлэх
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <ButtonLink href="/dashboard" size="lg">
        Миний хичээлүүд
      </ButtonLink>
      <form action={signOut} className="contents">
        <Button type="submit" variant="secondary" size="lg">
          Гарах
        </Button>
      </form>
    </div>
  )
}
