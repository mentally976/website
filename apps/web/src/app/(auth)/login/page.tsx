import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { GoogleButton, OrDivider } from '@/components/auth/google-button'
import { LoginForm } from '@/components/auth/login-form'
import { safeNext } from '@/lib/auth'

export const metadata: Metadata = { title: 'Нэвтрэх' }

export default function LoginPage({ searchParams }: PageProps<'/login'>) {
  return (
    <>
      <h1 className="text-title font-semibold">Тавтай морил</h1>
      <p className="mt-3 mb-9 text-[1.0625rem] text-muted">Хичээлээ үргэлжлүүлэхийн тулд нэвтэрнэ үү.</p>

      {/* searchParams are request data, so the forms that read them stream in. */}
      <Suspense
        fallback={
          <>
            <GoogleButton />
            <OrDivider />
            <LoginForm next="/dashboard" />
          </>
        }
      >
        <LoginFormWithParams searchParams={searchParams} />
      </Suspense>

      <p className="mt-8 text-[0.9375rem] text-muted">
        Бүртгэлгүй юу?{' '}
        <Link href="/signup" className="font-medium text-ink underline underline-offset-4">
          Үнэгүй бүртгүүлэх
        </Link>
      </p>
    </>
  )
}

async function LoginFormWithParams({ searchParams }: Pick<PageProps<'/login'>, 'searchParams'>) {
  const params = await searchParams
  const next = safeNext(params.next)
  const error = params.error === 'link' || params.error === 'oauth' ? params.error : undefined
  return (
    <>
      <GoogleButton next={next} />
      <OrDivider />
      <LoginForm next={next} linkError={error} />
    </>
  )
}
