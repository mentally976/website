import { Activity, MailWarning, UserPlus, Users } from 'lucide-react'

type Stats = { total: number; new30: number; active7: number; unconfirmed: number }

const TILES = [
  { key: 'total', label: 'Нийт хэрэглэгч', icon: Users, tint: 'bg-chart-1/10 text-chart-1' },
  { key: 'new30', label: 'Сүүлийн 30 хоногт бүртгүүлсэн', icon: UserPlus, tint: 'bg-chart-2/10 text-chart-2' },
  { key: 'active7', label: 'Сүүлийн 7 хоногт нэвтэрсэн', icon: Activity, tint: 'bg-chart-3/10 text-chart-3' },
  { key: 'unconfirmed', label: 'Имэйлээ баталгаажуулаагүй', icon: MailWarning, tint: 'bg-sky-soft text-sky' },
] as const

export function StatTiles({ stats }: { stats: Stats }) {
  return (
    <dl className="grid grid-cols-2 gap-4 self-start">
      {TILES.map((tile) => (
        <div key={tile.key} className="flex flex-col gap-4 rounded-card bg-surface p-5 ring-1 ring-line">
          <span aria-hidden className={`grid size-10 place-items-center rounded-full ${tile.tint}`}>
            <tile.icon className="size-5" />
          </span>
          <div className="flex flex-col-reverse gap-1">
            <dt className="text-sm leading-snug text-muted">{tile.label}</dt>
            <dd className="font-display text-3xl font-semibold tabular-nums">{stats[tile.key]}</dd>
          </div>
        </div>
      ))}
    </dl>
  )
}
