import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LessonView } from '@/components/courses/lesson-view'
import { findLesson, getCourses } from '@/lib/data'

export async function generateStaticParams() {
  const courses = await getCourses()
  return courses.flatMap((course) => course.lessons.map((lesson) => ({ slug: course.slug, lesson: String(lesson.position) })))
}

export async function generateMetadata({ params }: PageProps<'/dashboard/courses/[slug]/[lesson]'>): Promise<Metadata> {
  const { slug, lesson } = await params
  const data = await findLesson(slug, lesson)
  return data ? { title: `${data.lesson.title} | ${data.course.title}` } : {}
}

export default async function AppLessonPage({ params }: PageProps<'/dashboard/courses/[slug]/[lesson]'>) {
  const { slug, lesson } = await params
  const data = await findLesson(slug, lesson)
  if (!data) notFound()

  return (
    <div className="container-page pt-6 pb-20 lg:pt-8">
      <LessonView course={data.course} lesson={data.lesson} />
    </div>
  )
}
