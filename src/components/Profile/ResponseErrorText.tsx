import { cn } from "@/lib/cn"

const ResponseErrorText = ({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <span
      className={cn("text-red text-xs font-medium tracking-wide", className)}
    >
      {children}
    </span>
  )
}

export default ResponseErrorText
