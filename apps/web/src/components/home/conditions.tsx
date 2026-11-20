'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { CONDITIONS } from '@/content/site'
import { cn } from '@/lib/utils'

/** List of concerns on the left; choosing one expands it and crossfades its photo on the right. */
export function Conditions() {
  const [activeId, setActiveId] = useState<string>(CONDITIONS[1].id)

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.15fr] md:gap-12 lg:gap-20">
      <ul className="border-t border-line">
        {CONDITIONS.map((condition) => {
          const open = condition.id === activeId
          return (
            <li key={condition.id} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`condition-${condition.id}`}
                  onClick={() => setActiveId(condition.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg font-medium md:text-xl"
                >
                  {condition.title}
                  <Plus
                    aria-hidden
                    className={cn('size-5 shrink-0 text-muted transition-transform duration-300 ease-[var(--ease-out-soft)]', open && 'rotate-45 text-ink')}
                  />
                </button>
              </h3>
              <div
                id={`condition-${condition.id}`}
                className={cn('grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-soft)]', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
              >
                <p className={cn('overflow-hidden pr-10 leading-relaxed text-muted transition-opacity duration-300', open ? 'pb-6 opacity-100' : 'opacity-0')}>
                  {condition.text}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-line md:aspect-auto md:min-h-[26rem]">
        {CONDITIONS.map((condition) => (
          <Image
            key={condition.id}
            src={condition.image.url}
            alt={condition.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={cn('object-cover transition-opacity duration-500 ease-out', condition.id === activeId ? 'opacity-100' : 'opacity-0')}
          />
        ))}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" />
        <p aria-hidden className="absolute bottom-5 left-6 text-2xl font-semibold tracking-tight text-white md:text-4xl">
          {CONDITIONS.find((c) => c.id === activeId)?.title}
        </p>
      </div>
    </div>
  )
}
