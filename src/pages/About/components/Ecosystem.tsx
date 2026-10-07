import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import ResearchLogo from "@/assets/logos/research-bot-logo.svg?react"
import ToolsLogo from "@/assets/logos/tools-logo.svg?react"
import AcademyLogo from "@/assets/logos/academy-logo.svg?react"
import UniverseLogo from "@/assets/logos/universe-logo.svg?react"
import CalendarLogo from "@/assets/logos/calendar-logo.svg?react"
import PrimeLogo from "@/assets/logos/prime-logo.svg?react"

import InformationBlock from "./InformationBlock"
import SelectedOutline from "./SelectedOutline"
import OrderNumber from "./OrderNumber"
import Heading from "./Heading"

const Ecosystem = () => {
  const [activeItem, setActiveItem] = useState<
    "research" | "tools" | "calendar" | "prime" | "universe" | "academy"
  >("research")

  return (
    <motion.section
      className="relative w-[90vw] h-[420px] sm:h-[390px] lg:h-[230px] xl:w-[1000px] 2xl:w-[1200px] 2xl:h-[280px] 3xl:w-[1500px] 3xl:h-[350px] flex flex-col justify-between bg-black border-2 2xl:border-[3px] border-gray pt-8 pl-4 sm:pt-4 sm:pl-8 pb-11 pr-4 2xl:pt-5 2xl:pl-12 2xl:pr-8 3xl:pr-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.4, delay: 0.2 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <OrderNumber>4/5</OrderNumber>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-0">
        <div>
          <Heading>Экосистема Crypton</Heading>
          <p className="font-circe-bold text-lg/none 2xl:text-2xl/none tracking-wide text-gray">
            Наши сервисы и продукты
          </p>
        </div>
        <div className="relative w-[260px] h-[160px] small-phone:w-[290px] small-phone:h-[190px] 2xl:w-[400px] 2xl:h-[240px] 3xl:w-[450px] 3xl:h-[300px]">
          <div className="absolute left-0 top-3 2xl:top-5 3xl:top-[30px]">
            <button
              className="relative group"
              onClick={() => setActiveItem("research")}
            >
              <ResearchLogo className="w-auto h-[50px] small-phone:h-[70px] 2xl:h-[90px] 3xl:h-[110px]" />
              {activeItem === "research" && (
                <SelectedOutline className="scale-75 group-hover:scale-[70%] small-phone:scale-90 small-phone:group-hover:scale-[80%]" />
              )}
            </button>
          </div>
          <div className="absolute left-[100px] 2xl:left-[150px] top-2">
            <button
              className="relative group"
              onClick={() => setActiveItem("tools")}
            >
              <ToolsLogo className="w-auto h-[50px] small-phone:h-[70px] 2xl:h-[90px] 3xl:h-[110px]" />
              {activeItem === "tools" && (
                <SelectedOutline className="scale-75 group-hover:scale-[70%] small-phone:scale-90 small-phone:group-hover:scale-[80%]" />
              )}
            </button>
          </div>
          <div className="absolute right-4 small-phone:right-0 bottom-4">
            <button
              className="relative group"
              onClick={() => setActiveItem("academy")}
            >
              <AcademyLogo className="w-auto h-[50px] small-phone:h-[70px] 2xl:h-[80px] 3xl:h-[97px]" />
              {activeItem === "academy" && (
                <SelectedOutline className="scale-75 group-hover:scale-[70%] small-phone:scale-90 small-phone:group-hover:scale-[80%]" />
              )}
            </button>
          </div>
          <div className="absolute right-2 top-1 2xl:right-[15px] 2xl:top-[5px] 3xl:right-5 3xl:top-5">
            <button
              className="relative group"
              onClick={() => setActiveItem("universe")}
            >
              <UniverseLogo className="w-auto h-[50px] small-phone:h-[70px] 2xl:h-[90px] 3xl:h-[110px]" />
              {activeItem === "universe" && (
                <SelectedOutline className="scale-75 group-hover:scale-[70%] small-phone:scale-90 small-phone:group-hover:scale-[80%]" />
              )}
            </button>
          </div>
          <div className="absolute left-4 bottom-1 2xl:left-[55px] 3xl:left-[50px] 2xl:bottom-2">
            <button
              className="relative group"
              onClick={() => setActiveItem("calendar")}
            >
              <CalendarLogo className="w-auto h-[60px] small-phone:h-20 2xl:h-[90px] 3xl:h-[110px]" />
              {activeItem === "calendar" && (
                <SelectedOutline className="scale-75 group-hover:scale-[70%] small-phone:scale-90 small-phone:group-hover:scale-[80%]" />
              )}
            </button>
          </div>
          <div className="absolute left-[110px] small-phone:left-[120px] 2xl:left-[200px] 3xl:left-[200px] top-[100px] lg:top-[110px] 3xl:top-[150px]">
            <button
              className="relative group"
              onClick={() => setActiveItem("prime")}
            >
              <PrimeLogo className="w-auto h-[50px] small-phone:h-[70px] 2xl:h-[90px] 3xl:h-[110px]" />
              {activeItem === "prime" && (
                <SelectedOutline className="scale-75 group-hover:scale-[70%] small-phone:scale-90 small-phone:group-hover:scale-[80%]" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeItem === "research" ? (
          <InformationBlock
            key="research"
            heading="Research"
            link="https://t.me/crypton_research_bot"
            linkType="tg"
          >
            Все самые важные новости криптовалютного рынка всегда под рукой.
          </InformationBlock>
        ) : activeItem === "tools" ? (
          <InformationBlock
            key="tools"
            heading="Tools"
            link="https://tools.crypton.xyz/"
            linkType="web"
          >
            Набор лучших проверенных инструментов для работы в криптовалюте.
          </InformationBlock>
        ) : activeItem === "prime" ? (
          <InformationBlock
            key="prime"
            heading="Prime"
            link="https://in-prime.crypton.xyz/"
            linkType="web"
          >
            Приватное сообщество с экспертным контентом по заработку и
            уникальными инструментами.
          </InformationBlock>
        ) : activeItem === "academy" ? (
          <InformationBlock key="academy" heading="Academy">
            Огромная база обучающих крипто-материалов и курсов от сотен
            различных авторов.
          </InformationBlock>
        ) : activeItem === "calendar" ? (
          <InformationBlock
            key="calendar"
            heading="Calendar"
            link="https://t.me/Crypton_Calendar_bot"
            linkType="tg"
          >
            Все актуальные крипто-события по заработку в вашем календаре.
          </InformationBlock>
        ) : (
          <InformationBlock key="universe" heading="Universe">
            Уникальная NFT-история из мира крипты, которая воодушевляет Crypton
            продукты.
          </InformationBlock>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Ecosystem
