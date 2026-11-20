import { type CourseWithRelations } from '../types'
import { categories } from './categories'
import { coursesA } from './courses-a'
import { coursesB } from './courses-b'
import { factsA } from './facts-a'
import { factsB } from './facts-b'
import { therapists } from './therapists'

export { categories } from './categories'
export { therapists } from './therapists'
export { images, videos } from './media'
export { factImages } from './fact-media'

/** Research-backed psychology facts, in reading order. */
export const facts = [...factsA, ...factsB]

export const courses = [...coursesA, ...coursesB].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

/** Joins category, therapist and total length, the way a Supabase select with relations would. */
export function withRelations(course: (typeof courses)[number]): CourseWithRelations {
  const category = categories.find((c) => c.id === course.categoryId)
  const therapist = therapists.find((t) => t.id === course.therapistId)
  if (!category || !therapist) throw new Error(`Mock data is inconsistent for course "${course.slug}"`)
  const totalSeconds = course.lessons.reduce((sum, lesson) => sum + lesson.durationSeconds, 0)
  return { ...course, category, therapist, totalSeconds }
}
