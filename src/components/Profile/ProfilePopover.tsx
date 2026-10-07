import React, { useState } from "react"
import { toast } from "sonner"
import {
  LogOut,
  CloudSync,
  Coins,
  LinkSlash,
  Link as LinkIcon,
  Copy,
  Check,
} from "iconoir-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"

import {
  useRefetchProfileMutation,
  useSyncBalanceMutation,
  useSyncZealyMutation,
} from "@/redux/api/profile"
import { useAppDispatch } from "@/redux/hooks"
import { clearAuthTokens } from "@/redux/authTokens/slice"
import { authApi, useLogoutMutation } from "@/redux/api/auth"

import { Profile as IProfile } from "@/types/profile"

import { shortenWallet } from "@/utils/shortenWallet"

import { cn } from "@/lib/cn"

const ProfilePopover = ({
  data,
  children,
}: {
  data: IProfile
  children: React.ReactNode
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const dispatch = useAppDispatch()

  const [syncBalanceTrigger, { isLoading }] = useSyncBalanceMutation()
  const [syncZealyTrigger, { isLoading: isZealyLoading }] =
    useSyncZealyMutation()
  const [refetchProfile] = useRefetchProfileMutation()
  const [logoutTrigger] = useLogoutMutation()

  const onLogout = async () => {
    dispatch(clearAuthTokens())
    await logoutTrigger().unwrap()
    refetchProfile()
    dispatch(authApi.util.resetApiState())
  }

  const onBalanceSync = () => {
    syncBalanceTrigger()
    refetchProfile()
  }

  const onZealySync = async () => {
    const data = await syncZealyTrigger().unwrap()
    if (data.syncZealyMessage === "user_not_found") {
      toast.warning("Ошибка синхронизации.", {
        description:
          "Убедитесь, что для входа на сайт вы использовали тот же адрес электронной почты, что и при регистрации на Zealy.",
      })
    }
    refetchProfile()
  }

  const onRefCopy = () => {
    if (data.refCode) {
      navigator.clipboard.writeText("https://web3xms.com?ref=" + data.refCode)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    }
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="flex flex-col w-[280px] phone:w-[376px]"
        align="center"
        side="bottom"
      >
        <div className="flex flex-col gap-0.5 px-2 pt-2">
          <div
            className={cn(
              "grid grid-cols-[48px_1fr] grid-rows-[48px_20px] phone:grid-cols-[64px_1fr] phone:grid-rows-[64px_28px] gap-2 p-4 bg-[#2C4D87] rounded-t-3xl rounded-b",
              data.refCode &&
                "grid-rows-[48px_14px_20px] phone:grid-rows-[64px_20px_28px]"
            )}
          >
            {data.avatar ? (
              <img
                src={data.avatar}
                alt="User profile image"
                className="w-full h-full rounded-full bg-rose-400"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-rose-400 flex items-center justify-center">
                <span className="text-lg/none font-circe-bold uppercase">
                  {data.username[0]}
                  {data.username[1]}
                </span>
              </div>
            )}
            <div className="flex flex-col justify-center text-zinc-100">
              <span className="text-xs phone:text-sm tracking-[0.01em] font-medium">
                {data.email}
              </span>
              <span className="text-[11px] phone:text-xs tracking-[0.04em]">
                {data.wallet
                  ? shortenWallet(data.wallet)
                  : "Тут будет ваш кошелёк"}
              </span>
            </div>
            {data.refCode && (
              <button
                className="flex items-center gap-2 text-[10px] phone:text-xs/none tracking-[0.01em] col-start-2 -mt-4 underline underline-offset-4 text-white/80 hover:text-white transition-colors"
                onClick={onRefCopy}
              >
                реферальная ссылка
                {isCopied ? (
                  <Check className="animate-in fade-in-0" />
                ) : (
                  <Copy className="animate-in fade-in-0" />
                )}
              </button>
            )}

            <a
              href={import.meta.env.VITE_ID_URL}
              className="flex justify-center items-center text-[10px] phone:text-sm tracking-[0.01em] font-medium col-start-2 rounded-md phone:rounded-lg border border-gray hover:bg-gray transition-colors"
            >
              Управление аккаунтом Crypton
            </a>
          </div>
          <div className="flex flex-col bg-[#2C4D87] rounded-t rounded-b-3xl">
            <div className="grid grid-cols-[48px_1fr] phone:grid-cols-[64px_1fr] grid-rows-1 items-center gap-2 pl-4 py-3 rounded-b-3xl bg-primary text-zinc-100">
              {data.syncZealyMessage === null ? (
                <>
                  <LinkIcon className="w-5 h-5 phone:w-6 phone:h-6 place-self-center" />
                  <span className="justify-self-start text-xs phone:text-sm tracking-[0.01em] font-medium">
                    Zealy синхронизирован
                  </span>
                </>
              ) : (
                <>
                  <LinkSlash className="w-5 h-5 phone:w-6 phone:h-6 place-self-center" />
                  <span className="relative justify-self-start text-xs phone:text-sm tracking-[0.01em] font-medium">
                    Zealy не синхронизирован
                    {data.syncZealyMessage === "user_not_found" && (
                      <span className="absolute top-0 -right-3 w-2 h-2 rounded-full bg-red-400" />
                    )}
                  </span>
                </>
              )}
            </div>
            <div className="grid grid-cols-[48px_1fr] phone:grid-cols-[64px_1fr] grid-rows-1 items-center gap-2 pl-4 py-3 rounded-b-3xl bg-primary text-zinc-100">
              <Coins className="w-5 h-5 phone:w-6 phone:h-6 place-self-center" />
              <span className="justify-self-start text-xs phone:text-sm tracking-[0.01em] font-medium">
                {data.expBalance ? data.expBalance + " XP" : "0 XP"}
              </span>
            </div>
          </div>
        </div>

        {data.syncZealyMessage !== null ? (
          <button className="group mt-0.5" onClick={onZealySync}>
            <div className="grid grid-cols-[48px_1fr] phone:grid-cols-[64px_1fr] grid-rows-1 items-center gap-2 pl-6 py-3 hover:bg-[#2C4D87]/75 active:bg-[#2C4D87]/60">
              {isZealyLoading ? (
                <LoaderIcon />
              ) : (
                <CloudSync className="w-5 h-5 phone:w-6 phone:h-6 place-self-center" />
              )}
              <span className="justify-self-start text-xs phone:text-sm tracking-[0.01em] font-medium">
                Синхронизировать Zealy
              </span>
            </div>
          </button>
        ) : (
          <button className="group mt-0.5" onClick={onBalanceSync}>
            <div className="grid grid-cols-[48px_1fr] phone:grid-cols-[64px_1fr] grid-rows-1 items-center gap-2 pl-6 py-3 hover:bg-[#2C4D87]/75 active:bg-[#2C4D87]/60">
              {isLoading ? (
                <LoaderIcon />
              ) : (
                <CloudSync className="w-5 h-5 phone:w-6 phone:h-6 place-self-center" />
              )}
              <span className="justify-self-start text-xs phone:text-sm tracking-[0.01em] font-medium">
                Синхронизировать баланс
              </span>
            </div>
          </button>
        )}
        <button className="group mt-0.5" onClick={onLogout}>
          <div className="grid grid-cols-[48px_1fr] phone:grid-cols-[64px_1fr] grid-rows-1 items-center gap-2 pl-6 py-3 hover:bg-[#2C4D87]/75 active:bg-[#2C4D87]/60 rounded-b-[28px]">
            <LogOut className="w-5 h-5 phone:w-6 phone:h-6 place-self-center" />
            <span className="justify-self-start text-xs phone:text-sm tracking-[0.01em] font-medium">
              Выйти из аккаунта
            </span>
          </div>
        </button>
      </PopoverContent>
    </Popover>
  )
}

export default ProfilePopover

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
    className="animate-spin w-5 h-5 phone:w-6 phone:h-6 place-self-center"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)
