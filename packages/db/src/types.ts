import { type Enums } from './database.types'

/** App-facing shapes. Mock data and (later) Supabase queries both return these. */

export type CourseLevel = Enums<'course_level'>

export interface Category {
  id: string
  slug: string
  name: string
}

export interface Therapist {
  id: string
  slug: string
  name: string
  title: string
  bio: string
  /** Null until a real photo is supplied; the UI then shows initials. */
  photoUrl: string | null
  photoAlt: string
  specialties: string[]
  /** 0 means not supplied yet, and the UI hides it. */
  yearsExperience: number
}

export interface Lesson {
  id: string
  courseId: string
  position: number
  title: string
  summary: string
  durationSeconds: number
  videoUrl: string
}

export interface Course {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  coverUrl: string
  coverAlt: string
  categoryId: string
  therapistId: string
  level: CourseLevel
  outcomes: string[]
  publishedAt: string
  lessons: Lesson[]
}

export interface CourseWithRelations extends Course {
  category: Category
  therapist: Therapist
  totalSeconds: number
}
