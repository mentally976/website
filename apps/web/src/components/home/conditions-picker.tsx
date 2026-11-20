'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export type ConditionItem = { id: string; title: string; text: string; image: { url: string; alt: string } }

/**
 * List of concerns on the left; choosing one expands it and crossfades its photo on the right.
 * A photo is mounted only once its concern has been opened, so the section downloads one image, not five.
 */
export function ConditionsPicker({ items, initialId }: { items: ConditionItem[]; initialId: string }) {
  const [activeId, setActiveId] = useState(initialId)
  const [opened, setOpened] = useState(() => new Set([initialId]))

  const choose = (id: string) => {
    setActiveId(id)
    setOpened((previous) => (previous.has(id) ? previous : new Set(previous).add(id)))
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.15fr] md:gap-12 lg:gap-20">
      <ul className="border-t border-line">
        {items.map((item) => {
          const open = item.id === activeId
          return (
            <li key={item.id} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`condition-${item.id}`}
                  onClick={() => choose(item.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg font-medium md:text-xl"
                >
                  {item.title}
                  <Plus
                    aria-hidden
                    className={cn('size-5 shrink-0 text-muted transition-transform duration-300 ease-[var(--ease-out-soft)]', open && 'rotate-45 text-ink')}
                  />
                </button>
              </h3>
              <div
                id={`condition-${item.id}`}
                className={cn('grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-soft)]', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
              >
                <p className={cn('overflow-hidden pr-10 leading-relaxed text-muted transition-opacity duration-300', open ? 'pb-6 opacity-100' : 'opacity-0')}>
                  {item.text}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-line md:aspect-auto md:min-h-[26rem]">
        {items
          .filter((item) => opened.has(item.id))
          .map((item) => (
            <Image
              key={item.id}
              src={item.image.url}
              alt={item.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={cn('object-cover transition-opacity duration-500 ease-out', item.id === activeId ? 'opacity-100' : 'opacity-0')}
            />
          ))}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" />
        <p aria-hidden className="absolute bottom-5 left-6 text-2xl font-semibold tracking-tight text-white md:text-4xl">
          {items.find((item) => item.id === activeId)?.title}
        </p>
      </div>
    </div>
  )
}
