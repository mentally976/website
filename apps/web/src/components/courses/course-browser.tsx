'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { type Category } from '@mentally/db'
import { COURSES_PATH } from '@/content/links'
import { cn } from '@/lib/utils'
import { CourseCard, type CourseCardData } from './course-card'

type ViewProps = {
  courses: CourseCardData[]
  categories: Category[]
  active: string
  query: string
  onQuery?: (value: string) => void
}

/** Filter chips are links (?category=), so they work before hydration and can be shared. */
export function CourseBrowserView({ courses, categories, active, query, onQuery }: ViewProps) {
  const chips = [{ slug: 'all', name: 'Бүгд' }, ...categories]

  return (
    <div className="mt-10 md:mt-14">
      <div className="flex flex-col-reverse gap-5 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Сэдвээр шүүх" className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2">
            {chips.map((chip) => (
              <li key={chip.slug}>
                <Link
                  href={chip.slug === 'all' ? COURSES_PATH : `${COURSES_PATH}?category=${chip.slug}`}
                  replace
                  scroll={false}
                  aria-current={chip.slug === active ? 'page' : undefined}
                  className={cn(
                    'block rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ring-1 transition-colors duration-200',
                    chip.slug === active ? 'bg-ink text-canvas ring-ink' : 'bg-surface text-ink-soft ring-line hover:ring-ink/30',
                  )}
                >
                  {chip.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <label className="relative block lg:w-80">
          <span className="sr-only">Хичээл хайх</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            readOnly={!onQuery}
            onChange={(event) => onQuery?.(event.target.value)}
            placeholder="Хичээл хайх"
            className="h-11 w-full rounded-full bg-surface pr-4 pl-11 text-[0.9375rem] ring-1 ring-line outline-none placeholder:text-muted focus:ring-2 focus:ring-sky"
          />
        </label>
      </div>

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {courses.length} хичээл олдлоо
      </p>

      {courses.length ? (
        <div className="mt-5 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-card bg-surface p-10 text-center ring-1 ring-line">
          <p className="text-lg font-medium">Таны хайлтад тохирох хичээл алга.</p>
          <p className="mt-2 text-muted">Өөр үгээр хайх эсвэл «Бүгд» сэдвийг сонгоно уу.</p>
        </div>
      )}
    </div>
  )
}

export function CourseBrowser({ courses, categories }: Pick<ViewProps, 'courses' | 'categories'>) {
  const active = useSearchParams().get('category') ?? 'all'
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()

  const visible = courses.filter((course) => {
    if (active !== 'all' && course.category.slug !== active) return false
    if (!needle) return true
    return [course.title, course.summary, course.therapist.name, course.category.name].join(' ').toLowerCase().includes(needle)
  })

  return <CourseBrowserView courses={visible} categories={categories} active={active} query={query} onQuery={setQuery} />
}
