import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import PlanetImage from "@/assets/images/phase-1-planet.png"
import BigStarImage from "@/assets/images/phase-1-big-star.png"
import MdStarImage from "@/assets/images/phase-1-md-star.png"
import SmStarImage1 from "@/assets/images/phase-1-sm-star-1.png"
import SmStarImage2 from "@/assets/images/phase-1-sm-star-2.png"
import SmStarImage3 from "@/assets/images/phase-1-sm-star-3.png"
import ButtonBorder from "@/assets/svgs/phase-1-btn-border.svg?react"
import { useMediaQuery } from "@/hooks/useMedia"
import Profile from "@/components/Profile"
import Tabs from "../Tabs"
import SoundPlayer from "../Phase2/SoundPlayer"
import soundtrack from "@/assets/audio/new-year.mp3"
import "./styles.css"
const Phase1 = () => (
  <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
    <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col quest-space-bg pb-96 sm:pb-80 lg:pb-24">
      <Tabs />
      <Profile />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center mt-[285px] lg:mt-52 2xl:mt-60 px-4"
      >
        <h1 className="font-paperfiller text-5xl phone:text-7xl 2xl:text-8xl text-yellow text-center">
          Рождественское путешествие
        </h1>
        <p className="font-circe-bold text-white text-center max-w-lg my-6">
          Добро пожаловать в демо WEB3 X-MAS! Читай истории, выполняй задания,
          покупай кейсы за XP и открывай подарки. На старте у тебя 1000 XP, а
          пополнить баланс можно бесплатно.
        </p>
        <SoundPlayer accentColor="red" soundSrc={soundtrack} />
        <Link
          to="/quest/phase-2"
          className="group relative w-[260px] small-phone:w-[380px] h-[48px] text-white hover:text-black flex justify-center items-center mt-6"
        >
          <ButtonBorder className="w-full h-full absolute inset-0 stroke-yellow group-hover:fill-yellow" />
          <span className="relative z-10 font-docker-one text-xs tracking-[0.2em]">
            Начать квест
          </span>
        </Link>
        <Link
          to="/quest/phase-3"
          className="font-circe-bold text-white underline underline-offset-4 mt-5"
        >
          Сразу открыть кейсы
        </Link>
      </motion.div>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={PlanetImage}
        className="w-[530px] bottom-8 small-phone:-bottom-4 sm:w-[61.52vw] lg:w-[34.375vw] absolute left-0 sm:bottom-0"
      />
      <Stars />
    </div>
  </section>
)
const halfWindowX = window.innerWidth / 2
const halfWindowY = window.innerHeight / 2

const Stars = () => {
  const matches = useMediaQuery("xl")

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x)
  const springY = useSpring(y)

  const BigTranslateX = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [-10, 10],
  )
  const BigTranslateY = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [-10, 10],
  )

  const MdTranslateX1 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [20, -20],
  )
  const MdTranslateY1 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [20, -20],
  )
  const MdTranslateX2 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [-20, 20],
  )
  const MdTranslateY2 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [-20, 20],
  )

  const SmTranslateX1 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [10, -10],
  )
  const SmTranslateY1 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [30, -30],
  )
  const SmTranslateX2 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [20, -20],
  )
  const SmTranslateY2 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [40, -40],
  )
  const SmTranslateX3 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [40, -40],
  )
  const SmTranslateY3 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [20, -20],
  )

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => {
      const mouseX = event.clientX - halfWindowX
      const mouseY = event.clientY - halfWindowY

      x.set(mouseX)
      y.set(mouseY)
    }

    document.addEventListener("mousemove", handleMouse)

    return () => document.removeEventListener("mousemove", handleMouse)
  }, [x, y])

  return (
    <>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        style={{
          translateX: matches ? BigTranslateX : 0,
          translateY: matches ? BigTranslateY : 0,
        }}
        src={BigStarImage}
        className="hidden small-phone:block absolute -right-24 sm:-right-[120px] lg:-right-[180px] 3xl:-right-[260px] top-16 sm:top-60 md:top-20 w-[160px] sm:w-[220px] md:w-[250px] lg:w-[360px] 2xl:w-[450px] 3xl:w-[593px] extra:w-[28.64583vw]"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{
          translateX: matches ? MdTranslateX1 : 0,
          translateY: matches ? MdTranslateY1 : 0,
        }}
        src={MdStarImage}
        className="absolute right-0 sm:right-40 md:right-60 3xl:right-[320px] -bottom-24 sm:-bottom-20 2xl:-bottom-16 3xl:-bottom-[110px] w-[210px] 2xl:w-[250px] 3xl:w-[306px]"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        style={{
          translateX: matches ? MdTranslateX2 : 0,
          translateY: matches ? MdTranslateY2 : 0,
        }}
        src={MdStarImage}
        className="absolute left-[24vw] sm:left-[11vw] md:left-[29.29vw] lg:left-[300px] 3xl:left-[380px] -top-12 sm:-top-16 md:-top-20 lg:-top-[100px] 3xl:-top-[150px] w-[130px] md:w-[160px] lg:w-[210px] 2xl:w-[250px] 3xl:w-[306px]"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        style={{
          translateX: matches ? SmTranslateX1 : 0,
          translateY: matches ? SmTranslateY1 : 0,
        }}
        src={SmStarImage1}
        className="absolute left-[70vw] sm:left-[16.6vw] lg:left-[250px] 3xl:left-[300px] top-[230px] sm:top-[220px] lg:top-[260px] 2xl:top-[344px] w-[50px] md:w-[70px] 2xl:w-[110px] 3xl:w-[148px]"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.75 }}
        style={{
          translateX: matches ? SmTranslateX2 : 0,
          translateY: matches ? SmTranslateY2 : 0,
        }}
        src={SmStarImage2}
        className="absolute left-[6.25vw] lg:left-16 top-[280px] lg:top-[320px] 2xl:top-[400px] 3xl:top-[560px] w-[40px] md:w-[60px] 2xl:w-[90px] 3xl:w-[114px]"
      />
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.15 }}
        style={{
          translateX: matches ? SmTranslateX3 : 0,
          translateY: matches ? SmTranslateY3 : 0,
        }}
        src={SmStarImage3}
        className="absolute left-[6.83vw] top-[240px] sm:top-[180px] lg:left-[70px] lg:top-[210px] 2xl:top-[290px] w-[40px] md:w-[56px] 2xl:w-[86px] 3xl:w-[110px]"
      />
    </>
  )
}

export default Phase1
