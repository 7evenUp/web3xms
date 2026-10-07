import { Link, useLocation } from "react-router-dom"

import { cn } from "@/lib/cn"

const data = [
  { link: "/quest/phase-1", title: "Вступление", date: "11-15.12" },
  { link: "/quest/phase-2", title: "Задания", date: "15-24.12" },
  { link: "/quest/phase-3", title: "Кейсы", date: "22-24.12" },
]

const Tabs = () => {
  const { pathname, search } = useLocation()

  return (
    <div className="absolute top-[200px] lg:top-[80px] 2xl:top-[95px] 3xl:top-[120px] left-1/2 -translate-x-1/2 grid grid-cols-[repeat(3,78px)] 2xl:grid-cols-[repeat(3,100px)] 3xl:grid-cols-[repeat(3,120px)] grid-rows-[30px_6px_15px] 3xl:grid-rows-[40px_8px_20px] place-items-center gap-1 2xl:gap-2 3xl:gap-2 w-[85vw] small-phone:w-[300px] 2xl:w-[400px] 3xl:w-[485px] place-content-between 2xl:mb-2 3xl:mb-4">
      {data.map((el, i) => (
        <Link
          key={i}
          to={el.link + search}
          className={cn(
            "font-drukCyr text-2xl 2xl:text-3xl 3xl:text-4xl tracking-[0.02em] w-full text-center text-white/70 place-self-center",
            pathname === el.link && "text-red"
          )}
        >
          {el.title}
        </Link>
      ))}
      <div className="relative w-full col-span-3 h-0.5 3xl:h-[3px] bg-red">
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-12 h-1.5 2xl:w-16 3xl:w-20 3xl:h-2 bg-red",
            pathname === "/quest/phase-1" && "left-4 3xl:left-5",
            pathname === "/quest/phase-2" && "left-1/2 -translate-x-1/2",
            pathname === "/quest/phase-3" &&
              "right-3.5 2xl:right-[18px] 3xl:right-5"
          )}
        />
      </div>
      {data.map((el, i) => (
        <span
          key={i}
          className={cn(
            "font-circe-bold text-[10px] 2xl:text-xs 3xl:text-sm tracking-[0.05em] w-full text-center text-white/70",
            pathname === el.link && "text-red",
            i === 0 && "place-self-start",
            i === 2 && "place-self-end"
          )}
        >
          {el.date}
        </span>
      ))}
    </div>
  )
}

export default Tabs
