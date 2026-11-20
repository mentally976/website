import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronLeft } from 'lucide-react'
import { formatTotalTime, LEVEL_LABEL, type CourseWithRelations } from '@mentally/db'
import { TherapistAvatar } from '@/components/therapists/therapist-avatar'
import { ButtonLink } from '@/components/ui/button'
import { COURSES_PATH } from '@/content/site'
import { LessonList } from './lesson-list'

type Props = {
  course: CourseWithRelations
}

/** Course overview shared by the public catalogue and the student app. */
export function CourseDetail({ course }: Props) {
  const facts = [
    { label: 'Хичээл', value: `${course.lessons.length}` },
    { label: 'Нийт хугацаа', value: formatTotalTime(course.totalSeconds) },
    { label: 'Түвшин', value: LEVEL_LABEL[course.level] },
    { label: 'Ангилал', value: course.category.name },
  ]

  return (
    <>
      <Link href={COURSES_PATH} className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink">
        <ChevronLeft className="size-4" aria-hidden />
        Бүх хичээл
      </Link>

      <header className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-sm font-medium text-sky">{course.category.name}</p>
          <h1 className="mt-3 text-display font-semibold">{course.title}</h1>
        </div>
        <div className="space-y-6 lg:pb-2">
          <p className="text-[1.0625rem] leading-relaxed text-muted">{course.summary}</p>
          <ButtonLink href={`${COURSES_PATH}/${course.slug}/1`} size="lg">
            Эхний хичээлийг үзэх
          </ButtonLink>
        </div>
      </header>

      <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-panel bg-line md:aspect-[21/9]">
        <Image src={course.coverUrl} alt={course.coverAlt} fill preload sizes="(min-width: 82rem) 77rem, 100vw" className="object-cover" />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-line ring-1 ring-line md:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col-reverse gap-1 bg-canvas p-5">
            <dt className="text-sm text-muted">{fact.label}</dt>
            <dd className="text-xl font-semibold tracking-tight">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_26rem] lg:gap-20">
        <div className="space-y-14">
          <section aria-labelledby="about-title">
            <h2 id="about-title" className="text-2xl font-semibold tracking-tight">
              Хичээлийн тухай
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{course.description}</p>
          </section>

          <section aria-labelledby="outcomes-title">
            <h2 id="outcomes-title" className="text-2xl font-semibold tracking-tight">
              Та юу сурах вэ
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 rounded-card bg-surface p-4 ring-1 ring-line">
                  <Check className="mt-0.5 size-5 shrink-0 text-sky" aria-hidden />
                  <span className="leading-snug">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="teacher-title" className="flex items-center gap-5 rounded-card bg-surface p-5 ring-1 ring-line">
            <TherapistAvatar therapist={course.therapist} size={88} decorative className="size-20 text-xl" />
            <div>
              <h2 id="teacher-title" className="text-sm text-muted">
                Хичээл заах
              </h2>
              <p className="mt-0.5 text-lg font-semibold tracking-tight">{course.therapist.name}</p>
              <p className="text-[0.9375rem] text-muted">{course.therapist.title}</p>
            </div>
          </section>
        </div>

        <aside aria-labelledby="lessons-title" className="lg:sticky lg:top-24 lg:self-start">
          <h2 id="lessons-title" className="mb-4 text-2xl font-semibold tracking-tight">
            Хичээлийн агуулга
          </h2>
          <LessonList courseSlug={course.slug} lessons={course.lessons} />
        </aside>
      </div>
    </>
  )
}
