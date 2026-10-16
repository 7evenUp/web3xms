import { prizesData } from "@/pages/Quest/components/Phase3/prizesData"
import type { ContainersResponse, Prize } from "@/types/containers"
import type { JourneyStep } from "@/types/journey-step"
import type { Profile } from "@/types/profile"
import type { Sponsors } from "@/types/sponsors"
import chapter1 from "@/assets/images/phase-2-1.png"
import chapter2 from "@/assets/images/phase-2-2.png"
import chapter3 from "@/assets/images/phase-2-3.png"
import chapter4 from "@/assets/images/phase-2-4.png"
import chapter5 from "@/assets/images/phase-2-5.png"
import chapter6 from "@/assets/images/phase-2-6.png"
import chapter7 from "@/assets/images/phase-2-7.png"
import chapter8 from "@/assets/images/phase-2-8.png"
import { originalStories, getOriginalEpisodes, unreleasedStory } from "./stories"
import tangem from "@/assets/logos/tangem-logo.png"
import memefi from "@/assets/logos/memefi-logo.png"
import symbiosis from "@/assets/logos/symbiosis-logo.png"
import crossfi from "@/assets/logos/cross-finance-logo.png"

export const STARTING_XP = 1000
export const REFILL_XP = 400
export const DEMO_DATE = "2023-12-15T15:00:00.000Z"
export const initialProfile: Profile = {
  avatar: null, email: "guest@example.com", expBalance: STARTING_XP,
  refCode: null, syncZealyMessage: null, timezone: "Europe/Moscow",
  tonAddress: null, username: "Демо-гость", wallet: null, zealyId: null,
  currentContainerOrderToOpen: 1,
}

const colors: Record<string, string> = {
  common: "#D9D9D9", uncommon: "#008EFF", rare: "#615DFF",
  legendary: "#FF4654", immortal: "#FAC70E", contraband: "#fa940e",
}
export const demoPrizes: Prize[] = prizesData.map((item, index) => ({
  id: index + 1, title: item.name, description: item.description,
  image: item.imgSrc[0],
  photos: item.imgSrc.map((file, photo) => ({ id: photo + 1, file, orderNumber: photo + 1 })),
  rarity: item.rarity, backgroundColor: colors[item.rarity],
  link: item.link ?? null, totalCountForUser: item.amount,
}))
export const demoContainers: ContainersResponse = {
  totalCount: 3,
  containers: ["Common", "Rare", "Legendary"].map((name, index) => ({
    id: index + 1, name, order: index + 1, price: 40, isVisible: true,
    image: `/containers/container-${["sm", "md", "lg"][index]}.png`,
    prizes: demoPrizes.filter((prize) => index === 2 || (index === 0
      ? ["common", "uncommon"].includes(prize.rarity)
      : ["uncommon", "rare", "legendary"].includes(prize.rarity)))
      .map((prize) => ({ prize, numberInContainer:
        ({ common: 12, uncommon: 9, rare: 6, legendary: 4, immortal: 2, contraband: 1 } as Record<string, number>)[prize.rarity],
      })),
  })),
}

const chapterImages = [chapter1, chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8]
const chapterColors = ["", "red", "green", "violet", "cyan", "gold", "blue", "purple", "burgundy"]
const chapterDescriptions = [
  "Страшные и Удивительные Рождественские Истории — спецвыпуск Crypto Vision. По вселенным One Word и Crypton Universe. By Crypton & Crypto Wiki.",
  "Громозека и его команда отправляются к зеркальному астероиду, который угрожает Великому Рождественскому Сиянию.",
  "Будущий префект Феликс Морозов принимает неожиданную делегацию Хранителей Времени на борту своего крейсера.",
  "Капитан Зелёный и экипаж «Пегаса» получают сигнал бедствия с планеты Шелесяка.",
  "Выпускное задание Ани Селезнёвой превращается в испытание смелости, дружбы и доброты на планете Фуриосса.",
  "Братья Фусигуро расследуют крушение фрахтовика «Диметра» и исчезновение его ценного груза.",
  "Детектив Дилл Дроп ищет следы похищенного фотонного преобразователя на станции «Райская Гавань».",
  unreleasedStory.description,
  "Возвращение на борт Галаксеона и заключительное слово автора.",
]

export const demoJourney: JourneyStep[] = originalStories.map(({ title, audio }, order) => ({
  id: order, order, title, description: chapterDescriptions[order],
  backgroundColor: chapterColors[order],
  startDatetime: DEMO_DATE, taskLink: null,
  tasksCount: order === 0 || order === 7 ? 0 : 1,
  maxExpReward: order === 0 || order === 7 ? 0 : 80,
  mediaContents: [
    { id: order * 2 + 1, order: 1, mediaContent: { id: order * 2 + 1, file: chapterImages[order], type: "image" } },
    ...(audio ? [{ id: order * 2 + 2, order: 2, mediaContent: { id: order * 2 + 2, file: "/audio/stories/" + audio, type: "audio" } }] : []),
  ],
  stories: getOriginalEpisodes(order),
}))

export const demoSponsors: Sponsors[] = [tangem, memefi, symbiosis, crossfi]
  .map((logo, index) => ({ id: index + 1, logo, link: "/about" }))
