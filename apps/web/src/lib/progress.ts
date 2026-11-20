/**
 * Watch history kept in the browser until the `lesson_progress` table is wired up.
 * Every access is guarded: storage can be missing or blocked (private mode, previews).
 */

import { useSyncExternalStore } from 'react'

const KEY = 'mentally:watched'
const EVENT = 'mentally:watched-change'

export type WatchEntry = { courseId: string; lessonId: string; at: number }

function readWatchedRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function parseWatched(raw: string | null): WatchEntry[] {
  if (!raw) return []
  try {
    const value: unknown = JSON.parse(raw)
    return Array.isArray(value) ? (value as WatchEntry[]) : []
  } catch {
    return []
  }
}

export function markWatched(courseId: string, lessonId: string) {
  const list = parseWatched(readWatchedRaw()).filter((entry) => entry.lessonId !== lessonId)
  list.unshift({ courseId, lessonId, at: Date.now() })
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, 300)))
    window.dispatchEvent(new Event(EVENT))
  } catch {
    // Storage unavailable: progress just isn't remembered.
  }
}

function subscribeWatched(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(EVENT, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(EVENT, callback)
  }
}

/** Watch history for client components; empty during SSR and before hydration. */
export function useWatched() {
  return parseWatched(useSyncExternalStore(subscribeWatched, readWatchedRaw, () => null))
}

/** The slice of a course the progress views need, so the full catalogue isn't sent to the browser. */
export type CourseSummary = {
  id: string
  slug: string
  title: string
  coverUrl: string
  lessons: { id: string; position: number; title: string }[]
}

export function summarizeProgress(courses: CourseSummary[], watched: WatchEntry[]) {
  return courses.map((course) => {
    const mine = watched.filter((entry) => entry.courseId === course.id)
    const seenIds = new Set(mine.map((entry) => entry.lessonId))
    const seen = course.lessons.filter((lesson) => seenIds.has(lesson.id)).length
    const nextLesson = course.lessons.find((lesson) => !seenIds.has(lesson.id)) ?? course.lessons[0]!
    // History is newest first, so the first entry is the last time this course was opened.
    return { course, seen, total: course.lessons.length, lastAt: mine[0]?.at ?? 0, nextLesson }
  })
}
