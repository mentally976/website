import { TherapistProfile } from '@/components/therapists/therapist-profile'
import { ButtonLink } from '@/components/ui/button'
import { getTherapist } from '@/lib/data'

/** Home page section introducing Mentally's one psychologist. */
export async function TherapistsPreview() {
  const therapist = await getTherapist()

  return (
    <section aria-labelledby="therapist-title" className="container-page py-20 md:py-28">
      <TherapistProfile therapist={therapist} id="therapist-title">
        <ButtonLink href="/therapists" variant="secondary">
          Дэлгэрэнгүй танилцах
        </ButtonLink>
      </TherapistProfile>
    </section>
  )
}
