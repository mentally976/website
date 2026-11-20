/**
 * Demo media. Photos: Unsplash License (free to use, hotlinked from images.unsplash.com).
 * Videos: Mixkit Stock Video Free License. Replace with Supabase Storage objects when content is real.
 */

export type MediaImage = { url: string; alt: string; credit: string }

const unsplash = (id: string, alt: string, credit: string, width = 1800): MediaImage => ({
  url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`,
  alt,
  credit,
})

export const images = {
  hero: unsplash('1522845133757-59d75c1026f1', 'Нарны гэрэлтэй өрөөнд цагаан буйдан дээр тухлан амарч буй залуу эмэгтэй', 'i yunmai'),
  therapyIndividual: unsplash('1758273240631-59d44c8f5b66', 'Сэтгэл зүйчтэй ганцаарчлан ярилцаж буй эмэгтэй', 'Vitaly Gariev'),
  therapyGroup: unsplash('1780946101636-00004978f8c1', 'Гэрэлтэй өрөөнд тойрон суусан дэмжлэгийн бүлэг', 'The Ridge Ohio'),
  therapyOnline: unsplash('1758521541324-d304c5303fe5', 'Гэрээсээ зөөврийн компьютерээр видео дуудлагад орж буй эмэгтэй', 'Vitaly Gariev'),
  family: unsplash('1772160010928-c4273bc05666', 'Гэртээ буйдан дээр хамт суусан ээж хүүхэд хоёр', 'leoon liang'),
  couple: unsplash('1676337920559-b7b03b86d010', 'Зэрэгцэн суугаад инээмсэглэн ярилцаж буй хос', 'Phạm Trần Hoàn Thịnh'),
  cbt: unsplash('1517971129774-8a2b38fa128e', 'Цонхны дэргэд тэмдэглэлийн дэвтэртээ бичиж буй эмэгтэй', 'Hannah Olinger'),
  mindfulness: unsplash('1513097847644-f00cfe868607', 'Нуурын эрэг дээрх модон тавцан дээр бясалгаж буй эмэгтэй', 'Le Minh Phuong'),
  anxiety: unsplash('1773496396339-447f78cc8fac', 'Санаа зовсон байдалтай нүүрээ алгандаа тулсан эмэгтэй', 'Tsimur Asayonak'),
  depression: unsplash('1616824726805-1c991ae55757', 'Цонхны дэргэд ганцаараа цас харж суугаа хүн', 'Daniil Onischenko'),
  stress: unsplash('1620809975674-10b8ff5f8e58', 'Компьютерийн өмнө ядарч толгойгоо барьсан эмэгтэй', 'Elisa Ventur'),
  trauma: unsplash('1673972249429-0f923e8a4b07', 'Усны эрэг дээр ганцаараа бодлогошрон суугаа залуу', 'Quỳnh Lê Mạnh'),
  relationships: unsplash('1758274252296-a63b1d7d4bb8', 'Кафены ширээнд ярилцаж суугаа хоёр залуу эмэгтэй', 'Vitaly Gariev'),
  sleep: unsplash('1686828752370-c0398d724e82', 'Цагаан хөнжилтэй орондоо тайван унтаж буй эмэгтэй', 'Slaapwijsheid.nl'),
  breathing: unsplash('1784807889837-4491aa2eeb88', 'Манантай уулсын өмнө йогийн дасгал хийж буй эмэгтэй', 'Camille La Brequa'),
  steppe: unsplash('1760776679643-0e28cbcd4214', 'Цэнхэр тэнгэрийн дор ногоон тал дахь монгол гэрүүд', 'C Cai'),
  forest: unsplash('1704373226336-04d1e8c0f06b', 'Ногоон ойгоор хүрээлэгдсэн манантай нуур', 'Haonan Zhang'),
  therapist1: unsplash('1758691737605-69a0e78bd193', 'Нүдний шил зүүсэн, инээмсэглэсэн эмэгтэй сэтгэл зүйч', 'Vitaly Gariev', 900),
  therapist2: unsplash('1792824242439-e3fd41b4c420', 'Нүдний шил зүүсэн, бор цамцтай эрэгтэй сэтгэл зүйч', 'Preillumination SeTh', 900),
  therapist3: unsplash('1604904612715-47bf9d9bc670', 'Саарал пиджактай эмэгтэй сэтгэл зүйч', 'Phạm Duy Quang', 900),
  therapist4: unsplash('1758600432277-5c76801e584a', 'Инээмсэглэсэн дунд насны эрэгтэй сэтгэл зүйч', 'Vitaly Gariev', 900),
  therapist5: unsplash('1600481176431-47ad2ab2745d', 'Хар цамцтай, инээмсэглэсэн эмэгтэй сэтгэл зүйч', 'panitan punpuang', 900),
  therapist6: unsplash('1544168190-79c17527004f', 'Цэнхэр жинсэн цамцтай залуу эрэгтэй сэтгэл зүйч', 'Juan Encalada', 900),
  student1: unsplash('1758600587815-b654d1405e83', 'Урт хар үстэй, инээж буй залуу эмэгтэй', 'Vitaly Gariev', 400),
  student2: unsplash('1611403119860-57c4937ef987', 'Цагаан цамцтай, инээмсэглэсэн залуу эрэгтэй', 'Hà Nguyễn', 400),
  student3: unsplash('1773899337978-b8d83bd9b783', 'Эрүүгээ гартаа тулан зөөлөн инээмсэглэсэн эмэгтэй', 'Phước Sang', 400),
} satisfies Record<string, MediaImage>

const mixkit = (id: number, title: string) => ({
  url: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  title,
  license: 'Mixkit Stock Video Free License',
})

export const videos = [
  mixkit(42904, 'Гүнзгий амьсгалж бясалгах'),
  mixkit(43798, 'Гадаа бясалгал'),
  mixkit(50847, 'Нартай өдрийн нам гүм ой'),
  mixkit(529, 'Нарны гэрэлд урсах ойн горхи'),
  mixkit(4075, 'Хөдөөгийн нуга'),
  mixkit(41545, 'Ой бүхий уулсын дээгүүр'),
] as const
