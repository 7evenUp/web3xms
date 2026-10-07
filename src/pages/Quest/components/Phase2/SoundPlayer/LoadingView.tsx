import Loader from "@/assets/icons/loader.svg?react"

import SoundVisualizer from "./SoundVisualizer"

import { cn } from "@/lib/cn"

const LoadingView = ({ accentColor }: { accentColor: string | undefined }) => (
  <div className="w-[132px] h-[54px] relative origin-left scale-[70%] 2xl:scale-[85%] 3xl:scale-100">
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

    <Loader className="absolute left-3 top-3 text-white animate-spin w-5 h-5" />

    <SoundVisualizer accentColor={accentColor} />

    <span className="absolute bottom-0 -right-1 font-docker-one text-sm/none tracking-[0.2em] text-white">
      Загрузка
    </span>
  </div>
)

export default LoadingView
