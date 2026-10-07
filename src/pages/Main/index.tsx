import { motion, useScroll, useTransform } from "framer-motion"

import End from "./components/End"
import First from "./components/First"
import Introduction from "./components/Introduction"
import Mechanics from "./components/Mechanics"
import Prizes from "./components/Prizes"
import Sponsors from "./components/Sponsors"

const Main = () => {
  const { scrollYProgress } = useScroll()
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#141831", "#5772A1", "#5772A1", "#5772A1", "#5772A1", "#141831"]
  )

  return (
    <>
      <First />
      <Introduction />
      <Mechanics />
      <Sponsors />
      <Prizes />
      <End />

      <motion.div
        className="fixed h-screen xl:w-2.5 2xl:w-[15px] left-0 top-0"
        style={{ background: bgColor }}
      />
      <motion.div
        className="fixed h-screen xl:w-2.5 2xl:w-[15px] right-0 top-0"
        style={{ background: bgColor }}
      />
      <motion.div
        className="fixed w-screen xl:h-2.5 2xl:h-[15px] left-0 top-0"
        style={{ background: bgColor }}
      />
      <motion.div
        className="fixed w-screen xl:h-2.5 2xl:h-[15px] left-0 bottom-0"
        style={{ background: bgColor }}
      />
    </>
  )
}

export default Main
