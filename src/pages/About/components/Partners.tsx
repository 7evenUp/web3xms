import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import CryptusLogo from "@/assets/logos/cryptus-about-logo.png"
import XconnectLogo from "@/assets/logos/0xconnect-sm-logo.png"
import DequestLogo from "@/assets/logos/dequest-sm-logo.png"
import P2PLogo from "@/assets/logos/p2p-sm-logo.png"
import MonitalksLogo from "@/assets/logos/monitalks-sm-logo.png"
import CryptoBoshLogo from "@/assets/logos/crypto-bosh-sm-logo.png"
import XScoreLogo from "@/assets/logos/0xscore-sm-logo.png"

import InformationBlock from "./InformationBlock"
import SelectedOutline from "./SelectedOutline"
import OrderNumber from "./OrderNumber"
import Heading from "./Heading"

const Partners = () => {
  const [activeItem, setActiveItem] = useState(0)

  return (
    <motion.section
      className="relative w-[90vw] h-[470px] phone:h-[450px] sm:h-[360px] lg:h-[280px] xl:w-[1000px] 2xl:w-[1200px] 2xl:h-[370px] 3xl:w-[1500px] 3xl:h-[450px] flex flex-col justify-between bg-black border-2 2xl:border-[3px] border-gray pt-8 pl-4 sm:pt-4 sm:pl-8 pb-11 pr-8 2xl:pt-5 2xl:pl-12 3xl:pr-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.4, delay: 0.2 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <OrderNumber>3/5</OrderNumber>

      <div className="flex flex-col lg:flex-row items-start justify-between">
        <Heading className="text-3xl/none small-phone:text-4xl/none sm:text-[54px]/none">
          Отдельная благодарность
          <br />
          за помощь в организации
        </Heading>

        <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-4 lg:grid-rows-2 place-items-center gap-y-6 phone:gap-y-4 2xl:gap-y-10 3xl:gap-y-12 gap-x-7 mt-8 sm:mt-5 3xl:mt-10 w-full phone:w-[350px] sm:w-full md:w-[630px] lg:w-[380px] 2xl:w-[430px] 3xl:w-[500px]">
          <button className="relative group" onClick={() => setActiveItem(0)}>
            <img
              src={CryptusLogo}
              className=" lg:w-[90px] 2xl:w-[100px] 3xl:w-[118px]"
            />
            {activeItem === 0 && (
              <SelectedOutline className="max-sm:scale-[80%] max-sm:group-hover:scale-75" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(1)}>
            <img
              src={XconnectLogo}
              className=" lg:w-[80px] 2xl:w-[90px] 3xl:w-[106px]"
            />
            {activeItem === 1 && (
              <SelectedOutline className="max-sm:scale-[80%] max-sm:group-hover:scale-75" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(2)}>
            <img
              src={DequestLogo}
              className=" lg:w-[85px] 2xl:w-[95px] 3xl:w-[110px]"
            />
            {activeItem === 2 && (
              <SelectedOutline className="max-sm:scale-[80%] max-sm:group-hover:scale-75" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(3)}>
            <img
              src={P2PLogo}
              className=" lg:w-[55px] 2xl:w-[70px] 3xl:w-[92px]"
            />
            {activeItem === 3 && (
              <SelectedOutline className="max-sm:scale-[80%] max-sm:group-hover:scale-75" />
            )}
          </button>
          <button
            className="relative group lg:col-start-2"
            onClick={() => setActiveItem(4)}
          >
            <img
              src={MonitalksLogo}
              className=" lg:w-[60px] 2xl:w-[80px] 3xl:w-[100px]"
            />
            {activeItem === 4 && (
              <SelectedOutline className="max-sm:scale-[80%] max-sm:group-hover:scale-75" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(5)}>
            <img
              src={CryptoBoshLogo}
              className=" lg:w-[60px] 2xl:w-[80px] 3xl:w-[100px]"
            />
            {activeItem === 5 && (
              <SelectedOutline className="max-sm:scale-[80%] max-sm:group-hover:scale-75" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(6)}>
            <img
              src={XScoreLogo}
              className=" lg:w-[60px] 2xl:w-[80px] 3xl:w-[100px]"
            />
            {activeItem === 6 && (
              <SelectedOutline className="max-sm:scale-[80%] max-sm:group-hover:scale-75" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeItem === 0 ? (
          <InformationBlock
            key="first-partner"
            heading="Cryptus"
            className="bottom-6 3xl:bottom-8"
            link="https://t.me/CRYPTUS_MEDIA"
            linkType="tg"
          >
            Проект со стажем в сфере криптовалют с образовательным уклоном в
            мире больших финансов.
          </InformationBlock>
        ) : activeItem === 1 ? (
          <InformationBlock
            key="second-partner"
            heading="0xConnect"
            className="bottom-6 3xl:bottom-8"
            link="https://www.0xconnect.net/"
            linkType="web"
          >
            Нетворкинговый криптомитап нового формата. Уникальные знакомства,
            крутые партнерства, хант сотрудников и привлечение инвестиций.
            Пространство, заточенное под результат.
          </InformationBlock>
        ) : activeItem === 2 ? (
          <InformationBlock
            key="third-partner"
            heading="DeQuest"
            className="bottom-8"
            link="https://beta.dequest.io/"
            linkType="web"
          >
            Игровая web3-платформа, ориентированная на монетизацию игр для всех!
            В основе DeQuest лежит система «играй и зарабатывай» — каждый геймер
            может монетизировать свой досуг.
          </InformationBlock>
        ) : activeItem === 3 ? (
          <InformationBlock
            key="forth-partner"
            heading="Media P2P"
            className="bottom-8"
            link="https://t.me/mediap2p"
            linkType="tg"
          >
            Крупнейшейшее комьюнити P2P арбитражников в СНГ.
          </InformationBlock>
        ) : activeItem === 4 ? (
          <InformationBlock
            key="fifth-partner"
            heading="Moni Talks"
            className="bottom-8"
            link="https://t.me/moni_talks"
            linkType="tg"
          >
            Криптовалюта с творческим и веселым лицом. Мемы, тренды, гемы и
            единорожки.
          </InformationBlock>
        ) : activeItem === 5 ? (
          <InformationBlock
            key="sixth-partner"
            heading="КриптоБош"
            className="bottom-8"
            link="https://t.me/cryptobosh"
            linkType="tg"
          >
            Один из лучших ютуб каналов именно для новичков. С самых азов
            простыми словами. Все показывает на своих примерах.
          </InformationBlock>
        ) : (
          activeItem === 6 && (
            <InformationBlock
              key="seventh-partner"
              heading="0xScore"
              className="bottom-8"
              link="https://0xscore.io"
              linkType="web"
            >
              Репутация в веб3 - это круто. А ещё круче когда она на 0xScore.
            </InformationBlock>
          )
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Partners
