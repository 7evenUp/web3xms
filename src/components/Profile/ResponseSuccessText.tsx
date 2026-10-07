import { cn } from "@/lib/cn"
import React from "react"

const ResponseSuccessText = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span
      className={cn(
        "text-green-500 text-xs font-medium tracking-wide",
        className
      )}
    >
      {children}
    </span>
  )
}

export default ResponseSuccessText
