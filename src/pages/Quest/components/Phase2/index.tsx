import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { isAfter, format } from "date-fns"

import GirlImage from "@/assets/images/phase-2-girl.png"

import Border from "@/assets/svgs/phase-2-container-border.svg?react"

// import BookIcon from "@/assets/icons/book-icon.svg?react"

import { useJourneyStepsQuery } from "@/redux/api/journey"

import { useMediaQuery } from "@/hooks/useMedia"

import Profile from "@/components/Profile"

import Tabs from "../Tabs"

import SoundPlayer from "./SoundPlayer"
import JourneyStep from "./JourneyStep"
import TaskDialog from "./JourneyStep/TaskDialog"

import { cn } from "@/lib/cn"
import FormDialog from "../Inventory/FormDialog"
import { useProfileQuery } from "@/redux/api/profile"

const Phase2 = () => {
  const { search } = useLocation()

  const matches = useMediaQuery("xl")

  const {
    data: journeySteps,
    isSuccess,
    isLoading,
    isError,
  } = useJourneyStepsQuery()
  const { isSuccess: isProfileSuccess } = useProfileQuery()

  const introStep = journeySteps?.find((el) => el.order === 0)

  const audioContents = introStep?.mediaContents.filter(
    (el) => el.mediaContent.type === "audio"
  )

  // return (
  //   <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
  //     <div
  //       className={cn(
  //         "relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col justify-center items-center quest-space-bg bg-auto extra:bg-cover"
  //       )}
  //     >
  //       <Tabs />
  //       <Profile />

  //       <div className="text-4xl phone:text-5xl extra:text-[2.5vw] font-paperfiller text-gray text-center">
  //         Не удалось загрузить истории.
  //         <br />
  //         Пожалуйста, зайдите позже
  //       </div>
  //     </div>
  //   </section>
  // )

  return (
    <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
      <div
        className={cn(
          "relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col justify-center items-center quest-space-bg bg-auto extra:bg-cover",
          introStep && "extra:bg-contain",
          isSuccess && journeySteps.length !== 0 && "justify-end"
        )}
      >
        <Tabs />
        <Profile />

        {isProfileSuccess && <FormDialog />}

        {isLoading && null}

        {isSuccess && journeySteps.length !== 0 && (
          <>
            {introStep && (
              <div className="relative flex flex-col xl:flex-row justify-between xl:items-end w-[90vw] md:w-full max-w-[783px] xl:max-w-none xl:w-[1180px] 2xl:w-[1440px] 3xl:w-[1806px] mt-[270px] lg:mt-[17.44vw] mb-5">
                <motion.div
                  className="relative z-20 w-full xl:w-[380px] 2xl:w-[480px] 3xl:w-[600px] bg-[#CAAC3D] flex flex-col phone:flex-row py-2.5 pl-3 pr-3 phone:pr-0 2xl:py-[18px] 2xl:pl-5 3xl:py-[26px] 3xl:pl-7"
                  initial={{ opacity: 0, x: matches ? -200 : 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="flex flex-col text-black w-full phone:w-[230px] sm:w-[315px] xl:w-[194px] 2xl:w-[236px] 3xl:w-[272px]">
                    <span className="text-white font-circe-bold text-[10px]/[125%] 2xl:text-xs/[125%] tracking-widest mb-2 2xl:mb-6 3xl:mb-8">
                      глава 0 / 8
                    </span>
                    <h2 className="font-drukCyr text-3xl/[90%] sm:text-4xl/[90%] 2xl:text-[42px]/[90%] 3xl:text-[52px]/[90%] tracking-[0.02em] mb-4 2xl:mb-8 3xl:mb-10">
                      Предисловие
                    </h2>
                    <p className="font-circe-bold text-xs/none 3xl:text-sm/none tracking-[0.02em] mb-2 2xl:mb-4 3xl:mb-6">
                      {introStep.description}
                    </p>
                    <Link
                      to={"/notes/" + introStep.id + "/1" + search}
                      className="font-circe-bold text-xs/none 3xl:text-sm/none tracking-[0.02em] underline underline-offset-4 hover:text-white w-fit"
                    >
                      Подробнее
                    </Link>
                  </div>

                  <div className="bg-white/[35%] self-stretch h-0.5 phone:w-0.5 phone:h-auto mt-3 phone:mt-0 phone:ml-3 phone:mr-4 3xl:ml-5 3xl:mr-6" />

                  <div className="flex flex-col items-start small-phone:flex-row-reverse small-phone:justify-between phone:justify-start phone:items-start phone:flex-col gap-3 phone:gap-[18px] pt-4 phone:pt-8">
                    {audioContents && audioContents.length !== 0 && (
                      <SoundPlayer
                        soundSrc={audioContents[0].mediaContent.file}
                      />
                    )}

                    {/* <Link
                      to={"/notes/" + introStep.id + "/1" + search}
                      className="relative group flex items-center w-fit sm:w-auto h-fit bg-white text-white font-docker-one text-[10px]/none 2xl:text-xs/none 3xl:text-sm/none tracking-[0.2em] pl-2 pr-5 py-0.5 2xl:py-1.5 2xl:pl-3 2xl:pr-6 3xl:py-2 3xl:pl-3 3xl:pr-8 text-center transition-colors hover:text-black [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
                    >
                      <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] group-hover:bg-white bg-[#CAAC3D] [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] transition-colors" />
                      <div className="relative flex items-center gap-2 2xl:gap-3 3xl:gap-4">
                        <BookIcon className="w-5 2xl:w-6 3xl:w-7" />
                        читать
                      </div>
                    </Link> */}

                    <TaskDialog />
                  </div>
                </motion.div>
                <motion.div
                  className="relative w-full xl:w-[764px] 2xl:w-[925px] 3xl:w-[1165px] xl:h-[207px] 2xl:h-[250px] 3xl:h-[315px] flex flex-col pl-2.5 py-6 xl:pl-6 xl:pt-12 2xl:pl-8 2xl:pt-16 3xl:pl-10 3xl:pt-20 border-2 border-[#CAAB3D] xl:border-0"
                  initial={{ opacity: 0, x: matches ? 200 : 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <Border className="hidden xl:block w-full h-full absolute left-0 top-0" />
                  <h2 className="font-paperfiller text-3xl/[90%] sm:text-[36px]/[90%] 2xl:text-[48px]/[90%] 3xl:text-[60px]/[90%] text-yellow">
                    Привееет, <br /> искатель приключений!
                  </h2>
                  <p className="text-yellow/70 font-circe-bold text-xs/[125%] phone:text-sm/[125%] 2xl:text-base/[125%] 3xl:text-xl/[125%] tracking-[0.02em] w-[210px] phone:w-[250px] sm:w-[330px] md:w-[450px] 2xl:w-[510px] 3xl:w-[640px] mt-5">
                    Все восемь глав доступны сразу. Читай демо-истории, выполняй задания, получай XP и открывай кейсы с виртуальными подарками!
                  </p>
                  <img
                    src={GirlImage}
                    className="hidden xl:block absolute bottom-[3px] -right-4 w-[280px] 2xl:w-[340px] 3xl:w-[440px]"
                  />
                </motion.div>
                <motion.img
                  src={GirlImage}
                  className="block xl:hidden absolute z-30 bottom-[3px] -right-6 w-[120px] small-phone:w-[160px] phone:w-[190px] md:w-[280px]"
                  initial={{ opacity: 0, x: matches ? 200 : 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                />
              </div>
            )}

            <div className={cn("flex flex-col items-center gap-5 pb-[60px]", !introStep && "mt-[280px] lg:mt-56")}>
              {journeySteps.map((el) => {
                const photos = el.mediaContents.filter(
                  (media) => media.mediaContent.type === "image"
                )

                const audio = el.mediaContents.filter(
                  (media) => media.mediaContent.type === "audio"
                )

                return el.order === 0 ? null : (
                  <JourneyStep
                    id={el.id}
                    key={el.id}
                    order={el.order}
                    accentColor={el.backgroundColor}
                    content={el.description}
                    title={el.title}
                    link={el.taskLink}
                    maxXp={el.maxExpReward}
                    tasks={el.tasksCount}
                    src={photos.length > 0 ? photos[0].mediaContent.file : null}
                    isActive={isAfter(new Date(), new Date(el.startDatetime))}
                    revealDay={format(new Date(el.startDatetime), "dd.MM")}
                    revealTime={format(new Date(el.startDatetime), "HH:mm")}
                    soundSrc={
                      audio.length > 0 ? audio[0].mediaContent.file : null
                    }
                  />
                )
              })}
            </div>
          </>
        )}

        {isError && (
          <div className="text-4xl phone:text-5xl extra:text-[2.5vw] font-paperfiller text-gray text-center">
            Не удалось загрузить истории.
            <br />
            Пожалуйста, зайдите позже
          </div>
        )}
      </div>
    </section>
  )
}

export default Phase2
