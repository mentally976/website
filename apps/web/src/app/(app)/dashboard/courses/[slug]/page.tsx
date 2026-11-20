import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CourseDetail } from '@/components/courses/course-detail'
import { getCourse, getCourses } from '@/lib/data'

export async function generateStaticParams() {
  return (await getCourses()).map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }: PageProps<'/dashboard/courses/[slug]'>): Promise<Metadata> {
  const course = await getCourse((await params).slug)
  return course ? { title: course.title } : {}
}

export default async function AppCoursePage({ params }: PageProps<'/dashboard/courses/[slug]'>) {
  const course = await getCourse((await params).slug)
  if (!course) notFound()

  return (
    <div className="container-page pt-6 pb-20 lg:pt-10">
      <CourseDetail course={course} />
    </div>
  )
}
