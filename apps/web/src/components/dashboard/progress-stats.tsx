'use client'

import { summarizeProgress, useWatched, type CourseSummary } from '@/lib/progress'

/** Three headline numbers from the browser's watch history. Shows zeros until hydration. */
export function ProgressStats({ courses }: { courses: CourseSummary[] }) {
  const progress = summarizeProgress(courses, useWatched())
  const stats = [
    { label: 'Үзсэн видео', value: progress.reduce((sum, item) => sum + item.seen, 0) },
    { label: 'Үзэж буй хичээл', value: progress.filter((item) => item.seen > 0 && item.seen < item.total).length },
    { label: 'Дуусгасан хичээл', value: progress.filter((item) => item.total > 0 && item.seen === item.total).length },
  ]

  return (
    <dl className="grid grid-cols-3 gap-3 md:gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-2 rounded-card bg-surface p-4 ring-1 ring-line md:p-6">
          <dt className="text-sm leading-snug text-muted">{stat.label}</dt>
          <dd className="font-display text-2xl font-semibold tabular-nums md:text-4xl">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
