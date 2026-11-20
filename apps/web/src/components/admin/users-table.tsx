import { formatDay, formatDayTime, PROVIDER_LABEL, type AdminUser } from '@/lib/admin-stats'
import { initials } from '@/lib/utils'

/** Registered users: who they are, how they sign in, when they joined and when they were last seen. */
export function UsersTable({ users, caption }: { users: AdminUser[]; caption: string }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 md:-mx-6 md:px-6">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line text-xs text-muted">
            <th scope="col" className="py-3 pr-4 font-medium">
              Хэрэглэгч
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Нэвтрэх арга
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Бүртгүүлсэн
            </th>
            <th scope="col" className="py-3 font-medium">
              Сүүлд нэвтэрсэн
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-canvas text-xs font-semibold text-ink-soft ring-1 ring-line">
                    {initials(user.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-ink-soft ring-1 ring-line">
                  {PROVIDER_LABEL[user.provider] ?? user.provider}
                </span>
                {!user.confirmed && <span className="ml-2 text-xs text-muted">Баталгаажаагүй</span>}
              </td>
              <td className="py-3 pr-4 whitespace-nowrap text-ink-soft tabular-nums">{formatDay(user.createdAt)}</td>
              <td className="py-3 whitespace-nowrap text-ink-soft tabular-nums">{user.lastSignInAt ? formatDayTime(user.lastSignInAt) : 'Нэвтрээгүй'}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="py-10 text-center text-muted">
                Хэрэглэгч олдсонгүй.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
