import { useState } from "react"
import { motion } from "framer-motion"
import { isTablet, isMobile } from "react-device-detect"

import SponsorsBackground from "@/assets/images/sponsors-bg.png"

import CommexLogo from "@/assets/logos/commex-logo.svg?react"
import MemefiLogo from "@/assets/logos/memefi-logo.svg?react"
import CrossFinanceLogo from "@/assets/logos/cross-finance-logo.svg?react"
import SymbiosisLogo from "@/assets/logos/symbiosis-logo.svg?react"
import TangemLogo from "@/assets/logos/tangem-logo.svg?react"
import CyberConnectLogo from "@/assets/logos/cyber-connect-logo.svg?react"
import DolphinLogo from "@/assets/logos/dolphin-logo.svg?react"
import MultiAILogo from "@/assets/logos/multiai-logo.svg?react"

import { cn } from "@/lib/cn"

import { useMediaQuery } from "@/hooks/useMedia"

const variants = {
  open: { opacity: [0, 1, 0.2, 0.9, 0.3, 1, 0.4, 0.8, 0.5, 1] },
  closed: { opacity: 0 },
}

const sponsorsData = {
  commex: {
    title: "CommEX",
    category: "CEX",
    text: "Удобная и надежная криптовалютная биржа, где можно купить биткоин (BTC) и другие криптовалюты всего за несколько кликов.",
  },
  memefi: {
    title: "MemeFi",
    category: "GameFi",
    text: "Увлекательная Web3 игра, которая отправит любого желающего в мир воинственных кланов популярных мемкоинов. Побеждай вражеских боссов и зарабатывай токены!",
  },
  crossFinance: {
    title: "Cross Finance",
    category: "Chain",
    text: "Передовая экосистема, которая разрабатывает сложные и современные платёжные решения. Cross Finance делает массовое внедрение криптовалют реальным.",
  },
  symbiosis: {
    title: "Symbiosis",
    category: "Bridge",
    text: "Межцепочечный протокол агрегации ликвидности с лучшими ставками для обмена любых токенов независимо от выбранной сети.",
  },
  tangem: {
    title: "Tangem",
    category: "Wallet",
    text: "Некастодиальный холодный кошелек для простого и безопасного способа хранения криптовалюты без риска взлома.",
  },
  cyberConnect: {
    title: "CyberConnect",
    category: "SocialFi",
    text: "Соцсеть Web3, которая позволяет разработчикам создавать социальные приложения, предоставляющие пользователям абсолютное владение своим контентом, цифровой идентичностью, связями и взаимодействиями.",
  },
  dolphin: {
    title: "Dolphin{anty}",
    category: "Services",
    text: "Антидетект браузер, грамотно заточенный под командную работу и автоматизацию процессов, для задач арбитража трафика на любых платформах виртуальной сети.",
  },
  multiai: {
    title: "MULTIAI",
    category: "AI tools",
    text: "Платформа для продуктов с открытым исходным кодом, созданная с использованием технологии искусственного интеллекта. Сервис предоставляет возможность работать со всеми самыми востребованными нейросетями в одном месте.",
  },
}

