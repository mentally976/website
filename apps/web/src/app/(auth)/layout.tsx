import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { images } from '@mentally/db/mock'
import { Logo } from '@/components/layout/logo'

/** Split screen: form on the left, a calm photo on the right (hidden on small screens). */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-4 py-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink">
            <ChevronLeft className="size-4" aria-hidden />
            Нүүр хуудас
          </Link>
        </div>
        <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
          {children}
        </main>
      </div>

      <div className="relative hidden p-3 lg:block">
        <div className="relative h-full overflow-hidden rounded-panel">
          <Image src={images.steppe.url} alt={images.steppe.alt} fill preload sizes="50vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
          <blockquote className="absolute inset-x-10 bottom-10 max-w-lg text-canvas">
            <p className="text-statement font-medium">Тусламж хүсэх нь сул дорой байдал биш, өөртөө анхаарал тавьж буй хэрэг юм.</p>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
