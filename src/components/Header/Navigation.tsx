import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/cn"

const Navigation = () => {
  const { pathname, search } = useLocation()

  return (
    <nav className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <ul className="flex gap-1.5 2xl:gap-2.5 3xl:gap-3.5 items-center text-xs 2xl:text-sm 3xl:text-lg font-docker-one">
        {pathname === "/main" ? (
          <MainActiveLink />
        ) : (
          <li>
            <NavLink
              to={"/main" + search}
              className={cn(
                "w-[80px] h-[22px] 2xl:w-[100px] 2xl:h-[26px] 3xl:w-[124px] 3xl:h-[32px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] hover:text-yellow",

                pathname === "/faq" && "hover:text-white"
              )}
            >
              Главная
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to={"/quest/phase-1" + search}
            className={cn(
              "w-[80px] h-[22px] 2xl:w-[100px] 2xl:h-[26px] 3xl:w-[124px] 3xl:h-[32px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] hover:text-yellow",

              (pathname === "/quest/phase-1" ||
                pathname === "/quest/phase-2" ||
                pathname === "/quest/phase-3" ||
                pathname === "/quest/inventory") &&
                "bg-red text-black hover:bg-gray hover:text-black",
              pathname === "/faq" && "hover:text-white"
            )}
          >
            Квест
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/faq" + search}
            className={({ isActive }) =>
              cn(
                "w-[80px] h-[22px] 2xl:w-[100px] 2xl:h-[26px] 3xl:w-[124px] 3xl:h-[32px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] hover:text-yellow",

                isActive && "bg-red hover:bg-gray hover:text-black"
              )
            }
          >
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/about" + search}
            className={({ isActive }) =>
              cn(
                "w-[80px] h-[22px] 2xl:w-[100px] 2xl:h-[26px] 3xl:w-[124px] 3xl:h-[32px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] hover:text-yellow",

                isActive && "bg-gray text-black hover:bg-blue hover:text-black",
                pathname === "/faq" && "hover:text-white"
              )
            }
          >
            О нас
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation

const MainActiveLink = () => {
  const { search } = useLocation()
  const [isMainHovered, setIsMainHovered] = useState(false)

  const { scrollYProgress } = useScroll()
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#FAC70E", "#5772A1", "#5772A1", "#5772A1", "#5772A1", "#FFFFFF"]
  )
  const bgColorHovered = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#5772A1", "#7DC7EB", "#7DC7EB", "#7DC7EB", "#7DC7EB", "#5772A1"]
  )

  return (
    <motion.li
      style={{
        background: isMainHovered ? bgColorHovered : bgColor,
      }}
      className="w-[80px] h-[22px] 2xl:w-[100px] 2xl:h-[26px] 3xl:w-[124px] 3xl:h-[32px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] text-black hover:bg-gray"
      onMouseEnter={() => setIsMainHovered(true)}
      onMouseLeave={() => setIsMainHovered(false)}
    >
      <NavLink
        to={"/main" + search}
        className="w-full h-full flex justify-center items-center"
      >
        Главная
      </NavLink>
    </motion.li>
  )
}
