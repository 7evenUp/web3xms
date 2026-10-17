import { useState } from "react"
import { useRefillMutation } from "@/redux/api/profile"
import { toast } from "sonner"
import { Coins } from "iconoir-react"

import ButtonBorderXP from "@/assets/svgs/phase-3-btn-border-xp.svg?react"

import Profile from "@/components/Profile"

import Tabs from "../Tabs"

import Container from "./Container"
import { prizesData } from "./prizesData"
import PrizeItem from "./PrizeItem"

import { useProfileQuery } from "@/redux/api/profile"
import { useGetContainersQuery } from "@/redux/api/containers"

import { cn } from "@/lib/cn"


const NewPhase3 = () => {
  const [isOpening, setIsOpening] = useState(false)
  const { data: profileData } = useProfileQuery()
  const { data: containersData, isError, isSuccess } = useGetContainersQuery()
  const [refill, { isLoading: isRefilling }] = useRefillMutation()

  if (isError)
    return (
      <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
        <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center quest-space-bg bg-auto extra:bg-cover">
          <Tabs />
          <Profile />

          <div className="my-auto text-4xl phone:text-5xl extra:text-[2.5vw] font-paperfiller text-gray text-center">
            Не удалось загрузить Боксы.
            <br />
            Пожалуйста, зайдите позже
          </div>
        </div>
      </section>
    )

  return (
    <section className="bg-black p-2.5 2xl:p-[15px] overflow-hidden">
      <div className="relative bg-black min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] flex flex-col items-center quest-space-bg bg-[auto_500px] sm:bg-contain 3xl:bg-auto extra:bg-contain pb-36">
        <Tabs />
        <Profile />

        {!containersData && null}

        {isSuccess && (
          <>
            {containersData.containers.map((el) =>
              el.prizes.map((prize, i) => (
                <img
                  key={i}
                  src={prize.prize.image!}
                  className="absolute -left-[9999px] -top-[9999px] opacity-0"
                />
              ))
            )}
            <div
              className={cn(
                "relative mt-96 phone:mt-80 lg:mt-64 xl:mt-56 2xl:mt-60 3xl:mt-80 flex flex-col items-center",
                !profileData && "mt-64 phone:mt-64"
              )}
            >
              <div className="w-[80vw] h-[220px] phone:w-[90vw] phone:h-[200px] lg:w-[930px] lg:h-[130px] 2xl:w-[1110px] 2xl:h-[160px] 3xl:w-[1395px] 3xl:h-[200px] flex justify-between max-lg:flex-wrap lg:gap-6 p-3 phone:pt-6 phone:pl-7 phone:pr-8 2xl:gap-8 2xl:pt-8 2xl:pl-9 2xl:pr-10 [background:linear-gradient(90deg,#88756E_0%,#9A2EA9_17.19%,#CE6713_95.31%)] font-circe-bold text-[11px]/none 2xl:text-xs/none 3xl:text-sm/none tracking-[0.02em] text-white">
                {profileData && (
                  <div className="flex items-center flex-col phone:flex-row gap-3 phone:gap-6 absolute -top-24 phone:-top-16 3xl:-top-20 left-1/2 -translate-x-1/2 w-screen phone:w-[440px] lg:w-auto">
                    <h3 className="font-docker-one text-lg/none 2xl:text-xl/none 3xl:text-2xl/none flex items-center gap-3">
                      Ваш баланс: <Coins />{" "}
                      <span>{profileData.expBalance}XP</span>
                    </h3>
                    <button disabled={isRefilling} onClick={async () => { await refill().unwrap(); toast.success("Начислено 400 демо-XP") }} className="group relative w-[170px] h-[43px] 2xl:w-[200px] 2xl:h-[50px] 3xl:w-[232px] 3xl:h-[57px] text-white hover:text-black flex justify-center items-center disabled:opacity-50">
                      <ButtonBorderXP className="w-full h-full absolute inset-0 stroke-white group-hover:fill-white" />
                      <div className="relative z-10 font-docker-one text-[10px]/none small-phone:text-xs/none 2xl:text-sm/none 3xl:text-lg/none tracking-[0.2em] flex items-center justify-center">
                        <span>+400 XP</span>
                      </div>
                    </button>
                  </div>
                )}
                <h2 className="font-drukCyr text-3xl/none phone:text-[54px]/none 2xl:text-[64px]/none 3xl:text-[90px]/none h-fit phone:-mt-4 max-lg:w-full">
                  Кладезь волшебный
                </h2>
                <div className="max-w-[100%] phone:max-w-[45%] lg:max-w-[280px] 2xl:max-w-[300px] 3xl:max-w-[345px]">
                  Механика открытия кейсов:
                  <ul className="list-disc ml-5 2xl:ml-6">
                    <li>Каждый кейс стоит 40 демо-XP</li>
                    <li>Все три вида кейсов доступны сразу</li>
                    <li>
                      Награды сохраняются в вашем инвентаре
                    </li>
                  </ul>
                </div>
                <p className="max-w-[100%] phone:max-w-[45%] lg:max-w-[240px] 2xl:max-w-[260px] 3xl:max-w-[345px]">
                  Портфолио-демо: покупайте и открывайте кейсы за виртуальные XP. Баланс можно пополнять бесплатно. Реальные платежи и выдача подарков не предусмотрены.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap sm:items-start justify-between max-lg:gap-10 w-[80vw] phone:w-[90vw] lg:w-[930px] 2xl:w-[1160px] 3xl:w-[1460px] -mt-6 2xl:-mt-8 3xl:-mt-10">
                {containersData.containers.map((container) => {
                  const localPrizes = [...container.prizes]
                  const sortedPrizes = localPrizes.sort(
                    (a, b) => a.numberInContainer - b.numberInContainer
                  )
                  return (
                    <Container
                      key={container.id}
                      imgSrc={container.image}
                      xp={container.price}
                      rarity={
                        container.name.toLowerCase() as
                          | "common"
                          | "rare"
                          | "legendary"
                      }
                      isReady={true}
                      isBusy={isOpening}
                      onBusyChange={setIsOpening}
                      id={container.id}
                      prizes={sortedPrizes}
                    />
                  )
                })}
                {/* {data.map((el, i) => (
              <Container key={i} {...el} />
            ))} */}
              </div>
            </div>

            <div className="w-[90vw] phone:w-[90vw] lg:w-[930px] 2xl:w-[1110px] 3xl:w-[1395px] flex flex-col mt-12 2xl:mt-9 3xl:mt-14">
              <span className="font-circe-bold text-lg/[90%] 2xl:text-2xl/[90%] tracking-[0.02em] text-red mb-2">
                ВСЕ ПРИЗЫ
              </span>

              <div className="w-full h-[3px] bg-red" />

              <div className="grid grid-cols-[repeat(2,130px)] small-phone:grid-cols-[repeat(3,105px)] phone:grid-cols-[repeat(3,120px)] sm:grid-cols-[repeat(4,120px)] md:grid-cols-[repeat(5,110px)] lg:grid-cols-[repeat(7,110px)] 2xl:grid-cols-[repeat(7,140px)] 3xl:grid-cols-[repeat(7,172px)] place-content-center lg:place-content-between place-items-start gap-x-4 phone:gap-x-6 lg:gap-x-0 gap-y-7 2xl:gap-y-9 3xl:gap-y-11 mt-14">
                {prizesData.map((el, i) => (
                  <PrizeItem key={i} {...el} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
export default NewPhase3
