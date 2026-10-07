import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import TgIcon from "@/assets/icons/telegram-icon.svg?react"
import MailIcon from "@/assets/icons/mail-icon.svg?react"
import WebIcon from "@/assets/icons/web-icon.svg?react"

import RobotImage from "@/assets/images/about-robot.png"
import StarBigImage from "@/assets/images/about-star-big.png"
import StarMdImage from "@/assets/images/about-star-md.png"
import StarsPatternImage from "@/assets/images/about-stars-pattern.png"

import OrderNumber from "./OrderNumber"
import Heading from "./Heading"

import { useMediaQuery } from "@/hooks/useMedia"

const Contacts = () => {
  const imgRef = useRef<HTMLImageElement>(null)

  const matches = useMediaQuery("xl")

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x)
  const springY = useSpring(y)

  const BigTranslateX = useTransform(springX, [-1500, 500], [60, -60])
  const BigTranslateY = useTransform(springY, [-500, 500], [60, -60])
  const MdTranslateX = useTransform(springX, [-1500, 500], [40, -40])
  const MdTranslateY = useTransform(springY, [-500, 500], [40, -40])
  const PatternTranslateX = useTransform(springX, [-1500, 500], [20, -20])
  const PatternTranslateY = useTransform(springY, [-500, 500], [20, -20])

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => {
      if (imgRef.current === null) return

      const { left, top, width, height } =
        imgRef.current.getBoundingClientRect()

      const imgXcenter = left + width / 2
      const imgYcenter = top + height / 2

      const mouseX = event.clientX - imgXcenter
      const mouseY = event.clientY - imgYcenter

      x.set(mouseX)
      y.set(mouseY)
    }

    document.addEventListener("mousemove", handleMouse)

    return () => document.removeEventListener("mousedown", handleMouse)
  }, [])

  return (
    <motion.section
      className="relative w-[90vw] h-[520px] phone:h-[350px] sm:h-[390px] lg:h-[230px] xl:w-[1000px] 2xl:w-[1200px] 2xl:h-[280px] 3xl:w-[1500px] 3xl:h-[350px] flex flex-col justify-between bg-black border-2 2xl:border-[3px] border-gray pt-8 pl-4 sm:pt-4 sm:pl-8 pb-11 pr-8 2xl:pt-5 2xl:pl-12 3xl:pr-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.4, delay: 0.2 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <OrderNumber>5/5</OrderNumber>

      <Heading>Контакты</Heading>

      <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-y-4 2xl:gap-y-6 gap-x-6 2xl:gap-x-9 absolute z-30 top-20 phone:top-auto phone:bottom-4 sm:bottom-8 3xl:bottom-[44px] left-4 sm:left-10 3xl:left-12">
        <Link link="https://crypton.xyz/ru/" icon="web">
          веб-сайт
        </Link>
        <Link link="https://t.me/crypton_adv" icon="tg">
          сотрудничество
        </Link>
        <Link link="https://t.me/HelpXMAS2" icon="tg">
          тех. поддержка
        </Link>
        <Link link="partnership@crypton.xyz" icon="mail">
          по всем вопросам
        </Link>
      </div>

      <img
        ref={imgRef}
        src={RobotImage}
        alt="Громозека"
        className="absolute z-10 bottom-0 right-0 sm:right-4 w-[200px] sm:w-[280px] md:w-[310px] lg:w-[260px] 2xl:w-[320px] 3xl:w-[422px]"
      />
      <motion.img
        style={{
          translateX: matches ? BigTranslateX : 0,
          translateY: matches ? BigTranslateY : 0,
        }}
        src={StarBigImage}
        className="absolute bottom-16 right-[200px] phone:bottom-auto phone:top-[60px] phone:right-[160px] lg:right-[260px] 2xl:right-[350px] 3xl:top-[100px] 3xl:right-[450px] w-[80px] 3xl:w-[104px]"
      />
      <motion.img
        style={{
          translateX: matches ? MdTranslateX : 0,
          translateY: matches ? MdTranslateY : 0,
        }}
        src={StarMdImage}
        className="absolute bottom-40 -right-4 phone:bottom-auto phone:top-[108px] phone:-right-10 w-[70px] 3xl:w-[81px]"
      />
      <motion.img
        style={{
          translateX: matches ? PatternTranslateX : 0,
          translateY: matches ? PatternTranslateY : 0,
        }}
        src={StarsPatternImage}
        className="absolute right-0 bottom-10 phone:bottom-auto phone:top-0 w-[400px] 2xl:w-[480px] 3xl:w-[587px]"
      />
    </motion.section>
  )
}

export default Contacts

const Link = ({
  children,
  link,
  icon,
}: {
  children: React.ReactNode
  link: string
  icon: "tg" | "web" | "mail"
}) => (
  <a
    href={icon === "mail" ? `mailto:${link}` : link}
    target="_blank"
    className="relative group flex items-center h-fit bg-gray text-gray font-docker-one text-xs/none 3xl:text-sm/none tracking-[0.2em] pl-2 pr-5 py-2 2xl:pl-3 2xl:pr-6 3xl:py-3 3xl:pl-4 3xl:pr-7 text-center transition-colors hover:bg-blue hover:text-blue active:bg-blue/80 [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
  >
    <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] absolute inset-[3px] bg-black [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]" />
    <div className="relative flex items-center gap-2 3xl:gap-3">
      {icon === "tg" ? (
        <TgIcon className="w-5 2xl:w-6 3xl:w-7" />
      ) : icon === "mail" ? (
        <MailIcon className="w-5 2xl:w-6 3xl:w-7" />
      ) : (
        <WebIcon className="w-5 2xl:w-6 3xl:w-7" />
      )}
      {children}
    </div>
  </a>
)
