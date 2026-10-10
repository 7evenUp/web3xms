import type { InventoryItem } from "@/types/inventory"
import type { Profile } from "@/types/profile"
import type { Prize } from "@/types/containers"
import { demoPrizes, initialProfile } from "./data"

export const DEMO_STORAGE_KEY = "web3xms-demo-v1"
export interface DemoState {
  version: 1
  profile: Profile
  items: InventoryItem[]
  completedChapters: number[]
  nextId: number
  repairedParts: string[]
}
export function createInventoryItem(prize: Prize, id: number, type: InventoryItem["type"] = "crypton_promo_code"): InventoryItem {
  return {
    id, prize_id: prize.id, title: prize.title, description: prize.description,
    type, rarity: prize.rarity, background_color: prize.backgroundColor,
    image: prize.image, photos: prize.photos,
    user_data: type === "sponsor_promo_code" ? `DEMO-${id.toString().padStart(5, "0")}` : null,
    instruction: "Нажми «Активировать», чтобы получить демонстрационный приз. Все награды виртуальные и сохраняются только в этом браузере.",
    claim_link: "/quest/inventory", is_claimed: false, is_used: false,
    claimed_at: null, used_at: null, received_at: new Date().toISOString(),
  }
}
export function createInitialState(): DemoState {
  return {
    version: 1, profile: { ...initialProfile }, nextId: 4, completedChapters: [], repairedParts: [],
    items: [
      createInventoryItem(demoPrizes.find((prize) => prize.rarity === "common")!, 1),
      createInventoryItem(demoPrizes.find((prize) => prize.rarity === "contraband")!, 2, "nft"),
      createInventoryItem(demoPrizes.find((prize) => prize.rarity === "uncommon")!, 3, "sponsor_promo_code"),
    ],
  }
}
export function isDemoState(value: unknown): value is DemoState {
  if (!value || typeof value !== "object") return false
  const state = value as DemoState
  return state.version === 1 && !!state.profile &&
    Number.isSafeInteger(state.profile.expBalance) && state.profile.expBalance >= 0 &&
    typeof state.profile.username === "string" && Number.isSafeInteger(state.nextId) &&
    Array.isArray(state.items) && state.items.every((item) => item && Number.isSafeInteger(item.id) &&
      typeof item.title === "string" && typeof item.image === "string" &&
      typeof item.is_used === "boolean" && Array.isArray(item.photos)) &&
    state.nextId > Math.max(0, ...state.items.map((item) => item.id)) &&
    Array.isArray(state.completedChapters) && state.completedChapters.every((id) => Number.isInteger(id) && id >= 1 && id <= 8)
}
function readState(): DemoState {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY) ?? "null")
    if (isDemoState(saved)) return { ...saved, repairedParts: Array.isArray(saved.repairedParts) ? saved.repairedParts : [] }
  } catch { /* Private browsing or damaged storage: use the in-memory demo. */ }
  return createInitialState()
}
let state = readState()
export function getDemoState() { return state }
export function saveDemoState(next: DemoState) {
  state = next
  try { localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state)) }
  catch { /* The demo remains usable when browser storage is unavailable. */ }
}
export function resetDemoState() { saveDemoState(createInitialState()) }
