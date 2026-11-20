import { Logo } from '@/components/layout/logo'
import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-dvh flex-col py-6">
      <Logo />
      <div className="flex flex-1 flex-col items-start justify-center gap-6 py-20">
        <p className="font-display text-7xl font-bold tracking-tight text-line md:text-9xl">404</p>
        <h1 className="text-title font-semibold">Энэ хуудас олдсонгүй</h1>
        <p className="max-w-md text-lg leading-relaxed text-muted">
          Холбоос хуучирсан эсвэл хаяг буруу бичигдсэн байж магадгүй. Нүүр хуудаснаас эхлээд үзээрэй.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Нүүр хуудас
          </ButtonLink>
          <ButtonLink href="/login" variant="secondary" size="lg">
            Нэвтрэх
          </ButtonLink>
        </div>
      </div>
    </main>
  )
}
