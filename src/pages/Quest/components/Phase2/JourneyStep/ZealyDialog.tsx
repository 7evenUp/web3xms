import * as Dialog from "@radix-ui/react-dialog"

import PuzzleIcon from "@/assets/icons/puzzle-icon.svg?react"
import CloseIcon from "@/assets/icons/close-dialog.svg?react"

import ZealyLogo from "@/assets/logos/zealy-logo.png"

import { cn } from "@/lib/cn"

const ZealyDialog = ({
  // link,
  accentColor,
}: {
  // link: string
  accentColor?: string
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="relative group flex items-center w-fit h-fit bg-white text-white font-docker-one text-[10px]/none 2xl:text-xs/none 3xl:text-sm/none tracking-[0.2em] pl-2 pr-3 py-0.5 2xl:py-1.5 2xl:pl-3 2xl:pr-6 3xl:py-2 3xl:pl-3 3xl:pr-8 text-center transition-colors hover:text-black [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]">
          <div
            className={cn(
              "w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] group-hover:bg-white bg-[#CAAC3D] [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] transition-colors",
              accentColor === "red" && "bg-red",
              accentColor === "green" && "bg-[#388863]",
              accentColor === "violet" && "bg-[#664DBB]",
              accentColor === "cyan" && "bg-[#1D9CAD]",
              accentColor === "gold" && "bg-[#99790D]",
              accentColor === "blue" && "bg-[#046BB3]",
              accentColor === "purple" && "bg-[#B766E5]",
              accentColor === "burgundy" && "bg-[#9E3233]"
            )}
          />
          <div className="relative flex items-center gap-2 2xl:gap-3 3xl:gap-4">
            <PuzzleIcon className="w-5 2xl:w-6 3xl:w-7" />К заданиям
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed z-40 inset-0 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-50 top-[50%] left-[50%] h-[100dvh] w-screen phone:h-[328px] phone:w-[470px] translate-x-[-50%] translate-y-[-50%] focus:outline-none bg-white text-black flex flex-col">
          <div className="flex flex-col gap-5 p-6 phone:p-10">
            <img src={ZealyLogo} className="w-10 phone:w-[66px]" />
            <h3 className="font-circe-bold text-xl/[125%] tracking-[0.02em]">
              Вы переходите на площадку Zealy для выполнения квеста WEB3XMAS.
            </h3>
            <p className="font-circe-bold text-sm/[125%] tracking-[0.02em] text-red">
              Важно: для участия потребуется регистрация на платформе Zealy по
              той же почте, что и на WEB3XMS (для успешной синхронизации XP)!
            </p>
            <div className="flex items-center justify-between">
              <a
                href="https://zealy.io/c/web3xms/invite/zo1xuBEKo-pfk3vxeVZ7l"
                target="_blank"
                className="relative group flex justify-center items-center w-32 h-9 phone:w-44 phone:h-11 bg-red text-red font-docker-one text-xs/none phone:text-sm/none tracking-[0.2em] text-center transition-colors hover:text-white [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
              >
                <div
                  className={cn(
                    "w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] group-hover:bg-red bg-white [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] transition-colors"
                  )}
                />
                <span className="relative">Перейти</span>
              </a>
              <Dialog.Close>
                <button className="relative group flex justify-center items-center w-32 h-9 phone:w-44 phone:h-11 bg-red text-red font-docker-one text-xs/none phone:text-sm/none tracking-[0.2em] text-center transition-colors hover:text-white [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]">
                  <div
                    className={cn(
                      "w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] group-hover:bg-red bg-white [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] transition-colors"
                    )}
                  />
                  <span className="relative">остаться</span>
                </button>
              </Dialog.Close>
            </div>
          </div>

          <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
            <CloseIcon className="w-6 sm:w-[36px] 3xl:w-[44px]" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ZealyDialog
