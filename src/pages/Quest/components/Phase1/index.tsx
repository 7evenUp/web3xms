import { useEffect, useState } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import PlanetImage from "@/assets/images/phase-1-planet.png"
import BigStarImage from "@/assets/images/phase-1-big-star.png"
import MdStarImage from "@/assets/images/phase-1-md-star.png"
import SmStarImage1 from "@/assets/images/phase-1-sm-star-1.png"
import SmStarImage2 from "@/assets/images/phase-1-sm-star-2.png"
import SmStarImage3 from "@/assets/images/phase-1-sm-star-3.png"

import ButtonBorder from "@/assets/svgs/phase-1-btn-border.svg?react"
import ButtonBorderTg from "@/assets/svgs/phase-1-btn-border-tg.svg?react"
import TgButtonIcon from "@/assets/svgs/tg-btn-icon.svg?react"

import { useProfileQuery } from "@/redux/api/profile"

import Profile from "@/components/Profile"

import { useMediaQuery } from "@/hooks/useMedia"

import Tabs from "../Tabs"
// import Countdown from "./Countdown"

import "./styles.css"
import AuthModal from "@/components/Profile/AuthModal"
import { Link } from "react-router-dom"
import FormDialog from "../Inventory/FormDialog"
import { useCheckIdTokenQuery } from "@/redux/api/auth"

