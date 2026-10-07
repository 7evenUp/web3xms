import { useRef, useState } from "react"
import { motion } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import ArrowLeft from "@/assets/icons/arrow-left.svg?react"
import ArrowRight from "@/assets/icons/arrow-right.svg?react"

import { cn } from "@/lib/cn"

import { useMediaQuery } from "@/hooks/useMedia"

import {
  IPrizeItem,
  prizesData,
} from "@/pages/Quest/components/Phase3/prizesData"

const Prizes = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  let i = 0
  let j = 0
  let columnNumber = 0
  const prizesList = []
  let column = []
  while (i <= prizesData.length) {
    if (i === prizesData.length) {
      prizesList.push(
        <SwiperSlide
          key={i}
          className="grid grid-rows-[170px_170px_170px] lg:grid-rows-[130px_130px_130px] 2xl:grid-rows-[170px_170px_170px] 3xl:grid-rows-[213px_213px_213px] place-items-start transition-opacity"
          style={{ opacity: activeIndex > columnNumber ? 0 : 1 }}
        >
          {column}
        </SwiperSlide>
      )
      break
    }
    if (j === 3) {
      j = 0
      prizesList.push(
        <SwiperSlide
          key={i}
          className="grid grid-rows-[170px_170px_170px] lg:grid-rows-[130px_130px_130px] 2xl:grid-rows-[170px_170px_170px] 3xl:grid-rows-[213px_213px_213px] place-items-start transition-opacity"
          style={{ opacity: activeIndex > columnNumber ? 0 : 1 }}
        >
          {column}
        </SwiperSlide>
      )
      columnNumber++
      column = []
    }
    column.push(<Prize key={i} {...prizesData[i]} />)
    j++
    i++
  }

  return (
    <section className="bg-gray xl:bg-black p-2.5 2xl:p-[15px] snap-start overflow-hidden">
      <div className="relative bg-black min-h-[800px] phone:min-h-[850px] sm:min-h-[920px] md:min-h-[1004px] lg:min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col lg:justify-center">
        <div className="title-bg absolute top-0" />

        <TextInfo />

        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="flex w-[120px] lg:w-[90px] 2xl:w-[110px] 3xl:w-[140px] ml-5 phone:ml-[9.76vw] lg:ml-[250px] 2xl:ml-[400px]"
          wrapperClass="flex"
        >
          {prizesList}
          {/* {uiData.map((col, i) => (
            <SwiperSlide
              key={i}
              className="grid grid-rows-[170px_170px_170px] lg:grid-rows-[130px_130px_130px] 2xl:grid-rows-[170px_170px_170px] 3xl:grid-rows-[213px_213px_213px] place-items-start transition-opacity"
              style={{ opacity: activeIndex > i ? 0 : 1 }}
            >
              {col.map((el, i) => (
                <Prize key={i} {...el} />
              ))}
            </SwiperSlide>
          ))} */}
        </Swiper>

        <Navigation swiper={swiperRef} />
      </div>
    </section>
  )
}

export default Prizes

