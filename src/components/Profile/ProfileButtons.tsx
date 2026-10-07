import { Link, useLocation } from "react-router-dom"
import { toast } from "sonner"

import InventoryCircleIcon from "@/assets/icons/inventory-circle.svg?react"
import ProfileCircleIcon from "@/assets/icons/profile-account-circle.svg?react"
import MoreIcon from "@/assets/icons/more-icon.svg?react"

import ProfilePopover from "./ProfilePopover"

import {
  useRefetchProfileMutation,
  useSyncZealyMutation,
} from "@/redux/api/profile"

import { Profile } from "@/types/profile"

const ProfileButtons = ({ data }: { data: Profile }) => {
  const { search } = useLocation()
  const [trigger, { isLoading }] = useSyncZealyMutation()
  const [refetchProfile] = useRefetchProfileMutation()

  const onZealySync = async () => {
    const data = await trigger().unwrap()
    if (data.syncZealyMessage === "user_not_found") {
      toast.warning("Ошибка синхронизации.", {
        description:
          "Убедитесь, что для входа на сайт вы использовали тот же адрес электронной почты, что и при регистрации на Zealy.",
      })
    }
    refetchProfile()
  }

  return (
    <>
      <div className="relative flex items-center gap-2 2xl:gap-3 3xl:gap-[15px] text-red">
        <ProfileCircleIcon className="w-8 h-8 2xl:w-10 2xl:h-10 3xl:w-11 3xl:h-11" />
        <div className="realtive flex flex-col gap-1">
          <span className="font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em]">
            {data.username && data.username.length > 16
              ? data.username.slice(0, 13) + "..."
              : data.username}
          </span>
          {data.syncZealyMessage === null ? (
            <span className="font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em]">
              Баланс: {data.expBalance}XP
            </span>
          ) : (
            <button
              className="font-circe-bold text-xs/none 2xl:text-sm/none 3xl:text-base/none tracking-[0.02em] underline underline-offset-2 text-white hover:text-white/80 flex items-center gap-2 w-fit"
              onClick={onZealySync}
            >
              Синхронизировать с Zealy
              {isLoading && <LoaderIcon />}
            </button>
          )}
          {data.syncZealyMessage === null && (
            <div className="absolute -bottom-3 flex items-center gap-1 w-[180px]">
              <div className="w-2 h-2 rounded-full bg-[#62EC91]" />
              <span className="flex-1 font-circe-bold text-[10px]/none 2xl:text-xs/none tracking-[0.02em] text-white">
                статус синхронизации с Zealy
              </span>
            </div>
          )}
        </div>
        {/* {data.syncZealyMessage === null && ( */}
        <ProfilePopover data={data}>
          <button className="absolute left-[195px] 2xl:left-[240px] -top-3 flex justify-center items-center w-8 h-8 rounded-full hover:bg-white/20 active:bg-white/30">
            <MoreIcon />
          </button>
        </ProfilePopover>
        {/* )} */}
      </div>
      <Link
        to={"/quest/inventory" + search}
        className="flex items-center gap-2 2xl:gap-3 3xl:gap-[15px] text-red hover:text-white"
      >
        <InventoryCircleIcon className="w-8 h-8 2xl:w-10 2xl:h-10 3xl:w-11 3xl:h-11" />
        <span className="font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em]">
          Инвентарь
        </span>
      </Link>
    </>
  )
}

export default ProfileButtons

const LoaderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin w-3 h-3"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)
