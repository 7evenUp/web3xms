import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { demoContainers, demoJourney, demoSponsors, demoPrizes, DEMO_DATE, REFILL_XP } from "./data"
import { createInventoryItem, getDemoState, resetDemoState, saveDemoState } from "./state"

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T
const fail = (code: string, status = 400) => ({ error: { status, data: { code } } })

// Every RTK Query request is handled here. No fetch, cookies, tokens, or server.
export function handleDemoRequest(endpoint: string, args: string | FetchArgs) {
  const request = typeof args === "string" ? { url: args } : args
  const body = (request.body ?? {}) as Record<string, unknown>
  const state = clone(getDemoState())
  let result: unknown = null
  switch (endpoint) {
    case "profile": result = state.profile; break
    case "mainPage": result = { mediaContents: demoJourney[0].mediaContents, prizeFund: "$300,000", startDatetime: DEMO_DATE }; break
    case "sponsors": result = demoSponsors; break
    case "getContainers": result = demoContainers; break
    case "journeySteps": result = demoJourney; break
    case "demoProgress": result = state.completedChapters; break
    case "inventory": result = { items: [...state.items].reverse(), items_count: state.items.length }; break
    case "refill":
    case "syncBalance":
      state.profile.expBalance += REFILL_XP
      result = state.profile
      saveDemoState(state)
      break
    case "syncZealy": result = state.profile; break
    case "completeChapter": {
      const id = Number(body.chapterId)
      const chapter = demoJourney.find((item) => item.id === id && item.order > 0)
      if (!chapter) return fail("chapter_not_found", 404)
      if (!state.completedChapters.includes(id)) {
        state.completedChapters.push(id)
        state.profile.expBalance += chapter.maxExpReward
        saveDemoState(state)
      }
      result = state.profile
      break
    }
    case "openContainer": {
      const id = Number(request.url.match(/containers\/(\d+)\/open/)?.[1])
      const container = demoContainers.containers.find((item) => item.id === id)
      if (!container) return fail("container_not_found", 404)
      if (state.profile.expBalance < container.price) return fail("insufficient_balance")
      const total = container.prizes.reduce((sum, entry) => sum + entry.numberInContainer, 0)
      let roll = Math.random() * total
      const winner = container.prizes.find((entry) => (roll -= entry.numberInContainer) < 0) ?? container.prizes[0]
      state.profile.expBalance -= container.price
      state.profile.currentContainerOrderToOpen = Math.min(3, state.profile.currentContainerOrderToOpen + 1)
      state.items.push(createInventoryItem(winner.prize, state.nextId++))
      saveDemoState(state)
      result = { link: "/quest/inventory", prize: winner.prize }
      break
    }
    case "claim": {
      const id = Number(request.url.match(/inventory\/(\d+)\/claim/)?.[1])
      const item = state.items.find((entry) => entry.id === id)
      if (!item) return fail("inventory_prize_not_found", 404)
      if (!item.is_used) {
        item.is_claimed = item.is_used = true
        item.claimed_at = item.used_at = new Date().toISOString()
        item.user_data = `DEMO-${item.id.toString().padStart(5, "0")}`
        saveDemoState(state)
      }
      result = { instruction: item.instruction, prize_code: item.user_data, help_text: "Демонстрационный приз активирован.", claim_url: "/quest/inventory" }
      break
    }
    case "remint": {
      const part = new URL(request.url, "http://demo.local").searchParams.get("transaction_hash")?.trim()
      if (!part) return fail("incorrect_transaction")
      if (!state.repairedParts.includes(part)) {
        const prize = demoPrizes.find((item) => item.rarity === "contraband")!
        state.items.push(createInventoryItem(prize, state.nextId++, "nft"))
        state.repairedParts.push(part)
        saveDemoState(state)
      }
      result = { nftLink: "/quest/inventory" }
      break
    }
    case "setTimezone":
      state.profile.timezone = String(body.timezone ?? "Europe/Moscow")
      saveDemoState(state)
      break
    case "setTon":
      state.profile.tonAddress = String(body.address ?? "")
      saveDemoState(state)
      break
    case "resetDemo": resetDemoState(); break
    default: return fail("demo_endpoint_not_found", 404)
  }
  // RTK freezes cached results; copies keep local state mutable.
  return { data: clone(result) }
}
export const demoBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api) => {
  await new Promise((resolve) => setTimeout(resolve, 180))
  if (api.signal.aborted) return fail("request_aborted")
  return handleDemoRequest(api.endpoint, args)
}
