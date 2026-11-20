import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleButton, OrDivider } from '@/components/auth/google-button'
import { SignupForm } from '@/components/auth/signup-form'

export const metadata: Metadata = { title: 'Бүртгүүлэх' }

export default function SignupPage() {
  return (
    <>
      <h1 className="text-title font-semibold">Бүртгэл үүсгэх</h1>
      <p className="mt-3 mb-9 text-[1.0625rem] text-muted">Бүртгэл үнэгүй. Бүх видео хичээлийг бүрэн үзэх боломжтой болно.</p>

      <GoogleButton />
      <OrDivider />
      <SignupForm />

      <p className="mt-8 text-[0.9375rem] text-muted">
        Бүртгэлтэй юу?{' '}
        <Link href="/login" className="font-medium text-ink underline underline-offset-4">
          Нэвтрэх
        </Link>
      </p>
    </>
  )
}
