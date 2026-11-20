'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'
import { summarizeProgress, useWatched, type CourseSummary } from '@/lib/progress'

/** Built from the browser's watch history (lib/progress.ts) until progress is stored in Supabase. */
export function ContinueWatching({ courses }: { courses: CourseSummary[] }) {
  const started = summarizeProgress(courses, useWatched())
    .filter((item) => item.seen > 0)
    .sort((a, b) => b.lastAt - a.lastAt)
    .slice(0, 3)

  if (!started.length) {
    return (
      <div className="rounded-card bg-surface p-8 ring-1 ring-line md:p-10">
        <p className="text-lg font-semibold tracking-tight">Та хараахан хичээл үзээгүй байна</p>
        <p className="mt-2 max-w-md leading-relaxed text-muted">Өөрт хэрэгтэй сэдвээ сонгоод эхний хичээлээ үзээрэй. Үзсэн хичээлүүд тань энд харагдана.</p>
        <ButtonLink href="/dashboard/courses" className="mt-6">
          Хичээл сонгох
        </ButtonLink>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {started.map(({ course, seen, total, nextLesson }) => {
        const percent = Math.round((seen / total) * 100)
        return (
          <li key={course.id} className="overflow-hidden rounded-card bg-surface ring-1 ring-line">
            <Link href={`/dashboard/courses/${course.slug}/${nextLesson.position}`} className="group block">
              <div className="relative aspect-[16/9]">
                <Image src={course.coverUrl} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="font-semibold tracking-tight">{course.title}</p>
                <p className="mt-1 text-sm text-muted">Дараагийнх: {nextLesson.title}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas"
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Ахиц"
                  >
                    <div className="h-full origin-left rounded-full bg-sky" style={{ transform: `scaleX(${percent / 100})` }} />
                  </div>
                  <span className="text-sm font-medium tabular-nums">{percent}%</span>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
