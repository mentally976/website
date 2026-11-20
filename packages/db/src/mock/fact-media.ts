import { type MediaImage } from './media'

/** Photos for the research facts (Unsplash License, hotlinked from images.unsplash.com). */
const unsplash = (id: string, alt: string, credit: string): MediaImage => ({
  url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`,
  alt,
  credit,
})

export const factImages = {
  whoStats: unsplash('1517586979036-b7d1e86b3345', 'Токиогийн Гинза дахь гарцаар гаталж буй олон хүн, дээрээс харсан зураг', 'Ryoji Iwata'),
  teenOnset: unsplash('1562221318-d3cd56368bf2', 'Сургуулийн дүрэмт хувцастай охин цонхоор харж буй нь', 'Barry'),
  affectLabeling: unsplash('1529939620248-273fd31a7cdf', 'Сандал дээр нүүр тулан ярилцаж суугаа хоёр залуу эмэгтэй', 'Trung Thanh'),
  sleepLoss: unsplash('1675510183225-76c920848c29', 'Харанхуй өрөөнд орондоо хэвтээд утсаа харж буй хүн', 'Kajetan Sumila'),
  mindWandering: unsplash('1777823697050-6d0d34b95753', 'Автобусны цонхоор бодлогошрон харж суугаа эрэгтэй', 'Takashi Sakamoto'),
  nature120: unsplash('1758438919146-f3f59a6d2544', 'Нарны туяа тусах манантай ойн замаар алхаж буй хүн', 'Zetong Li'),
  exercise: unsplash('1760879946075-ddb8432a322d', 'Намрын манантай цэцэрлэгт хүрээлэнгийн замаар гүйж буй хүн', 'Gábor Kárpáti'),
  socialTies: unsplash('1582298538104-fe2e74c27f59', 'Кофе уунгаа инээлдэн алга ташиж буй дөрвөн найз', 'Toa Heftiba'),
  expressiveWriting: unsplash('1550592704-6c76defa9985', 'Улаан үзгээр тэмдэглэлийн дэвтэрт бичиж буй гар', 'lilartsy'),
  cyclicSighing: unsplash('1778317240266-193dac2e6a31', 'Нарны зөөлөн гэрэлд нүдээ аниад амьсгалж буй эмэгтэй', 'Declan Sun'),
} satisfies Record<string, MediaImage>
