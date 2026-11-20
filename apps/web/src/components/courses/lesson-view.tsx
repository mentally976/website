import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'
import { formatTotalTime, type CourseWithRelations, type Lesson } from '@mentally/db'
import { buttonClasses } from '@/components/ui/button'
import { COURSES_PATH, EMERGENCY_NUMBER } from '@/content/links'
import { GatedPlayer, PlayerSkeleton } from './gated-player'
import { LessonList } from './lesson-list'

type Props = {
  course: CourseWithRelations
  lesson: Lesson
}

/** Lesson player page body shared by the public catalogue and the student app. */
export function LessonView({ course, lesson }: Props) {
  const previous = course.lessons.find((item) => item.position === lesson.position - 1)
  const next = course.lessons.find((item) => item.position === lesson.position + 1)
  const courseHref = `${COURSES_PATH}/${course.slug}`

  return (
    <>
      <Link href={courseHref} className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink">
        <ChevronLeft className="size-4" aria-hidden />
        {course.title}
      </Link>

      <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-12">
        <div>
          <Suspense fallback={<PlayerSkeleton />}>
            <GatedPlayer key={lesson.id} course={course} lesson={lesson} />
          </Suspense>

          <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm text-muted">
                {lesson.position}/{course.lessons.length}-р хичээл, {formatTotalTime(lesson.durationSeconds)}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{lesson.title}</h1>
              <p className="mt-3 text-lg leading-relaxed text-muted">{lesson.summary}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {previous && (
                <Link href={`${courseHref}/${previous.position}`} className={buttonClasses({ variant: 'secondary' })} aria-label="Өмнөх хичээл">
                  <ArrowLeft className="size-4" aria-hidden />
                </Link>
              )}
              {next && (
                <Link href={`${courseHref}/${next.position}`} className={buttonClasses({ variant: 'primary' })}>
                  Дараагийн хичээл
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              )}
            </div>
          </div>

          <p className="mt-10 rounded-card bg-surface p-5 text-[0.9375rem] leading-relaxed text-ink-soft ring-1 ring-line">
            Хичээл үзэж байхдаа сэтгэл санаа тань хэт хүндэрвэл түр завсарлаарай. Яаралтай тусламж хэрэгтэй бол{' '}
            <a href={`tel:${EMERGENCY_NUMBER}`} className="font-semibold text-ink underline underline-offset-4">
              {EMERGENCY_NUMBER}
            </a>{' '}
            дугаарт залгана уу.
          </p>
        </div>

        <aside aria-label="Хичээлийн агуулга" className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 font-semibold">Хичээлийн агуулга</p>
          <LessonList courseSlug={course.slug} lessons={course.lessons} currentId={lesson.id} />
        </aside>
      </div>
    </>
  )
}
