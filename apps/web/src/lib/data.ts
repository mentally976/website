import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { categories, courses, therapists, withRelations } from '@mentally/db/mock'

/*
 * Catalogue reads. Today they return mock data from @mentally/db/mock.
 * To go live, replace each body with a query through `createPublicClient()` (lib/supabase/public.ts):
 * the catalogue is public, so it can be cached with 'use cache' and needs no cookies.
 * Keep the return shapes (types in @mentally/db) so no component has to change.
 */

export async function getCourses() {
  'use cache'
  cacheLife('hours')
  cacheTag('courses')
  return courses.map(withRelations)
}

export async function getCourse(slug: string) {
  'use cache'
  cacheLife('hours')
  cacheTag('courses', `course:${slug}`)
  const course = courses.find((c) => c.slug === slug)
  return course ? withRelations(course) : null
}

/** Course plus the lesson at `position` (the URL segment), or null when either is missing. */
export async function findLesson(slug: string, position: string) {
  const course = await getCourse(slug)
  const lesson = course?.lessons.find((item) => String(item.position) === position)
  return course && lesson ? { course, lesson } : null
}

export async function getCategories() {
  'use cache'
  cacheLife('days')
  cacheTag('categories')
  return categories
}

/** Mentally's one psychologist, who prepares every course, with how many courses that is. */
export async function getTherapist() {
  'use cache'
  cacheLife('days')
  cacheTag('therapists')
  const therapist = therapists[0]
  if (!therapist) throw new Error('No therapist in the catalogue')
  return { ...therapist, courseCount: courses.filter((c) => c.therapistId === therapist.id).length }
}

export async function getCatalogueStats() {
  'use cache'
  cacheLife('hours')
  cacheTag('courses', 'categories')
  const lessons = courses.flatMap((c) => c.lessons)
  return {
    courses: courses.length,
    lessons: lessons.length,
    topics: categories.length,
  }
}
