'use client'

import { useState } from 'react'
import { type ChartBar, type ChartRange } from '@/lib/admin-stats'
import { cn } from '@/lib/utils'

const RANGES: { id: ChartRange; label: string }[] = [
  { id: '12m', label: '12 сар' },
  { id: '30d', label: '30 хоног' },
  { id: '7d', label: '7 хоног' },
]

const SERIES = [
  { key: 'signups', label: 'Шинэ бүртгэл', swatch: 'bg-chart-1' },
  { key: 'logins', label: 'Сүүлд нэвтэрсэн', swatch: 'bg-chart-2' },
] as const

/** Whole-number ticks from 0 with a 1/2/5 step, about four intervals. */
function niceTicks(max: number) {
  const raw = Math.max(1, max) / 4
  const power = 10 ** Math.floor(Math.log10(raw))
  const step = Math.max(1, Math.ceil([1, 2, 5, 10].map((m) => m * power).find((value) => value >= raw)!))
  const top = Math.ceil(Math.max(1, max) / step) * step
  return Array.from({ length: top / step + 1 }, (_, index) => index * step)
}

/** Grouped columns: new sign-ups and last sign-ins per month or day, with a range switch and hover tooltips. */
export function SignupsChart({ data }: { data: Record<ChartRange, ChartBar[]> }) {
  const [range, setRange] = useState<ChartRange>('12m')
  const bars = data[range]
  const ticks = niceTicks(Math.max(...bars.flatMap((bar) => [bar.signups, bar.logins])))
  const top = ticks.at(-1)!
  const total = bars.reduce((sum, bar) => sum + bar.signups, 0)
  const pct = (value: number) => `${(value / top) * 100}%`
  const labelClass = (index: number) =>
    cn(range === '30d' && (bars.length - 1 - index) % 5 !== 0 && 'invisible', range === '12m' && index % 2 === 1 && 'max-sm:invisible')

  return (
    <section aria-labelledby="signups-title" className="rounded-card bg-surface p-5 ring-1 ring-line md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="signups-title" className="font-semibold">
            Бүртгэлийн тойм
          </h2>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold tabular-nums">{total}</span>
            <span className="text-sm text-muted">шинэ бүртгэл</span>
          </p>
        </div>
        <div role="group" aria-label="Хугацаа сонгох" className="flex rounded-full bg-canvas p-1 ring-1 ring-line">
          {RANGES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === range}
              onClick={() => setRange(item.id)}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                item.id === range ? 'bg-surface text-ink shadow-sm ring-1 ring-line' : 'text-muted hover:text-ink',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div aria-hidden className="mt-8 flex gap-3">
        <div className="relative h-56 w-6 shrink-0 text-right text-[0.6875rem] text-muted tabular-nums">
          {ticks.map((tick) => (
            <span key={tick} className="absolute right-0 translate-y-1/2" style={{ bottom: pct(tick) }}>
              {tick}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <div className="relative h-56">
            {ticks.map((tick) => (
              <div key={tick} className="absolute inset-x-0 border-t border-line/80" style={{ bottom: pct(tick) }} />
            ))}
            <div className="relative flex h-full items-end">
              {bars.map((bar, index) => (
                <div key={bar.key} className="group relative flex h-full flex-1 items-end justify-center gap-0.5 rounded-md px-0.5 hover:bg-canvas/70">
                  <span className="w-full max-w-3 rounded-t-[4px] bg-chart-1" style={{ height: pct(bar.signups) }} />
                  <span className="w-full max-w-3 rounded-t-[4px] bg-chart-2" style={{ height: pct(bar.logins) }} />
                  <div
                    className={cn(
                      'pointer-events-none absolute bottom-full z-10 mb-2 hidden rounded-lg bg-ink px-3 py-2 text-xs whitespace-nowrap text-canvas shadow-lg group-hover:block',
                      index < 2 ? 'left-0' : index > bars.length - 3 ? 'right-0' : 'left-1/2 -translate-x-1/2',
                    )}
                  >
                    <p className="font-semibold">{bar.label}</p>
                    {SERIES.map((series) => (
                      <p key={series.key} className="mt-1 flex items-center gap-1.5">
                        <span className={cn('size-2 rounded-full', series.swatch)} />
                        {series.label}: <span className="font-semibold tabular-nums">{bar[series.key]}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex">
            {bars.map((bar, index) => (
              <span key={bar.key} className={cn('flex-1 text-center text-[0.6875rem] whitespace-nowrap text-muted', labelClass(index))}>
                {bar.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
        {SERIES.map((series) => (
          <li key={series.key} className="flex items-center gap-2">
            <span aria-hidden className={cn('size-2.5 rounded-full', series.swatch)} />
            {series.label}
          </li>
        ))}
      </ul>

      <table className="sr-only">
        <caption>Бүртгэлийн тойм, {RANGES.find((item) => item.id === range)!.label}</caption>
        <thead>
          <tr>
            <th scope="col">Хугацаа</th>
            {SERIES.map((series) => (
              <th key={series.key} scope="col">
                {series.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bars.map((bar) => (
            <tr key={bar.key}>
              <th scope="row">{bar.label}</th>
              <td>{bar.signups}</td>
              <td>{bar.logins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
