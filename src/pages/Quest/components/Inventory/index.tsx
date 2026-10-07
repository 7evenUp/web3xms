import { Link } from "react-router-dom"

import ButtonBorder from "@/assets/svgs/inventory-btn-border.svg?react"

import Profile from "@/components/Profile"

import InventoryItem from "./InventoryItem"
import FormDialog from "./FormDialog"

import { useInventoryQuery } from "@/redux/api/inventory"
import { useProfileQuery } from "@/redux/api/profile"
import { useCheckIdTokenQuery } from "@/redux/api/auth"

import { cn } from "@/lib/cn"

const Inventory = () => {
  const { data } = useInventoryQuery()
  const { isSuccess: isProfileSuccess } = useProfileQuery()
  const { isSuccess: isTokenSuccess } = useCheckIdTokenQuery()

  if (!data) return <BlankPage />

  if (data.items_count <= 0) {
    return <BlankPage />
  }

  return (
    <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
      <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center quest-space-bg extra:bg-cover pb-6 xl:pb-8 2xl:pb-10 3xl:pb-12">
        <Profile />
        <Heading />

        {isProfileSuccess && isTokenSuccess && <FormDialog />}

        <div className="flex justify-center flex-wrap gap-5 w-[80vw] small-phone:w-[70vw] phone:w-[80vw] 2xl:w-[1330px] mt-6 mb-16">
          {data.items.map((prize) => (
            <InventoryItem
              id={prize.id}
              key={prize.id}
              type={prize.type!}
              title={prize.title!}
              imgSrc={prize.image!}
              isUsed={prize.is_used}
              // @ts-expect-error Incorrect Server Values
              rarity={prize.rarity!}
              userData={prize.user_data}
              instruction={prize.instruction}
            />
          ))}
        </div>

        <BackButton />
      </div>
    </section>
  )
}

export default Inventory

const BlankPage = () => {
  const { isSuccess: isProfileSuccess } = useProfileQuery()
  const { isSuccess: isTokenSuccess } = useCheckIdTokenQuery()
  
  return (
    <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
      <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center quest-space-bg bg-auto extra:bg-cover pb-10 xl:pb-12 2xl:pb-14 3xl:pb-16">
        <Profile />

        <Heading />

        {isProfileSuccess && isTokenSuccess && <FormDialog />}

        <div className="flex flex-col gap-1 xl:gap-2 2xl:gap-3 3xl:gap-4 mt-8 sm:mt-10 xl:mt-12 2xl:mt-14 3xl:mt-16">
          <h2 className="font-circe-bold text-xl/none sm:text-2xl/none 2xl:text-3xl/none 3xl:text-4xl/none tracking-[0.02em] text-white/80 text-center">
            Пока что у Вас нет призов
          </h2>
          <p className="max-w-prose font-circe-regular text-sm sm:text-base 2xl:text-xl text-white">
            Вы можете получить их, открыв один из боксов
          </p>
        </div>

        <BackButton />
      </div>
    </section>
  )
}

const Heading = ({ className }: { className?: string }) => (
  <h1
    className={cn(
      "font-circe-bold text-xl/[125%] sm:text-2xl/[125%] 2xl:text-3xl/[125%] 3xl:text-4xl/[125%] tracking-[0.02em] text-white max-w-[450px] sm:max-w-[530px] 2xl:max-w-[680px] 3xl:max-w-[810px] text-center mt-52 lg:mt-24 2xl:mt-28 3xl:mt-36 px-3 phone:px-0",
      className
    )}
  >
    Здесь хранятся выигранные в заданиях вещи. Используй свой уникальный подход
    в активации каждого из призов
  </h1>
)

const BackButton = ({ className }: { className?: string }) => {
  return (
    <Link
      to="/quest/phase-3"
      className={cn(
        "group relative w-[120px] h-[43px] 2xl:w-[150px] 2xl:h-[50px] 3xl:w-[177px] 3xl:h-[57px] text-white hover:text-black flex justify-center items-center mt-auto",
        className
      )}
    >
      <ButtonBorder className="w-full h-full absolute inset-0 group-hover:fill-red" />
      <div className="relative z-10 font-docker-one text-[10px]/none small-phone:text-xs/none 2xl:text-sm/none 3xl:text-lg/none tracking-[0.2em] flex items-center justify-center">
        <span>К боксам</span>
      </div>
    </Link>
  )
}
