import type { Metadata } from 'next'
import { FactsBrowser } from '@/components/facts/facts-browser'
import { getFactCategories, getFacts } from '@/lib/facts'

export const metadata: Metadata = {
  title: 'Судалгааны баримт',
}

export default async function FactsPage() {
  const [facts, categories] = await Promise.all([getFacts(), getFactCategories()])

  return (
    <div className="container-page pt-8 pb-20 lg:pt-12">
      <header className="max-w-2xl">
        <h1 className="text-title font-semibold">Сэтгэл зүйн судалгааны баримт</h1>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">
          Шинжлэх ухааны сэтгүүлд нийтлэгдсэн судалгаанаас сэтгэл санаагаа ойлгоход тустай {facts.length} баримтыг товчлон орчуулав. Карт дээр дарж бүтнээр нь
          уншаарай.
        </p>
      </header>

      <FactsBrowser facts={facts} categories={categories} />
    </div>
  )
}
