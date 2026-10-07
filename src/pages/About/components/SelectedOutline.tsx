import Outline from "@/assets/svgs/about-outline-selected.svg?react"

import { cn } from "@/lib/cn"

const SelectedOutline = ({ className }: { className?: string }) => {
  return (
    <Outline
      className={cn(
        "w-[110px] h-[112px] 2xl:w-[130px] 2xl:h-[134px] 3xl:w-[159px] 3xl:h-[164px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-90 transition-transform",
        className
      )}
    />
  )
}

export default SelectedOutline
