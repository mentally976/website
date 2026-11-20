import { type ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'input'> & { label: string; hint?: string }

export function Field({ label, hint, id, name, className, ...props }: Props) {
  const inputId = id ?? name
  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        className={cn(
          'h-12 w-full rounded-xl bg-surface px-4 text-base ring-1 ring-line transition-shadow outline-none placeholder:text-muted/70',
          'focus:ring-2 focus:ring-sky',
          className,
        )}
        {...props}
      />
      {hint && (
        <p id={`${inputId}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

export function FormMessage({ tone, children }: { tone: 'error' | 'success'; children: string }) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn('rounded-xl px-4 py-3 text-[0.9375rem] leading-relaxed', tone === 'error' ? 'bg-red-50 text-red-800' : 'bg-sky-soft text-ink')}
    >
      {children}
    </p>
  )
}
