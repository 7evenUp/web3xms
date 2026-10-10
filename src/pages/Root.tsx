import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Howl } from "howler"
import { Pause, Play, Xmark } from "iconoir-react"

import DemoNotice from "@/components/DemoNotice"
import Header from "@/components/Header"
import ScrollToTop from "@/components/ScrollToTop"
import { useSoundContext } from "@/components/SoundProvider"

import "./Root.css"

const getMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  return minutes > 9 ? minutes : `0${minutes}`
}
const getSeconds = (seconds: number) => {
  const secondsValue = Math.floor(seconds % 60)
  return secondsValue > 9 ? secondsValue : `0${secondsValue}`
}

const Root = () => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()

  const { soundSrc } = useSoundContext()

  useEffect(() => {
    if (pathname === "/") {
      navigate("/main" + search, { replace: true })
    }
    if (pathname === "/quest") {
      navigate("/quest/phase-1" + search, { replace: true })
    }
  }, [pathname, search, navigate])

  return (
    <ScrollToTop>
      <Header />
      <DemoNotice />
      <main className="w-full flex flex-col justify-center">
        <Outlet />

        {soundSrc && <FloatingSoundPlayer />}
      </main>
    </ScrollToTop>
  )
}

const FloatingSoundPlayer = () => {
  const [howl, setHowl] = useState<Howl | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [timePassed, setTimePassed] = useState<number | null>(null)

  const { soundSrc, setSoundSrc } = useSoundContext()

  useEffect(() => {
    setDuration(null)
    setTimePassed(0)
    const newHowl = new Howl({
      src: soundSrc, html5: true, volume: 0.7, preload: "metadata", autoplay: true,
      onload: () => { setDuration(newHowl.duration()); setIsPlaying(true) },
      onend: () => setSoundSrc(""),
    })
    setHowl(newHowl)
    return () => { newHowl.unload() }
  }, [soundSrc, setSoundSrc])
  useEffect(() => {
    if (!howl || !isPlaying) return
    const interval = setInterval(() => setTimePassed(Number(howl.seek()) || 0), 250)
    return () => clearInterval(interval)
  }, [howl, isPlaying])

  const onButtonClick = () => {
    if (howl?.playing()) {
      howl.pause()
      setIsPlaying(false)
    } else {
      howl?.play()
      setIsPlaying(true)
    }
  }

  const onCloseClick = () => {
    howl?.unload()
    setSoundSrc("")
  }

  if (howl === null || duration === null) return null

  return (
    <div className="group fixed flex items-center gap-3 pl-2 pr-2 z-[9999] bottom-0 right-0 sm:bottom-auto sm:right-7 sm:top-24 md:right-9 2xl:top-28 2xl:right-10 w-screen sm:w-[320px] 2xl:w-[360px] 3xl:w-[420px] sm:rounded-lg py-2 phone:py-3 sm:py-2 2xl:py-2 bg-gray text-white animate-in fade-in-50 slide-in-from-right-10 shadow-sm shadow-black/20">
      <button aria-label={isPlaying ? "Пауза аудио" : "Продолжить аудио"} onClick={onButtonClick}>
        {isPlaying ? (
          <Pause className="hover:fill-white 3xl:w-7 3xl:h-7" />
        ) : (
          <Play className="hover:fill-white 3xl:w-7 3xl:h-7" />
        )}
      </button>
      <div className="text-xs/none phone:text-sm/none 3xl:text-base/none flex items-center gap-3 flex-1">
        <div className="select-none">
          {timePassed !== null &&
            getMinutes(timePassed) + ":" + getSeconds(timePassed)}
        </div>
        <div
          className="relative flex-1 h-0.5 3xl:h-[3px] py-1.5 cursor-pointer"
          onMouseDown={(event) => {
            const x = event.clientX
            const { left, width } = event.currentTarget.getBoundingClientRect()
            const xClicked = x - left
            const xClickedInPercent = (xClicked * 100) / width
            const trimXClickedValue =
              xClickedInPercent < 0 ? 0 : xClickedInPercent

            howl.seek((duration * trimXClickedValue) / 100)
            setTimePassed((duration * trimXClickedValue) / 100)
          }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 3xl:h-[3px] bg-black rounded-sm" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 3xl:h-[3px] bg-white rounded-sm"
            style={{
              width:
                ((timePassed !== null ? timePassed : 0) * 100) / duration + "%",
            }}
          />
        </div>
        <div className="select-none">
          {getMinutes(duration)}:{getSeconds(duration)}
        </div>
      </div>
      <button
        aria-label="Закрыть аудиоплеер"
        className="rounded-md hover:bg-blue/30 border border-blue/30 ml-auto z-[10000]"
        onClick={onCloseClick}
      >
        <Xmark className="w-4 h-4 2xl:w-5 2xl:h-5" />
      </button>
    </div>
  )
}

export default Root
