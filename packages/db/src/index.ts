export * from './types'
export * from './fact'
export type { Database, Json, Tables, Enums } from './database.types'

export const LEVEL_LABEL = {
  beginner: 'Анхан шат',
  intermediate: 'Дунд шат',
  advanced: 'Ахисан шат',
} as const

/** 754 → "12:34", 3725 → "1:02:05" */
export function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const mm = h ? String(m).padStart(2, '0') : String(m)
  return [h || null, mm, String(s).padStart(2, '0')].filter((v) => v !== null).join(':')
}

/** 5400 → "1 цаг 30 мин" */
export function formatTotalTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.round((totalSeconds % 3600) / 60)
  if (!h) return `${m} мин`
  return m ? `${h} цаг ${m} мин` : `${h} цаг`
}
