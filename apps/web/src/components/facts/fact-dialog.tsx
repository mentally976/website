'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check, ExternalLink, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { factCategoryName, type Fact } from '@mentally/db'
import { buttonClasses } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  fact: Fact | null
  open: boolean
  onClose: () => void
  previous?: Fact
  next?: Fact
  onNavigate: (id: string) => void
}

/**
 * Native <dialog>: focus trap, Escape and focus return come from the browser.
 * The last fact stays rendered while closing so the exit transition has content to fade.
 * Bottom sheet on phones, centred card from `sm` up.
 */
export function FactDialog({ fact, open, onClose, previous, next, onNavigate }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    if (!open) return
    const html = document.documentElement
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 })
  }, [fact?.id])

  return (
    <dialog
      ref={ref}
      aria-labelledby="fact-title"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && event.currentTarget.close()}
      className={cn(
        'm-auto max-h-[92dvh] w-[min(100%-2rem,46rem)] max-w-none overflow-y-auto overscroll-contain rounded-panel border-0 bg-canvas p-0 text-ink shadow-2xl',
        'max-sm:mb-0 max-sm:max-h-[94dvh] max-sm:w-full max-sm:rounded-b-none',
        'translate-y-8 opacity-0 transition-[opacity,translate,scale,overlay,display] transition-discrete duration-300 ease-[var(--ease-out-soft)] sm:translate-y-0 sm:scale-[0.97]',
        'open:translate-y-0 open:scale-100 open:opacity-100 starting:open:translate-y-8 starting:open:opacity-0 sm:starting:open:translate-y-0 sm:starting:open:scale-[0.97]',
        'backdrop:bg-ink/0 backdrop:backdrop-blur-[2px] backdrop:transition-[background-color,overlay,display] backdrop:transition-discrete backdrop:duration-300',
        'open:backdrop:bg-ink/55 starting:open:backdrop:bg-ink/0',
      )}
    >
      {fact && (
        <article>
          <div className="sticky top-0 z-10 -mb-16 flex h-16 justify-end p-3">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Хаах"
              className="grid size-10 cursor-pointer place-items-center rounded-full bg-surface/90 ring-1 ring-line backdrop-blur transition-transform active:scale-95"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="relative aspect-[16/9] bg-line max-sm:aspect-[4/3]">
            <Image src={fact.imageUrl} alt={fact.imageAlt} fill sizes="(min-width: 640px) 46rem, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <p className="absolute inset-x-6 bottom-5 text-white md:inset-x-10">
              <span className="block font-display text-6xl font-bold tracking-tight md:text-7xl">{fact.stat.value}</span>
              <span className="mt-1 block text-white/80">{fact.stat.label}</span>
            </p>
          </div>

          <div className="px-6 pt-7 pb-8 md:px-10 md:pb-10">
            <p className="text-sm font-medium text-sky">
              {factCategoryName(fact.category)}, {fact.readMinutes} мин унших
            </p>
            <h2 id="fact-title" className="mt-2 text-2xl leading-tight font-semibold tracking-tight md:text-3xl">
              {fact.title}
            </h2>

            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              {fact.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section aria-labelledby="fact-takeaways" className="mt-8 rounded-card bg-surface p-5 ring-1 ring-line md:p-6">
              <h3 id="fact-takeaways" className="font-semibold">
                Өдөр тутамдаа хэрэгжүүлэх нь
              </h3>
              <ul className="mt-4 space-y-3">
                {fact.takeaways.map((item) => (
                  <li key={item} className="flex gap-3 leading-snug">
                    <Check className="mt-0.5 size-5 shrink-0 text-sky" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="fact-source" className="mt-8 border-t border-line pt-6">
              <h3 id="fact-source" className="text-sm font-medium text-muted">
                Эх сурвалж
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{fact.source.citation}</p>
              <a
                href={fact.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sky underline-offset-4 hover:underline"
              >
                Судалгааг нээх
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
              <p className="mt-5 text-xs leading-relaxed text-muted">Энэ нийтлэл мэдээллийн зорилготой бөгөөд мэргэжлийн зөвлөгөө, эмчилгээг орлохгүй.</p>
            </section>

            <nav aria-label="Бусад баримт" className="mt-8 flex gap-2">
              {previous && (
                <button type="button" onClick={() => onNavigate(previous.id)} className={buttonClasses({ variant: 'secondary' })} aria-label="Өмнөх баримт">
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
              )}
              {next && (
                <button type="button" onClick={() => onNavigate(next.id)} className={buttonClasses({ variant: 'primary' }, 'ml-auto')}>
                  Дараагийн баримт
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              )}
            </nav>
          </div>
        </article>
      )}
    </dialog>
  )
}
