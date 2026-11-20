/*
 * Landing page copy with photos. It imports the mock catalogue, so only Server Components may import this file;
 * client components take what they need as props, and shared routes/constants live in content/links.ts.
 */
import { images } from '@mentally/db/mock'

export const CONDITIONS = [
  {
    id: 'anxiety',
    title: 'Түгшүүр',
    text: 'Байнгын санаа зовнил, сандрал, зүрх дэлсэх мэдрэмжийг ойлгож, өөрийгөө тайвшруулах аргад суралцана.',
    image: images.anxiety,
  },
  {
    id: 'depression',
    title: 'Сэтгэл гутрал',
    text: 'Хүсэл эрмэлзэл алдарч, юунд ч баярлахгүй болсон үед жижиг алхмаар эрч хүчээ сэргээхэд тусална.',
    image: images.depression,
  },
  {
    id: 'stress',
    title: 'Стресс ба ядаргаа',
    text: 'Ажил, сургуулийн ачааллаас шавхагдаж, нойр муудсан үед хил хязгаар тогтоож, амрах дадал суулгана.',
    image: images.stress,
  },
  {
    id: 'trauma',
    title: 'Сэтгэл зүйн гэмтэл ба PTSD',
    text: 'Хүнд үйл явдлын дараах айдас, дурсамжийг аюулгүй орчинд, мэргэжилтэнтэй хамт алхам алхмаар боловсруулна.',
    image: images.trauma,
  },
  {
    id: 'relationships',
    title: 'Харилцааны асуудал',
    text: 'Хос, гэр бүл, хамт олны дунд үүссэн зөрчлийг хүндэтгэлтэйгээр ярилцаж шийдэх ур чадвар эзэмшинэ.',
    image: images.relationships,
  },
] as const

export const SERVICES = [
  {
    title: 'Хувь хүний зөвлөгөө',
    text: 'Сэтгэл зүйчтэй ганцаарчлан, өөрийн хурдаар ярилцах 50 минутын уулзалт.',
    image: images.therapyIndividual,
  },
  {
    title: 'Бүлгийн зөвлөгөө',
    text: 'Ижил асуудалтай хүмүүстэй туршлагаа хуваалцаж, бие биенээсээ суралцана.',
    image: images.therapyGroup,
  },
  {
    title: 'Онлайн зөвлөгөө',
    text: 'Гэрээсээ, аюулгүй видео дуудлагаар Монголын хаанаас ч холбогдоно.',
    image: images.therapyOnline,
  },
  {
    title: 'Танин мэдэхүйн эмчилгээ (CBT)',
    text: 'Сөрөг бодлын хэв маягаа таньж, илүү уян хатан бодлоор сольж сурна.',
    image: images.cbt,
  },
  {
    title: 'Mindfulness ба бясалгал',
    text: 'Амьсгал, биеийн мэдрэмждээ анхаарч, одоо мөчид тайван байх дадал.',
    image: images.mindfulness,
  },
  {
    title: 'Гэр бүлийн зөвлөгөө',
    text: 'Гэр бүлийн гишүүдийн харилцааг сайжруулж, хамтдаа шийдэл олно.',
    image: images.family,
  },
] as const

export const STEPS = [
  { title: 'Үнэгүй бүртгүүлэх', text: 'Имэйлээрээ нэг минутад бүртгэл үүсгэнэ.' },
  { title: 'Хичээлээ сонгох', text: 'Түгшүүр, нойр, харилцаа зэрэг сэдвээс өөрт хэрэгтэйг нь сонгоно.' },
  { title: 'Өөрийн хурдаар үзэх', text: 'Богино видео хичээлийг утас, компьютер дээрээ хүссэн үедээ үзнэ.' },
  { title: 'Сэтгэл зүйчтэй уулзах', text: 'Хэрэгтэй үед хувийн эсвэл онлайн зөвлөгөө товлоно.' },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'Шөнө бүр бодол эргэлдээд унтаж чаддаггүй байлаа. «Тайван нойр» хичээлийн дасгалыг хоёр долоо хоног хийсний дараа анх удаа амарсан мэдрэмжтэй сэрсэн.',
    name: 'Ану',
    role: '27 настай, маркетингийн менежер',
    image: images.student1,
  },
  {
    quote: 'Ажлын стрессээ гэрт ч авчирдаг болсон байсан. Хил хязгаар тогтоох хичээл надад «үгүй» гэж буруутгалгүйгээр хэлэхийг зааж өгсөн.',
    name: 'Ганбат',
    role: '34 настай, инженер',
    image: images.student2,
  },
  {
    quote: 'Хүүгийнхээ уур бухимдлыг яаж хүлээж авахаа мэддэггүй байлаа. Одоо бид хоёулаа мэдрэмжээ нэрлэж ярьдаг болсон.',
    name: 'Сэлэнгэ',
    role: '31 настай, хоёр хүүхдийн ээж',
    image: images.student3,
  },
] as const
