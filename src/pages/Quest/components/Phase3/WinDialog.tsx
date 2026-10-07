import * as Dialog from "@radix-ui/react-dialog"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"

import { ContainerWonResponse } from "@/types/containers"

import { cn } from "@/lib/cn"

const WinDialog = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: ContainerWonResponse | undefined
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-sm" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed z-50 top-[50%] left-[50%] h-[100dvh] sm:h-[240px] md:h-[280px] lg:h-[300px] 2xl:h-[360px] 3xl:h-[442px] w-screen sm:w-[500px] md:w-[600px] lg:w-[640px] 2xl:w-[760px] 3xl:w-[930px] translate-x-[-50%] translate-y-[-50%] focus:outline-none bg-white"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          {data === undefined ? (
            <>
              <div className="flex items-center justify-center pt-10 font-paperfiller text-3xl">
                Не удалось узнать приз
              </div>
              <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
                <CloseIcon className="w-6 h-6 sm:w-[36px] sm:h-[36px] 3xl:w-[44px] 3xl:h-[44px]" />
              </Dialog.Close>
            </>
          ) : (
            <>
              <div className="w-full h-full sm:h-auto flex flex-col-reverse items-center sm:items-stretch justify-center sm:justify-start sm:flex-row gap-6 sm:gap-0 font-circe-bold text-xs/[125%] small-phone:text-sm/[125%] sm:text-xs/[125%] md:text-sm/[125%] 2xl:text-base/[125%] 3xl:text-[20px]/[125%] tracking-[0.02em]">
                <div className="flex shrink-0">
                  <div
                    className={cn(
                      "w-2 sm:w-4 h-[85vw] small-phone:h-[320px] sm:h-[240px] md:h-[280px] lg:h-[300px] 2xl:h-[360px] 3xl:h-[442px]",
                      data.prize.rarity === "common"
                        ? "bg-[#D9D9D9]"
                        : data.prize.rarity === "uncommon"
                        ? "bg-[#008EFF]"
                        : data.prize.rarity === "rare"
                        ? "bg-[#615DFF]"
                        : data.prize.rarity === "legendary"
                        ? "bg-[#FF4654]"
                        : data.prize.rarity === "immortal"
                        ? "bg-[#FAC70E]"
                        : data.prize.rarity === "contraband" && "bg-[#fa940e]"
                    )}
                  />

                  <img
                    src={data.prize.image!}
                    className="w-[85vw] h-[85vw] small-phone:w-[320px] small-phone:h-[320px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] 2xl:w-[360px] 2xl:h-[360px] 3xl:w-[442px] 3xl:h-[442px] object-cover"
                  />
                </div>
                <div className="flex flex-col bg-white p-3 small-phone:py-0 small-phone:px-6 sm:p-4 sm:pb-2 2xl:p-6 2xl:pb-4 3xl:p-8 3xl:pb-6">
                  <h2
                    className={cn(
                      "font-paperfiller text-2xl/none sm:text-xl/none md:text-[28px]/none 2xl:text-4xl/none 3xl:text-5xl/none mb-1 2xl:mb-3 3xl:mb-5",
                      data.prize.rarity === "common"
                        ? "text-[#D9D9D9]"
                        : data.prize.rarity === "uncommon"
                        ? "text-[#008EFF]"
                        : data.prize.rarity === "rare"
                        ? "text-[#615DFF]"
                        : data.prize.rarity === "legendary"
                        ? "text-[#FF4654]"
                        : data.prize.rarity === "immortal"
                        ? "text-[#FAC70E]"
                        : data.prize.rarity === "contraband" && "text-[#fa940e]"
                    )}
                  >
                    Поздравляем! Вы выиграли:
                  </h2>
                  <h2 className="font-drukCyr text-2xl/none sm:text-xl/none md:text-[28px]/none 2xl:text-4xl/none 3xl:text-5xl/none tracking-[0.02em] text-black mb-4 2xl:mb-6 3xl:mb-8">
                    {data.prize.title}
                  </h2>
                  <p className="text-black max-w-[380px] sm:max-w-auto">
                    {data.prize.description}
                  </p>
                </div>
              </div>
              <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
                <CloseIcon className="w-6 h-6 sm:w-[36px] sm:h-[36px] 3xl:w-[44px] 3xl:h-[44px]" />
              </Dialog.Close>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default WinDialog
