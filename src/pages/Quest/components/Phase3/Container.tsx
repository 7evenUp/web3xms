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

import WinDialog from "./WinDialog"
import { generateAnimation } from "./generateAnimation"

import { PrizeResponse } from "@/types/containers"

import styles from "./styles.module.css"

export interface IContainer {
  id: number
  imgSrc: string | null
  xp: number
  rarity: "common" | "rare" | "legendary"
  isReady?: boolean
  prizes: PrizeResponse[]
}

const windowWidthHalf = window.innerWidth / 2

const audio = new Audio(ClickWheelSound)

const Container = ({ imgSrc, xp, rarity, isReady, id, prizes }: IContainer) => {
  const [howl, setHowl] = useState<Howl | null>(null)

  const itemPassedRef = useRef(0)

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [caseAnimationStarted, setCaseAnimationStarted] = useState(false)
  const [animationOpened, setAnimationOpened] = useState(false)
  const [winOpened, setWinOpened] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [wonPrizes, setWonPrizes] = useState<JSX.Element | null>(null)

  const x = useMotionValue(0)
  const scale = useMotionValue(1)

  const [openContainer, { isLoading, data: winData }] =
    useOpenContainerMutation()
  const [refetch] = useRefetchProfileMutation()

  useEffect(() => {
    if (!animationOpened) {
      animate(x, 0)
    }
  }, [animationOpened])

  useEffect(() => {
    const newHowl = new Howl({
      src: OpenClickSound,
      volume: 0.7,
    })

    setHowl(newHowl)

    return () => {
      newHowl.unload()
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        const scrollRefX = scrollRef.current.getBoundingClientRect().x
        const totalTranslateX = windowWidthHalf - scrollRefX
        const itemPassed = Math.floor(totalTranslateX / 282)

        if (itemPassed === itemPassedRef.current) {
          return
        } else {
          audio.play()
          itemPassedRef.current = itemPassed
        }
      }
    }, 16)

    return () => clearInterval(intervalId)
  }, [])

  const openWinDialog = () => {
    refetch()
    setAnimationOpened(false)
    setWinOpened(true)
  }

  const onOpenClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    // animate(scale, 2, { duration: 0.7, ease: "linear" })
    // setCaseAnimationStarted(true)

    // setTimeout(() => {
    //   animate(scale, 1)
    //   setCaseAnimationStarted(false)
    //   const randInt = randomInteger(4810, 5020)
    //   setWonPrizes(generateAnimation(30, prizes[0].prize, prizes))
    //   setAnimationOpened(true)
    //   howl?.play()
    //   animate(x, -randInt, {
    //     duration: 7,
    //     ease: "circOut"
    //   })
    // }, 700)

    if (isLoading) return

    try {
      const winResult = await openContainer({ container_id: id }).unwrap()
      animate(scale, 2, { duration: 0.7, ease: "linear" })
      setCaseAnimationStarted(true)

      setTimeout(() => {
        animate(scale, 1)
        setCaseAnimationStarted(false)
        const randInt = randomInteger(4810, 5020)
        // setWonPrizes(generateAnimation(30, prizes[0].prize, prizes))
        setWonPrizes(generateAnimation(30, winResult.prize, prizes))
        setAnimationOpened(true)
        howl?.play()
        animate(x, -randInt, {
          duration: 7,
          ease: "circOut",
        })
      }, 700)

      const timeId = setTimeout(() => {
        // animate(x, 0)
        refetch()
        setAnimationOpened(false)
        setWinOpened(true)
      }, 7700)

      setTimeoutId(timeId)
    } catch (error) {
      // @ts-expect-error RTKQ-No-Error-Types
      if (error.data.code === "no_more_claim_links") {
        toast.warning("Призы закончились")
      }
      // @ts-expect-error RTKQ-No-Error-Types
      else if (error.data.code === "container_not_found") {
        toast.warning("Контейнер пустой или не существует")
      }
      // @ts-expect-error RTKQ-No-Error-Types
      else if (error.data.code === "zealy_not_linked") {
        toast.warning("Сперва синхронизируйте аккаунт с Zealy")
      }
      // @ts-expect-error RTKQ-No-Error-Types
      else if (error.data.code === "insufficient_balance") {
        toast.warning("Недостаточно XP для открытия кейса")
      }
      // @ts-expect-error RTKQ-No-Error-Types
      else if (error.data.detail === "Not authenticated") {
        toast.warning(
          "Вы не авторизованны. Перезагрузите страницу или войдите в свой аккаунт"
        )
      } else {
        toast.error("Произошла ошибка. Пожалуйста, попробуйте позже")
      }
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
          <Dialog.Root open={animationOpened} onOpenChange={setAnimationOpened}>
            <Dialog.Trigger asChild>
              <button
                className="relative w-44 h-9 2xl:w-52 2xl:h-11 3xl:w-64 3xl:h-[57px] group flex items-center justify-center cursor-pointer"
                onClick={onOpenClick}
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
              <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-[101] top-[50%] left-[50%] max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-md p-6 focus:outline-none flex flex-col items-center gap-6">
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
                  onClick={() => {
                    openWinDialog()
                    if (timeoutId !== null) {
                      clearTimeout(timeoutId)
                    }
                  }}
                >
                  Пропустить
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </div>

      {/* <WinDialog
        open={winOpened}
        onOpenChange={setWinOpened}
        data={{
          link: "123",
          // @ts-expect-error no-more-data-needed
          prize: {
            image: prizes[0].prize.image,
            title: prizes[0].prize.title,
            description: prizes[0].prize.description,
            rarity: prizes[0].prize.rarity,
          },
        }}
      /> */}
      <WinDialog open={winOpened} onOpenChange={setWinOpened} data={winData} />
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
