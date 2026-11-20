import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CourseBrowser, CourseBrowserView } from '@/components/courses/course-browser'
import { toCourseCard } from '@/components/courses/course-card'
import { getCategories, getCourses } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Хичээлүүд',
}

export default async function AppCoursesPage() {
  const [all, categories] = await Promise.all([getCourses(), getCategories()])
  // Cards only: the browser is a client component, so full lessons (with video URLs) must not be passed to it.
  const courses = all.map(toCourseCard)

  return (
    <div className="container-page pt-8 pb-20 lg:pt-12">
      <header>
        <h1 className="text-title font-semibold">Хичээлүүд</h1>
        <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-muted">Бүх хичээл танд нээлттэй. Сэдвээ сонгоод, өөрт тохирох хурдаар үзээрэй.</p>
      </header>

      {/* Static shell shows every course; the client filter takes over on hydration. */}
      <Suspense fallback={<CourseBrowserView courses={courses} categories={categories} active="all" query="" />}>
        <CourseBrowser courses={courses} categories={categories} />
      </Suspense>
    </div>
  )
}
