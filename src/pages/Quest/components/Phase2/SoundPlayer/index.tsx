import { useEffect, useState } from "react"
import { Howl } from "howler"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { soundOff } from "@/redux/sound/slice"

import LoadingView from "./LoadingView"
import PlayerView from "./PlayerView"

import { useSoundContext } from "@/components/SoundProvider"

const SoundPlayer = ({
  accentColor,
  soundSrc,
}: {
  accentColor?: string
  soundSrc: string
}) => {
  const { setSoundSrc, soundSrc: contextSoundSrc } = useSoundContext()

  const [remainingTime, setRemainingTime] = useState<null | number>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [howl, setHowl] = useState<Howl | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const bgMusicIsPlaying = useAppSelector((state) => state.sound.isPlaying)
  const dispath = useAppDispatch()

  const handleLoad = function () {
    if (typeof onload === "function") {
      // @ts-expect-error asdasd
      onload.call(this)
    }
    // @ts-expect-error asdasd
    setDuration(this.duration())
    setIsLoading(false)
  }

  useEffect(() => {
    const newHowl = new Howl({
      src: soundSrc,
      html5: true,
      volume: 0.7,
      preload: "metadata",
      onload: handleLoad,
    })

    setHowl(newHowl)

    return () => {
      newHowl.unload()
    }
  }, [])

  const onToggle = () => {
    if (bgMusicIsPlaying) {
      setTimeout(() => {
        dispath(soundOff())
      }, 100)
    }
    setSoundSrc(soundSrc)
  }

  useEffect(() => {
    if (duration !== null) {
      setRemainingTime(Math.floor(duration))
    }
  }, [duration])

  if (isLoading) return <LoadingView accentColor={accentColor} />

  if (howl === null || remainingTime === null) return null

  return (
    <PlayerView
      remainingTime={remainingTime}
      accentColor={accentColor}
      isPlaying={contextSoundSrc === soundSrc}
      onPlayClick={onToggle}
    />
  )
}

export default SoundPlayer
