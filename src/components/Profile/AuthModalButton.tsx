import React from "react"

import { cn } from "@/lib/cn"

const AuthModalButton = ({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "rounded-full h-[42px] px-4 flex items-center gap-2.5 border border-black text-black hover:bg-black/5 active:bg-black/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default AuthModalButton
