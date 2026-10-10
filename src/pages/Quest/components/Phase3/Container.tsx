import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Lock } from "iconoir-react"
import { motion, useMotionValue, animate } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { Howl } from "howler"
import LoaderIcon from "@/assets/icons/loader.svg?react"
import OpenClickSound from "@/assets/audio/buttonclickrelease.mp3"
import ClickWheelSound from "@/assets/audio/click_wheel.mp3"
import { cn } from "@/lib/cn"
import { useOpenContainerMutation } from "@/redux/api/containers"
import { useRefetchProfileMutation } from "@/redux/api/profile"
import { useAppSelector } from "@/redux/hooks"
import WinDialog from "./WinDialog"
import { generateAnimation } from "./generateAnimation"
import type { PrizeResponse } from "@/types/containers"
import styles from "./styles.module.css"
export interface IContainer {
  id: number; imgSrc: string | null; xp: number;
  rarity: "common" | "rare" | "legendary";
  isReady?: boolean; prizes: PrizeResponse[];
  isBusy?: boolean; onBusyChange?: (busy: boolean) => void;
}
const audio = new Audio(ClickWheelSound)
const Container = ({ imgSrc, xp, rarity, isReady, id, prizes, isBusy, onBusyChange }: IContainer) => {
  const [howl, setHowl] = useState<Howl | null>(null)
  const itemPassedRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const openingRef = useRef(false)
  const mountedRef = useRef(true)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const isSoundOn = useAppSelector((state) => state.sound.isPlaying)
  const soundRef = useRef(isSoundOn)
  const [caseAnimationStarted, setCaseAnimationStarted] = useState(false)
  const [animationOpened, setAnimationOpened] = useState(false)
  const [winOpened, setWinOpened] = useState(false)
  const [wonPrizes, setWonPrizes] = useState<JSX.Element | null>(null)
  const x = useMotionValue(0)
  const scale = useMotionValue(1)
  const [openContainer, { isLoading, data: winData }] = useOpenContainerMutation()
  const [refetch] = useRefetchProfileMutation()
  useEffect(() => { soundRef.current = isSoundOn }, [isSoundOn])
  useEffect(() => {
    mountedRef.current = true
    const newHowl = new Howl({ src: OpenClickSound, volume: 0.7 })
    setHowl(newHowl)
    return () => {
      mountedRef.current = false
      timers.current.forEach(clearTimeout)
      newHowl.unload()
      x.stop()
      scale.stop()
    }
  }, [x, scale])
  useEffect(() => {
    if (!animationOpened) { x.stop(); x.set(0); return }
    const intervalId = setInterval(() => {
      if (!scrollRef.current) return
      const itemPassed = Math.floor((window.innerWidth / 2 - scrollRef.current.getBoundingClientRect().x) / 282)
      if (itemPassed !== itemPassedRef.current) {
        if (soundRef.current) void audio.play().catch(() => {})
        itemPassedRef.current = itemPassed
      }
    }, 16)
    return () => clearInterval(intervalId)
  }, [animationOpened, x])
  const openWinDialog = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    x.stop()
    audio.pause()
    void refetch()
    setAnimationOpened(false)
    setWinOpened(true)
  }
  const onOpenClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (openingRef.current || isLoading || isBusy) return
    openingRef.current = true
    onBusyChange?.(true)
    try {
      const winResult = await openContainer({ container_id: id }).unwrap()
      if (!mountedRef.current) return
      void refetch()
      animate(scale, 2, { duration: 0.7, ease: "linear" })
      setCaseAnimationStarted(true)
      timers.current.push(setTimeout(() => {
        animate(scale, 1)
        setCaseAnimationStarted(false)
        setWonPrizes(generateAnimation(30, winResult.prize, prizes))
        setAnimationOpened(true)
        if (soundRef.current) howl?.play()
        animate(x, -randomInteger(4810, 5020), { duration: 7, ease: "circOut" })
      }, 700))
      timers.current.push(setTimeout(openWinDialog, 7700))
    } catch (error) {
      openingRef.current = false
      onBusyChange?.(false)
      const code = (error as { data?: { code?: string } }).data?.code
      if (code === "insufficient_balance") toast.warning("Недостаточно XP. Нажми «+400 XP» для бесплатного пополнения.")
      else toast.error("Не удалось открыть кейс. Попробуй ещё раз.")
    }
  }
  if (imgSrc === null) return

  return (
    <>
      <div
        className={cn(
          "max-lg:flex-1 flex flex-col items-center",
          rarity === "common"
            ? "text-[#A9A9A9]"
            : rarity === "rare"
            ? "text-[#5D5AF5]"
            : "text-yellow"
        )}
      >
        <motion.img
          style={{ scale }}
          src={imgSrc}
          className={cn(
            "w-full max-phone:max-w-[200px] max-lg:max-w-[240px] lg:w-[240px] 2xl:w-[300px] 3xl:w-[372px] mb-3 2xl:mb-5 3xl:mb-7",
            caseAnimationStarted && styles.shakeContainer
          )}
        />
        <RarityIcon />
        <span className="text-white font-circe-bold text-sm/[90%] 2xl:text-lg/[90%] 3xl:text-2xl/[90%] tracking-[0.02em] mt-1 mb-3 2xl:mb-5 3xl:mt-2 3xl:mb-7">
          {rarity === "common"
            ? "Common"
            : rarity === "rare"
            ? "Rare"
            : "Legendary"}{" "}
          {xp}XP
        </span>
        {!isReady ? (
          <button
            className="relative w-44 h-9 2xl:w-52 2xl:h-11 3xl:w-64 3xl:h-[57px] group flex items-center justify-center cursor-pointer opacity-50"
            disabled={true}
          >
            <svg
              width="260"
              height="62"
              viewBox="0 0 260 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "absolute w-full h-full inset-0",
                rarity === "common"
                  ? "group-hover:fill-[#A9A9A9]"
                  : rarity === "rare"
                  ? "group-hover:fill-[#5D5AF5]"
                  : "group-hover:fill-yellow"
              )}
            >
              <path
                d="M251.514 10.7465L1.83105 2.4375V59.562L258.172 50.2143L251.514 10.7465Z"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <span className="relative text-white font-docker-one text-[10px]/none 2xl:text-sm/none 3xl:text-lg/none tracking-[0.2em]">
              <Lock />
            </span>
          </button>
        ) : (
          <Dialog.Root open={animationOpened} onOpenChange={(open) => { if (!open && animationOpened) openWinDialog() }}>
            <Dialog.Trigger asChild>
              <button
                className="relative w-44 h-9 2xl:w-52 2xl:h-11 3xl:w-64 3xl:h-[57px] group flex items-center justify-center cursor-pointer"
                onClick={onOpenClick}
                disabled={isBusy || isLoading}
                aria-label={"Купить и открыть кейс " + rarity + " за " + xp + " XP"}
              >
                <svg
                  width="260"
                  height="62"
                  viewBox="0 0 260 62"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "absolute w-full h-full inset-0",
                    rarity === "common"
                      ? "group-hover:fill-[#A9A9A9]"
                      : rarity === "rare"
                      ? "group-hover:fill-[#5D5AF5]"
                      : "group-hover:fill-yellow"
                  )}
                >
                  <path
                    d="M251.514 10.7465L1.83105 2.4375V59.562L258.172 50.2143L251.514 10.7465Z"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <span className="relative text-white font-docker-one text-[10px]/none 2xl:text-sm/none 3xl:text-lg/none tracking-[0.2em] flex items-center gap-2">
                  {isLoading && <LoaderIcon className="w-4 h-4 animate-spin" />}
                  Открыть
                </span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed z-[100] inset-0 backdrop-blur-md" />
              <Dialog.Content aria-describedby={undefined} className="data-[state=open]:animate-contentShow fixed z-[101] top-[50%] left-[50%] max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-md p-6 focus:outline-none flex flex-col items-center gap-6">
                <div className="w-full flex justify-center items-center">
                  <Dialog.Title
                    className={cn(
                      "font-paperfiller text-4xl/none phone:text-6xl/none tracking-wider text-yellow drop-shadow-[0_1px_5px_rgba(0,0,0,1)]",
                      styles.shakeHeading
                    )}
                  >
                    Открываем Бокс
                  </Dialog.Title>
                </div>
                <div
                  className={cn(
                    styles.scroller,
                    "w-full phone:overflow-hidden py-9"
                  )}
                >
                  <motion.div
                    style={{ x }}
                    ref={scrollRef}
                    className="flex gap-8 w-fit ml-[50%]"
                  >
                    {wonPrizes && wonPrizes}
                  </motion.div>
                </div>
                <Dialog.Close
                  className="text-white font-docker-one hover:underline underline-offset-4"
                  onClick={openWinDialog}
                >
                  Пропустить
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </div>

      <WinDialog open={winOpened} onOpenChange={(open) => { setWinOpened(open); if (!open) { openingRef.current = false; onBusyChange?.(false) } }} data={winData} />
    </>
  )
}

export default Container

const RarityIcon = () => (
  <svg
    width="38"
    height="40"
    viewBox="0 0 38 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="scale-[80%] 2xl:scale-90 3xl:scale-100"
  >
    <path
      d="M10.9095 20.7042L12.4158 14.4294L18.5448 11.482L23.6393 12.4764L27.1667 16.3824V20.7042L25.6702 25.822L20.665 28.4851L13.8966 26.6628L10.9095 20.7042Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8341 0.832031L4.07707 7.44778L0.666748 21.6537L7.39396 35.0729L22.5944 39.1654L33.9953 33.0993L37.3334 21.6832V11.9426L29.3254 3.07495L17.8341 0.832031ZM6.34795 9.32595L18.1844 3.63381L27.9672 5.54325L34.689 12.9867V21.2933L31.7781 31.2484L22.2779 36.3031L9.21459 32.786L3.46794 21.3228L6.34795 9.32595Z"
      fill="currentColor"
    />
  </svg>
)

const randomInteger = (min: number, max: number) => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
