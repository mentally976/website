'use client'

import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

/** GET form to /admin/users, so search works before hydration and the result URL can be shared. */
export function AdminSearchField({ defaultValue = '' }: { defaultValue?: string }) {
  return (
    <form action="/admin/users" role="search" className="relative w-full md:w-80">
      <label htmlFor="admin-search" className="sr-only">
        Хэрэглэгч хайх
      </label>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
      <input
        id="admin-search"
        key={defaultValue}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Нэр эсвэл имэйлээр хайх"
        className="h-11 w-full rounded-full bg-canvas pr-4 pl-11 text-[0.9375rem] ring-1 ring-line outline-none placeholder:text-muted focus:ring-2 focus:ring-sky"
      />
    </form>
  )
}

/** Keeps the current query in the box on /admin/users. Render inside <Suspense> with the plain field as fallback. */
export function AdminSearch() {
  return <AdminSearchField defaultValue={useSearchParams().get('q') ?? ''} />
}
