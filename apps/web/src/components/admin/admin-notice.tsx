import { type AdminUsersResult } from '@/lib/admin'

type Props = { result: Exclude<AdminUsersResult, { status: 'ok' }> }

/** Shown instead of the data when the service key is missing or Supabase returns an error. */
export function AdminNotice({ result }: Props) {
  if (result.status === 'error') {
    return (
      <div role="alert" className="rounded-card bg-surface p-6 ring-1 ring-line md:p-8">
        <p className="text-lg font-semibold tracking-tight">Хэрэглэгчдийн мэдээллийг татаж чадсангүй</p>
        <p className="mt-2 text-muted">Supabase хариу: {result.message}</p>
      </div>
    )
  }

  return (
    <div className="rounded-card bg-surface p-6 ring-1 ring-line md:p-8">
      <p className="text-lg font-semibold tracking-tight">Хэрэглэгчдийг харахын тулд нэг тохиргоо дутуу байна</p>
      <p className="mt-2 max-w-2xl leading-relaxed text-muted">
        Бүртгэлтэй хэрэглэгчдийн жагсаалтыг зөвхөн сервер талын нууц түлхүүрээр уншина. Энэ түлхүүр одоогоор тохируулагдаагүй байна.
      </p>
      <ol className="mt-5 list-decimal space-y-2 pl-5 leading-relaxed text-ink-soft">
        <li>Supabase → Project Settings → API Keys хэсэгт орж, Secret key үүсгээд хуулна.</li>
        <li>
          <code className="rounded bg-canvas px-1.5 py-0.5 text-sm">apps/web/.env.local</code> файлд{' '}
          <code className="rounded bg-canvas px-1.5 py-0.5 text-sm">SUPABASE_SECRET_KEY=…</code> мөр нэмнэ.
        </li>
        <li>Dev server-ээ дахин асаана. Vercel дээр мөн Environment Variables хэсэгт нэмнэ.</li>
      </ol>
      <p className="mt-5 text-sm text-muted">
        Анхаар: энэ түлхүүрийг хэзээ ч <code>NEXT_PUBLIC_</code> угтвартай нэрлэж болохгүй. Тэгвэл браузерт ил гарна.
      </p>
    </div>
  )
}
