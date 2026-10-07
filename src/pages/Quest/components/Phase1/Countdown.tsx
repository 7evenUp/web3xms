import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import getUnixTime from "date-fns/getUnixTime"

import { getDays, getHours, getMinutes } from "@/utils/date"

// Откуда ведём отчёт (верхняя точка окружности)
const startDate = new Date(2023, 11, 10)
// Время, когда пользователь заходит на сайт (промежуточная точка окружности)
const currentDate = new Date()
// Конечная цель (верхняя точка окружности, до которой стремимся)
const targetDate = new Date("2023-12-15T18:00:00+03:00")

const startDateInSeconds = getUnixTime(startDate)
const currentDateInSeconds = getUnixTime(currentDate)
const targetDateInSeconds = getUnixTime(targetDate)

const RADIUS = 128
// Центр окружности
const X_CENTER = 130
const Y_CENTER = 130
// Длина окружности
const circleLength = 2 * Math.PI * RADIUS

// Время, которое осталось до заветной даты
const timeRemains = targetDateInSeconds - currentDateInSeconds
// Время, которое прошло со стартовой даты до открытия сайта
const timePassed = targetDateInSeconds - startDateInSeconds - timeRemains

// Вычисляем длину пройденной дуги
const calculateLength = (timer: number) => {
  const percentTimePassed = (timer * 100) / (timeRemains + timePassed)
  const drawLength = (circleLength * percentTimePassed) / 100

  return drawLength
}

const calculateCoords = (timer: number) => {
  // Длина дуги
  const length = calculateLength(timer)
  // Настоящая длина дуги (из-за css свойства stroke-dashoffset)
  const actualLength = circleLength - length
  // (Угол дуги в градусах) - 90 градусов (в браузере ось y инвертирована)
  const angle = (actualLength * 180) / (Math.PI * RADIUS) - 90

  // Вычисляем координату точки на окружности, куда встанет СВГшка
  const x = X_CENTER + RADIUS * Math.cos((angle * Math.PI) / 180)
  const y = Y_CENTER + RADIUS * Math.sin((angle * Math.PI) / 180)

  return {
    x,
    y,
  }
}

const Countdown = () => {
  const [timer, setTimer] = useState(timeRemains)
  const [coords, setCoords] = useState(calculateCoords(timeRemains))

  useEffect(() => {
    const intervalId = setInterval(function () {
      if (timer - 1 <= 0) {
        setTimer(10)
      } else {
        setCoords(calculateCoords(timer))
        setTimer(timer - 1)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timer])

  return (
    <motion.div
      className="absolute scale-[65%] 2xl:scale-[80%] left-1/2 bottom-36 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 sm:bottom-0 2xl:right-2 2xl:bottom-2 3xl:scale-100 3xl:right-10 3xl:bottom-10 w-[260px] h-[260px] flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.3 }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="absolute top-[50px] font-drukCyr text-4xl/none tracking-[0.02em] text-red">
          до старта
        </span>
        <div className="flex font-circe-bold text-[40px]/[125%] tracking-wider text-red">
          <p className="relative">
            {getDays(timer)}
            <span className="absolute top-full left-1/2 -translate-x-1/2 text-sm/none tracking-[0.02em]">
              дней
            </span>
          </p>
          :
          <p className="relative">
            {getHours(timer)}
            <span className="absolute top-full left-1/2 -translate-x-1/2 text-sm/none tracking-[0.02em]">
              часов
            </span>
          </p>
          :
          <p className="relative">
            {getMinutes(timer)}
            <span className="absolute top-full left-1/2 -translate-x-1/2 text-sm/none tracking-[0.02em]">
              минут
            </span>
          </p>
        </div>
      </div>
      <svg
        width="260"
        height="260"
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 outer-circle"
      >
        <circle cx="130" cy="130" r="128" stroke="white" strokeWidth="3" />
      </svg>
      <svg
        width="260"
        height="260"
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 inner-circle"
        style={{ strokeDashoffset: calculateLength(timer) }}
      >
        <circle cx="130" cy="130" r="128" stroke="#FF4654" strokeWidth="3" />
      </svg>
      <svg
        width="56"
        height="60"
        viewBox="0 0 56 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{
          left: coords.x - 36,
          top: coords.y - 36,
        }}
      >
        <path
          d="M45.9679 0.744141L31.3083 23.6735L19.8438 18.975L22.2493 31.3347L0.756348 41.4759H25.7345L30.0911 55.998L39.332 44.6483L55.1109 59.4833L47.7145 37.7449L55.1109 29.6877L43.7699 27.883L45.9679 0.744141Z"
          fill="#FF4654"
        />
        <circle
          cx="35.9336"
          cy="35.4668"
          r="6.5"
          fill="white"
          stroke="#FF4654"
          strokeWidth="3"
        />
      </svg>
    </motion.div>
  )
}

export default Countdown
