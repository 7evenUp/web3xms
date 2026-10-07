import { useRef, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"

import { cn } from "@/lib/cn"

import { IPrizeItem } from "./prizesData"

const PrizeItem = ({
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
              "absolute left-0 top-0 h-[130px] small-phone:h-[105px] phone:h-[120px] md:h-[110px] 2xl:h-[140px] 3xl:h-[172px] w-1 2xl:w-1.5",
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
            className="w-[130px] h-[130px] small-phone:w-[105px] small-phone:h-[105px] phone:w-[120px] phone:h-[120px] md:w-[110px] md:h-[110px] 2xl:w-[140px] 2xl:h-[140px] 3xl:w-[172px] 3xl:h-[172px] bg-gray/50 object-cover"
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

export default PrizeItem
