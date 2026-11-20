import Image from 'next/image'
import { factCategoryName, type Fact } from '@mentally/db'
import { buttonClasses } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = { fact: Fact; featured?: boolean; onOpen: (id: string) => void }

/** The headline number sits on the photo; the whole card opens the reading dialog. */
export function FactCard({ fact, featured = false, onOpen }: Props) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-card bg-surface ring-1 ring-line transition-shadow duration-200 hover:ring-ink/25',
        featured && 'sm:col-span-2 lg:flex-row',
      )}
    >
      <div className={cn('relative overflow-hidden bg-line', featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-80 lg:w-[56%]' : 'aspect-[4/3]')}>
        <Image
          src={fact.imageUrl}
          alt={fact.imageAlt}
          fill
          sizes={featured ? '(min-width: 1024px) 40vw, (min-width: 640px) 90vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw'}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
        <p className="absolute inset-x-5 bottom-4 text-white">
          <span className={cn('block font-display font-bold tracking-tight', featured ? 'text-6xl md:text-7xl' : 'text-5xl')}>{fact.stat.value}</span>
          <span className="mt-1 block text-sm text-white/80">{fact.stat.label}</span>
        </p>
      </div>

      <div className={cn('flex flex-1 flex-col p-5 md:p-6', featured && 'lg:p-8')}>
        <p className="text-sm font-medium text-sky">{factCategoryName(fact.category)}</p>
        <h3 className={cn('mt-2 leading-snug font-semibold tracking-tight', featured ? 'text-xl md:text-2xl' : 'text-lg')}>
          <button
            type="button"
            onClick={() => onOpen(fact.id)}
            className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:rounded-card focus-visible:after:ring-2 focus-visible:after:ring-sky"
          >
            {fact.title}
          </button>
        </h3>
        <p className={cn('mt-2 leading-relaxed text-muted', featured ? 'line-clamp-4 text-[1.0625rem]' : 'line-clamp-3')}>{fact.summary}</p>
        {featured && (
          <span aria-hidden className={buttonClasses({ variant: 'primary', size: 'sm' }, 'mt-6 hidden self-start lg:inline-flex')}>
            Бүтнээр унших
          </span>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm text-muted">
          <span className="truncate">{fact.source.short}</span>
          <span className="shrink-0">{fact.readMinutes} мин унших</span>
        </div>
      </div>
    </article>
  )
}
