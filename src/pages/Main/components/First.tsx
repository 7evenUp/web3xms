import { motion } from "framer-motion"

import ButtonOutline from "@/assets/icons/first-button-outline.svg?react"
import CardBackground from "@/assets/icons/first-bg.svg?react"

import MustangImage from "@/assets/images/mustang-main.png"

import CommexLogo from "@/assets/logos/commex-logo.png"
import MemefiLogo from "@/assets/logos/memefi-logo.png"
import CrossFinanceLogo from "@/assets/logos/cross-finance-logo.png"
import SymbiosisLogo from "@/assets/logos/symbiosis-logo.png"
import TangemLogo from "@/assets/logos/tangem-logo.png"
import CyberConnectLogo from "@/assets/logos/cyber-connect-logo.png"
import DolphinLogo from "@/assets/logos/dolphin-logo.png"
import MultiAILogo from "@/assets/logos/multiai-logo.png"

import Crypton from "@/assets/logos/crypton.svg?react"
import Wiki from "@/assets/logos/crypto-wiki.svg?react"

import "./First.css"

import { useMediaQuery } from "@/hooks/useMedia"
import { useLocation, useNavigate } from "react-router-dom"

const First = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const matches = useMediaQuery("xl")

  return (
    <section className="bg-black p-2.5 2xl:p-[15px] snap-start overflow-hidden">
      <div className="relative castle-bg flex flex-col justify-start 2md:justify-center items-center min-h-[600px] phone:min-h-[850px] 2md:min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)]">
        <div className="relative w-fit flex flex-col items-center max-w-[280px] phone:max-w-none mt-[75px] phone:mt-[125px] 2md:mt-[70px] 2xl:mt-[50px] 3xl:mt-[40px] extra:mt-0">
          <CardBackground className="absolute left-1/2 -top-6 phone:-top-[110px] 2xl:-top-[140px] 3xl:-top-[135px] -translate-x-1/2 ml-1 phone:ml-[15px] w-[292px] h-[286px] phone:w-[450px] phone:h-[486px] 2xl:w-[530px] 2xl:h-[680px] 3xl:w-[658px] 3xl:h-[788px]" />
          <motion.h2
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.4 }}
            className="relative font-paperfiller text-[56px]/none phone:text-[82px]/none 2xl:text-[110px]/none 3xl:text-[140px]/none -tracking-[0.03em] text-yellow -mb-2 phone:-mb-4 2xl:-mb-[20px]"
          >
            Исполни свою мечту
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
            className="relative font-paperfiller text-[32px]/none phone:text-5xl/none 2xl:text-[64px]/none 3xl:text-[72px]/none text-yellow"
          >
            Забери Ford Mustang
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.4, delay: 0.2 }}
            className="relative w-full phone:w-[300px] 2xl:w-[340px] 3xl:w-[502px] mt-1 mb-4 phone:mt-5 phone:mb-8 2xl:mb-[50px] 3xl:mb-[80px] font-circe-bold text-[12px]/[125%] phone:text-sm/[125%] 2xl:text-base/[125%] 3xl:text-xl/[125%] tracking-[0.02em] text-blue text-center"
          >
            Исследуй демо рождественского квеста: читай истории, выполняй задания,
            зарабатывай виртуальные XP и открывай кейсы с подарками!
          </motion.p>
          <div className="relative flex justify-around phone:justify-between w-full phone:w-[350px] 2xl:w-[460px] 3xl:w-[570px]">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: !matches }}
              transition={{ type: "tween", duration: 0.4, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <span className="font-circe-bold leading-none text-xs 2xl:text-base 3xl:text-[20px] tracking-[0.02em] text-blue text-center">
                призовой <br className="phone:hidden" /> пул
              </span>
              <span className="font-drukCyr text-2xl/none phone:text-[36px]/none 2xl:text-5xl/none 3xl:text-[56px]/none tracking-[0.02em] text-blue">
                $300,000
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: !matches }}
              transition={{ type: "tween", duration: 0.4, delay: 0.45 }}
              className="flex flex-col items-center justify-between"
            >
              <span className="font-circe-bold leading-none text-xs 2xl:text-base 3xl:text-[20px] tracking-[0.02em] text-blue">
                призов
              </span>
              <span className="font-drukCyr text-2xl/none phone:text-[36px]/none 2xl:text-5xl/none 3xl:text-[56px]/none tracking-[0.02em] text-blue">
                70,000
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: !matches }}
              transition={{ type: "tween", duration: 0.4, delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="font-circe-bold leading-none text-xs 2xl:text-base 3xl:text-[20px] tracking-[0.02em] text-blue text-center">
                главный приз <br className="phone:hidden" /> розыгрыша
              </span>
              <span className="font-drukCyr text-2xl/none phone:text-[36px]/none 2xl:text-5xl/none 3xl:text-[56px]/none tracking-[0.02em] text-blue">
                Ford Mustang
              </span>
            </motion.div>
          </div>
          <motion.button
            className="group relative w-[178px] phone:w-[240px] h-[32px] phone:h-[40px] 2xl:w-[270px] 2xl:h-[48px] 3xl:w-[280px] 3xl:h-[58px] mt-4 mb-12 phone:mt-7 phone:mb-9 2xl:mt-8 2xl:mb-12 3xl:my-[50px] extra:mb-[70px] flex justify-center items-center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.4, delay: 0.6 }}
            onClick={() => navigate("/quest/phase-1" + search)}
          >
            <ButtonOutline className="w-full h-full absolute top-0 left-0 group-hover:fill-yellow transition-all" />
            <span className="relative font-docker-one text-[10px] phone:text-xs 2xl:text-sm 3xl:text-lg/none tracking-[0.2em] text-white group-hover:text-black transition-all">
              принять участие
            </span>
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.4, delay: 0.7 }}
            className="font-docker-one self-start phone:self-auto text-xs 2xl:text-base 3xl:text-[22px] extra:text-2xl tracking-[0.36px] text-blue drop-shadow-[0_1px_1px_rgba(0,0,0,1)] ml-3 phone:-ml-36 md:ml-0 flex items-center gap-2 flex-wrap w-[200px] md:w-auto"
          >
            <div className="flex items-center gap-2">
              by{" "}
              <a
                href="https://crypton.xyz/ru/"
                target="_blank"
                className="hover:text-white flex items-center gap-1"
              >
                <Crypton className="w-7 h-7 extra:w-8 extra:h-8 -mt-0.5" />
                Crypton
              </a>
            </div>
            <div className="flex items-center gap-2">
              &{" "}
              <a
                href="https://t.me/cryptowiki_channel"
                target="_blank"
                className="hover:text-white flex items-center gap-1"
              >
                <Wiki className="w-7 h-7 extra:w-8 extra:h-8 -mt-1" />
                Crypto Wiki
              </a>
            </div>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.5, delay: 0.6 }}
            className="absolute top-[240px] -right-10 phone:top-[350px] phone:-right-10 md:-right-[120px] 2md:-right-[310px] 2md:top-[80px] lg:-right-[400px] lg:top-[30px] 2xl:-right-[410px] 2xl:top-[150px] 3xl:-right-[540px] 3xl:top-[140px]"
          >
            <motion.img
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{
                x: matches ? -10 : 0,
                y: matches ? 20 : 0,
                rotate: matches ? 4 : 0,
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
              src={MustangImage}
              className="w-[180px] phone:w-[330px] md:w-[380px] lg:w-[440px] 2xl:w-[480px] 3xl:w-[660px]"
            />
          </motion.div>
        </div>

        <Sponsors />
      </div>
    </section>
  )
}

