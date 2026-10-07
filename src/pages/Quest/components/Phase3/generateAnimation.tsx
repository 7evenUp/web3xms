import { Prize, PrizeResponse } from "@/types/containers"

import { cn } from "@/lib/cn"

const weightedSample = (items: Record<number, number>) => {
  const total = Object.values(items).reduce((sum, weight) => sum + weight, 0)

  const rnd = Math.random() * total
  let accumulator = 0

  for (const [item, weight] of Object.entries(items)) {
    accumulator += weight

    if (rnd < accumulator) {
      return item
    }
  }
}

export const generateAnimation = (
  length: number,
  winItem: Prize,
  prizes: PrizeResponse[]
) => {
  const samples: Record<number, number> = {}

  for (let i = 0; i < prizes.length; i++) {
    samples[i] = prizes[i].numberInContainer
  }

  return (
    <>
      {Array.from({ length }, (_, index) => index + 1).map((el) => {
        const generatedResult = weightedSample(samples)
        const generatedId =
          generatedResult === undefined ? 0 : parseInt(generatedResult)

        return (
          <div className="relative w-[250px] h-[250px] bg-gray" key={el}>
            {prizes[generatedId].prize.rarity === "legendary" ? (
              <>
                <div className="absolute left-0 top-0 w-2 h-full bg-red" />
                <div className="absolute right-0 top-0 w-2 h-full bg-red" />
                <div className="absolute left-0 top-0 h-2 w-full bg-red" />
                <div className="absolute left-0 bottom-0 h-2 w-full bg-red" />
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 w-40 h-7 bg-red font-docker-one text-xl/none text-white flex items-end justify-center [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]">
                  Тайное
                </div>
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-4 w-40 h-5 bg-red [clip-path:polygon(0%_0%,100%_0%,90%_100%,10%_100%)]" />
              </>
            ) : el === 18 && winItem.rarity === "legendary" ? (
              <>
                <div className="absolute left-0 top-0 w-2 h-full bg-red" />
                <div className="absolute right-0 top-0 w-2 h-full bg-red" />
                <div className="absolute left-0 top-0 h-2 w-full bg-red" />
                <div className="absolute left-0 bottom-0 h-2 w-full bg-red" />
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 w-40 h-7 bg-red font-docker-one text-xl/none text-white flex items-end justify-center [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)]">
                  Тайное
                </div>
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-4 w-40 h-5 bg-red [clip-path:polygon(0%_0%,100%_0%,90%_100%,10%_100%)]" />
              </>
            ) : (
              <div
                className={cn(
                  "absolute left-0 top-0 w-2 h-full",
                  el === 18
                    ? winItem.rarity === "common"
                      ? "bg-[#a3a5a7]"
                      : winItem.rarity === "uncommon"
                      ? "bg-[#008EFF]"
                      : winItem.rarity === "rare"
                      ? "bg-[#615DFF]"
                      : winItem.rarity === "immortal"
                      ? "bg-[#FAC70E]"
                      : winItem.rarity === "contraband" && "bg-[#fa940e]"
                    : prizes[generatedId].prize.rarity === "common"
                    ? "bg-[#a3a5a7]"
                    : prizes[generatedId].prize.rarity === "uncommon"
                    ? "bg-[#008EFF]"
                    : prizes[generatedId].prize.rarity === "rare"
                    ? "bg-[#615DFF]"
                    : prizes[generatedId].prize.rarity === "immortal"
                    ? "bg-[#FAC70E]"
                    : prizes[generatedId].prize.rarity === "contraband" &&
                      "bg-[#fa940e]"
                )}
              />
            )}

            <img
              src={
                el === 18 ? winItem.image! : prizes[generatedId].prize.image!
              }
              className="w-full h-full"
            />
          </div>
        )
      })}
    </>
  )
}
