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
  const {
    setSoundSrc,
    soundSrc: contextSoundSrc,
    isPlaying,
    toggle,
  } = useSoundContext()
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const bgMusicIsPlaying = useAppSelector((state) => state.sound.isPlaying)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsLoading(true)
    setDuration(0)
    const audio = new Howl({
      src: soundSrc,
      html5: true,
      preload: "metadata",
      onload: () => {
        setDuration(audio.duration())
        setIsLoading(false)
      },
      onloaderror: () => setIsLoading(false),
    })
    return () => {
      audio.unload()
    }
  }, [soundSrc])

  const onToggle = () => {
    if (bgMusicIsPlaying) dispatch(soundOff())
    if (contextSoundSrc === soundSrc) toggle()
    else setSoundSrc(soundSrc)
  }

  if (isLoading) return <LoadingView accentColor={accentColor} />
  return (
    <PlayerView
      remainingTime={Math.floor(duration)}
      accentColor={accentColor}
      isPlaying={contextSoundSrc === soundSrc && isPlaying}
      onPlayClick={onToggle}
    />
  )
}

export default SoundPlayer
