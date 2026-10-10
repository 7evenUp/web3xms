import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

import ArrowIcon from "@/assets/icons/notes-arrow.svg?react"
import ArrowLeft from "@/assets/icons/arrow-left.svg?react"
import ArrowRight from "@/assets/icons/arrow-right.svg?react"

import ArrowBorder from "@/assets/svgs/around-arrow-border.svg?react"

import { useJourneyStepsQuery } from "@/redux/api/journey"

import { cn } from "@/lib/cn"

const Notes = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const { data: journeySteps } = useJourneyStepsQuery()
  const { chapter, episode } = useParams()

  if (!chapter || !episode) {
    return <NotAvailable />
  }

  const currentChapter = journeySteps?.find((el) => el.id === parseInt(chapter))

  if (!currentChapter) {
    return <BlankPage />
  }

  if (currentChapter.stories.length === 0) {
    return <NotAvailable />
  }

  if (!/^\d+$/.test(episode) || parseInt(episode) < 1 || parseInt(episode) > currentChapter.stories.length) {
    return <NotAvailable />
  }

  const onPrevClick = () => {
    navigate("/notes/" + chapter + "/" + (parseInt(episode) - 1) + search)
  }

  const onNextClick = () => {
    navigate("/notes/" + chapter + "/" + (parseInt(episode) + 1) + search)
  }

  return (
    <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
      <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center quest-space-bg pb-44 px-4 lg:px-0 bg-auto lg:bg-contain extra2:bg-cover">
        <Link
          to={"/quest/phase-2" + search}
          className="absolute left-4 top-[100px] md:left-6 md:top-[150px] 2xl:left-8 2xl:top-[200px] flex gap-3 xl:gap-5 text-white"
        >
          <ArrowIcon className="w-[30px] md:w-[40px] xl:w-[54px] h-auto" />
          <span className="font-docker-one text-sm/none md:text-base/none xl:text-lg/none tracking-[0.2em] mt-1 md:mt-2 xl:mt-2.5">
            назад
          </span>
        </Link>

        <h1
          className={cn(
            "font-paperfiller text-[52px]/none phone:text-[72px]/none md:text-[110px]/none xl:text-[140px]/none 2xl:text-[170px]/none -tracking-[0.03em] mt-[220px] lg:mt-[120px] 2xl:mt-[170px] w-fit md:w-[660px] xl:w-[820px] 2xl:w-[1000px] text-center mb-2 md:mb-0 text-[#CAAC3D]",
            currentChapter.backgroundColor === "red" && "text-red",
            currentChapter.backgroundColor === "green" && "text-[#388863]",
            currentChapter.backgroundColor === "violet" && "text-[#664DBB]",
            currentChapter.backgroundColor === "cyan" && "text-[#1D9CAD]",
            currentChapter.backgroundColor === "gold" && "text-[#99790D]",
            currentChapter.backgroundColor === "blue" && "text-[#046BB3]",
            currentChapter.backgroundColor === "purple" && "text-[#B766E5]",
            currentChapter.backgroundColor === "burgundy" && "text-[#9E3233]"
          )}
        >
          {currentChapter.title}
        </h1>

        {currentChapter.stories[0].additionalInfo.length !== 0 && (
          <div className="flex flex-col phone:flex-row gap-4 phone:gap-6 md:gap-11 mt-6 phone:mt-0">
            <div
              className={cn(
                "flex flex-col gap-0.5 small-phone:gap-1.5 py-3 small-phone:py-4 pl-6 small-phone:pl-10 phone:pl-8 sm:pl-10 pr-2 md:py-7 md:pl-16 md:pr-2.5 [clip-path:polygon(0_0,100%_4%,98%_100%,9%_93%)] bg-[#CAAC3D]",
                currentChapter.backgroundColor === "red" && "bg-red",
                currentChapter.backgroundColor === "green" && "bg-[#388863]",
                currentChapter.backgroundColor === "violet" && "bg-[#664DBB]",
                currentChapter.backgroundColor === "cyan" && "bg-[#1D9CAD]",
                currentChapter.backgroundColor === "gold" && "bg-[#99790D]",
                currentChapter.backgroundColor === "blue" && "bg-[#046BB3]",
                currentChapter.backgroundColor === "purple" && "bg-[#B766E5]",
                currentChapter.backgroundColor === "burgundy" && "bg-[#9E3233]"
              )}
            >
              <span className="font-circe-bold text-xs/[125%] tracking-widest text-white">
                {currentChapter.stories[0].additionalInfo.length === 0
                  ? "Локация:"
                  : currentChapter.stories[0].additionalInfo[0].title + ":"}
              </span>
              <span className="font-circe-bold text-sm/none tracking-[0.02em] text-black max-w-[360px]">
                {currentChapter.stories[0].additionalInfo.length === 0
                  ? "галактическая система «Медуза», мир Кронос близ Купольного Нестабильного Солнца"
                  : currentChapter.stories[0].additionalInfo[0].text}
              </span>
            </div>
            <div
              className={cn(
                "flex flex-col gap-0.5 small-phone:gap-1.5 py-3 small-phone:py-4 pl-6 small-phone:pl-10 phone:pl-6 pr-2 md:py-7 md:pl-8 md:pr-2.5 [clip-path:polygon(4%_6%,100%_0,100%_90%,0_100%)] bg-[#CAAC3D]",
                currentChapter.backgroundColor === "red" && "bg-red",
                currentChapter.backgroundColor === "green" && "bg-[#388863]",
                currentChapter.backgroundColor === "violet" && "bg-[#664DBB]",
                currentChapter.backgroundColor === "cyan" && "bg-[#1D9CAD]",
                currentChapter.backgroundColor === "gold" && "bg-[#99790D]",
                currentChapter.backgroundColor === "blue" && "bg-[#046BB3]",
                currentChapter.backgroundColor === "purple" && "bg-[#B766E5]",
                currentChapter.backgroundColor === "burgundy" && "bg-[#9E3233]"
              )}
            >
              <span className="font-circe-bold text-xs/[125%] tracking-widest text-white">
                {currentChapter.stories[0].additionalInfo.length === 0
                  ? "Время:"
                  : currentChapter.stories[0].additionalInfo[1].title + ":"}
              </span>
              <span className="font-circe-bold text-sm/none tracking-[0.02em] text-black max-w-[360px]">
                {currentChapter.stories[0].additionalInfo.length === 0
                  ? "канун галактического медузианского Нового Года и Рождества"
                  : currentChapter.stories[0].additionalInfo[1].text}
              </span>
            </div>
          </div>
        )}

        <div
          className={cn(
            "relative flex items-center gap-5 small-phone:gap-[26px] mt-8 text-[#CAAC3D]",
            currentChapter.backgroundColor === "red" && "text-red",
            currentChapter.backgroundColor === "green" && "text-[#388863]",
            currentChapter.backgroundColor === "violet" && "text-[#664DBB]",
            currentChapter.backgroundColor === "cyan" && "text-[#1D9CAD]",
            currentChapter.backgroundColor === "gold" && "text-[#99790D]",
            currentChapter.backgroundColor === "blue" && "text-[#046BB3]",
            currentChapter.backgroundColor === "purple" && "text-[#B766E5]",
            currentChapter.backgroundColor === "burgundy" && "text-[#9E3233]"
          )}
        >
          <button
            onClick={onPrevClick}
            disabled={parseInt(episode) === 1}
            className="group"
          >
            <ArrowLeft className="h-[41.55px] w-auto group-disabled:opacity-60" />
          </button>
          <div className="flex gap-2 small-phone:gap-3">
            {currentChapter.stories.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 w-3 small-phone:w-4 phone:w-[18px] transition-all bg-gray [clip-path:polygon(0_0,97%_37%,100%_100%,0%_100%)]",
                  parseInt(episode) === i + 1 &&
                    "w-7 small-phone:w-10 phone:w-12 bg-[#CAAC3D]",
                  currentChapter.backgroundColor === "red" &&
                    parseInt(episode) === i + 1 &&
                    "bg-red",
                  currentChapter.backgroundColor === "green" &&
                    parseInt(episode) === i + 1 &&
                    "bg-[#388863]",
                  currentChapter.backgroundColor === "violet" &&
                    parseInt(episode) === i + 1 &&
                    "bg-[#664DBB]",
                  currentChapter.backgroundColor === "cyan" &&
                    parseInt(episode) === i + 1 &&
                    "bg-[#1D9CAD]",
                  currentChapter.backgroundColor === "gold" &&
                    parseInt(episode) === i + 1 &&
                    "bg-[#99790D]",
                  currentChapter.backgroundColor === "blue" &&
                    parseInt(episode) === i + 1 &&
                    "bg-[#046BB3]",
                  currentChapter.backgroundColor === "purple" &&
                    parseInt(episode) === i + 1 &&
                    "bg-[#B766E5]",
                  currentChapter.backgroundColor === "burgundy" &&
                    parseInt(episode) === i + 1 &&
                    "bg-[#9E3233]"
                )}
              />
            ))}
          </div>
          <button
            onClick={onNextClick}
            disabled={parseInt(episode) === currentChapter.stories.length}
            className="group"
          >
            <ArrowRight className="h-[36.41px] w-auto group-disabled:opacity-60" />
          </button>
          <p className="absolute left-1/2 top-full -translate-x-1/2 font-circe-bold text-sm/[125%] phone:text-lg/[125%] tracking-widest text-white w-32 text-center">
            эпизод {episode}
          </p>
        </div>

        <h2 className="font-drukCyr text-4xl/none phone:text-5xl/none md:text-[60px] text-white my-10 text-center">
          {currentChapter.stories[parseInt(episode) - 1].title}
        </h2>

        <article
          className="w-[90vw] lg:w-[930px] bg-black px-2 small-phone:px-3 py-4 phone:p-6 md:p-10 text-white/80 whitespace-pre-wrap font-circe-regular text-sm/[160%] phone:text-base/[160%] md:text-lg/[160%] tracking-[0.01em]"
          dangerouslySetInnerHTML={{
            __html: currentChapter.stories[parseInt(episode) - 1].text,
          }}
        />

        <div className="w-[90vw] lg:w-[930px] mt-10 md:mt-16 flex justify-between items-start small-phone:items-center gap-3 small-phone:gap-0 flex-col small-phone:flex-row">
          <button
            onClick={onPrevClick}
            disabled={parseInt(episode) === 1}
            className={cn(
              "relative group flex items-center bg-[#CAAC3D] text-white font-docker-one text-[10px]/none phone:text-xs/none sm:text-sm/none md:text-lg/none tracking-[0.2em] py-3 pl-2 pr-2 phone:py-4 phone:pl-2.5 phone:pr-3 md:py-[22px] md:pl-[11px] md:pr-[18px] text-center [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] disabled:bg-white/50 disabled:text-white/50 hover:scale-95 disabled:hover:scale-100",
              currentChapter.backgroundColor === "red" && "bg-red",
              currentChapter.backgroundColor === "green" && "bg-[#388863]",
              currentChapter.backgroundColor === "violet" && "bg-[#664DBB]",
              currentChapter.backgroundColor === "cyan" && "bg-[#1D9CAD]",
              currentChapter.backgroundColor === "gold" && "bg-[#99790D]",
              currentChapter.backgroundColor === "blue" && "bg-[#046BB3]",
              currentChapter.backgroundColor === "purple" && "bg-[#B766E5]",
              currentChapter.backgroundColor === "burgundy" && "bg-[#9E3233]"
            )}
          >
            <div
              className={cn(
                "w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] bg-black [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
              )}
            />
            <div className="relative flex items-center">предыдущий эпизод</div>
          </button>
          <button
            onClick={onNextClick}
            disabled={parseInt(episode) === currentChapter.stories.length}
            className={cn(
              "relative group flex items-center bg-[#CAAC3D] text-white font-docker-one text-[10px]/none phone:text-xs/none sm:text-sm/none md:text-lg/none tracking-[0.2em] py-3 pl-2 pr-2 phone:py-4 phone:pl-2.5 phone:pr-3 md:py-[22px] md:pl-[11px] md:pr-[18px] text-center [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] disabled:bg-white/50 disabled:text-white/50 hover:scale-95 disabled:hover:scale-100",
              currentChapter.backgroundColor === "red" && "bg-red",
              currentChapter.backgroundColor === "green" && "bg-[#388863]",
              currentChapter.backgroundColor === "violet" && "bg-[#664DBB]",
              currentChapter.backgroundColor === "cyan" && "bg-[#1D9CAD]",
              currentChapter.backgroundColor === "gold" && "bg-[#99790D]",
              currentChapter.backgroundColor === "blue" && "bg-[#046BB3]",
              currentChapter.backgroundColor === "purple" && "bg-[#B766E5]",
              currentChapter.backgroundColor === "burgundy" && "bg-[#9E3233]"
            )}
          >
            <div
              className={cn(
                "w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] bg-black [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
              )}
            />
            <div className="relative flex items-center">следующий эпизод</div>
          </button>
        </div>

        <button
          className="absolute w-16 h-16 bottom-20 xl:bottom-44 right-4 lg:right-20 transition-transform hover:scale-95"
          onClick={() => window.scrollTo(0, 0)}
        >
          <ArrowBorder
            className={cn(
              "absolute left-0 top-0 text-[#CAAC3D]",
              currentChapter.backgroundColor === "red" && "text-red",
              currentChapter.backgroundColor === "green" && "text-[#388863]",
              currentChapter.backgroundColor === "violet" && "text-[#664DBB]",
              currentChapter.backgroundColor === "cyan" && "text-[#1D9CAD]",
              currentChapter.backgroundColor === "gold" && "text-[#99790D]",
              currentChapter.backgroundColor === "blue" && "text-[#046BB3]",
              currentChapter.backgroundColor === "purple" && "text-[#B766E5]",
              currentChapter.backgroundColor === "burgundy" && "text-[#9E3233]"
            )}
          />
          <ArrowIcon className="absolute left-2 top-6 rotate-[96deg]" />
        </button>
      </div>
    </section>
  )
}

