import { useDemoProgressQuery } from "@/redux/api/demo"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

import TasksDone from "@/assets/svgs/tasks-done.svg?react"
// import BookIcon from "@/assets/icons/book-icon.svg?react"
import Loader from "@/assets/icons/loader.svg?react"

import SoundPlayer from "../SoundPlayer"
import TaskDialog from "./TaskDialog"

import { cn } from "@/lib/cn"

interface IJourneyStep {
  title: string
  content: string
  src: string | null
  accentColor: string
  isActive: boolean
  isDone?: boolean
  revealDay?: string
  revealTime?: string
  tasks: number
  maxXp: number
  link: string | null
}

const JourneyStep = ({
  id,
  order,
  title,
  content,
  src,
  className,
  isActive,
  revealDay,
  revealTime,
  accentColor,
  maxXp,
  tasks,
  isDone: providedIsDone,
  soundSrc,
}: IJourneyStep & {
  id: number
  order: number
  className?: string
  soundSrc: string | null
}) => {
  const { search } = useLocation()
  const { data: completed } = useDemoProgressQuery()
  const isDone = providedIsDone || completed?.includes(id)

  if (title === null) {
    return <LoadingJourneyView />
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
        viewport={{ once: true, amount: 0.1 }}
        className={cn(
          "relative flex flex-col xl:flex-row xl:h-[300px] 2xl:h-[330px] 3xl:h-[430px] w-[90vw] md:w-auto xl:w-[1180px] 2xl:w-[1440px] 3xl:w-[1806px] border-2 2xl:border-[3px]",
          isDone && "xl:h-[200px] 2xl:h-[230px] 3xl:h-[261px]",
          accentColor === "red" && "border-red",
          accentColor === "green" && "border-[#388863]",
          accentColor === "violet" && "border-[#664DBB]",
          accentColor === "cyan" && "border-[#1D9CAD]",
          accentColor === "gold" && "border-[#99790D]",
          accentColor === "blue" && "border-[#046BB3]",
          accentColor === "purple" && "border-[#B766E5]",
          accentColor === "burgundy" && "border-[#9E3233]",
          className
        )}
      >
        <div
          className={cn(
            "flex-1 height-full bg-[#CAAC3D] flex flex-col phone:flex-row py-2.5 pl-3 pr-3 phone:pr-0 2xl:py-[18px] 2xl:pl-5 3xl:py-[26px] 3xl:pl-7",
            isDone && "justify-between xl:justify-start",
            accentColor === "red" && "bg-red",
            accentColor === "green" && "bg-[#388863]",
            accentColor === "violet" && "bg-[#664DBB]",
            accentColor === "cyan" && "bg-[#1D9CAD]",
            accentColor === "gold" && "bg-[#99790D]",
            accentColor === "blue" && "bg-[#046BB3]",
            accentColor === "purple" && "bg-[#B766E5]",
            accentColor === "burgundy" && "bg-[#9E3233]"
          )}
        >
          <div
            className={cn(
              "flex flex-col text-black w-full phone:w-[230px] sm:w-[315px] xl:w-[198px] 2xl:w-[235px] 3xl:w-[272px]",
              isDone && "w-[260px]"
            )}
          >
            <span className="text-white font-circe-bold text-xs/[125%] tracking-widest mb-1 2xl:mb-2 3xl:mb-4">
              глава {order} / 8
            </span>
            <h2
              className={cn(
                "font-drukCyr text-3xl/[90%] sm:text-4xl/[90%] 2xl:text-[42px]/[90%] 3xl:text-[52px]/[90%] tracking-[0.02em] mb-4 xl:mb-4",
                isDone && "md:w-60 xl:w-auto"
              )}
            >
              {title}
            </h2>
            {!isDone && (
              <p
                className={cn(
                  "font-circe-bold text-xs/none 3xl:text-sm/none tracking-[0.02em] mt-auto",
                  isActive && "mb-1 2xl:mb-2 3xl:mb-4"
                )}
              >
                {content}
              </p>
            )}
            {isActive && (
              <Link
                to={"/notes/" + id + "/1" + search}
                className="font-circe-bold text-xs/none 3xl:text-sm/none tracking-[0.02em] underline underline-offset-4 hover:text-white w-fit"
              >
                Подробнее
              </Link>
            )}
          </div>
          <div
            className={cn(
              "bg-white/[35%] self-stretch h-0.5 phone:h-auto phone:w-0.5 ml-1 mr-3 mt-3 phone:mt-0 2xl:ml-3 2xl:mr-4 3xl:ml-5 3xl:mr-6",
              isDone && "hidden xl:block"
            )}
          />
          <div className="relative flex flex-col gap-2.5 3xl:gap-[18px] pt-5 3xl:pt-7">
            {isActive ? (
              <>
                {soundSrc && (
                  <div
                    className={cn(
                      "block small-phone:absolute small-phone:right-0 phone:static phone:right-auto",
                      isDone && "small-phone:static small-phone:right-auto"
                    )}
                  >
                    <SoundPlayer
                      accentColor={accentColor}
                      soundSrc={soundSrc}
                    />
                  </div>
                )}

                {/* <Link
                  to={"/notes/" + id + "/1" + search}
                  className="relative group flex items-center w-fit h-fit bg-white text-white font-docker-one text-[10px]/none 2xl:text-xs/none 3xl:text-sm/none tracking-[0.2em] pl-2 pr-5 py-0.5 2xl:py-1.5 2xl:pl-3 2xl:pr-6 3xl:py-2 3xl:pl-3 3xl:pr-8 text-center transition-colors hover:text-black [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
                >
                  <div
                    className={cn(
                      "w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] group-hover:bg-white bg-[#CAAC3D] [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] transition-colors",
                      accentColor === "red" && "bg-red",
                      accentColor === "green" && "bg-[#388863]",
                      accentColor === "violet" && "bg-[#664DBB]",
                      accentColor === "cyan" && "bg-[#1D9CAD]",
                      accentColor === "gold" && "bg-[#99790D]",
                      accentColor === "blue" && "bg-[#046BB3]",
                      accentColor === "purple" && "bg-[#B766E5]",
                      accentColor === "burgundy" && "bg-[#9E3233]"
                    )}
                  />
                  <div className="relative flex items-center gap-2 2xl:gap-3 3xl:gap-4">
                    <BookIcon className="w-5 2xl:w-6 3xl:w-7" />
                    читать
                  </div>
                </Link> */}

                {!isDone && <TaskDialog accentColor={accentColor} chapterId={id} />}
              </>
            ) : (
              <p className="text-white/40 font-docker-one text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em]">
                Доступ <br /> к главе <br /> появится <br /> {revealDay} <br />{" "}
                в {revealTime}
              </p>
            )}

            {!isDone && tasks !== 0 && maxXp !== 0 && (
              <div
                className={cn(
                  "mt-auto font-circe-bold text-[10px]/none 2xl:text-xs/none 3xl:text-sm/none tracking-[0.02em] flex flex-col text-white/40",
                  isActive && "text-white"
                )}
              >
                <span>Количество заданий: {tasks}</span>
                <span>Макс. количество баллов: {maxXp} XP</span>
              </div>
            )}
          </div>
        </div>

        {isDone && (
          <TasksDone className="w-[130px] small-phone:w-[170px] phone:w-[130px] md:w-[200px] 2xl:w-[250px] 3xl:w-[293px] absolute top-[72px] small-phone:top-16 right-2.5 phone:right-auto phone:left-1/2 phone:top-[110px] md:top-[23%] xl:top-1/2 phone:-translate-x-1/2 phone:-translate-y-1/2" />
        )}

        <div className="overflow-hidden">
          {src && (
            <img
              src={src}
              alt={title}
              className={cn(
                " w-[780px] 2xl:w-[950px] 3xl:w-[1200px] h-[145px] phone:h-full object-cover",
                !isActive && "[filter:blur(8px)]",
                isDone && "xl:w-[500px] 2xl:w-[600px] 3xl:w-[770px]"
              )}
            />
          )}
        </div>
      </motion.div>
    )
  }
}

export default JourneyStep

const LoadingJourneyView = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ type: "tween", duration: 0.4, delay: 0.1 }}
    viewport={{ once: true, amount: 0.1 }}
    className="h-[200px] xl:h-[300px] 2xl:h-[330px] 3xl:h-[430px] w-[90vw] xl:w-[1180px] 2xl:w-[1440px] 3xl:w-[1806px] bg-gray animate-pulse flex justify-center items-center"
  >
    <div className="flex items-center gap-3 phone:gap-4 text-white">
      <Loader className="w-6 h-6 phone:w-8 phone:h-8 md:w-10 md:h-10 animate-spin" />
      <p className="font-docker-one text-sm/none phone:text-xl/none sm:text-2xl/none md:text-3xl/none lg:text-4xl/none tracking-[0.2em]">
        История обновляется
      </p>
    </div>
  </motion.div>
)