const Phase1 = () => {
  const { isSuccess } = useProfileQuery()
  const [youtubeReady, setYoutubeReady] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { isSuccess: isTokenSuccess } = useCheckIdTokenQuery()

  const matchesExtra = useMediaQuery("extra")
  const matches3Xl = useMediaQuery("3xl")
  const matches2Xl = useMediaQuery("2xl")
  const matches = useMediaQuery("phone")
  const matchesSm = useMediaQuery("sm-phone")

  const youtubeOptions = {
    width: matchesExtra
      ? "640"
      : matches3Xl
      ? "560"
      : matches2Xl
      ? "480"
      : matches
      ? "352"
      : matchesSm
      ? "320"
      : "272",
    height: matchesExtra
      ? "360"
      : matches3Xl
      ? "315"
      : matches2Xl
      ? "270"
      : matches
      ? "198"
      : matchesSm
      ? "180"
      : "153",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // https://developers.google.com/youtube/iframe_api_reference?hl=ru
    event.target.setVolume(0)
    event.target.playVideo()
    setTimeout(() => {
      setYoutubeReady(true)
    }, 750)
  }

  return (
    <>
      <AuthModal dialogOpen={dialogOpen} onOpenChange={setDialogOpen} />
      <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
        <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col quest-space-bg pb-96 sm:pb-80 lg:pb-0">
          <Tabs />
          <Profile />

          {isSuccess && isTokenSuccess && <FormDialog />}

          <div className="relative z-10 flex flex-col items-center mt-[270px] lg:mt-36 2xl:mt-44 3xl:mt-[12.5vw]">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{
                opacity: youtubeReady ? 1 : 0,
                y: youtubeReady ? 0 : -30,
              }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center w-[300px] h-[180px] small-phone:w-[360px] small-phone:h-[210px] phone:w-[400px] phone:h-[220px] 2xl:w-[550px] 2xl:h-[300px] 3xl:w-[640px] 3xl:h-[350px] extra:w-[740px] extra:h-[400px] [clip-path:polygon(0_4%,100%_0,98%_99%,4%_100%)] bg-red mb-4 2xl:mb-5 3xl:mb-6 extra:mb-8"
            >
              <YouTube
                videoId="bLhCJt1uqZs"
                opts={youtubeOptions}
                onReady={onPlayerReady}
              />
            </motion.div>
            {/* <motion.h2
              className="font-paperfiller text-[40px]/none small-phone:text-[50px]/none phone:text-[70px]/none sm:text-[90px]/none 2xl:text-[110px]/none 3xl:text-[140px]/none extra:text-[5.729vw]/none -tracking-[0.03em] text-yellow my-4 phone:my-0"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Забери Ford Mustang
            </motion.h2>
            <motion.p
              className="font-circe-bold text-base phone:text-lg/5 2xl:text-2xl 3xl:text-3xl extra:text-[1.45vw]/none tracking-wide text-white text-center mb-2 2xl:mb-3 3xl:mb-5"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              или до 4 из 70,000 подарков на $300,000
            </motion.p> */}
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <Link
                  to="/quest/phase-2"
                  className="group relative w-[260px] small-phone:w-[380px] h-[40px] 2xl:w-[450px] 2xl:h-[48px] 3xl:w-[510px] 3xl:h-[57px] text-white hover:text-black flex justify-center items-center mb-2 small-phone:mb-3 3xl:mb-4"
                >
                  <ButtonBorder className="w-full h-full absolute inset-0 stroke-yellow group-hover:fill-yellow" />
                  <span className="relative z-10 font-docker-one text-[10px]/none small-phone:text-xs/none 2xl:text-sm/none 3xl:text-lg/none tracking-[0.2em] mt-1">
                    Начать квест
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.button
                className="group relative w-[260px] small-phone:w-[380px] h-[40px] 2xl:w-[450px] 2xl:h-[48px] 3xl:w-[510px] 3xl:h-[57px] extra:w-[26.5625vw] extra:h-[2.96875vw] text-white hover:text-black flex justify-center items-center mb-2 small-phone:mb-3 3xl:mb-4"
                // onClick={onAuthClick}
                onClick={() => setDialogOpen(true)}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <ButtonBorder className="w-full h-full absolute inset-0 stroke-yellow group-hover:fill-yellow" />
                <span className="relative z-10 font-docker-one text-[10px]/none small-phone:text-xs/none 2xl:text-sm/none 3xl:text-lg/none extra:text-[0.9375vw]/none tracking-[0.2em] mt-1 extra:mt-[0.2vw]">
                  Войти / зарегистрироваться
                </span>
              </motion.button>
            )}
            <motion.a
              href="https://t.me/+QqdwO76YcwFmZmVi"
              target="_blank"
              className="group relative w-[260px] small-phone:w-[380px] h-[40px] 2xl:w-[450px] 2xl:h-[52px] 3xl:w-[422px] 3xl:h-[62px] text-white hover:text-black flex justify-center items-center mt-3"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ButtonBorderTg className="w-full h-full absolute inset-0 stroke-white group-hover:fill-white" />
              <div className="relative z-10 font-docker-one text-[10px]/none small-phone:text-xs/none 2xl:text-sm/none 3xl:text-lg/none tracking-[0.2em] flex items-center gap-0 2xl:gap-3">
                <span>чат ивента в tg</span>
              </div>
            </motion.a>
            <motion.a
              href="https://t.me/santagryazin_bot?start=start"
              target="_blank"
              className="group relative w-[260px] small-phone:w-[380px] h-[40px] 2xl:w-[450px] 2xl:h-[52px] 3xl:w-[422px] 3xl:h-[62px] text-white flex justify-center items-center mt-3"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <ButtonBorderTg className="w-full h-full absolute inset-0 stroke-red group-hover:fill-red/50" />
              <div className="relative z-10 font-docker-one text-[10px]/none small-phone:text-xs/none 2xl:text-sm/none 3xl:text-lg/none tracking-[0.2em] flex items-center 2xl:-mt-1 gap-0 2xl:gap-3 -ml-4 3xl:ml-0">
                <TgButtonIcon className="scale-[60%] 2xl:scale-[80%] 3xl:scale-100" />
                <span>бот-помощник в tg</span>
              </div>
            </motion.a>
          </div>

          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.45 }}
            src={PlanetImage}
            className="w-[530px] bottom-8 small-phone:-bottom-4 sm:w-[61.52vw] lg:w-[34.375vw] xl:w-[440px] 2xl:w-[480px] 3xl:w-[630px] extra:w-[32.8125vw] absolute left-0 sm:bottom-0"
          />

          {/* <Countdown /> */}

          <Stars />
        </div>
      </section>
    </>
  )
}

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
    [-10, 10]
  )
  const BigTranslateY = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [-10, 10]
  )

  const MdTranslateX1 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [20, -20]
  )
  const MdTranslateY1 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [20, -20]
  )
  const MdTranslateX2 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [-20, 20]
  )
  const MdTranslateY2 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [-20, 20]
  )

  const SmTranslateX1 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [10, -10]
  )
  const SmTranslateY1 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [30, -30]
  )
  const SmTranslateX2 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [20, -20]
  )
  const SmTranslateY2 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [40, -40]
  )
  const SmTranslateX3 = useTransform(
    springX,
    [-halfWindowX, halfWindowX],
    [40, -40]
  )
  const SmTranslateY3 = useTransform(
    springY,
    [-halfWindowY, halfWindowY],
    [20, -20]
  )

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => {
      const mouseX = event.clientX - halfWindowX
      const mouseY = event.clientY - halfWindowY

      x.set(mouseX)
      y.set(mouseY)
    }

    document.addEventListener("mousemove", handleMouse)

    return () => document.removeEventListener("mousedown", handleMouse)
  }, [])

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
