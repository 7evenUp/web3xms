import React from "react"

import { cn } from "@/lib/cn"

const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, forwardedRef) => {
  return (
    <input
      className={cn(
        "bg-transparent border border-black text-black rounded-md py-2 px-3 outline-none focus:border-blue placeholder:text-xs aria-[invalid=true]:border-error",
        className
      )}
      ref={forwardedRef}
      {...props}
    />
  )
})
AuthInput.displayName = "AuthInput"

export { AuthInput }
