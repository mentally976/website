import { type Therapist } from '../types'

/**
 * Mentally has one psychologist, who prepares every course and gives the consultations.
 * Only the name is confirmed. Photo, years of experience and specialties stay empty until the real ones are supplied:
 * never fill them with invented details, since they describe a real person.
 */
export const therapists: Therapist[] = [
  {
    id: 'enkhtuguldur',
    slug: 'enkhtuguldur',
    name: 'Даваабаатарын Энхтөгөлдөр',
    title: 'Сэтгэл зүйч',
    bio: 'Mentally-ийн бүх видео хичээлийг бэлтгэж, хувийн зөвлөгөөг өөрөө өгдөг.',
    photoUrl: null,
    photoAlt: 'Даваабаатарын Энхтөгөлдөр',
    specialties: [],
    yearsExperience: 0,
  },
]
