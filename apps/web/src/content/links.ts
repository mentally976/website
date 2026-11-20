/*
 * Routes and constants that client components need. Keep this file free of imports: anything imported here
 * (for example the mock catalogue behind content/site.ts) ships to every visitor's browser.
 */

/** The course catalogue lives in the student app: guests must sign in to open any course or lesson. */
export const COURSES_PATH = '/dashboard/courses'

export const NAV_LINKS = [
  { href: '/#courses', label: 'Видео хичээл' },
  { href: '/#services', label: 'Зөвлөгөө' },
  { href: '/therapists', label: 'Сэтгэл зүйч' },
  { href: '/#faq', label: 'Түгээмэл асуулт' },
] as const

export const EMERGENCY_NUMBER = '103'
