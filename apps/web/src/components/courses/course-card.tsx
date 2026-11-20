import Image from 'next/image'
import Link from 'next/link'
import { PlayCircle } from 'lucide-react'
import { formatTotalTime, LEVEL_LABEL, type CourseWithRelations } from '@mentally/db'
import { TherapistAvatar } from '@/components/therapists/therapist-avatar'
import { COURSES_PATH } from '@/content/site'
import { cn } from '@/lib/utils'

/** What a card shows. It carries no lessons, so no video URL can reach the browser through a client component. */
export type CourseCardData = Pick<
  CourseWithRelations,
  'id' | 'slug' | 'title' | 'summary' | 'coverUrl' | 'coverAlt' | 'level' | 'totalSeconds' | 'category' | 'therapist'
> & { lessonCount: number }

export function toCourseCard(course: CourseWithRelations): CourseCardData {
  const { id, slug, title, summary, coverUrl, coverAlt, level, totalSeconds, category, therapist } = course
  return { id, slug, title, summary, coverUrl, coverAlt, level, totalSeconds, category, therapist, lessonCount: course.lessons.length }
}

type Props = { course: CourseCardData; className?: string }

export function CourseCard({ course, className }: Props) {
  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-line">
        <Image
          src={course.coverUrl}
          alt={course.coverAlt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium backdrop-blur">{course.category.name}</span>
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <PlayCircle className="size-3.5" aria-hidden />
          {course.lessonCount} хичээл, {formatTotalTime(course.totalSeconds)}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="text-lg leading-snug font-semibold tracking-tight">
          <Link href={`${COURSES_PATH}/${course.slug}`} className="after:absolute after:inset-0 after:rounded-card">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{course.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <TherapistAvatar therapist={course.therapist} size={28} decorative className="size-7 text-[0.625rem]" />
            <span className="truncate text-ink-soft">{course.therapist.name}</span>
          </span>
          <span className="shrink-0 text-muted">{LEVEL_LABEL[course.level]}</span>
        </div>
      </div>
    </article>
  )
}