export default Notes

const NotAvailable = () => {
  const { search } = useLocation()

  return (
    <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
      <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center quest-space-bg pb-44 px-4 lg:px-0">
        <Link
          to={"/quest/phase-2" + search}
          className="absolute left-4 top-[100px] md:left-6 md:top-[150px] 2xl:left-8 2xl:top-[200px] flex gap-3 xl:gap-5 text-white"
        >
          <ArrowIcon className="w-[30px] md:w-[40px] xl:w-[54px] h-auto" />
          <span className="font-docker-one text-sm/none md:text-base/none xl:text-lg/none tracking-[0.2em] mt-1 md:mt-2 xl:mt-2.5">
            назад
          </span>
        </Link>

        <h1
          className={cn(
            "font-paperfiller text-[42px]/none phone:text-[52px]/none md:text-[72px]/none xl:text-[90px]/none 2xl:text-[120px]/none 3xl:text-[140px]/none -tracking-[0.03em] mt-[220px] lg:mt-[120px] 2xl:mt-[170px] w-fit md:w-[660px] xl:w-[820px] 2xl:w-[1200px] text-center mb-2 md:mb-0 text-[#CAAC3D]"
          )}
        >
          Данная история ещё не открыта, <br />
          либо в процессе обновления, <br />
          либо не существует
        </h1>
      </div>
    </section>
  )
}

const BlankPage = () => {
  const { search } = useLocation()

  return (
    <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
      <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center quest-space-bg pb-44 px-4 lg:px-0">
        <Link
          to={"/quest/phase-2" + search}
          className="absolute left-4 top-[100px] md:left-6 md:top-[150px] 2xl:left-8 2xl:top-[200px] flex gap-3 xl:gap-5 text-white"
        >
          <ArrowIcon className="w-[30px] md:w-[40px] xl:w-[54px] h-auto" />
          <span className="font-docker-one text-sm/none md:text-base/none xl:text-lg/none tracking-[0.2em] mt-1 md:mt-2 xl:mt-2.5">
            назад
          </span>
        </Link>
      </div>
    </section>
  )
}
