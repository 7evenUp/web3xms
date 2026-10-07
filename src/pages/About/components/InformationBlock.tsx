import { motion } from "framer-motion"

import TgIcon from "@/assets/icons/about-tg.svg?react"
import WebIcon from "@/assets/icons/web-icon.svg?react"

import { cn } from "@/lib/cn"

const InformationBlock = ({
  heading,
  children,
  linkType,
  link,
  className,
}: {
  heading: string
  children: React.ReactNode
  linkType?: "tg" | "web"
  link?: string
  className?: string
}) => {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-[350px_1fr] gap-x-3 gap-y-2 md:flex absolute bottom-4 l-4 sm:bottom-6 sm:left-8 2xl:bottom-8 3xl:bottom-[44px] 2xl:left-12 pr-4 sm:pr-0",
        className
      )}
      key="first-sponsor"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <h3 className="font-circe-bold text-sm/none 2xl:text-lg/none 3xl:text-2xl/none tracking-wide uppercase w-[150px] 2xl:w-[180px] 3xl:w-[230px] text-white">
        {heading}
      </h3>
      <p className="col-start-1 font-circe-bold text-xs 2xl:text-base 3xl:text-xl tracking-wide w-full md:w-[250px] lg:w-[180px] 2xl:w-[300px] 3xl:w-[380px] text-white/70 md:mr-6 2xl:mr-10">
        {children}
      </p>
      {link && (
        <a
          href={link}
          target="_blank"
          className="flex justify-center w-fit sm:w-full md:w-auto items-center gap-3 h-fit bg-gray text-black font-docker-one text-xs/none 3xl:text-sm/none tracking-[0.2em] pl-2 pr-5 py-2 2xl:pl-3 2xl:pr-6 3xl:py-3 3xl:pl-4 3xl:pr-7 text-center transition-colors hover:bg-blue active:bg-blue/80 [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] mt-3 sm:mt-0"
        >
          {linkType === "tg" ? (
            <TgIcon className="w-[20px] h-[18px] 2xl:w-[24px] 2xl:h-[20px] 3xl:w-[27px] 3xl:h-[23px]" />
          ) : (
            linkType === "web" && (
              <WebIcon className="w-[20px] h-[18px] 2xl:w-[24px] 2xl:h-[20px] 3xl:w-[27px] 3xl:h-[23px]" />
            )
          )}
          подробнее
        </a>
      )}
    </motion.div>
  )
}

export default InformationBlock
