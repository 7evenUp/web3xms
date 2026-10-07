import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import CommexLogo from "@/assets/logos/commex-sm-logo.png"
import MemefiLogo from "@/assets/logos/memefi-sm-logo.png"
import CrossFinanceLogo from "@/assets/logos/cross-finance-sm-logo.png"
import CyberConnectLogo from "@/assets/logos/cyber-connect-sm-logo.png"
import TangemLogo from "@/assets/logos/tangem-sm-logo.png"
import SymbiosisLogo from "@/assets/logos/symbiosis-sm-logo.png"
import DolphinLogo from "@/assets/logos/dolphin-sm-logo.png"
import MultiAILogo from "@/assets/logos/multiai-sm-logo.png"

import InformationBlock from "./InformationBlock"
import SelectedOutline from "./SelectedOutline"
import OrderNumber from "./OrderNumber"
import Heading from "./Heading"

const Sponsors = () => {
  const [activeItem, setActiveItem] = useState(0)

  return (
    <motion.section
      className="relative w-[90vw] h-[410px] sm:h-[310px] lg:h-[250px] xl:w-[1000px] 2xl:w-[1200px] 2xl:h-[330px] 3xl:w-[1500px] 3xl:h-[370px] flex flex-col justify-between bg-black border-2 2xl:border-[3px] border-gray pt-8 pl-4 sm:pt-4 sm:pl-8 pb-11 pr-8 2xl:pt-5 2xl:pl-12 3xl:pr-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.4, delay: 0.2 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <OrderNumber>2/5</OrderNumber>

      <div className="flex flex-col lg:flex-row items-start justify-between">
        <Heading>Спонсоры</Heading>

        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-5 3xl:grid-cols-4 lg:grid-rows-2 place-items-center gap-y-4 gap-x-8 phone:gap-x-0 sm:gap-y-9 sm:gap-x-6 lg:gap-x-0 3xl:gap-x-7 mt-4 3xl:mt-6 w-full phone:w-[350px] sm:w-full md:w-[630px] lg:w-[400px] 2xl:w-[500px]">
          <button className="relative group " onClick={() => setActiveItem(0)}>
            <img
              src={CommexLogo}
              className="w-[70px] 2xl:w-[90px] 3xl:w-[110px]"
            />
            {activeItem === 0 && (
              <SelectedOutline className="scale-[60%] group-hover:scale-[50%] small-phone:scale-75 small-phone:group-hover:scale-[70%] phone:scale-[80%] md:scale-90 md:group-hover:scale-[80%]" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(1)}>
            <img
              src={MemefiLogo}
              className="w-[50px] 2xl:w-[70px] 3xl:w-[90px]"
            />
            {activeItem === 1 && (
              <SelectedOutline className="scale-[60%] group-hover:scale-[50%] small-phone:scale-75 small-phone:group-hover:scale-[70%] phone:scale-[80%] md:scale-90 md:group-hover:scale-[80%]" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(2)}>
            <img
              src={CrossFinanceLogo}
              className="w-[50px] 2xl:w-[70px] 3xl:w-[88px]"
            />
            {activeItem === 2 && (
              <SelectedOutline className="scale-[60%] group-hover:scale-[50%] small-phone:scale-75 small-phone:group-hover:scale-[70%] phone:scale-[80%] md:scale-90 md:group-hover:scale-[80%]" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(3)}>
            <img
              src={DolphinLogo}
              className="w-[50px] 2xl:w-[70px] 3xl:w-[87px]"
            />
            {activeItem === 3 && (
              <SelectedOutline className="scale-[60%] group-hover:scale-[50%] small-phone:scale-75 small-phone:group-hover:scale-[70%] phone:scale-[80%] md:scale-90 md:group-hover:scale-[80%]" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(4)}>
            <img
              src={CyberConnectLogo}
              className="w-[50px] 2xl:w-[70px] 3xl:w-[87px]"
            />
            {activeItem === 4 && (
              <SelectedOutline className="scale-[60%] group-hover:scale-[50%] small-phone:scale-75 small-phone:group-hover:scale-[70%] phone:scale-[80%] md:scale-90 md:group-hover:scale-[80%]" />
            )}
          </button>
          <button
            className="relative group lg:col-start-3 3xl:col-start-auto"
            onClick={() => setActiveItem(5)}
          >
            <img
              src={TangemLogo}
              className="w-[30px] 2xl:w-[50px] 3xl:w-[63px]"
            />
            {activeItem === 5 && (
              <SelectedOutline className="scale-[60%] group-hover:scale-[50%] small-phone:scale-75 small-phone:group-hover:scale-[70%] phone:scale-[80%] md:scale-90 md:group-hover:scale-[80%]" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(6)}>
            <img
              src={SymbiosisLogo}
              className="w-[60px] 2xl:w-[80px] 3xl:w-[100px]"
            />
            {activeItem === 6 && (
              <SelectedOutline className="scale-[60%] group-hover:scale-[50%] small-phone:scale-75 small-phone:group-hover:scale-[70%] phone:scale-[80%] md:scale-90 md:group-hover:scale-[80%]" />
            )}
          </button>
          <button className="relative group" onClick={() => setActiveItem(7)}>
            <img
              src={MultiAILogo}
              className="w-[60px] 2xl:w-[80px] 3xl:w-[100px]"
            />
            {activeItem === 7 && (
              <SelectedOutline className="scale-[60%] group-hover:scale-[50%] small-phone:scale-75 small-phone:group-hover:scale-[70%] phone:scale-[80%] md:scale-90 md:group-hover:scale-[80%]" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeItem === 0 ? (
          <InformationBlock
            key="first-sponsor"
            heading="CommEX"
            linkType="web"
            link="https://accounts.commex.com/en/register?ref=E26YU9UR"
          >
            Удобная и надежная криптовалютная биржа, где можно купить биткоин
            (BTC) и другие криптовалюты всего за несколько кликов.
          </InformationBlock>
        ) : activeItem === 1 ? (
          <InformationBlock
            key="second-sponsor"
            heading="MemeFi"
            linkType="web"
            link="https://www.memefi.club/"
          >
            Увлекательная Web3 игра, которая отправит любого желающего в мир
            воинственных кланов популярных мемкоинов. Побеждай вражеских боссов
            и зарабатывай токены!
          </InformationBlock>
        ) : activeItem === 2 ? (
          <InformationBlock
            key="third-sponsor"
            heading="Cross Finance"
            linkType="web"
            link="https://crossfi.org/"
          >
            Передовая экосистема, которая разрабатывает сложные и современные
            платёжные решения. Cross Finance делает массовое внедрение
            криптовалют реальным.
          </InformationBlock>
        ) : activeItem === 3 ? (
          <InformationBlock
            key="forth-sponsor"
            heading="Dolphin"
            linkType="web"
            link="https://dolphin-anty.com/ru/?utm_source=media&utm_medium=cpc&utm_campaign=crypton&utm_content=new_year"
          >
            Антидетект браузер, грамотно заточенный под командную работу и
            автоматизацию процессов, для задач арбитража трафика на любых
            платформах виртуальной сети.
          </InformationBlock>
        ) : activeItem === 4 ? (
          <InformationBlock
            key="fifth-sponsor"
            heading="Cyber Connect"
            linkType="web"
            link="https://cyberconnect.me/"
          >
            Соцсеть Web3, которая позволяет разработчикам создавать социальные
            приложения, предоставляющие пользователям абсолютное владение своим
            контентом, цифровой идентичностью, связями и взаимодействиями.
          </InformationBlock>
        ) : activeItem === 5 ? (
          <InformationBlock
            key="sixth-sponsor"
            heading="Tangem"
            linkType="web"
            link="https://tangem.com/ru/pricing/?promocode=CRYPTON"
          >
            Некастодиальный холодный кошелек для простого и безопасного способа
            хранения криптовалюты без риска взлома.
          </InformationBlock>
        ) : activeItem === 6 ? (
          <InformationBlock
            key="seventh-sponsor"
            heading="Symbiosis"
            linkType="web"
            link="https://symbiosis.finance/"
          >
            Межцепочечный протокол агрегации ликвидности с лучшими ставками для
            обмена любых токенов независимо от выбранной сети.
          </InformationBlock>
        ) : (
          activeItem === 7 && (
            <InformationBlock
              key="eighth-sponsor"
              heading="MultiAI"
              linkType="web"
              link="https://multi-ai.pro"
            >
              Сервис предоставляет уникальную возможность комфортно работать со
              всеми самыми востребованными нейросетями в одном месте.
            </InformationBlock>
          )
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Sponsors
