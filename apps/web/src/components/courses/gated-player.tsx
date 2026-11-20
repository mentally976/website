import { type Course, type Lesson } from '@mentally/db'
import { COURSES_PATH } from '@/content/links'
import { requireUser } from '@/lib/auth'
import { VideoPlayer } from './video-player'

type Props = { course: Pick<Course, 'id' | 'slug' | 'coverUrl'>; lesson: Lesson }

/**
 * Re-checks the session on the server before the video URL is sent to the browser (proxy.ts only redirects
 * optimistically). Without a session it redirects to sign-in. Reads the session, so render it inside <Suspense>.
 */
export async function GatedPlayer({ course, lesson }: Props) {
  await requireUser(`${COURSES_PATH}/${course.slug}/${lesson.position}`)
  return <VideoPlayer src={lesson.videoUrl} poster={course.coverUrl} title={lesson.title} courseId={course.id} lessonId={lesson.id} />
}

export function PlayerSkeleton() {
  return <div aria-hidden className="aspect-video animate-pulse rounded-panel bg-ink/10" />
}
