import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import MechanicsSvg from "@/assets/svgs/mechanics.svg?react"
import MechanicsSvgMd from "@/assets/svgs/mechanics-md.svg?react"
import MechanicsSvgSm from "@/assets/svgs/mechanics-sm.svg?react"
import MechanicsSvg02 from "@/assets/svgs/mechanics-02.svg?react"
import MechanicsSvg02End from "@/assets/svgs/mechanics-02-end.svg?react"
import MechanicsSvg03 from "@/assets/svgs/mechanics-03.svg?react"
import MechanicsSvg06 from "@/assets/svgs/mechanics-06.svg?react"

import MechanicsImage04 from "@/assets/images/mechanics-04.png"
import MechanicsImage05 from "@/assets/images/mechanics-05.png"
import MechanicsMacbook from "@/assets/images/mechanics-macbook.png"
import MechanicsTicket from "@/assets/images/mechanics-ticket.png"

import { useMediaQuery } from "@/hooks/useMedia"

import "./Mechanics.css"

const Mechanics = () => {
  const imgRef = useRef<HTMLImageElement>(null)

  const matches = useMediaQuery("xl")

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x)
  const springY = useSpring(y)

  const translateX = useTransform(springX, [-1500, 500], [20, -20])
  const translateY = useTransform(springY, [-500, 500], [20, -20])

  const handleMouse = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (imgRef.current === null) return

    const { left, top, width, height } = imgRef.current.getBoundingClientRect()

    const imgXcenter = left + width / 2
    const imgYcenter = top + height / 2

    const mouseX = event.clientX - imgXcenter
    const mouseY = event.clientY - imgYcenter

    x.set(mouseX)
    y.set(mouseY)
  }

  return (
    <section
      className="bg-gray xl:bg-black p-2.5 2xl:p-[15px] overflow-hidden snap-start"
      onMouseMove={handleMouse}
    >
      <div className="relative bg-black min-h-[1004px] lg:min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center justify-center pb-5 sm:pb-0">
        <div className="title-bg absolute top-0" />

        <div className="relative flex flex-col items-center w-fit mt-11 2xl:mt-[75px]">
          <MechanicsSvg className="hidden lg:block absolute -left-6 xl:left-8 2xl:-left-4 top-0 h-full" />
          <MechanicsSvgMd className="hidden md:block lg:hidden absolute -left-4 top-0 h-full" />
          <MechanicsSvgSm className="md:hidden absolute -left-5 sm:left-0 top-0 h-[260px]" />
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.4 }}
            className="relative w-fit lg:h-[150px] 2xl:h-[180px] 3xl:h-[225px] flex justify-between md:justify-start flex-wrap max-w-[76vw] sm:max-w-[550px] md:max-w-[672px] lg:max-w-none lg:flex-nowrap border-red border-[3px] xl:-ml-[50px]"
          >
            <div className="relative w-full sm:w-[204px] md:w-[320px] 2xl:w-[430px] 3xl:w-[480px] bg-black flex flex-col pb-4 sm:pb-0 pt-[30px] pl-2 phone:pl-4 2xl:pl-[30px]">
              <span className="font-circe-bold text-[10px]/[125%] 2xl:text-xs/[125%] tracking-widest text-white absolute left-2 phone:left-4 2xl:left-[30px] top-3 2xl:top-5">
                01
              </span>
              <h2 className="font-drukCyr text-[32px] 2xl:text-[44px] 3xl:text-[54px] tracking-[0.02em] text-red">
                Все главы открыты
              </h2>
              <p className="font-circe-bold text-base/none 2xl:text-xl/none 3xl:text-2xl/[90%] tracking-[0.02em] max-w-[250px] 2xl:max-w-[360px] text-gray">
                в разделе «Квест» доступны восемь демо-историй с иллюстрациями и заданиями
              </p>
            </div>
            <div className="relative z-10 w-full sm:w-[320px] md:w-[390px] 2xl:w-[540px] 3xl:w-[663px] sm:-ml-[50px] bg-red flex pt-8 2xl:pt-[43px] pb-[90px] lg:pb-0 pl-2 phone:pl-4 sm:pl-8 2xl:pl-[40px] 3xl:pl-[65px] clip-path-02 mb-4 lg:mb-0">
              <span className="font-circe-bold text-[10px]/[125%] 2xl:text-xs/[125%] tracking-widest text-white absolute left-2 phone:left-4 sm:left-8 2xl:left-[40px] 3xl:left-[65px] top-3 2xl:top-5">
                02
              </span>
              <h2 className="font-drukCyr leading-none text-[32px] 2xl:text-[44px] 3xl:text-[54px] tracking-[0.02em] mr-4 lg:mr-6 2xl:mr-10 3xl:mr-[64px] text-white">
                ЗАДАНИЯ
              </h2>
              <p className="font-circe-bold leading-[90%] text-base 3xl:text-[22px] tracking-[0.02em] max-w-[260px] sm:max-w-[190px] 2xl:max-w-[256px] mt-1 2xl:mt-2 text-white">
                прочитай историю и выполни задание прямо на сайте. За правильный ответ начисляется 80 XP
              </p>
              <MechanicsSvg02 className="absolute w-[160px] lg:w-[130px] 2xl:w-[210px] left-[60px] phone:left-[170px] sm:left-[70px] lg:left-[140px] -bottom-6 lg:-bottom-10 2xl:left-[110px] 2xl:-bottom-[26px]" />
              <MechanicsSvg02End className="hidden md:block absolute w-[120px] h-[185px] lg:w-[100px] lg:h-[150px] 2xl:w-[130px] 2xl:h-[200px] 3xl:w-[186px] 3xl:h-[281px] right-0 lg:right-0.5 -bottom-[3px] -top-[3px]" />
            </div>
            <div className="relative w-full sm:w-[314px] xl:w-[300px] 2xl:w-[360px] 3xl:w-[501px] lg:-ml-[44px] bg-black flex pt-[43px] pl-2 phone:pl-4 lg:pl-14 2xl:pl-16 3xl:pl-[83px] pb-[20px]">
              <span className="font-circe-bold text-[10px]/[125%] 2xl:text-xs/[125%] tracking-widest text-white absolute left-2 phone:left-4 xl:left-14 2xl:left-16 3xl:left-[83px] top-3 2xl:top-5">
                03
              </span>
              <h2 className="font-drukCyr text-[32px]/none 2xl:text-[44px]/none 3xl:text-[54px]/none tracking-[0.02em] w-[270px] 2xl:w-auto text-red mt-auto">
                Больше выполненных заданий - больше XP
              </h2>
              <MechanicsSvg03 className="absolute w-[200px] 2xl:w-[250px] 3xl:w-[343px] h-[60px] 2xl:h-[77px] -top-2.5 sm:top-0 xl:top-2 3xl:top-5 -right-4 sm:-right-[30px] xl:-right-[100px] transition-transform hover:scale-110" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.5 }}
            className="relative z-20 w-fit lg:h-[140px] 2xl:h-[180px] 3xl:h-[230px] flex flex-wrap sm:flex-nowrap border-red border-[3px] -mt-[3px] sm:ml-10 lg:ml-0 xl:ml-[120px] max-w-[76vw] sm:max-w-[550px] md:max-w-none"
          >
            <div className="relative z-10 w-full sm:w-[360px] md:w-[300px] lg:w-[350px] 2xl:w-[450px] 3xl:w-[520px] bg-red flex flex-col pt-[30px] pl-2 phone:pl-4 2xl:pl-[30px] clip-path-04">
              <span className="font-circe-bold text-[10px]/[125%] 2xl:text-xs/[125%] tracking-widest text-white absolute left-2 phone:left-4 2xl:left-[30px] top-3 2xl:top-5">
                04
              </span>
              <p className="font-circe-bold text-sm/[90%] phone:text-base/[90%] 2xl:text-xl/[90%] 3xl:text-2xl/[90%] tracking-[0.02em] mt-auto max-w-[140px] phone:max-w-[180px] lg:max-w-[200px] 2xl:max-w-[256px] text-white">
                используй заработанные XP, чтобы открывать подарочные кейсы
              </p>
              <h2 className="font-drukCyr text-[32px] 2xl:text-[44px] 3xl:text-[54px] tracking-[1.2px] text-white">
                22 декабря
              </h2>
              <img
                src={MechanicsImage04}
                className="absolute w-[90px] md:w-[100px] 2xl:w-[130px] 3xl:w-[170px] top-4 right-1 phone:right-5 md:right-10 3xl:right-[80px] phone:top-8 md:top-5 shake"
              />
            </div>
            <div className="relative w-full sm:w-[352px] lg:w-[622px] xl:w-[660px] 2xl:w-[800px] 3xl:w-[1076px] bg-black flex flex-col pb-10 phone:pb-2 sm:pb-0 pt-[30px] pl-2 phone:pl-4 sm:pl-2.5 lg:pl-[70px] lg:-ml-[42px]">
              <span className="font-circe-bold text-[10px]/[125%] 2xl:text-xs/[125%] tracking-widest text-white absolute left-2 phone:left-4 sm:left-2.5 lg:left-[70px] top-3 2xl:top-5">
                05
              </span>
              <p className="font-circe-bold text-sm/none phone:text-base/none 2xl:text-xl/none 3xl:text-2xl/none tracking-[0.02em] mt-auto max-w-[270px] 2xl:max-w-[330px] text-gray">
                в кейсах лежит 10,000 призов и 5,000 билетов на розыгрыш
              </p>
              <h2 className="font-drukCyr text-[32px] 2xl:text-[44px] 3xl:text-[54px] tracking-[1.2px] text-red">
                Ford Mustang
              </h2>
              <motion.img
                ref={imgRef}
                style={{
                  translateX: matches ? translateX : 0,
                  translateY: matches ? translateY : 0,
                }}
                src={MechanicsImage05}
                className="absolute w-[170px] phone:w-[200px] sm:w-[250px] md:w-[300px] lg:w-[380px] 2xl:w-[450px] 3xl:w-[620px] -right-8 sm:-right-2.5 md:right-0 lg:-right-10 2xl:-right-20 top-[88px] phone:top-10 sm:-top-20 md:-top-[125px] lg:-top-[45px] z-10"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -250 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: !matches }}
            transition={{ type: "tween", duration: 0.6 }}
            className="w-fit lg:h-[160px] 2xl:h-[200px] 3xl:h-[250px] flex flex-wrap max-w-[76vw] sm:max-w-[550px] md:max-w-[672px] lg:max-w-none lg:flex-nowrap border-red border-[3px] -mt-[3px] xl:ml-[20px]"
          >
            <div className="relative z-10 w-full lg:w-[540px] 2xl:w-[700px] 3xl:w-[889px] bg-black flex flex-col sm:flex-row pt-7 2xl:pt-10 pl-2 phone:pl-4 sm:pl-5 2xl:pl-[38px] pb-5 sm:pb-0 md:pb-3">
              <span className="font-circe-bold text-[10px]/[125%] 2xl:text-xs/[125%] tracking-widest text-white absolute left-2 phone:left-4 sm:left-5 2xl:left-[38px] top-3 2xl:top-5">
                06
              </span>
              <div className="flex flex-col mr-6 lg:mr-0 gap-3 2xl:gap-6">
                <h2 className="font-drukCyr text-[22px]/none phone:text-3xl/none 2xl:text-4xl/none 3xl:text-5xl/none tracking-[0.02em] text-red">
                  Активируй свой <br className="hidden sm:block" />
                  цифровой приз
                </h2>
                <p className="font-circe-bold text-sm/none phone:text-base/none 2xl:text-xl/none 3xl:text-2xl/none tracking-[0.02em] sm:max-w-[165px] 2xl:max-w-[200px] 3xl:max-w-[285px] text-gray">
                  или закажи доставку, если он физический!
                </p>
              </div>
              <div className="grid grid-cols-[100px_1fr] phone:grid-cols-[120px_1fr] sm:grid-cols-[100px_1fr] md:grid-cols-[82px_1fr] lg:grid-cols-[70px_1fr] 2xl:grid-cols-[90px_1fr] 3xl:grid-cols-[110px_1fr] place-items-center gap-x-4 mt-2 sm:-mt-4">
                <img src={MechanicsMacbook} className="w-full" />
                <div className="flex flex-col gap-2 2xl:gap-3 w-full">
                  <span className="font-circe-bold text-sm/[90%] 2xl:text-lg/[90%] 3xl:text-xl/[90%] tracking-[0.02em] text-white">
                    MacBook
                  </span>

                  <div className="flex justify-center items-center bg-gray text-white font-docker-one text-[10px] 2xl:text-xs tracking-[0.2em] w-fit small-phone:w-auto small-phone:mr-2 phone:w-fit phone:mr-0 max-w-[150px] phone:max-w-none 3xl:w-auto py-2 sm:py-1 px-1 small-phone:px-3 2xl:py-2 2xl:px-4 3xl:py-3.5 3xl:px-8 text-center clip-path-btn">
                    заказать
                  </div>
                </div>
                <img
                  src={MechanicsTicket}
                  className="w-[60px] phone:w-20 md:w-[71px] lg:w-[55px] 2xl:w-[70px] 3xl:w-[85px] place-self-center sm:place-self-end"
                />
                <div className="flex flex-col gap-2 2xl:gap-3 w-full">
                  <span className="font-circe-bold text-sm/[90%] 2xl:text-lg/[90%] 3xl:text-xl/[90%] tracking-[0.02em] text-white">
                    Ваучер
                  </span>

                  <div className="flex justify-center items-center bg-gray text-white font-docker-one text-[10px] 2xl:text-xs tracking-[0.2em] w-fit small-phone:w-auto small-phone:mr-2 phone:w-fit phone:mr-0 max-w-[150px] phone:max-w-none 3xl:w-auto py-2 sm:py-1 px-1 small-phone:px-3 2xl:py-2 2xl:px-4 3xl:py-3.5 3xl:px-8 text-center clip-path-btn">
                    активировать
                  </div>
                </div>
              </div>

              <MechanicsSvg06 className="hidden md:block absolute w-[135px] 2xl:w-[170px] 3xl:w-auto right-0 bottom-0 -top-[15px] lg:top-0 h-full" />
            </div>
            <div className="relative w-[390px] 2xl:w-[500px] 3xl:w-[680px] bg-black pt-8 pb-2 lg:pb-0 lg:pt-14 2xl:pt-[70px] pl-2 phone:pl-5 lg:pl-2.5">
              <span className="font-circe-bold text-[10px]/[125%] 2xl:text-xs/[125%] tracking-widest text-white absolute left-2 phone:left-5 lg:left-2.5 top-3 2xl:top-5">
                07
              </span>
              <h2 className="font-drukCyr text-lg/none phone:text-2xl/none 2xl:text-3xl/none 3xl:text-[42px]/none tracking-[0.02em] max-w-[360px] 2xl:max-w-[440px] 3xl:max-w-[620px] text-red pr-1 sm:pr-0">
                А 24 декабря в прямом эфире на офлайн конференции{" "}
                <a
                  href="https://www.0xconnect.net/"
                  target="_blank"
                  className="text-white hover:text-white/80 active:text-white/50"
                >
                  0xConnect
                </a>{" "}
                будет выбран счастливый билет, владелец которого заберёт Ford
                Mustang!
              </h2>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Mechanics
