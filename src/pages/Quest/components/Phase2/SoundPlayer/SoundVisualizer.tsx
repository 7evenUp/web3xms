import { cn } from '@/lib/cn'

const SoundVisualizer = ({
  accentColor,
  isPlaying,
}: {
  isPlaying?: boolean
  accentColor?: string
}) => (
  <div className="absolute left-[44px] top-[9px] z-10 flex items-end gap-[3px] -rotate-6 origin-bottom">
    <div
      className={cn(
        "origin-bottom bg-[#CAAB3D] w-0.5 h-2.5",
        accentColor === "red" && "bg-red",
        accentColor === "green" && "bg-[#388863]",
        accentColor === "violet" && "bg-[#664DBB]",
        accentColor === "cyan" && "bg-[#1D9CAD]",
        accentColor === "gold" && "bg-[#99790D]",
        accentColor === "blue" && "bg-[#046BB3]",
        accentColor === "purple" && "bg-[#B766E5]",
        accentColor === "burgundy" && "bg-[#9E3233]",
        isPlaying && "animate-scale-h-sm"
      )}
    />
    <div
      className={cn(
        "origin-bottom bg-[#CAAB3D] w-0.5 h-[13px]",
        accentColor === "red" && "bg-red",
        accentColor === "green" && "bg-[#388863]",
        accentColor === "violet" && "bg-[#664DBB]",
        accentColor === "cyan" && "bg-[#1D9CAD]",
        accentColor === "gold" && "bg-[#99790D]",
        accentColor === "blue" && "bg-[#046BB3]",
        accentColor === "purple" && "bg-[#B766E5]",
        accentColor === "burgundy" && "bg-[#9E3233]",
        isPlaying && "animate-scale-h-md [animation-delay:100ms]"
      )}
    />
    <div
      className={cn(
        "origin-bottom bg-[#CAAB3D] w-0.5 h-[9px]",
        accentColor === "red" && "bg-red",
        accentColor === "green" && "bg-[#388863]",
        accentColor === "violet" && "bg-[#664DBB]",
        accentColor === "cyan" && "bg-[#1D9CAD]",
        accentColor === "gold" && "bg-[#99790D]",
        accentColor === "blue" && "bg-[#046BB3]",
        accentColor === "purple" && "bg-[#B766E5]",
        accentColor === "burgundy" && "bg-[#9E3233]",
        isPlaying && "animate-scale-h-sm [animation-delay:200ms]"
      )}
    />
    <div
      className={cn(
        "origin-bottom bg-[#CAAB3D] w-0.5 h-[13px]",
        accentColor === "red" && "bg-red",
        accentColor === "green" && "bg-[#388863]",
        accentColor === "violet" && "bg-[#664DBB]",
        accentColor === "cyan" && "bg-[#1D9CAD]",
        accentColor === "gold" && "bg-[#99790D]",
        accentColor === "blue" && "bg-[#046BB3]",
        accentColor === "purple" && "bg-[#B766E5]",
        accentColor === "burgundy" && "bg-[#9E3233]",
        isPlaying && "animate-scale-h-md [animation-delay:300ms]"
      )}
    />
    <div
      className={cn(
        "origin-bottom bg-[#CAAB3D] w-0.5 h-[10px]",
        accentColor === "red" && "bg-red",
        accentColor === "green" && "bg-[#388863]",
        accentColor === "violet" && "bg-[#664DBB]",
        accentColor === "cyan" && "bg-[#1D9CAD]",
        accentColor === "gold" && "bg-[#99790D]",
        accentColor === "blue" && "bg-[#046BB3]",
        accentColor === "purple" && "bg-[#B766E5]",
        accentColor === "burgundy" && "bg-[#9E3233]",
        isPlaying && "animate-scale-h-sm [animation-delay:400ms]"
      )}
    />
    <div
      className={cn(
        "origin-bottom bg-[#CAAB3D] w-0.5 h-2",
        accentColor === "red" && "bg-red",
        accentColor === "green" && "bg-[#388863]",
        accentColor === "violet" && "bg-[#664DBB]",
        accentColor === "cyan" && "bg-[#1D9CAD]",
        accentColor === "gold" && "bg-[#99790D]",
        accentColor === "blue" && "bg-[#046BB3]",
        accentColor === "purple" && "bg-[#B766E5]",
        accentColor === "burgundy" && "bg-[#9E3233]",
        isPlaying && "animate-scale-h-md [animation-delay:500ms]"
      )}
    />
    <div
      className={cn(
        "origin-bottom bg-[#CAAB3D] w-0.5 h-1.5",
        accentColor === "red" && "bg-red",
        accentColor === "green" && "bg-[#388863]",
        accentColor === "violet" && "bg-[#664DBB]",
        accentColor === "cyan" && "bg-[#1D9CAD]",
        accentColor === "gold" && "bg-[#99790D]",
        accentColor === "blue" && "bg-[#046BB3]",
        accentColor === "purple" && "bg-[#B766E5]",
        accentColor === "burgundy" && "bg-[#9E3233]",
        isPlaying && "animate-scale-h-sm [animation-delay:600ms]"
      )}
    />
    <div
      className={cn(
        "origin-bottom bg-[#CAAB3D] w-0.5 h-1",
        accentColor === "red" && "bg-red",
        accentColor === "green" && "bg-[#388863]",
        accentColor === "violet" && "bg-[#664DBB]",
        accentColor === "cyan" && "bg-[#1D9CAD]",
        accentColor === "gold" && "bg-[#99790D]",
        accentColor === "blue" && "bg-[#046BB3]",
        accentColor === "purple" && "bg-[#B766E5]",
        accentColor === "burgundy" && "bg-[#9E3233]",
        isPlaying && "animate-scale-h-md [animation-delay:700ms]"
      )}
    />
  </div>
)

export default SoundVisualizer