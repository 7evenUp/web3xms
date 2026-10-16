import { createContext, useContext, useEffect, useRef, useState } from "react"

interface SoundContextData {
  soundSrc: string
  setSoundSrc: (value: string) => void
  isPlaying: boolean
  isLoading: boolean
  error: string
  duration: number
  position: number
  volume: number
  rate: number
  toggle: () => void
  seek: (value: number) => void
  setVolume: (value: number) => void
  setRate: (value: number) => void
}

const SoundContext = createContext<SoundContextData | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useSoundContext = () => {
  const data = useContext(SoundContext)
  if (!data)
    throw new Error("Can not `useSoundContext` outside of the SoundProvider")
  return data
}

const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [soundSrc, setSoundSrc] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [rate, setRate] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setPosition(0)
    setDuration(0)
    setIsPlaying(false)
    setError("")
    setIsLoading(Boolean(soundSrc))
    if (!soundSrc) return

    const audio = new Audio(soundSrc)
    audioRef.current = audio
    let active = true
    audio.onloadedmetadata = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    audio.ontimeupdate = () => setPosition(audio.currentTime)
    audio.onplaying = () => {
      setIsPlaying(true)
      setIsLoading(false)
      setError("")
    }
    audio.onpause = () => {
      setIsPlaying(false)
      setIsLoading(false)
    }
    audio.onwaiting = () => setIsLoading(true)
    audio.oncanplay = () => setIsLoading(false)
    audio.onended = () => {
      setIsPlaying(false)
      setPosition(audio.duration)
    }
    audio.onerror = () => {
      setError("Не удалось загрузить аудио. Попробуйте ещё раз.")
      setIsPlaying(false)
      setIsLoading(false)
    }
    void audio.play().catch(() => {
      if (active && !audio.error) {
        setIsPlaying(false)
        setIsLoading(false)
        setError("Нажмите «Слушать», чтобы запустить аудио.")
      }
    })
    return () => {
      active = false
      audio.onloadedmetadata =
        audio.ontimeupdate =
        audio.onplaying =
        audio.onpause =
          null
      audio.onwaiting = audio.oncanplay = audio.onended = audio.onerror = null
      audio.pause()
      audio.removeAttribute("src")
      audio.load()
      audioRef.current = null
    }
  }, [soundSrc])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume, soundSrc])
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate
  }, [rate, soundSrc])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) audio.pause()
    else {
      setError("")
      if (audio.error) audio.load()
      void audio.play().catch(() => {
        if (audioRef.current !== audio) return
        setIsLoading(false)
        setError("Не удалось запустить аудио. Попробуйте ещё раз.")
      })
    }
  }
  const seek = (value: number) => {
    if (!audioRef.current || !duration) return
    const next = Math.max(0, Math.min(duration, value))
    audioRef.current.currentTime = next
    setPosition(next)
  }

  return (
    <SoundContext.Provider
      value={{
        soundSrc,
        setSoundSrc,
        isPlaying,
        isLoading,
        error,
        duration,
        position,
        volume,
        rate,
        toggle,
        seek,
        setVolume,
        setRate,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export default SoundProvider
