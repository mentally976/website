import Link from 'next/link'
import { categories } from '@mentally/db/mock'
import { COURSES_PATH, EMERGENCY_NUMBER } from '@/content/site'
import { Logo } from './logo'

const COLUMNS = [
  {
    title: 'Сэдвүүд',
    links: categories.slice(0, 5).map((c) => ({ href: `${COURSES_PATH}?category=${c.slug}`, label: c.name })),
  },
  {
    title: 'Mentally',
    links: [
      { href: '/#courses', label: 'Видео хичээлүүд' },
      { href: '/therapists', label: 'Сэтгэл зүйч' },
      { href: '/#services', label: 'Зөвлөгөөний үйлчилгээ' },
      { href: '/#faq', label: 'Түгээмэл асуулт' },
    ],
  },
  {
    title: 'Бүртгэл',
    links: [
      { href: '/signup', label: 'Бүртгүүлэх' },
      { href: '/login', label: 'Нэвтрэх' },
      { href: '/dashboard', label: 'Миний хичээлүүд' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-canvas">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.3fr_2fr] md:py-20">
        <div className="max-w-sm space-y-5">
          <Logo tone="light" />
          <p className="leading-relaxed text-canvas/65">
            Мэргэшсэн сэтгэл зүйчийн бэлтгэсэн видео хичээл, зөвлөгөөгөөр сэтгэлийн эрүүл мэндийг хүн бүрт ойр болгоно.
          </p>
          <p className="rounded-card bg-canvas/[0.06] p-4 text-sm leading-relaxed text-canvas/80 ring-1 ring-canvas/10">
            Яаралтай тусламж хэрэгтэй бол{' '}
            <a href={`tel:${EMERGENCY_NUMBER}`} className="font-semibold text-canvas underline underline-offset-4">
              {EMERGENCY_NUMBER}
            </a>{' '}
            дугаарт залгана уу. Mentally яаралтай тусламжийн үйлчилгээ биш.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 text-sm font-medium text-canvas/50">{column.title}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[0.9375rem] text-canvas/85 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-canvas/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-canvas/50 sm:flex-row sm:justify-between">
          <p>© 2026 Mentally. Демо хувилбар — бүх өгөгдөл туршилтынх.</p>
          <p>Зургууд Unsplash-аас, видеонууд нээлттэй лицензтэй эх сурвалжаас.</p>
        </div>
      </div>
    </footer>
  )
}
