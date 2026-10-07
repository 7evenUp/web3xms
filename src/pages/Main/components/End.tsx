import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

import Robot from "@/assets/images/robot.png"

import CryptusLogo from "@/assets/logos/cryptus-logo.png"
import Connect0Logo from "@/assets/logos/0xconnect-logo.png"
import DequestLogo from "@/assets/logos/dequest-logo.png"
import MonitalksLogo from "@/assets/logos/monitalks-logo.png"
import P2PLogo from "@/assets/logos/p2p-logo.png"
import CryptoBoshLogo from "@/assets/logos/crypto-bosh-logo.png"
import Score0Logo from "@/assets/logos/0xscore-logo.png"

import { useMediaQuery } from "@/hooks/useMedia"

import "./End.css"

const End = () => {
  const matches = useMediaQuery("xl")

  const { search } = useLocation()

  return (
    <section className="bg-black xl:bg-gray p-2.5 2xl:p-[15px] snap-start overflow-hidden">
      <div className="relative bg-gray min-h-[650px] small-phone:min-h-[520px] phone:min-h-[770px] sm:min-h-[900px] lg:min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center md:items-start xl:justify-end pt-[21.875vw] xl:pt-0 pb-4 2xl:pb-6">
        <div className="title-bg-red absolute top-0 pl-[70px]" />

        <div className="relative z-10 flex flex-col gap-4 2xl:gap-8 3xl:gap-12 px-3 sm:px-6 md:px-0 md:pl-[50px] 3xl:pl-[70px]">
          <div className="flex flex-col phone:flex-row gap-4 phone:gap-6 sm:gap-12 3xl:gap-20 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: !matches }}
              transition={{ type: "tween", duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-3 small-phone:gap-7"
            >
              <p className="font-circe-bold text-sm/[125%] 2xl:text-base/[125%] 3xl:text-xl/[125%] tracking-[0.02em] max-w-[300px] 2xl:max-w-[360px] 3xl:max-w-[428px] text-black">
                Следи за анонсами WEB3 Christmas в нашем телеграм канале, чтобы
                не пропустить ничего важного!
              </p>
              <a
                href="https://t.me/web3xms"
                target="_blank"
                className="clip-path-btn w-[140px] small-phone:w-auto sm:w-[200px] h-[40px] 2xl:w-[230px] 2xl:h-[48px] 3xl:w-[280px] 3xl:h-[58px] flex justify-center items-center font-docker-one text-sm 2xl:text-base 3xl:text-lg tracing-[0.2em] bg-black text-white transition-colors hover:bg-white hover:text-black"
              >
                подписаться
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: !matches }}
              transition={{ type: "tween", duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              <p className="font-circe-bold text-sm/[125%] 2xl:text-base/[125%] 3xl:text-xl/[125%] tracking-[0.02em] max-w-[320px] 2xl:max-w-[360px] 3xl:max-w-[428px] text-black">
                {
                  "Бооольшое спасибо нашим партнерам, при поддержке которых мы создали этот праздник для вас <3"
                }
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <a href="https://t.me/CRYPTUS_MEDIA" target="_blank">
                    <img
                      src={CryptusLogo}
                      alt="Cryptus"
                      className="w-[100px] 3xl:w-[120px] transition-transform hover:scale-105"
                    />
                  </a>
                  <a href="https://www.0xconnect.net/" target="_blank">
                    <img
                      src={Connect0Logo}
                      alt="0xConnect"
                      className="w-[60px] 3xl:w-[77px] transition-transform hover:scale-105"
                    />
                  </a>

                  <a href="https://beta.dequest.io/" target="_blank">
                    <img
                      src={DequestLogo}
                      alt="DeQuest"
                      className="w-[100px] 3xl:w-[118px] transition-transform hover:scale-105"
                    />
                  </a>
                  <a href="https://0xscore.io/" target="_blank">
                    <img
                      src={Score0Logo}
                      alt="0xScore"
                      className="w-[100px] 3xl:w-[110px] transition-transform hover:scale-105"
                    />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://t.me/moni_talks" target="_blank">
                    <img
                      src={MonitalksLogo}
                      alt="Moni Talks"
                      className="w-[155px] 3xl:w-[203px] transition-transform hover:scale-105"
                    />
                  </a>
                  <a href="https://t.me/mediap2p" target="_blank">
                    <img
                      src={P2PLogo}
                      alt="Питупи"
                      className="w-[135px] 3xl:w-[147px] transition-transform hover:scale-105"
                    />
                  </a>
                  <a href="https://t.me/cryptobosh" target="_blank">
                    <img
                      src={CryptoBoshLogo}
                      alt="Crypto Bosh"
                      className="w-[135px] 3xl:w-[147px] transition-transform hover:scale-105"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <h2 className="font-paperfiller text-[32px]/none phone:text-[42px]/none 2xl:text-[54px]/none 3xl:text-[68px]/none text-black max-w-[510px] lg:max-w-[490px] 2xl:max-w-[550px] 3xl:max-w-[800px]">
              Погружайся в атмосферу <br className="phone:hidden" /> праздника
              вместе <br className="phone:hidden" /> с героями{" "}
              <br className="phone:hidden" /> криптовалютного{" "}
              <br className="phone:hidden" /> приключения!
            </h2>
            <Link
              to={"/quest/phase-1" + search}
              className="absolute -bottom-12 lg:bottom-[3px] 2xl:bottom-1.5 3xl:bottom-[8px] left-0 lg:left-[190px] 2xl:left-[250px] 3xl:left-[310px] clip-path-btn w-[170px] phone:w-[200px] h-[40px] 2xl:w-[230px] 2xl:h-[48px] 3xl:w-[280px] 3xl:h-[58px] flex justify-center items-center font-docker-one text-sm 2xl:text-base 3xl:text-lg tracing-[0.2em] bg-black text-white transition-colors hover:bg-white hover:text-black"
            >
              принять участие
            </Link>
          </motion.div>
        </div>
        <motion.img
          initial={{ opacity: 0, x: matches ? 200 : 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: !matches }}
          transition={{ type: "tween", duration: 0.7, delay: 0.2 }}
          src={Robot}
          className="absolute bottom-5 small-phone:bottom-0 right-0 2xl:right-[100px] w-[130px] small-phone:w-[150px] phone:w-[260px] sm:w-[320px] xl:w-[350px] 2xl:w-[440px] 3xl:w-[29.6875vw]"
        />
      </div>
    </section>
  )
}

export default End
