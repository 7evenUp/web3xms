import type { JourneyStory } from "@/types/journey-step"
import prologue from "./story-texts/0.txt?raw"
import story1 from "./story-texts/1.txt?raw"
import story2 from "./story-texts/2.txt?raw"
import story3 from "./story-texts/3.txt?raw"
import story4 from "./story-texts/4.txt?raw"
import story5 from "./story-texts/5.txt?raw"
import story6 from "./story-texts/6.txt?raw"
import epilogue from "./story-texts/8.txt?raw"

// Source: the anthology supplied by the project owner in chat.
export const originalStories = [
  { title: "Предисловие", audio: "prologue.mp3" },
  { title: "Тайна зеркального астероида", audio: "story-1.mp3" },
  { title: "Антивещество в живой пробирке", audio: "story-2.mp3" },
  { title: "Древние орбиталы", audio: "story-3.mp3" },
  { title: "Загадка двух измерений", audio: "story-4.mp3" },
  { title: "Криптовалютные реликты", audio: "story-5.mp3" },
  { title: "Космический детектив Дилл Дроп", audio: "story-6.mp3" },
  { title: "Тайна с нулевым разглашением", audio: null },
  { title: "Эпилог", audio: "epilogue.mp3" },
]

export const unreleasedStory = {
  description: "Седьмая история не была выпущена. Сохранилось только описание задуманного сеттинга и развязки. Аудиозаписи нет.",
  text: "Седьмая история «Тайна с нулевым разглашением» не была выпущена. Её текст и аудиозапись отсутствуют. Известно только описание задуманной истории.\n\nЖАНР: экшн-блокбастер, местами ситком.\n\nЛОКАЦИЯ: технологичный и процветающий мир Ксандр и один из его дальних спутников — Локки, с которого открывается величественный вид на планету и окружающие её множественные космические гавани.\n\nГЕРОИ: все.\n\nСЮЖЕТ: развязка по спасению.",
  additionalInfo: [
    { title: "Локация", text: "Мир Ксандр и его дальний спутник Локки" },
    { title: "Жанр", text: "Экшн-блокбастер, местами ситком" },
  ],
}

const texts = [prologue, story1, story2, story3, story4, story5, story6, "", epilogue]

const settings: JourneyStory["additionalInfo"][] = [
  [],
  [
    { title: "Локация", text: "галактическая система «Медуза», мир Кронос близ Купольного Нестабильного Солнца" },
    { title: "Время", text: "канун галактического медузианского Нового Года и Рождества" },
  ],
  [
    { title: "Локация", text: "космическое пространство системы «Медуза», центральный Меридиан" },
    { title: "Место", text: "крейсер будущего префекта планеты Вольгга, третьего по значимости мира в галактике" },
  ],
  [
    { title: "Локация", text: "Крайний космос галактики «Медуза», область Тёмных Рубежей близ планеты Шелесяка" },
    { title: "Место", text: "пилотируемый исследовательский корабль «Пегас», класса канарейка" },
  ],
  [
    { title: "Локация", text: "галактическая система «Медуза», созвездие Горн, орбита планеты Фуриосса" },
    { title: "Место", text: "космический корабль «Синяя чайка», класса «Милано»" },
  ],
  [
    { title: "Локация", text: "правый Меридиан системы «Медуза», луны Вега-1 и Вега-2 планеты Артея" },
    { title: "Место", text: "потерпевший кораблекрушение грузовой фрахтовик «Диметра», класса «Ковчег»" },
  ],
  [
    { title: "Локация", text: "центральный Меридиан галактической системы «Медуза»" },
    { title: "Место", text: "космическая развлекательная станция «Райская Гавань»" },
  ],
  unreleasedStory.additionalInfo,
  [],
]

export function getOriginalEpisodes(chapter: number): JourneyStory[] {
  if (chapter === 7) return [{
    title: "История не была выпущена", text: unreleasedStory.text,
    orderNumber: 1, additionalInfo: unreleasedStory.additionalInfo,
  }]

  return Array.from(texts[chapter].matchAll(/^эпизод (\d+): (.+)\r?\n([\s\S]*?)(?=^эпизод \d+: |$(?![\s\S]))/gm), (match) => ({
    title: match[2].trim(), text: match[3].trim(),
    orderNumber: Number(match[1]), additionalInfo: settings[chapter],
  }))
}
