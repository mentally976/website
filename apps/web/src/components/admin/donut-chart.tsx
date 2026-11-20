import { type Slice } from '@/lib/admin-stats'

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
/** Surface gap between segments, in viewBox units (about 2.5px at this size). */
const GAP = 2

type Props = { title: string; centerLabel: string; slices: Slice[] }

/** Ring chart with a total in the middle and a legend that carries every value as text. */
export function DonutChart({ title, centerLabel, slices }: Props) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0)
  const shown = slices.filter((slice) => slice.value > 0)
  const segments = shown.map((slice, index) => ({
    ...slice,
    start: (shown.slice(0, index).reduce((sum, item) => sum + item.value, 0) / total) * CIRCUMFERENCE,
    length: Math.max((slice.value / total) * CIRCUMFERENCE - (shown.length > 1 ? GAP : 0), 0.5),
  }))
  const percent = (value: number) => (total ? `${Math.round((value / total) * 100)}%` : '0%')

  return (
    <figure className="flex items-center gap-5">
      <div className="relative size-32 shrink-0">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
          {total === 0 && <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--color-line)" strokeWidth="12" />}
          {segments.map((segment) => (
            <circle
              key={segment.label}
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke={segment.color}
              strokeWidth="12"
              strokeDasharray={`${segment.length} ${CIRCUMFERENCE - segment.length}`}
              strokeDashoffset={-segment.start}
            >
              <title>{`${segment.label}: ${segment.value}`}</title>
            </circle>
          ))}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <span className="text-[0.6875rem] text-muted">{centerLabel}</span>
          <span className="font-display text-xl font-semibold tabular-nums">{total}</span>
        </div>
      </div>

      <figcaption className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <ul className="mt-3 space-y-2">
          {slices.map((slice) => (
            <li key={slice.label} className="flex items-center gap-2 text-sm">
              <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: slice.color }} />
              <span className="min-w-0 flex-1 truncate text-ink-soft">{slice.label}</span>
              <span className="font-semibold tabular-nums">{slice.value}</span>
              <span className="w-10 text-right text-muted tabular-nums">{percent(slice.value)}</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
