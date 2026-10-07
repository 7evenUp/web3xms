import PlayIcon from "@/assets/icons/play-icon.svg?react"

import SoundVisualizer from './SoundVisualizer'

import { cn } from "@/lib/cn"

const getMinutes = (seconds: number) => Math.floor(seconds / 60)
const getSeconds = (seconds: number) => {
  const secondsValue = Math.floor(seconds % 60)
  return secondsValue > 9 ? secondsValue : `0${secondsValue}`
}

const PlayerView = ({
  accentColor,
  isPlaying,
  remainingTime,
  onPlayClick
}: {
  accentColor: string | undefined
  isPlaying: boolean
  remainingTime: number
  onPlayClick: () => void
}) => {
  return (
    <div
      className="w-[132px] h-[54px] relative cursor-pointer origin-left scale-[70%] 2xl:scale-[85%] 3xl:scale-100"
      onClick={onPlayClick}
    >
      <div className="absolute left-0 top-0 w-11 h-11 rounded-full bg-white" />
      <div className="absolute left-8 -top-[5px] w-[102px] h-[35px] bg-white [clip-path:polygon(6%_36%,100%0,98%_68%,0%_100%)]" />
      <div
        className={cn(
          "absolute top-[5px] left-1.5 w-8 h-8 rounded-full origin-bottom bg-[#CAAB3D]",
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
      {/* {isPlaying ? (
        <div className="absolute z-20 left-[18px] top-4 flex gap-1 -rotate-[5deg]">
          <div className="h-3 w-0.5 bg-white" />
          <div className="h-3 w-0.5 bg-white" />
        </div>
      ) : ( */}
        <PlayIcon className="absolute left-[18px] top-4 text-white" />
      {/* )} */}

      <SoundVisualizer accentColor={accentColor} isPlaying={isPlaying} />

      <span
        className={cn(
          "absolute top-1 left-[90px] -rotate-6 font-circe-bold text-sm/none tracking-wider text-[#CAAB3D]",
          accentColor === "red" && "text-red",
          accentColor === "green" && "text-[#388863]",
          accentColor === "violet" && "text-[#664DBB]",
          accentColor === "cyan" && "text-[#1D9CAD]",
          accentColor === "gold" && "text-[#99790D]",
          accentColor === "blue" && "text-[#046BB3]",
          accentColor === "purple" && "text-[#B766E5]",
          accentColor === "burgundy" && "text-[#9E3233]"
        )}
      >
        {getMinutes(remainingTime)}:{getSeconds(remainingTime)}
      </span>
      <span className="absolute bottom-0 right-0.5 font-docker-one text-sm/none tracking-[0.2em] text-white">
        слушать
      </span>
    </div>
  )
}

export default PlayerView