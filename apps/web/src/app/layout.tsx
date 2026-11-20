import type { Metadata, Viewport } from 'next'
import { Onest, Unbounded } from 'next/font/google'
import './globals.css'

const onest = Onest({
  variable: '--font-onest',
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
})

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['500', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Mentally — сэтгэл зүйн видео хичээл, зөвлөгөө',
    template: '%s · Mentally',
  },
  description: 'Мэргэшсэн сэтгэл зүйчийн бэлтгэсэн видео хичээл, хувийн зөвлөгөөгөөр түгшүүр, стресс, сэтгэл гутралаа ойлгож, тэнцвэрээ олоорой.',
  openGraph: {
    type: 'website',
    locale: 'mn_MN',
    siteName: 'Mentally',
  },
}

export const viewport: Viewport = {
  themeColor: '#f1f1ec',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="mn" className={`${onest.variable} ${unbounded.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
