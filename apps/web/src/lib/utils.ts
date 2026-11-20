import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge the custom @theme tokens so `text-display` isn't mistaken for a colour.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'title', 'statement'],
      color: ['canvas', 'surface', 'ink', 'ink-soft', 'muted', 'line', 'sky', 'sky-soft', 'chart-1', 'chart-2', 'chart-3'],
      radius: ['card', 'panel'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "Батболд Дорж" → "БД" */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')
}
