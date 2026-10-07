import React from "react"

import { cn } from "@/lib/cn"

const Heading = ({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h2
      className={cn(
        "font-paperfiller text-4xl/none sm:text-[60px]/none 2xl:text-[72px]/none 3xl:text-[93px]/none text-red",
        className
      )}
    >
      {children}
    </h2>
  )
}

export default Heading
