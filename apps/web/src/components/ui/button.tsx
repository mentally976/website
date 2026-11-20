import Link from 'next/link'
import { type ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  primary: 'bg-ink text-canvas hover:bg-ink-soft',
  secondary: 'bg-surface text-ink ring-1 ring-line hover:ring-ink/30',
  ghost: 'text-ink hover:bg-ink/5',
  light: 'bg-canvas text-ink hover:bg-white',
  outlineLight: 'text-canvas ring-1 ring-canvas/30 hover:ring-canvas/70',
} as const

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
} as const

export type ButtonStyle = { variant?: keyof typeof VARIANTS; size?: keyof typeof SIZES }

export function buttonClasses({ variant = 'primary', size = 'md' }: ButtonStyle = {}, className?: string) {
  return cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap',
    'transition-[background-color,box-shadow,transform,color] duration-200 ease-out active:scale-[0.97]',
    'disabled:pointer-events-none disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
}

export function Button({ variant, size, className, type = 'button', ...props }: ComponentProps<'button'> & ButtonStyle) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...props} />
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link className={buttonClasses({ variant, size }, className)} {...props} />
}
