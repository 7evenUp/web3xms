import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { soundOff, soundOn } from "@/redux/sound/slice"

import Song from "@/assets/audio/new-year.mp3"

import { cn } from "@/lib/cn"

const song = new Audio(Song)
song.loop = true
song.volume = 0.05

const AudioButton = () => {
  const isPlaying = useAppSelector((state) => state.sound.isPlaying)
  const dispath = useAppDispatch()

  const onSoundClick = () => {
    if (!isPlaying) {
      song.play()
      dispath(soundOn())
    } else {
      song.pause()
      dispath(soundOff())
    }
  }

  useEffect(() => {
    if (isPlaying) {
      song.play()
    } else {
      song.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const clickHandler = () => {
      try {
        if (isPlaying) {
          song.play()
        }
      } catch (error) {
        console.log("Not able to play song because of the error: ", error)
      }
    }

    document.addEventListener("click", clickHandler, { once: true })
  }, [])

  return (
    <>
      <button
        onClick={onSoundClick}
        className="group self-stretch flex items-center gap-[5px] py-0 3xl:py-4 scale-75 2xl:scale-100 ml-auto mr-2 sm:mr-0"
      >
        <Stick
          className={cn("h-[20px]", isPlaying ? "group-hover:h-[15px]" : "h-1")}
        />
        <Stick
          className={cn(
            "h-[25px]",
            isPlaying ? "group-hover:h-[11px]" : "h-1 group-hover:h-3"
          )}
        />
        <Stick
          className={cn("h-[30px]", isPlaying ? "group-hover:h-[8px]" : "h-1")}
        />
        <Stick
          className={cn(
            "h-[25px]",
            isPlaying ? "group-hover:h-[11px]" : "h-1 group-hover:h-3"
          )}
        />
        <Stick
          className={cn("h-[20px]", isPlaying ? "group-hover:h-[15px]" : "h-1")}
        />
        <Stick
          className={cn(
            "h-[15px]",
            isPlaying ? "group-hover:h-[20px]" : "h-1 group-hover:h-3"
          )}
        />
        <Stick
          className={cn("h-[11px]", isPlaying ? "group-hover:h-[25px]" : "h-1")}
        />
        <Stick
          className={cn(
            "h-[8px]",
            isPlaying ? "group-hover:h-[30px]" : "h-1 group-hover:h-3"
          )}
        />
        <Stick
          className={cn("h-[11px]", isPlaying ? "group-hover:h-[25px]" : "h-1")}
        />
        <Stick
          className={cn(
            "h-[15px]",
            isPlaying ? "group-hover:h-[20px]" : "h-1 group-hover:h-3"
          )}
        />
      </button>
    </>
  )
}

export default AudioButton

const Stick = ({ className }: { className: string }) => (
  <div
    className={cn(
      "bg-current w-0.5 transition-[height] duration-300",
      className
    )}
  />
)
