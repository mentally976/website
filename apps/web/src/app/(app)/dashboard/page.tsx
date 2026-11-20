import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowRight } from 'lucide-react'
import { CourseCard, toCourseCard } from '@/components/courses/course-card'
import { ContinueWatching } from '@/components/dashboard/continue-watching'
import { ProgressStats } from '@/components/dashboard/progress-stats'
import { requireUser } from '@/lib/auth'
import { getCourses } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Миний самбар',
}

export default async function DashboardPage() {
  const courses = await getCourses()
  // Only what the progress views need, so the whole catalogue isn't serialised to the browser.
  const summaries = courses.map(({ id, slug, title, coverUrl, lessons }) => ({
    id,
    slug,
    title,
    coverUrl,
    lessons: lessons.map(({ id: lessonId, position, title: lessonTitle }) => ({ id: lessonId, position, title: lessonTitle })),
  }))

  return (
    <div className="container-page pt-8 pb-20 lg:pt-12">
      <Suspense fallback={<GreetingSkeleton />}>
        <Greeting />
      </Suspense>

      <section aria-label="Миний ахиц" className="mt-8 md:mt-10">
        <ProgressStats courses={summaries} />
      </section>

      <section aria-labelledby="continue-title" className="mt-14">
        <h2 id="continue-title" className="mb-5 text-2xl font-semibold tracking-tight">
          Үргэлжлүүлэн үзэх
        </h2>
        <ContinueWatching courses={summaries} />
      </section>

      <section aria-labelledby="explore-title" className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="explore-title" className="text-2xl font-semibold tracking-tight">
            Танд нээлттэй хичээлүүд
          </h2>
          <Link href="/dashboard/courses" className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink">
            Бүгдийг харах
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={toCourseCard(course)} />
          ))}
        </div>
      </section>
    </div>
  )
}

async function Greeting() {
  const user = await requireUser('/dashboard')
  return (
    <header>
      <h1 className="text-title font-semibold">Сайн байна уу, {user.name}</h1>
      <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-muted">Өнөөдөр өөртөө хэдэн минут зориулаад, нэг хичээл үзээрэй.</p>
    </header>
  )
}

function GreetingSkeleton() {
  return (
    <div aria-hidden className="space-y-4">
      <div className="h-12 w-full max-w-md animate-pulse rounded-2xl bg-ink/5" />
      <div className="h-5 w-full max-w-sm animate-pulse rounded-full bg-ink/5" />
    </div>
  )
}
