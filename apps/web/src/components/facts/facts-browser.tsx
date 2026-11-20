'use client'

import { useState } from 'react'
import { type Fact, type FactCategory } from '@mentally/db'
import { cn } from '@/lib/utils'
import { FactCard } from './fact-card'
import { FactDialog } from './fact-dialog'

type Props = { facts: Fact[]; categories: { id: FactCategory; name: string }[] }

export function FactsBrowser({ facts, categories }: Props) {
  const [active, setActive] = useState<FactCategory | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const visible = active === 'all' ? facts : facts.filter((fact) => fact.category === active)
  const selected = facts.find((fact) => fact.id === selectedId) ?? null
  const index = selected ? visible.findIndex((fact) => fact.id === selected.id) : -1
  const chips = [{ id: 'all' as const, name: 'Бүгд' }, ...categories]

  function openFact(id: string) {
    setSelectedId(id)
    setOpen(true)
  }

  return (
    <>
      <div role="group" aria-label="Ангиллаар шүүх" className="-mx-4 mt-8 [scrollbar-width:none] overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2">
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              aria-pressed={chip.id === active}
              onClick={() => setActive(chip.id)}
              className={cn(
                'cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ring-1 transition-colors duration-200',
                chip.id === active ? 'bg-ink text-canvas ring-ink' : 'bg-surface text-ink-soft ring-line hover:ring-ink/30',
              )}
            >
              {chip.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((fact, position) => (
          <FactCard key={fact.id} fact={fact} featured={position === 0 && active === 'all'} onOpen={openFact} />
        ))}
      </div>

      <FactDialog
        fact={selected}
        open={open}
        onClose={() => setOpen(false)}
        previous={index > 0 ? visible[index - 1] : undefined}
        next={index >= 0 ? visible[index + 1] : undefined}
        onNavigate={setSelectedId}
      />
    </>
  )
}
