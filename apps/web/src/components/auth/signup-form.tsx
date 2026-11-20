'use client'

import { MailCheck } from 'lucide-react'
import { useActionState } from 'react'
import { signUp } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import { Field, FormMessage } from './field'

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, null)

  if (state?.notice) {
    return (
      <div role="status" className="rounded-card bg-surface p-6 ring-1 ring-line">
        <MailCheck className="size-8 text-sky" aria-hidden />
        <p className="mt-4 text-xl font-semibold tracking-tight">Имэйлээ шалгана уу</p>
        <p className="mt-2 leading-relaxed text-muted">{state.notice}</p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}

      <Field label="Таны нэр" name="name" autoComplete="name" required defaultValue={state?.name} placeholder="Жишээ нь: Анударь" />
      <Field label="Имэйл хаяг" name="email" type="email" autoComplete="email" required defaultValue={state?.email} placeholder="name@example.com" />
      <Field label="Нууц үг" name="password" type="password" autoComplete="new-password" required minLength={8} hint="Дор хаяж 8 тэмдэгт." />

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Бүртгэл үүсгэж байна…' : 'Бүртгэл үүсгэх'}
      </Button>
      <p className="text-sm leading-relaxed text-muted">Бүртгүүлснээр та өөрийн мэдээллийг зөвхөн хичээл үзэхэд ашиглахыг зөвшөөрч байна.</p>
    </form>
  )
}
