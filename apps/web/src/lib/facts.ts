import 'server-only'
import { cacheLife, cacheTag } from 'next/cache'
import { FACT_CATEGORIES } from '@mentally/db'
import { facts } from '@mentally/db/mock'

/*
 * Research facts for the student dashboard. Mock data today; the `articles` table in
 * supabase/migrations is the live home for them (query it with createPublicClient()).
 */

export async function getFacts() {
  'use cache'
  cacheLife('days')
  cacheTag('facts')
  return facts
}

/** Categories that actually have facts, in display order. */
export async function getFactCategories() {
  'use cache'
  cacheLife('days')
  cacheTag('facts')
  return FACT_CATEGORIES.filter((category) => facts.some((fact) => fact.category === category.id)).map(({ id, name }) => ({ id, name }))
}
