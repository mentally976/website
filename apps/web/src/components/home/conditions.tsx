import { CONDITIONS } from '@/content/site'
import { ConditionsPicker } from './conditions-picker'

/** Server wrapper: hands the picker plain data, so the mock catalogue behind content/site.ts stays off the client. */
export function Conditions() {
  const items = CONDITIONS.map(({ id, title, text, image }) => ({ id, title, text, image: { url: image.url, alt: image.alt } }))
  return <ConditionsPicker items={items} initialId={CONDITIONS[1].id} />
}
