import { CourseCard, toCourseCard } from '@/components/courses/course-card'
import { ButtonLink } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { getCourses } from '@/lib/data'

export async function FeaturedCourses() {
  const courses = (await getCourses()).slice(0, 4)

  return (
    <section id="courses" aria-labelledby="courses-title" className="container-page py-20 md:py-28">
      <SectionHeading
        id="courses-title"
        tag="Видео хичээл"
        title="Өөрийн хурдаар суралцах видео хичээлүүд"
        intro="Хичээл бүр 7–16 минутын богино хэсгүүдээс бүрдэнэ. Бүртгүүлж нэвтэрсний дараа бүх хичээлийг бүрэн үзнэ."
        aside={
          <ButtonLink href="/signup" variant="secondary">
            Бүртгүүлээд үзэх
          </ButtonLink>
        }
      />
      <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={toCourseCard(course)} />
        ))}
      </div>
    </section>
  )
}
