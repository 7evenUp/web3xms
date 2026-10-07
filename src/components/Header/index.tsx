import { Link, useLocation } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

import Web3Icon from "@/assets/icons/web3xms.svg?react"

import Navigation from "./Navigation"
import AudioButton from "./AudioButton"

import { cn } from "@/lib/cn"
import MobileMenu from "./MobileMenu"
import { useMediaQuery } from "@/hooks/useMedia"

const Header = () => {
  const { pathname, search } = useLocation()

  const matches = useMediaQuery("sm")

  const { scrollYProgress } = useScroll()

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      matches ? "#141831" : "#FFFFFF",
    ]
  )

  return (
    <motion.header
      key={pathname}
      style={{
        color:
          pathname === "/main"
            ? textColor
            : pathname === "/faq"
            ? "#141831"
            : "#FFFFFF",
      }}
      className={cn(
        "fixed z-50 flex justify-between items-center w-full mt-2.5 md:mt-[30px] 2xl:mt-[40px] 3xl:mt-[50px] px-6 md:px-8 2xl:px-[44px]"
      )}
    >
      <Link to={"/main" + search}>
        <Web3Icon className="w-[80px] md:w-[120px] 2xl:w-[160px] 3xl:w-[203px]" />
      </Link>

      {!pathname.includes("/notes") && <Navigation />}

      <AudioButton />

      {!pathname.includes("/notes") && <MobileMenu />}
    </motion.header>
  )
}

export default Header
