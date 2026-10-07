import { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  usePresence,
} from "framer-motion"

import SliderAccessory from "@/assets/svgs/slider-accessory.svg?react"
import SliderAccessorySm from "@/assets/svgs/slider-accessory-sm.svg?react"

import ArrowLeft from "@/assets/icons/arrow-left.svg?react"
import ArrowRight from "@/assets/icons/arrow-right.svg?react"

import { cn } from "@/lib/cn"

import "./Introduction.css"

const SLIDER_SHOW_TIME = 15

const Introduction = () => {
  const [activeSlide, setActiveSlide] = useState<1 | 2>(1)
  const [isFirstRemoved, setIsFirstRemoved] = useState<boolean>(false)
  const [isSecondRemoved, setIsSecondRemoved] = useState<boolean>(true)
  const [timer, setTimer] = useState(0)

  const controls = useAnimationControls()

  useEffect(() => {
    const intervalId = setInterval(function () {
      if (timer + 1 >= SLIDER_SHOW_TIME) {
        if (activeSlide === 1) setActiveSlide(2)
        else setActiveSlide(1)

        controls.start({
          x: [0, 100, 0],
          opacity: [1, 0, 1],
          transition: { duration: 0.8, times: [0, 0.5, 1], type: "keyframes" },
        })

        setTimer(0)
      } else {
        setTimer(timer + 1)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timer, activeSlide])

  const onPrevClick = () => {
    if (activeSlide === 1) setActiveSlide(2)
    else setActiveSlide(1)
    controls.start({
      x: [0, 100, 0],
      opacity: [1, 0, 1],
      transition: { duration: 0.8, times: [0, 0.5, 1], type: "keyframes" },
    })
    setTimer(0)
  }

  const onNextClick = () => {
    if (activeSlide === 1) setActiveSlide(2)
    else setActiveSlide(1)
    controls.start({
      x: [0, 100, 0],
      opacity: [1, 0, 1],
      transition: { duration: 0.8, times: [0, 0.5, 1], type: "keyframes" },
    })
    setTimer(0)
  }

  const removeFirst = () => {
    setIsFirstRemoved(true)
    setIsSecondRemoved(false)
  }

  const removeSecond = () => {
    setIsFirstRemoved(false)
    setIsSecondRemoved(true)
  }

  return (
    <section className="bg-gray xl:bg-black p-2.5 2xl:p-[15px] snap-start overflow-hidden">
      <div className="relative bg-black min-h-[510px] phone:min-h-[660px] sm:min-h-[1004px] xl:min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col justify-start xl:justify-center">
        <div className="title-bg absolute top-0" />
        <motion.svg
          initial={{ opacity: 1, x: 0 }}
          animate={controls}
          width="657"
          height="476"
          viewBox="0 0 657 476"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden sm:block absolute -right-10 lg:right-0 -bottom-5 xl:bottom-0 w-[400px] lg:w-[460px] 2xl:w-[550px] 3xl:w-[34.21vw] 3xl:h-auto 2xl:top-[13%] 3xl:top-[18%]"
        >
          <path
            d="M662 22.5L662 287L662 473.715H161.881L1.97778 292.828L36.2477 3.04272L126.487 45.5021L662 22.5Z"
            stroke="#FF4654"
            strokeWidth="3"
          />
        </motion.svg>

        <div className="absolute left-9 md:left-[50px] 2xl:left-[70px] 3xl:left-[90px] top-[11%] sm:top-[30%] xl:top-1/2 -translate-y-1/2">
          <ArrowLeft
            className="w-3 h-[26px] sm:w-4 sm:h-[38px] 2xl:w-6 2xl:h-[45px] absolute -left-2.5 2xl:-left-5 -translate-x-full top-[5px] 2xl:top-[12px] cursor-pointer transition-all hover:opacity-70 text-red"
            onClick={onPrevClick}
          />
          <ArrowRight
            className="w-3 h-5 sm:w-4 sm:h-[30px] 2xl:w-[23px] 2xl:h-[39px] absolute -right-3 2xl:-right-[17px] translate-x-full top-2 2xl:top-[15px] cursor-pointer transition-all hover:opacity-70 text-red"
            onClick={onNextClick}
          />
          <div className="w-[30px] h-[60px] sm:h-[74px] 2xl:w-[42px] 2xl:h-[100px] relative">
            <span
              className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2",
                activeSlide === 1
                  ? "font-drukCyr text-[30px]/none sm:text-[42px]/none 2xl:text-[60px]/none text-red"
                  : "hidden sm:block font-circe-bold text-sm/[125%] 2xl:text-xl/[125%] text-gray top-auto bottom-0"
              )}
            >
              01
            </span>
            <div className="absolute top-9 sm:top-12 2xl:top-16 left-1/2 -translate-x-1/2 w-8 h-0.5 2xl:w-10 2xl:h-[3px]">
              <div className="absolute bg-gray w-full h-full" />
              <div
                key={activeSlide}
                className="absolute bg-red h-full intro-progression"
              />
            </div>
            <span
              className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2",
                activeSlide === 2
                  ? "font-drukCyr text-[30px]/none sm:text-[42px]/none 2xl:text-[60px]/none text-red top-0 bottom-auto"
                  : "hidden sm:block font-circe-bold text-sm/[125%] 2xl:text-xl/[125%] text-gray"
              )}
            >
              02
            </span>
          </div>
        </div>

        <AnimatePresence>
          {activeSlide === 1 && isSecondRemoved && (
            <SecondSlide key="second-slide" removeFromTree={removeFirst} />
          )}
          {activeSlide === 2 && isFirstRemoved && (
            <FirstSlide key="first-slide" removeFromTree={removeSecond} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Introduction

const FirstSlide = ({ removeFromTree }: { removeFromTree: () => void }) => {
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    !isPresent &&
      setTimeout(() => {
        safeToRemove()
        removeFromTree()
      }, 500)
  }, [isPresent])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative flex flex-col ml-6 phone:ml-10 sm:ml-[140px] md:ml-[170px] 2xl:ml-[253px] mt-[110px] phone:mt-[145px] xl:mt-[60px]">
        <SliderAccessorySm className="phone:hidden absolute top-0 -left-5" />

        <div className="relative">
          <SliderAccessory className="hidden phone:block absolute h-full -left-8 md:-left-12 2xl:-left-[62px] top-0" />
          <div className="relative flex flex-col phone:flex-row justify-between gap-2 phone:gap-0 max-w-[600px] 2xl:max-w-[680px] 3xl:max-w-[900px] mr-3 sm:mr-6 lg:mr-0 pt-4 2xl:pt-6 pb-4 2xl:pb-8 pl-1 phone:pl-4 2xl:pl-8 pr-6 sm:pr-14 2xl:pr-[20px] 3xl:pr-[100px] bg-red [clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)]">
            <div className="flex flex-col items-center gap-1 phone:gap-8">
              <p className="font-circe-bold text-xs/[125%] sm:text-sm/[125%] 2xl:text-lg/[125%] 3xl:text-[20px]/[125%] tracking-[0.02em] text-center text-white max-w-[260px] 2xl:max-w-[320px] 3xl:max-w-[366px]">
                WEB2. Интернет соцсетей, данные принадлежат корпорациям
              </p>
              <img
                src="/images/slide-1-1.png"
                className="w-[100px] phone:w-[190px] 2xl:w-[260px] 3xl:w-[360px] hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex flex-col items-center gap-1 phone:gap-8">
              <p className="font-circe-bold text-xs/[125%] sm:text-sm/[125%] 2xl:text-lg/[125%] 3xl:text-[20px]/[125%] tracking-[0.02em] text-center text-white max-w-[260px] 2xl:max-w-[320px] 3xl:max-w-[366px]">
                WEB3. Все данные и контент принадлежат создателям
              </p>
              <img
                src="/images/slide-1-2.png"
                className="w-[100px] phone:w-[130px] sm:w-[150px] 2xl:w-[200px] 3xl:w-[300px] sm:mt-3 hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>

        <h2 className="font-drukCyr text-[22px]/none phone:text-4xl/none 2xl:text-5xl/none 3xl:text-[60px]/none tracking-wider text-red mt-3 mb-2 ml-0 md:ml-4 2xl:mt-6 2xl:mb-3 2xl:ml-8">
          WEB3
        </h2>

        <p className="font-circe-regular leading-[90%] text-base/[90%] phone:text-lg/[90%] 2xl:text-[24px] 3xl:text-[30px] text-red max-w-[250px] phone:max-w-[270px] md:max-w-[360px] 2xl:max-w-[540px] 3xl:max-w-[688px] ml-0 md:ml-4 2xl:ml-8">
          это новая ветвь развития интернета, основанная на технологиях
          блокчейна
        </p>
      </div>

      <img
        src="/images/girl-illustration.png"
        className="hidden sm:block absolute -right-10 lg:right-0 xl:right-[120px] -bottom-[15px] w-[150px] sm:w-[290px] lg:w-[310px] 3xl:w-[16.145vw]"
      />
      <img
        src="/images/girl-sm.png"
        className="absolute sm:hidden -right-5 phone:right-0 bottom-0 w-[150px] phone:w-[200px]"
      />
    </motion.div>
  )
}

