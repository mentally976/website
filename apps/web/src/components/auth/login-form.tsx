'use client'

import { useActionState } from 'react'
import { signIn } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import { Field, FormMessage } from './field'

type Props = { next: string; linkError?: 'link' | 'oauth' }

const LINK_ERRORS = {
  link: 'Холбоосын хугацаа дууссан эсвэл буруу байна. Дахин нэвтэрч орно уу.',
  oauth: 'Google-ээр нэвтэрч чадсангүй. Дахин оролдох эсвэл имэйлээрээ нэвтэрнэ үү.',
} as const

export function LoginForm({ next, linkError }: Props) {
  const [state, action, pending] = useActionState(signIn, null)

  return (
    <form action={action} className="space-y-5">
      {linkError && !state && <FormMessage tone="error">{LINK_ERRORS[linkError]}</FormMessage>}
      {state?.error && <FormMessage tone="error">{state.error}</FormMessage>}

      <input type="hidden" name="next" value={next} />
      <Field label="Имэйл хаяг" name="email" type="email" autoComplete="email" required defaultValue={state?.email} placeholder="name@example.com" />
      <Field label="Нууц үг" name="password" type="password" autoComplete="current-password" required minLength={6} />

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? 'Нэвтэрч байна…' : 'Нэвтрэх'}
      </Button>
    </form>
  )
}
