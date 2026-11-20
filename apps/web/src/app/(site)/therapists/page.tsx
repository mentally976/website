import type { Metadata } from 'next'
import { TherapistProfile } from '@/components/therapists/therapist-profile'
import { ButtonLink } from '@/components/ui/button'
import { getTherapist } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Сэтгэл зүйч',
  description: 'Mentally-ийн бүх видео хичээлийг бэлтгэж, хувийн зөвлөгөө өгдөг клиник сэтгэл зүйч.',
}

export default async function TherapistPage() {
  const therapist = await getTherapist()

  return (
    <div className="container-page pt-10 pb-24 md:pt-16 md:pb-32">
      <TherapistProfile therapist={therapist} as="h1" preload>
        <ButtonLink href="/signup" size="lg">
          Бүртгүүлээд хичээл үзэх
        </ButtonLink>
        <ButtonLink href="/#services" variant="secondary" size="lg">
          Зөвлөгөөний үйлчилгээ
        </ButtonLink>
      </TherapistProfile>
    </div>
  )
}