const Prize = ({
  amount,
  imgSrc,
  name,
  description,
  rarity,
  link,
}: IPrizeItem) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const swiperRef = useRef<SwiperRef>(null)

  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-fit">
        <div className="relative flex flex-col gap-1 2xl:gap-2 3xl:gap-3">
          <div
            className={cn(
              "absolute left-0 top-0 h-[120px] lg:h-[90px] 2xl:h-[110px] 3xl:h-[140px] w-1 2xl:w-1.5",
              rarity === "common"
                ? "bg-[#D9D9D9]"
                : rarity === "uncommon"
                ? "bg-[#008EFF]"
                : rarity === "rare"
                ? "bg-[#615DFF]"
                : rarity === "legendary"
                ? "bg-[#FF4654]"
                : rarity === "immortal"
                ? "bg-[#FAC70E]"
                : rarity === "contraband" && "bg-[#fa940e]"
            )}
          />
          <div className="absolute left-0 -top-4 2xl:-top-5">
            <div
              className={cn(
                "relative flex justify-center items-center pt-1 pb-1.5 pl-1 pr-2 2xl:pt-1.5 2xl:pb-2 2xl:pl-1.5 2xl:pr-2.5 [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]",
                rarity === "common"
                  ? "bg-[#D9D9D9]"
                  : rarity === "uncommon"
                  ? "bg-[#008EFF]"
                  : rarity === "rare"
                  ? "bg-[#615DFF]"
                  : rarity === "legendary"
                  ? "bg-[#FF4654]"
                  : rarity === "immortal"
                  ? "bg-[#FAC70E]"
                  : rarity === "contraband" && "bg-[#fa940e]"
              )}
            >
              <div className="absolute inset-[3px] bg-black [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]" />
              <span className="relative z-10 px-1 pt-px font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.02em] text-white">
                x{amount}
              </span>
            </div>
          </div>

          <img
            src={imgSrc[0]}
            className="w-[120px] lg:w-[90px] h-[120px] lg:h-[90px] 2xl:w-[110px] 2xl:h-[110px] 3xl:w-[140px] 3xl:h-[140px] bg-gray/50 object-cover"
          />
          <span className="font-circe-bold text-[10px]/none lg:text-[8px]/none 2xl:text-[10px]/none 3xl:text-sm/none tracking-[0.02em] text-white self-start text-left">
            {name}
          </span>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed z-40 inset-0 backdrop-blur-sm" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed z-50 top-[50%] left-[50%] h-[100dvh] sm:h-[240px] md:h-[280px] lg:h-[300px] 2xl:h-[360px] 3xl:h-[442px] w-screen sm:w-[500px] md:w-[600px] lg:w-[640px] 2xl:w-[760px] 3xl:w-[930px] translate-x-[-50%] translate-y-[-50%] focus:outline-none bg-white"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <div className="w-full h-full sm:h-auto flex flex-col-reverse items-center sm:items-stretch justify-center sm:justify-start sm:flex-row gap-6 sm:gap-0 font-circe-bold text-xs/[125%] small-phone:text-sm/[125%] sm:text-xs/[125%] md:text-sm/[125%] 2xl:text-base/[125%] 3xl:text-[20px]/[125%] tracking-[0.02em]">
            <div className="flex shrink-0">
              <div
                className={cn(
                  "w-2 sm:w-4 h-[85vw] small-phone:h-[320px] sm:h-[240px] md:h-[280px] lg:h-[300px] 2xl:h-[360px] 3xl:h-[442px]",
                  rarity === "common"
                    ? "bg-[#D9D9D9]"
                    : rarity === "uncommon"
                    ? "bg-[#008EFF]"
                    : rarity === "rare"
                    ? "bg-[#615DFF]"
                    : rarity === "legendary"
                    ? "bg-[#FF4654]"
                    : rarity === "immortal"
                    ? "bg-[#FAC70E]"
                    : rarity === "contraband" && "bg-[#fa940e]"
                )}
              />

              <Swiper
                ref={swiperRef}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) =>
                  setActivePhotoIndex(swiper.activeIndex)
                }
                className="relative flex w-[85vw] h-[85vw] small-phone:w-[320px] small-phone:h-[320px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] 2xl:w-[360px] 2xl:h-[360px] 3xl:w-[442px] 3xl:h-[442px] overflow-hidden cursor-pointer"
                wrapperClass="flex"
              >
                {imgSrc.map((src, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={src}
                      className="w-[85vw] h-[85vw] small-phone:w-[320px] small-phone:h-[320px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px] 2xl:w-[360px] 2xl:h-[360px] 3xl:w-[442px] 3xl:h-[442px] object-cover"
                    />
                  </SwiperSlide>
                ))}

                {imgSrc.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {imgSrc.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full bg-white transition-transform shadow-[0_0_1px_1px_rgba(0,0,0,0.5)]",
                          activePhotoIndex === i && "scale-150"
                        )}
                        onClick={() => swiperRef.current?.swiper.slideTo(i)}
                      />
                    ))}
                  </div>
                )}
              </Swiper>
            </div>
            <div className="flex flex-col bg-white p-3 small-phone:py-0 small-phone:px-6 sm:p-4 sm:pb-2 2xl:p-6 2xl:pb-4 3xl:p-8 3xl:pb-6">
              <h2 className="font-drukCyr text-2xl/none sm:text-xl/none md:text-[28px]/none 2xl:text-4xl/none 3xl:text-5xl/none tracking-[0.02em] text-black mb-4 2xl:mb-6 3xl:mb-8">
                {name}
              </h2>
              <p className="text-black max-w-[380px] sm:max-w-auto">
                {description}
              </p>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  className="text-xs/none mt-2 underline underline-offset-2"
                >
                  подробнее
                </a>
              )}
              <div
                className={cn(
                  "flex flex-col mt-4 sm:mt-auto",
                  rarity === "common"
                    ? "text-[#a3a5a7]"
                    : rarity === "uncommon"
                    ? "text-[#008EFF]"
                    : rarity === "rare"
                    ? "text-[#615DFF]"
                    : rarity === "legendary"
                    ? "text-[#FF4654]"
                    : rarity === "immortal"
                    ? "text-[#FAC70E]"
                    : rarity === "contraband" && "text-[#fa940e]"
                )}
              >
                <span>
                  Тип:{" "}
                  {rarity === "common"
                    ? "обычное"
                    : rarity === "uncommon"
                    ? "необычное"
                    : rarity === "rare"
                    ? "засекреченное"
                    : rarity === "legendary"
                    ? "тайное"
                    : rarity === "immortal"
                    ? "легендарное"
                    : rarity === "contraband" && "контрабанда"}
                </span>
                <span className="">Всего: {amount} шт.</span>
              </div>
            </div>
          </div>
          <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
            <CloseIcon className="w-6 h-6 sm:w-[36px] sm:h-[36px] 3xl:w-[44px] 3xl:h-[44px]" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Navigation = ({ swiper }: { swiper: React.RefObject<SwiperRef> }) => {
  return (
    <div className="absolute bottom-10 lg:bottom-6 2xl:bottom-10 right-6 lg:right-0 lg:left-[150px] xl:left-[100px] 2xl:left-[400px] flex gap-10 items-center scale-75 2xl:scale-100">
      <button onClick={() => swiper.current?.swiper.slidePrev()}>
        <ArrowLeft className="text-red" />
      </button>
      <button onClick={() => swiper.current?.swiper.slideNext()}>
        <ArrowRight className="text-red" />
      </button>
    </div>
  )
}

