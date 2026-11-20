import { type Lesson } from '../types'
import { videos } from './media'

/** [title, minutes, summary] */
export type LessonSeed = readonly [string, number, string]

/** Turns compact seeds into lessons. The first `freePreviews` lessons can be watched without an account. */
export function buildLessons(courseId: string, seeds: readonly LessonSeed[], freePreviews = 1): Lesson[] {
  return seeds.map(([title, minutes, summary], index) => ({
    id: `${courseId}-${index + 1}`,
    courseId,
    position: index + 1,
    title,
    summary,
    durationSeconds: Math.round(minutes * 60),
    videoUrl: videos[(index + courseId.length) % videos.length]!.url,
    isFreePreview: index < freePreviews,
  }))
}
