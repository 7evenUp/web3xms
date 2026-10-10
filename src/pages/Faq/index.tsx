import { motion } from "framer-motion"

import TgIcon from "@/assets/icons/telegram-icon.svg?react"
import MailIcon from "@/assets/icons/mail-icon.svg?react"

import FaqAccordion from "./components/FaqAccordion"

const Faq = () => {
  return (
    <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
      <div className="relative min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] bg-yellow flex flex-col pt-28 phone:pt-32 sm:pt-40 xl:pt-20 2xl:pt-24 3xl:pt-40">
        <div className="title-bg absolute top-0" />

        <FaqAccordion />

        <div className="static pl-6 pb-6 md:pl-10 mt-10 lg:mt-0 xl:p-0 xl:absolute xl:left-6 xl:bottom-12 2xl:left-[30px] 2xl:bottom-[60px] 3xl:left-[44px] 3xl:bottom-[80px]">
          <motion.h2
            className="font-paperfiller text-red text-5xl/none xl:text-[60px] 2xl:text-[72px] 3xl:text-[93px]"
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "tween", duration: 0.4 }}
          >
            F.A.Q.
          </motion.h2>
          <motion.p
            className="font-circe-bold text-black text-base/[90%] xl:text-lg/[90%] 2xl:text-xl/[90%] 3xl:text-2xl/[90%] max-w-[260px] 2xl:max-w-[300px] 3xl:max-w-[360px]"
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "tween", duration: 0.4 }}
          >
            Исследуй демо: выполняй задания, получай XP и открывай кейсы с виртуальными подарками
          </motion.p>
          <motion.a
            href="/quest/phase-3"
            className="flex items-center relative group w-[190px] h-[42px] 2xl:w-[220px] 2xl:h-[50px] 3xl:w-[260px] 3xl:h-[57px] font-docker-one text-sm/none 2xl:text-base/none 3xl:text-lg/none tracking-[0.2em] transition-color [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] text-red bg-red hover:text-yellow mt-6 mb-3 2xl:mt-8 3xl:mt-10 3xl:mb-5"
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "tween", duration: 0.4 }}
          >
            <div className="absolute inset-[3px] transition-colors bg-yellow group-hover:bg-red [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]" />
            <div className="relative z-10 flex items-center gap-1.5 ml-4 3xl:gap-3.5 3xl:ml-6">
              <TgIcon className="w-6 h-6 3xl:w-[28px] 3xl:h-[28px]" />
              К кейсам
            </div>
          </motion.a>
          <motion.a
            href="/quest/phase-2"
            className="flex items-center relative group w-[190px] h-[42px] 2xl:w-[220px] 2xl:h-[50px] 3xl:w-[260px] 3xl:h-[57px] font-docker-one text-sm/none 2xl:text-base/none 3xl:text-lg/none tracking-[0.2em] transition-color [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] text-red bg-red hover:text-yellow"
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "tween", duration: 0.4 }}
          >
            <div className="absolute inset-0.5 2xl:inset-[3px] transition-colors bg-yellow group-hover:bg-red [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]" />
            <div className="relative z-10 flex items-center gap-6 2xl:gap-8 3xl:gap-10 ml-4 3xl:ml-6">
              <MailIcon className="w-6 h-6 3xl:w-[28px] 3xl:h-[28px]" />
              Задания
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default Faq
