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
import soundtrack from "@/assets/audio/new-year.mp3"
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

const chapters = [
  ["Сигнал из космоса", "Отправляйся в рождественское путешествие и найди источник таинственного сигнала.", chapter1, "red"],
  ["Планета подарков", "Исследуй новый мир, в котором рождественские подарки обретают особую силу.", chapter2, "green"],
  ["Хранители знаний", "Узнай, как герои сохраняют знания и делятся ими со всей галактикой.", chapter3, "violet"],
  ["Цифровой океан", "Помоги команде проложить путь через бескрайний цифровой океан.", chapter4, "cyan"],
  ["Золотой ключ", "Найди ключ, который откроет дорогу к волшебной сокровищнице.", chapter5, "gold"],
  ["Ледяная орбита", "Разгадай загадку ледяной станции и продолжи путешествие.", chapter6, "blue"],
  ["Мастерская чудес", "Собери команду и восстанови мастерскую рождественских чудес.", chapter7, "purple"],
  ["Рождественская звезда", "Зажги рождественскую звезду и открой кейсы с подарками.", chapter8, "burgundy"],
]
// Original server-owned story text is unavailable; these are demo chapters.
export const demoJourney: JourneyStep[] = chapters.map(([title, description, file, backgroundColor], index) => ({
  id: index + 1, order: index + 1, title, description, backgroundColor,
  startDatetime: DEMO_DATE, taskLink: null, tasksCount: 1, maxExpReward: 80,
  mediaContents: [
    { id: index * 2 + 1, order: 1, mediaContent: { id: index * 2 + 1, file, type: "image" } },
    { id: index * 2 + 2, order: 2, mediaContent: { id: index * 2 + 2, file: soundtrack, type: "audio" } },
  ],
  stories: [
    { title, text: `${description}\n\nЭто демонстрационная история для портфолио. На борту корабля загорается новый сигнал: героям предстоит исследовать незнакомую локацию, помочь её обитателям и найти следующую часть рождественской звезды.\n\nПрочитай продолжение, затем вернись к заданиям и проверь свои знания.`, orderNumber: 1,
      additionalInfo: [{ title: "Локация", text: `Рождественская галактика, сектор ${index + 1}` }, { title: "Миссия", text: title }] },
    { title: "Продолжение путешествия", text: "Команда объединяет усилия и восстанавливает часть звезды. Путь к следующей планете открыт!\n\nВ демо все главы доступны сразу. Выполни задание этой главы, получи 80 XP и потрать их на кейсы. Полученные награды будут ждать тебя в инвентаре.", orderNumber: 2, additionalInfo: [] },
  ],
}))
demoJourney.unshift({
  ...demoJourney[0], id: 0, order: 0, title: "Рождественское путешествие",
  description: "Восемь глав, задания и подарки. В демо все главы открыты сразу — выбирай любую!",
  tasksCount: 0, maxExpReward: 0, stories: [{ ...demoJourney[0].stories[0], title: "Предисловие" }],
})
export const demoSponsors: Sponsors[] = [tangem, memefi, symbiosis, crossfi]
  .map((logo, index) => ({ id: index + 1, logo, link: "/about" }))
