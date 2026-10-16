import assert from "node:assert/strict"
import { mkdtemp, readdir, rm, stat } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { build } from "vite"

const temporary = await mkdtemp(path.join(tmpdir(), "web3xms-demo-check-"))
const storage = new Map()
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
}
// Fail immediately if a demo operation attempts to reach an API server.
globalThis.fetch = () => { throw new Error("Unexpected network request") }
let checks = 0
function check(name, run) { run(); checks++; console.log(`✓ ${name}`) }
try {
  await build({
    configFile: false, logLevel: "error",
    resolve: { alias: { "@": path.resolve("src") } },
    build: { ssr: "src/demo/api.ts", outDir: temporary, copyPublicDir: false, minify: false },
  })
  const entry = (await readdir(temporary)).find((file) => /^api\.(m?js)$/.test(file))
  assert.ok(entry, "Demo API bundle was generated")
  let generation = 0
  const reload = () => import(`${pathToFileURL(path.join(temporary, entry)).href}?test=${generation++}`)
  let { handleDemoRequest: request } = await reload()
  const result = (endpoint, args = endpoint) => {
    const response = request(endpoint, args)
    assert.ok("data" in response, JSON.stringify(response))
    return response.data
  }
  const profile = () => result("profile")
  const inventory = () => result("inventory")
  const open = (id) => result("openContainer", { url: `api/containers/${id}/open`, method: "POST" })
  check("All chapters are available immediately without waiting", () => {
    const chapters = result("journeySteps").filter((chapter) => chapter.order > 0)
    assert.equal(chapters.length, 8)
    assert.ok(chapters.every((chapter) => Date.parse(chapter.startDatetime) <= Date.now()))
    assert.deepEqual(result("journeySteps").filter((chapter) => chapter.order > 0), chapters)
  })
  check("Guest profile, starter XP and all three case types", () => {
    assert.equal(profile().expBalance, 1000)
    assert.equal(result("getContainers").containers.length, 3)
    assert.equal(inventory().items_count, 3)
  })
  check("Every case charges exactly 40 XP and awards a prize from its catalog", () => {
    const containers = result("getContainers").containers
    for (const container of containers) {
      const before = profile().expBalance
      const count = inventory().items_count
      const win = open(container.id)
      assert.equal(profile().expBalance, before - container.price)
      assert.equal(inventory().items_count, count + 1)
      assert.ok(container.prizes.some((entry) => entry.prize.id === win.prize.id))
      assert.equal(inventory().items[0].prize_id, win.prize.id)
    }
  })
  check("Frozen cache responses cannot freeze the demo state", () => {
    Object.freeze(profile())
    const frozen = result("getContainers")
    Object.freeze(frozen.containers)
    assert.equal(result("getContainers").containers.sort((a, b) => b.order - a.order).length, 3)
    result("refill")
    assert.equal(profile().expBalance, 1280)
  })
  check("Insufficient balance never deducts XP or creates a reward", () => {
    result("resetDemo")
    for (let i = 0; i < 25; i++) open(3)
    const before = inventory().items_count
    const response = request("openContainer", { url: "api/containers/3/open" })
    assert.equal(response.error.data.code, "insufficient_balance")
    assert.equal(profile().expBalance, 0)
    assert.equal(inventory().items_count, before)
    result("refill")
    assert.equal(profile().expBalance, 400)
    open(1)
  })
  check("NFT, sponsor and promo rewards activate without a wallet; retries are idempotent", () => {
    for (const id of [1, 2, 3]) {
      const args = { url: `api/me/inventory/${id}/claim`, method: "POST" }
      const first = result("claim", args)
      assert.equal(first.prize_code, `DEMO-${String(id).padStart(5, "0")}`)
      assert.deepEqual(result("claim", args), first)
      assert.equal(inventory().items.find((entry) => entry.id === id).is_used, true)
    }
  })
  check("Published chapters award XP once; the unreleased story has no task", () => {
    const before = profile().expBalance
    for (let id = 1; id <= 8; id++) {
      if (id === 7) continue
      const args = { url: "demo/complete-chapter", body: { chapterId: id } }
      result("completeChapter", args)
      result("completeChapter", args)
    }
    assert.equal(profile().expBalance, before + 560)
    assert.equal(result("demoProgress").length, 7)
    assert.equal(result("journeySteps").filter((chapter) => chapter.order > 0).length, 8)
  })
  check("The anthology preserves episode counts, settings and the unpublished seventh story", () => {
    const chapters = result("journeySteps")
    assert.deepEqual(chapters.map((chapter) => chapter.stories.length), [2, 3, 4, 5, 8, 5, 4, 1, 2])
    assert.equal(chapters[5].title, "Криптовалютные реликты")
    assert.equal(chapters[8].title, "Эпилог")
    for (const chapter of chapters) {
      assert.deepEqual(chapter.stories.map((story) => story.orderNumber), chapter.stories.map((_, index) => index + 1))
      assert.ok(chapter.stories.every((story) => story.text.length > 100))
      const audio = chapter.mediaContents.filter((media) => media.mediaContent.type === "audio")
      assert.deepEqual(audio.map((media) => media.mediaContent.file), chapter.id === 7 ? [] : [
        `/audio/stories/${chapter.id === 0 ? "prologue" : chapter.id === 8 ? "epilogue" : `story-${chapter.id}`}.mp3`,
      ])
    }
    assert.match(chapters[7].description, /не была выпущена/)
    assert.match(chapters[7].stories[0].text, /Ксандр/)
    assert.match(chapters[7].stories[0].text, /Локки/)
    assert.equal(chapters[7].maxExpReward, 0)
    assert.equal(request("completeChapter", { url: "demo", body: { chapterId: 7 } }).error.data.code, "chapter_has_no_tasks")
  })
  for (const chapter of result("journeySteps")) {
    for (const media of chapter.mediaContents.filter((media) => media.mediaContent.type === "audio")) {
      assert.ok((await stat(path.join("public", media.mediaContent.file))).size > 1_000_000)
    }
  }
  check("Restoring a detail adds an NFT only once per identifier", () => {
    const before = inventory().items_count
    const args = { url: "api/get-nutcracker-with-attributes?transaction_hash=demo-part-1" }
    result("remint", args)
    result("remint", args)
    assert.equal(inventory().items_count, before + 1)
    assert.equal(inventory().items[0].type, "nft")
  })
  const savedProfile = profile()
  const savedInventory = inventory()
  ;({ handleDemoRequest: request } = await reload())
  check("Reload restores balance, rewards, activation and completed chapters", () => {
    assert.deepEqual(profile(), savedProfile)
    assert.deepEqual(inventory(), savedInventory)
    assert.equal(result("demoProgress").length, 7)
  })
  check("Reset restores the complete initial demo", () => {
    result("resetDemo")
    assert.equal(profile().expBalance, 1000)
    assert.equal(inventory().items_count, 3)
    assert.ok(inventory().items.every((entry) => !entry.is_used))
    assert.deepEqual(result("demoProgress"), [])
  })
  check("Unknown IDs fail without altering progress", () => {
    assert.equal(request("openContainer", { url: "api/containers/999/open" }).error.status, 404)
    assert.equal(request("claim", { url: "api/me/inventory/999/claim" }).error.status, 404)
    assert.equal(request("completeChapter", { url: "demo", body: { chapterId: 999 } }).error.status, 404)
    assert.equal(request("unknown", "unknown").error.status, 404)
    assert.equal(profile().expBalance, 1000)
  })
  ;({ handleDemoRequest: request } = await reload())
  check("Reload keeps every chapter open", () => {
    assert.ok(result("journeySteps").filter((chapter) => chapter.order > 0).every((chapter) => Date.parse(chapter.startDatetime) <= Date.now()))
  })
  storage.set("web3xms-demo-v1", "{broken json")
  ;({ handleDemoRequest: request } = await reload())
  check("Corrupted browser storage falls back to a working demo", () => assert.equal(profile().expBalance, 1000))
  Object.defineProperty(globalThis, "localStorage", { configurable: true, get: () => { throw new Error("Storage unavailable") } })
  ;({ handleDemoRequest: request } = await reload())
  check("The demo still works when browser storage is blocked", () => {
    open(1)
    assert.equal(profile().expBalance, 960)
    result("resetDemo")
    assert.equal(profile().expBalance, 1000)
  })
  console.log(`\n${checks} demo checks passed. No API requests were made.`)
} finally {
  // Only remove the exact temporary directory created by this test run.
  assert.ok(temporary.startsWith(path.join(tmpdir(), "web3xms-demo-check-")))
  await rm(temporary, { recursive: true, force: true })
}