const Sponsors = () => {
  const [activeSponsor, setActiveSponsor] =
    useState<keyof typeof sponsorsData>("commex")
  const [isHovered, setIsHovered] = useState(false)
  const [mobileLink, setMobileLink] = useState("xyz")

  const matches = useMediaQuery("xl")

  return (
    <section className="bg-gray xl:bg-black p-2.5 2xl:p-[15px] snap-start">
      <div className="relative bg-black min-h-[454px] phone:min-h-[530px] sm:min-h-[884px] 2md:min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col justify-center items-center">
        <div className="title-bg absolute top-0" />

        <img
          src={SponsorsBackground}
          className="hidden phone:block w-[90vw] lg:w-[810px] h-[350px] sm:h-[500px] 2xl:w-[1000px] 2xl:h-[600px] 3xl:w-[1200px] 3xl:h-[750px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative w-[80vw] mt-20 phone:mt-0 phone:w-[90vw] lg:w-[810px] h-[350px] sm:h-[500px] 2xl:w-[1000px] 2xl:h-[600px] 3xl:w-[1200px] 3xl:h-[750px]">
          <motion.h2
            initial="closed"
            whileInView="open"
            variants={variants}
            viewport={{ once: !matches }}
            transition={{
              type: "tween",
              duration: 0.6,
              ease: "backInOut",
              times: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              delay: 0.2,
            }}
            className="absolute left-1/2 -translate-x-1/2 top-0 phone:top-[60px] sm:top-[90px] 2xl:top-[120px] 3xl:top-[150px] font-drukCyr text-lg/none sm:text-3xl/none md:text-[34px]/none 2xl:text-[40px]/none 3xl:text-[50px]/none tracking-[0.02em] text-center w-[285px] sm:w-[460px] md:w-[530px] 2xl:w-[630px] 3xl:w-[830px] text-red"
          >
            {
              "Внутри кейсов спрятано более 10,000 подарков, которых не было бы без наших дорогих спонсоров <3"
            }
          </motion.h2>

          {isTablet || isMobile ? (
            <MobileLogos
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              activeSponsor={activeSponsor}
              setActiveSponsor={setActiveSponsor}
              setMobileLink={setMobileLink}
            />
          ) : (
            <DesktopLogos
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              activeSponsor={activeSponsor}
              setActiveSponsor={setActiveSponsor}
            />
          )}

          <motion.div
            initial="closed"
            whileInView="open"
            variants={variants}
            viewport={{ once: !matches }}
            transition={{
              type: "tween",
              duration: 0.6,
              ease: "backInOut",
              times: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              delay: 1.4,
            }}
          >
            {isHovered ? (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-[210px] sm:top-[310px] md:top-[330px] 2xl:top-[400px] 3xl:top-[510px] font-circe-bold text-xs/[90%] sm:text-base/[90%] 3xl:text-[20px]/[90%] tracking-[0.02em] text-center text-gray"
                >
                  {sponsorsData[activeSponsor].title}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-[225px] sm:top-[330px] md:top-[350px] 2xl:top-[420px] 3xl:top-[530px] font-circe-bold text-[10px] sm:text-xs/none tracking-[0.1em] text-center text-gray/70"
                >
                  {sponsorsData[activeSponsor].category}
                </motion.span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-[250px] sm:top-[350px] md:top-[370px] 2xl:top-[440px] 3xl:top-[550px] h-[60px] font-circe-bold text-[10px]/[90%] sm:text-sm/[90%] 2xl:text-base/[90%] 3xl:text-[20px]/[90%] tracking-[0.02em] text-center text-gray/70 w-[80vw] phone:w-[300px] sm:w-[460px] md:w-[500px] 2xl:w-[600px] 3xl:w-[710px]"
                >
                  {sponsorsData[activeSponsor].text}
                </motion.p>
                {(isTablet || isMobile) && (
                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    href={mobileLink}
                    target="_blank"
                    className="absolute left-1/2 -translate-x-1/2 top-[280px] sm:top-[390px] md:top-[420px] 2xl:top-[440px] 3xl:top-[550px] h-[60px] font-circe-bold text-[10px]/[90%] sm:text-sm/[90%] 2xl:text-base/[90%] 3xl:text-[20px]/[90%] tracking-[0.02em] text-center text-gray/70 w-[80vw] phone:w-[300px] sm:w-[460px] md:w-[500px] 2xl:w-[600px] 3xl:w-[710px] underline underline-offset-4"
                  >
                    Перейти
                  </motion.a>
                )}
              </>
            ) : (
              <>
                {isTablet || isMobile ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={!isHovered ? "open" : "closed"}
                    variants={variants}
                    transition={{
                      type: "tween",
                      duration: 0.6,
                      ease: "backInOut",
                      times: [
                        0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 1,
                      ],
                    }}
                    className="absolute left-1/2 -translate-x-1/2 top-[230px] sm:top-[360px] 2xl:top-[440px] 3xl:top-[550px] h-[60px] font-circe-bold text-[10px]/[90%] sm:text-sm/[90%] 2xl:text-base/[90%] 3xl:text-lg/[90%] tracking-[0.02em] text-center text-gray/70 max-w-[522px]"
                  >
                    Нажмите на логотип, чтобы увидеть описание спонсора
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={!isHovered ? "open" : "closed"}
                    variants={variants}
                    transition={{
                      type: "tween",
                      duration: 0.6,
                      ease: "backInOut",
                      times: [
                        0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 1,
                      ],
                    }}
                    className="absolute left-1/2 -translate-x-1/2 top-[230px] sm:top-[360px] 2xl:top-[440px] 3xl:top-[550px] h-[60px] font-circe-bold text-[10px]/[90%] sm:text-sm/[90%] 2xl:text-base/[90%] 3xl:text-lg/[90%] tracking-[0.02em] text-center text-gray/70 max-w-[522px]"
                  >
                    Наведите на логотип, чтобы увидеть описание спонсора
                  </motion.p>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Sponsors

const DesktopLogos = ({
  isHovered,
  setIsHovered,
  activeSponsor,
  setActiveSponsor,
}: {
  activeSponsor: keyof typeof sponsorsData
  setActiveSponsor: React.Dispatch<
    React.SetStateAction<keyof typeof sponsorsData>
  >
  isHovered: boolean
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const matches = useMediaQuery("xl")

  return (
    <>
      <motion.a
        initial="closed"
        whileInView="open"
        variants={variants}
        viewport={{ once: !matches }}
        transition={{
          type: "tween",
          duration: 0.6,
          ease: "backInOut",
          times: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          delay: 0.6,
        }}
        className="absolute left-1/2 -translate-x-1/2 top-[60px] phone:top-[110px] sm:top-[175px] md:top-[190px] 2xl:top-[230px] 3xl:top-[290px]"
        href="https://accounts.commex.com/en/register?ref=E26YU9UR"
        target="_blank"
        onMouseEnter={() => {
          setActiveSponsor("commex")
          setIsHovered(true)
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CommexLogo
          className={cn(
            "h-auto w-[120px] sm:w-[140px] md:w-[150px] lg:w-[170px] 2xl:w-[230px] 3xl:w-[300px] transition-all",
            activeSponsor === "commex" && isHovered && "scale-110"
          )}
        />
      </motion.a>
      <motion.div
        initial="closed"
        whileInView="open"
        variants={variants}
        viewport={{ once: !matches }}
        transition={{
          type: "tween",
          duration: 0.6,
          ease: "backInOut",
          times: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          delay: 1,
        }}
        className="absolute left-1/2 -translate-x-1/2 top-[110px] phone:top-[150px] sm:top-[230px] md:top-[245px] 2xl:top-[300px] 3xl:top-[380px] grid grid-cols-3 phone:grid-cols-8 grid-rows-2 place-items-center gap-x-2 gap-y-2 3xl:gap-y-4 w-[80vw] phone:w-[400px] sm:w-[450px] md:w-[580px] 2xl:w-[750px] 3xl:w-[850px]"
      >
        <a
          className="phone:col-span-2"
          href="https://www.memefi.club/"
          target="_blank"
          onMouseEnter={() => {
            setIsHovered(true)
            setActiveSponsor("memefi")
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MemefiLogo
            className={cn(
              "w-auto h-[22px] sm:h-6 md:h-7 lg:h-8 2xl:h-[39px] 3xl:h-[49px] transition-all",
              activeSponsor === "memefi" && isHovered && "scale-110"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </a>
        <a
          className="phone:col-span-2"
          href="https://crossfi.org/"
          target="_blank"
          onMouseEnter={() => {
            setIsHovered(true)
            setActiveSponsor("crossFinance")
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CrossFinanceLogo
            className={cn(
              "w-auto h-[22px] sm:h-5 md:h-5 lg:h-[28px] 2xl:h-[36px] 3xl:h-[44px] transition-all",
              activeSponsor === "crossFinance" && isHovered && "scale-110"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </a>
        <a
          className="phone:col-span-2"
          href="https://symbiosis.finance/"
          target="_blank"
          onMouseEnter={() => {
            setIsHovered(true)
            setActiveSponsor("symbiosis")
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <SymbiosisLogo
            className={cn(
              "w-auto h-5 sm:h-5 md:h-5 lg:h-[26px] 2xl:h-[36px] 3xl:h-[40px] transition-all",
              activeSponsor === "symbiosis" && isHovered && "scale-110"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </a>

        <a
          className="phone:col-span-2"
          href="https://multi-ai.pro"
          target="_blank"
          onMouseEnter={() => {
            setIsHovered(true)
            setActiveSponsor("multiai")
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MultiAILogo
            className={cn(
              "w-auto h-3.5 sm:h-5 lg:h-[24px] 2xl:h-[30px] 3xl:h-[35px] transition-all",
              activeSponsor === "multiai" && isHovered && "scale-110"
            )}
          />
        </a>

        <a
          className="phone:col-span-2 phone:col-start-2"
          href="https://tangem.com/ru/pricing/?promocode=CRYPTON"
          target="_blank"
          onMouseEnter={() => {
            setIsHovered(true)
            setActiveSponsor("tangem")
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <TangemLogo
            className={cn(
              "w-auto h-4 sm:h-5 lg:h-[26px] 2xl:h-[36px] 3xl:h-[41px] transition-all",
              activeSponsor === "tangem" && isHovered && "scale-110"
            )}
          />
        </a>
        <a
          className="phone:col-span-2"
          href="https://dolphin-anty.com/ru/?utm_source=media&utm_medium=cpc&utm_campaign=crypton&utm_content=new_year"
          target="_blank"
          onMouseEnter={() => {
            setIsHovered(true)
            setActiveSponsor("dolphin")
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <DolphinLogo
            className={cn(
              "w-auto h-3.5 sm:h-[18px] lg:h-[24px] 2xl:h-[30px] 3xl:h-[35px] transition-all",
              activeSponsor === "dolphin" && isHovered && "scale-110"
            )}
          />
        </a>

        <a
          href="https://cyberconnect.me/"
          target="_blank"
          onMouseEnter={() => {
            setIsHovered(true)
            setActiveSponsor("cyberConnect")
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="max-phone:col-start-2 phone:col-span-2"
        >
          <CyberConnectLogo
            className={cn(
              "w-auto h-3.5 sm:h-4 lg:h-[20px] 2xl:h-[26px] 3xl:h-[30px] transition-all",
              activeSponsor === "cyberConnect" && isHovered && "scale-110"
            )}
          />
        </a>
      </motion.div>
    </>
  )
}

const MobileLogos = ({
  isHovered,
  setIsHovered,
  activeSponsor,
  setActiveSponsor,
  setMobileLink,
}: {
  activeSponsor: keyof typeof sponsorsData
  setActiveSponsor: React.Dispatch<
    React.SetStateAction<keyof typeof sponsorsData>
  >
  isHovered: boolean
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
  setMobileLink: React.Dispatch<React.SetStateAction<string>>
}) => {
  const matches = useMediaQuery("xl")

  return (
    <>
      <motion.button
        initial="closed"
        whileInView="open"
        variants={variants}
        viewport={{ once: !matches }}
        transition={{
          type: "tween",
          duration: 0.6,
          ease: "backInOut",
          times: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          delay: 0.6,
        }}
        className="absolute left-1/2 -translate-x-1/2 top-[60px] phone:top-[110px] sm:top-[175px] md:top-[190px] 2xl:top-[230px] 3xl:top-[290px]"
        onClick={() => {
          setMobileLink("https://accounts.commex.com/en/register?ref=E26YU9UR")
          setActiveSponsor("commex")
          setIsHovered(true)
        }}
      >
        <CommexLogo
          className={cn(
            "h-auto w-[120px] sm:w-[140px] md:w-[150px] lg:w-[170px] 2xl:w-[230px] 3xl:w-[300px] transition-all",
            activeSponsor === "commex" && isHovered && "scale-110"
          )}
        />
      </motion.button>
      <motion.div
        initial="closed"
        whileInView="open"
        variants={variants}
        viewport={{ once: !matches }}
        transition={{
          type: "tween",
          duration: 0.6,
          ease: "backInOut",
          times: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          delay: 1,
        }}
        className="absolute left-1/2 -translate-x-1/2 top-[110px] phone:top-[150px] sm:top-[230px] md:top-[245px] 2xl:top-[300px] 3xl:top-[380px] grid grid-cols-3 phone:grid-cols-8 grid-rows-2 place-items-center gap-x-2 gap-y-2 3xl:gap-y-4 w-[80vw] phone:w-[400px] sm:w-[450px] md:w-[580px] 2xl:w-[750px] 3xl:w-[850px]"
      >
        <button
          className="phone:col-span-2"
          onClick={() => {
            setMobileLink("https://www.memefi.club/")
            setActiveSponsor("memefi")
            setIsHovered(true)
          }}
        >
          <MemefiLogo
            className={cn(
              "w-auto h-[22px] sm:h-6 md:h-5 lg:h-[30px] 2xl:h-[36px] 3xl:h-[49px] transition-all",
              activeSponsor === "memefi" && isHovered && "scale-110"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </button>
        <button
          className="phone:col-span-2"
          onClick={() => {
            setMobileLink("https://crossfi.org/")
            setActiveSponsor("crossFinance")
            setIsHovered(true)
          }}
        >
          <CrossFinanceLogo
            className={cn(
              "w-auto h-[22px] sm:h-6 md:h-5 lg:h-[28px] 2xl:h-[36px] 3xl:h-[44px] transition-all",
              activeSponsor === "crossFinance" && isHovered && "scale-110"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </button>
        <button
          className="phone:col-span-2"
          onClick={() => {
            setMobileLink("https://symbiosis.finance/")
            setActiveSponsor("symbiosis")
            setIsHovered(true)
          }}
        >
          <SymbiosisLogo
            className={cn(
              "w-auto h-5 sm:h-6 md:h-5 lg:h-[26px] 2xl:h-[36px] 3xl:h-[40px] transition-all",
              activeSponsor === "symbiosis" && isHovered && "scale-110"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </button>
        <button
          className="phone:col-span-2"
          onClick={() => {
            setMobileLink("https://multi-ai.pro")
            setActiveSponsor("multiai")
            setIsHovered(true)
          }}
        >
          <MultiAILogo
            className={cn(
              "w-auto h-4 sm:h-5 lg:h-[26px] 2xl:h-[36px] 3xl:h-[41px] transition-all",
              activeSponsor === "multiai" && isHovered && "scale-110"
            )}
          />
        </button>
        <button
          className="phone:col-span-2 phone:col-start-2"
          onClick={() => {
            setMobileLink("https://tangem.com/ru/pricing/?promocode=CRYPTON")
            setActiveSponsor("tangem")
            setIsHovered(true)
          }}
        >
          <TangemLogo
            className={cn(
              "w-auto h-4 sm:h-5 lg:h-[26px] 2xl:h-[36px] 3xl:h-[41px] transition-all",
              activeSponsor === "tangem" && isHovered && "scale-110"
            )}
          />
        </button>
        <button
          className="phone:col-span-2"
          onClick={() => {
            setMobileLink(
              "https://dolphin-anty.com/ru/?utm_source=media&utm_medium=cpc&utm_campaign=crypton&utm_content=new_year"
            )
            setActiveSponsor("dolphin")
            setIsHovered(true)
          }}
        >
          <DolphinLogo
            className={cn(
              "w-auto h-3.5 sm:h-5 lg:h-[24px] 2xl:h-[30px] 3xl:h-[35px] transition-all",
              activeSponsor === "dolphin" && isHovered && "scale-110"
            )}
          />
        </button>
        <button
          onClick={() => {
            setMobileLink("https://cyberconnect.me/")
            setActiveSponsor("cyberConnect")
            setIsHovered(true)
          }}
          className="max-phone:col-start-2 phone:col-span-2"
        >
          <CyberConnectLogo
            className={cn(
              "w-auto h-3.5 sm:h-5 lg:h-[22px] 2xl:h-[28px] 3xl:h-[32px] transition-all",
              activeSponsor === "cyberConnect" && isHovered && "scale-110"
            )}
          />
        </button>
      </motion.div>
    </>
  )
}
