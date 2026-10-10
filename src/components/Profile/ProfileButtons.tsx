import { Link, useLocation } from "react-router-dom"
import InventoryCircleIcon from "@/assets/icons/inventory-circle.svg?react"
import ProfileCircleIcon from "@/assets/icons/profile-account-circle.svg?react"
import MoreIcon from "@/assets/icons/more-icon.svg?react"
import ProfilePopover from "./ProfilePopover"
import type { Profile } from "@/types/profile"
const ProfileButtons = ({ data }: { data: Profile }) => {
  const { search } = useLocation()
  return <>
    <div className="relative flex items-center gap-2 2xl:gap-3 3xl:gap-[15px] text-red">
      <ProfileCircleIcon className="w-8 h-8 2xl:w-10 2xl:h-10 3xl:w-11 3xl:h-11" />
      <div className="flex flex-col gap-1">
        <span className="font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em]">{data.username}</span>
        <span className="font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em]">Баланс: {data.expBalance}XP</span>
        <span className="font-circe-bold text-[10px]/none text-white">Демо • вход не требуется</span>
      </div>
      <ProfilePopover data={data}>
        <button aria-label="Настройки демо" className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-white/20"><MoreIcon /></button>
      </ProfilePopover>
    </div>
    <Link to={"/quest/inventory" + search} className="flex items-center gap-2 2xl:gap-3 3xl:gap-[15px] text-red hover:text-white">
      <InventoryCircleIcon className="w-8 h-8 2xl:w-10 2xl:h-10 3xl:w-11 3xl:h-11" />
      <span className="font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em]">Инвентарь</span>
    </Link>
  </>
}
export default ProfileButtons
