import Link from 'next/link'
import { Play } from 'lucide-react'
import { formatDuration, type Lesson } from '@mentally/db'
import { COURSES_PATH } from '@/content/links'
import { cn } from '@/lib/utils'

type Props = {
  courseSlug: string
  lessons: Lesson[]
  currentId?: string
}

export function LessonList({ courseSlug, lessons, currentId }: Props) {
  return (
    <ol className="divide-y divide-line overflow-hidden rounded-card bg-surface ring-1 ring-line">
      {lessons.map((lesson) => {
        const current = lesson.id === currentId
        return (
          <li key={lesson.id}>
            <Link
              href={`${COURSES_PATH}/${courseSlug}/${lesson.position}`}
              aria-current={current ? 'page' : undefined}
              className={cn('flex items-start gap-4 p-4 transition-colors duration-200 md:px-5', current ? 'bg-sky-soft/60' : 'hover:bg-canvas')}
            >
              <span
                className={cn(
                  'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold',
                  current ? 'bg-sky text-white' : 'bg-canvas text-ink-soft',
                )}
              >
                {current ? <Play className="ml-0.5 size-3.5 fill-current" aria-hidden /> : lesson.position}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block leading-snug font-medium">{lesson.title}</span>
                <span className="mt-1 block text-sm text-muted">{formatDuration(lesson.durationSeconds)}</span>
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
