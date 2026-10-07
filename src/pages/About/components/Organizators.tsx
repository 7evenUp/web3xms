import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import WikiLogo from "@/assets/logos/wiki-logo.svg?react"
import CryptonLogo from "@/assets/logos/crypton-logo.svg?react"

import InformationBlock from "./InformationBlock"
import SelectedOutline from "./SelectedOutline"
import OrderNumber from "./OrderNumber"
import Heading from "./Heading"

const Organizators = () => {
  const [activeItem, setActiveItem] = useState<"crypton" | "wiki">("crypton")

  return (
    <motion.section
      className="relative w-[90vw] h-[350px] small-phone:h-[330px] sm:h-[310px] lg:h-[230px] xl:w-[1000px] 2xl:w-[1200px] 2xl:h-[280px] 3xl:w-[1500px] 3xl:h-[350px] flex flex-col justify-between bg-black border-2 2xl:border-[3px] border-gray  pt-8 pl-4 sm:pt-4 sm:pl-8 pb-11 pr-10 2xl:pt-5 2xl:pl-12 3xl:pr-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.4 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <OrderNumber>1/5</OrderNumber>

      <div className="flex flex-col lg:flex-row items-start justify-between">
        <Heading>Организаторы</Heading>

        <div className="flex items-center gap-8 sm:gap-16 lg:gap-8 2xl:gap-12 3xl:gap-16 sm:mt-2 3xl:mt-4 ml-4 lg:ml-0">
          <button
            className="group relative"
            onClick={() => setActiveItem("crypton")}
          >
            <CryptonLogo className="w-[50px] sm:w-[65px] 2xl:w-[75px] 3xl:w-[88px]" />
            {activeItem === "crypton" && (
              <SelectedOutline className="max-sm:scale-[80%]" />
            )}
          </button>
          <button
            className="group relative"
            onClick={() => setActiveItem("wiki")}
          >
            <WikiLogo className="w-[50px] sm:w-[65px] 2xl:w-[75px] 3xl:w-[84px]" />
            {activeItem === "wiki" && (
              <SelectedOutline className="max-sm:scale-[80%]" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeItem === "crypton" ? (
          <InformationBlock
            key="crypton"
            heading="Crypton"
            link="https://crypton.xyz/ru/"
            linkType="web"
          >
            Помогаем разобраться в криптовалютах, предоставляя необходимые
            инструменты для продуктивной работы и экономии личного времени.
          </InformationBlock>
        ) : (
          <InformationBlock
            key="wiki"
            heading="Crypto Wiki"
            link="https://t.me/cryptowiki_channel"
            linkType="tg"
          >
            Развиваем удобный криптовалютный справочник по терминологии, которую
            закрепляем атмосферными розыгрышами с авторскими квизами.
          </InformationBlock>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Organizators