const TextInfo = () => {
  const matches = useMediaQuery("xl")
  return (
    <div className="lg:absolute left-8 2xl:left-[44px] top-[140px] 2xl:top-[200px] flex flex-col items-center lg:items-start justify-center mt-[22.46vw] mb-10 lg:m-0">
      <motion.h2
        className="font-paperfiller text-3xl/none sm:text-[54px]/none 2xl:text-[70px]/none 3xl:text-[93px]/[100px] text-red lg:mb-4"
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ delay: 0.1 }}
      >
        Более <br className="hidden lg:block" />
        10,000 <br className="hidden lg:block" />
        подарков
      </motion.h2>
      <motion.p
        className="block lg:hidden font-circe-bold text-sm/none sm:text-base/none lg:text-sm/[90%] 2xl:text-xl/[90%] 3xl:text-[24px]/[90%] tracking-[0.02em] text-gray text-center max-w-[420px] lg:max-w-[200px] 2xl:max-w-[280px] 3xl:max-w-[316px] px-3 sm:px-0"
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ delay: 0.2 }}
      >
        MacBook Air, Sony PlayStation 5, Apple Watch, AirPods 3, JBL Flip 6,
        колонки Яндекс, а также футболки, худи, свитеры, носки, кружки, шарфы и
        неподражаемый muscle car <span className="text-red">Ford Mustang</span>
      </motion.p>
      <motion.p
        className="hidden lg:block font-circe-bold text-sm/[90%] 2xl:text-xl/[90%] 3xl:text-[24px]/[90%] tracking-[0.02em] text-gray max-w-[200px] 2xl:max-w-[280px] 3xl:max-w-[316px]"
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ delay: 0.2 }}
      >
        MacBook Air,
        <br /> Sony PlayStation 5,
        <br /> Apple Watch,
        <br /> AirPods 3,
        <br /> JBL Flip 6,
        <br /> колонки Яндекс,
        <br /> а также футболки, худи, свитеры, носки, кружки, шарфы и
        неподражаемый muscle car <span className="text-red">Ford Mustang</span>
      </motion.p>
    </div>
  )
}