export default First

const Sponsors = () => {
  const matches = useMediaQuery("xl")

  return (
    <motion.div
      className="absolute -bottom-2.5 2xl:-bottom-[15px] w-screen md:w-[700px] h-[31.25vw] small-phone:h-[100px] phone:h-fit md:h-[50px] 2xl:w-[800px] 2xl:h-[85px] 3xl:w-[1000px] 3xl:h-[110px] py-2 md:py-0 md:pl-8 small-phone:px-3 phone:px-0 md:pr-6 3xl:pl-10 3xl:pr-8 flex justify-center items-center flex-wrap md:flex-nowrap gap-x-3 3xl:gap-4 bg-black md:[clip-path:polygon(0_0,100%_13%,100%_100%,1%_93%)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: !matches }}
      transition={{ type: "tween", duration: 0.5, delay: 0.8 }}
    >
      <motion.a
        href="https://accounts.commex.com/en/register?ref=E26YU9UR"
        target="_blank"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ type: "tween", duration: 0.5, delay: 0.9 }}
        className="basis-1/4 small-phone:basis-[22%] phone:basis-1/5 md:basis-auto"
      >
        <img src={CommexLogo} alt="Commex" />
      </motion.a>
      <motion.a
        href="https://www.memefi.club/"
        target="_blank"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ type: "tween", duration: 0.5, delay: 1 }}
        className="basis-1/4 small-phone:basis-[22%] phone:basis-1/5 md:basis-auto"
      >
        <img src={MemefiLogo} alt="Memefi" />
      </motion.a>
      <motion.a
        href="https://crossfi.org/"
        target="_blank"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ type: "tween", duration: 0.5, delay: 1.1 }}
        className="basis-1/4 small-phone:basis-[22%] phone:basis-1/5 md:basis-auto"
      >
        <img src={CrossFinanceLogo} alt="Cross Finance" />
      </motion.a>
      <motion.a
        href="https://symbiosis.finance/"
        target="_blank"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ type: "tween", duration: 0.5, delay: 1.2 }}
        className="basis-1/4 small-phone:basis-[22%] phone:basis-1/5 md:basis-auto"
      >
        <img src={SymbiosisLogo} alt="Symbiosis" />
      </motion.a>
      <motion.a
        href="https://tangem.com/ru/pricing/?promocode=CRYPTON"
        target="_blank"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ type: "tween", duration: 0.5, delay: 1.3 }}
        className="basis-1/4 small-phone:basis-[22%] phone:basis-1/5 md:basis-auto"
      >
        <img src={TangemLogo} alt="Tangem" />
      </motion.a>
      <motion.a
        href="https://cyberconnect.me/"
        target="_blank"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ type: "tween", duration: 0.5, delay: 1.4 }}
        className="basis-1/4 small-phone:basis-[22%] phone:basis-1/5 md:basis-auto"
      >
        <img src={CyberConnectLogo} alt="CyberConnect" />
      </motion.a>
      <motion.a
        href="https://dolphin-anty.com/ru/?utm_source=media&utm_medium=cpc&utm_campaign=crypton&utm_content=new_year"
        target="_blank"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ type: "tween", duration: 0.5, delay: 1.5 }}
        className="basis-1/4 small-phone:basis-[22%] phone:basis-1/5 md:basis-auto"
      >
        <img src={DolphinLogo} alt="Dolphin" />
      </motion.a>
      <motion.a
        href="https://multi-ai.pro"
        target="_blank"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: !matches }}
        transition={{ type: "tween", duration: 0.5, delay: 1.6 }}
        className="basis-1/4 small-phone:basis-[22%] phone:basis-1/5 md:basis-auto"
      >
        <img src={MultiAILogo} alt="Dolphin" />
      </motion.a>
    </motion.div>
  )
}
