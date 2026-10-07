import React from "react"

import Loader from "@/assets/icons/loader.svg?react"

import { cn } from "@/lib/cn" 

const ActionButton = ({
  className,
  children,
  isLoading,
  ...props
}: React.ComponentProps<"button"> & { isLoading?: boolean }) => {

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 text-base py-2 rounded-md text-black hover:text-white border border-black bg-white hover:bg-black active:bg-opacity-80 transition-colors",
        className
      )}
      {...props}
    >
      {isLoading && (
        <Loader
          className={cn(
            "animate-spin w-3.5 h-3.5"
          )}
        />
      )}
      {children}
    </button>
  )
}

export default ActionButton