const SecondSlide = ({ removeFromTree }: { removeFromTree: () => void }) => {
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    !isPresent &&
      setTimeout(() => {
        safeToRemove()
        removeFromTree()
      }, 500)
  }, [isPresent])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative flex flex-col ml-6 sm:ml-[170px] 2xl:ml-[253px] mt-20 sm:mt-[60px] pr-4 phone:pr-0">
        <SliderAccessorySm className="phone:hidden absolute top-10 -left-4" />
        <img
          src="/images/slide-2-image.png"
          className="w-[390px] sm:w-[550px] 2xl:w-[680px] 3xl:w-[850px] sm:-ml-12 sm:mt-5 md:mt-0"
        />
        <div className="relative mt-2 2xl:mt-4 3xl:mt-6 mb-2 2xl:mb-3 md:ml-0 3xl:ml-8">
          <h2 className="font-drukCyr leading-none text-[22px] phone:text-[36px] 2xl:text-[48px] 3xl:text-[60px] tracking-wider text-red ml-2 phone:ml-4 sm:-ml-7 md:ml-0">
            WEB3 Christmas
          </h2>
          <SliderAccessory className="hidden phone:block absolute h-[200px] sm:h-[32.55vw] md:h-[250px] 2xl:h-[330px] 3xl:h-[410px] left-3 sm:-left-8 3xl:-left-[62px] -top-2 sm:-top-6 -translate-x-full -translate-y-full" />
        </div>
        <p className="font-circe-regular text-base/[90%] phone:text-lg/[90%] xl:text-sm/[90%] 2xl:text-xl/[90%] 3xl:text-[26px]/[90%] text-red max-w-[400px] lg:max-w-[500px] 2xl:max-w-[720px] 3xl:max-w-[800px] mb-2 phone:mb-1 2xl:mb-2 3xl:mb-1 ml-2 phone:ml-4 sm:-ml-7 md:ml-0 3xl:ml-8">
          это ежегодное праздничное мероприятие, цель которого познакомить вас с
          удивительным миром WEB3 и блокчейн технологиями
        </p>
        <p className="font-circe-bold text-sm/none phone:text-base/none xl:text-xs/none 2xl:text-base/none 3xl:text-lg/none text-gray max-w-[300px] md:max-w-[360px] lg:max-w-[550px] 2xl:max-w-[720px] 3xl:max-w-[800px] ml-2 phone:ml-4 sm:-ml-7 md:ml-0 3xl:ml-8">
          Крупные криптомедиа и лидирующие бренды отрасли объединились, чтобы
          создать праздничное настроение, подарить эмоции и щедрые подарки
          участникам в канун Нового Года и Рождества!
        </p>
      </div>
      <img
        src="/images/tree-illustration.png"
        className="hidden sm:block absolute -right-16 lg:right-0 xl:right-[120px] -bottom-[15px] w-[360px] md:w-[411px] 2xl:w-[470px] 3xl:w-[31.25vw]"
      />
    </motion.div>
  )
}
