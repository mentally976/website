import Image from 'next/image'
import { Lock } from 'lucide-react'
import { type Course, type Lesson } from '@mentally/db'
import { ButtonLink } from '@/components/ui/button'
import { COURSES_PATH } from '@/content/site'
import { getUser } from '@/lib/auth'
import { VideoPlayer } from './video-player'

type Props = { course: Pick<Course, 'id' | 'slug' | 'coverUrl'>; lesson: Lesson }

/**
 * Decides on the server whether the visitor may watch. Locked lessons never send their video URL to the browser.
 * Reads the session, so render it inside <Suspense>.
 */
export async function GatedPlayer({ course, lesson }: Props) {
  // Every lesson needs an account: there are no free previews for guests.
  if (await getUser()) {
    return <VideoPlayer src={lesson.videoUrl} poster={course.coverUrl} title={lesson.title} courseId={course.id} lessonId={lesson.id} />
  }

  const next = encodeURIComponent(`${COURSES_PATH}/${course.slug}/${lesson.position}`)
  return (
    <div className="relative isolate grid min-h-72 place-items-center overflow-hidden rounded-panel bg-ink p-6 text-center text-canvas sm:aspect-video sm:min-h-0">
      <Image src={course.coverUrl} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="-z-10 object-cover opacity-30 blur-sm" />
      <div className="max-w-md">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-canvas/10 ring-1 ring-canvas/20">
          <Lock className="size-5" aria-hidden />
        </span>
        <p className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">Энэ хичээлийг үзэхийн тулд нэвтэрнэ үү</p>
        <p className="mt-2 hidden text-canvas/70 sm:block">Бүртгэл үнэгүй. Нэвтэрмэгц бүх хичээлийг бүрэн үзэх боломжтой.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`/signup?next=${next}`} variant="light">
            Үнэгүй бүртгүүлэх
          </ButtonLink>
          <ButtonLink href={`/login?next=${next}`} variant="outlineLight">
            Нэвтрэх
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export function PlayerSkeleton() {
  return <div aria-hidden className="aspect-video animate-pulse rounded-panel bg-ink/10" />
}
