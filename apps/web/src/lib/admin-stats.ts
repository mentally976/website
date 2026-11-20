/** Pure helpers for the admin dashboard. Dates are bucketed in Mongolian time (UTC+8). */

export type AdminUser = {
  id: string
  email: string
  name: string
  /** `google`, `email`, … from Supabase `app_metadata.provider`. */
  provider: string
  createdAt: string
  lastSignInAt: string | null
  confirmed: boolean
}

export type ChartRange = '12m' | '30d' | '7d'
export type ChartBar = { key: string; label: string; signups: number; logins: number }
export type Slice = { label: string; value: number; color: string }

const TZ = 'Asia/Ulaanbaatar'
const DAY = 86_400_000
const isoDay = new Intl.DateTimeFormat('en-CA', { timeZone: TZ })
const weekday = new Intl.DateTimeFormat('mn-MN', { weekday: 'short', timeZone: TZ })
const longDate = new Intl.DateTimeFormat('mn-MN', { dateStyle: 'medium', timeZone: TZ })
const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: TZ })

/** "2026.11.20" */
export function formatDay(iso: string) {
  return isoDay.format(new Date(iso)).replaceAll('-', '.')
}

/** "2026.11.20 13:30" */
export function formatDayTime(iso: string) {
  return `${formatDay(iso)} ${time.format(new Date(iso))}`
}

/** "2026 оны 11-р сарын 20" */
export function formatLongDate(ms: number) {
  return longDate.format(new Date(ms))
}

export const PROVIDER_LABEL: Record<string, string> = { google: 'Google', email: 'Имэйл' }

function emptyDays(now: number, count: number, label: (date: Date, key: string) => string): ChartBar[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now - (count - 1 - index) * DAY)
    const key = isoDay.format(date)
    return { key, label: label(date, key), signups: 0, logins: 0 }
  })
}

function emptyMonths(now: number): ChartBar[] {
  const [year, month] = isoDay.format(new Date(now)).split('-').map(Number) as [number, number]
  return Array.from({ length: 12 }, (_, index) => {
    const serial = year * 12 + (month - 1) - (11 - index)
    const m = (serial % 12) + 1
    return { key: `${Math.floor(serial / 12)}-${String(m).padStart(2, '0')}`, label: `${m}-р сар`, signups: 0, logins: 0 }
  })
}

function fill(bars: ChartBar[], users: AdminUser[], keyLength: number) {
  const byKey = new Map(bars.map((bar) => [bar.key, bar]))
  const keyOf = (iso: string) => isoDay.format(new Date(iso)).slice(0, keyLength)
  for (const user of users) {
    const signup = byKey.get(keyOf(user.createdAt))
    if (signup) signup.signups += 1
    const login = user.lastSignInAt ? byKey.get(keyOf(user.lastSignInAt)) : undefined
    if (login) login.logins += 1
  }
  return bars
}

/** Everything the overview page shows, computed once on the server. */
export function buildOverview(users: AdminUser[], now: number) {
  const within = (iso: string | null, days: number) => iso !== null && now - Date.parse(iso) <= days * DAY
  const active7 = users.filter((user) => within(user.lastSignInAt, 7)).length
  const active30 = users.filter((user) => within(user.lastSignInAt, 30)).length - active7
  const google = users.filter((user) => user.provider === 'google').length
  const email = users.filter((user) => user.provider === 'email').length

  return {
    stats: {
      total: users.length,
      new30: users.filter((user) => within(user.createdAt, 30)).length,
      active7,
      unconfirmed: users.filter((user) => !user.confirmed).length,
    },
    chart: {
      '12m': fill(emptyMonths(now), users, 7),
      '30d': fill(
        emptyDays(now, 30, (_, key) => String(Number(key.slice(8)))),
        users,
        10,
      ),
      '7d': fill(
        emptyDays(now, 7, (date) => weekday.format(date)),
        users,
        10,
      ),
    } satisfies Record<ChartRange, ChartBar[]>,
    // Colour follows the entity, never its rank, so each slice keeps its slot even at zero.
    providers: [
      { label: 'Google', value: google, color: 'var(--color-chart-1)' },
      { label: 'Имэйл', value: email, color: 'var(--color-chart-2)' },
      { label: 'Бусад', value: users.length - google - email, color: 'var(--color-chart-3)' },
    ] satisfies Slice[],
    activity: [
      { label: '7 хоногт идэвхтэй', value: active7, color: 'var(--color-chart-1)' },
      { label: '30 хоногт идэвхтэй', value: active30, color: 'var(--color-chart-2)' },
      { label: 'Идэвхгүй', value: users.length - active7 - active30, color: 'var(--color-chart-3)' },
    ] satisfies Slice[],
    recent: users.slice(0, 6),
  }
}
