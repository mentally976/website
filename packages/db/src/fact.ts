/** Short, research-backed psychology articles shown in the student dashboard ("Судалгааны баримт"). */

export const FACT_CATEGORIES = [
  { id: 'numbers', name: 'Тоо баримт' },
  { id: 'brain', name: 'Тархи ба мэдрэмж' },
  { id: 'habits', name: 'Өдөр тутмын дадал' },
  { id: 'connection', name: 'Харилцаа' },
  { id: 'tools', name: 'Өөртөө туслах арга' },
] as const

export type FactCategory = (typeof FACT_CATEGORIES)[number]['id']

export interface FactSource {
  /** Full citation, APA style, in the original language. */
  citation: string
  /** "Science, 2010" — shown on the card. */
  short: string
  /** DOI link or the publisher page. */
  url: string
}

export interface Fact {
  id: string
  category: FactCategory
  /** The number the card is built around, e.g. { value: '47%', label: 'сэрүүн цагийн' }. */
  stat: { value: string; label: string }
  title: string
  summary: string
  body: string[]
  takeaways: string[]
  source: FactSource
  imageUrl: string
  imageAlt: string
  readMinutes: number
}

export function factCategoryName(id: FactCategory) {
  return FACT_CATEGORIES.find((category) => category.id === id)?.name ?? id
}
