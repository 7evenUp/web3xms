import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { toast } from "sonner"
import { Address } from "@ton/core/dist/address/Address"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import LoaderIcon from "@/assets/icons/loader.svg?react"

import { useClaimMutation } from "@/redux/api/inventory"
import { useProfileQuery } from "@/redux/api/profile"

import { cn } from "@/lib/cn"

const ClaimDialog = ({
  id,
  onOpenChange,
  open,
  type,
}: {
  id: number
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  type: "nft" | "crypton_promo_code" | "sponsor_promo_code"
}) => {
  const [responseData, setResponseData] = useState<string | null>("")

  const [claim, { isLoading }] = useClaimMutation()
  const { data: profileData } = useProfileQuery()

  const onSubmit = async () => {
    if (isLoading) return

    try {
      const responseData = await claim({ inventory_prize_id: id }).unwrap()
      if (type === "nft") {
        setResponseData(responseData.claim_url)
      } else if (type === "crypton_promo_code") {
        setResponseData(responseData.prize_code)
      }
    } catch (error) {
      onOpenChange(false)
      // @ts-expect-error no-rtkq-error-types
      if (error.data.code === "inventory_prize_not_found") {
        toast.error("Этот приз не найден, либо он не ваш")
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "sponsor_prize_is_unclaimed") {
        toast.error("Приз спонсора не был получен")
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "inventory_prize_already_used") {
        toast.error("Уже использовано")
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "user_ton_address_not_set") {
        toast.error("Вы не установили адрес TON кошелька")
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "mint_error") {
        toast.error("Ошибка Минта NFT")
      }
      // @ts-expect-error no-rtkq-error-types
      else if (error.data.code === "excepted_soon") {
        toast.warning("Активация станет доступна, когда запустится Календарь")
      } else {
        toast.error("Произошла ошибка. Пожалуйста, попробуйте позже")
      }
    }
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed z-[100] inset-0 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-[101] top-[50%] left-[50%] h-[100dvh] w-screen phone:h-[328px] phone:w-[470px] translate-x-[-50%] translate-y-[-50%] focus:outline-none bg-white text-black flex flex-col p-6">
          {responseData ? (
            <h3 className="font-circe-bold text-xl/[125%] tracking-[0.02em] text-green-500">
              Успешно
            </h3>
          ) : (
            <h3 className="font-circe-bold text-xl/[125%] tracking-[0.02em]">
              Подтверждение
            </h3>
          )}
          {responseData ? (
            type === "nft" ? (
              <div className="font-circe-bold flex flex-col gap-3 text-base/[125%] mt-6">
                <p>Поздравляем! NFT успешно активирована.</p>
                <p>Она придёт на Ваш TON кошелёк в течении нескольких минут.</p>
                <p>
                  NFT можно посмотреть{" "}
                  <a
                    href={responseData}
                    target="_blank"
                    className="underline underline-offset-4"
                  >
                    здесь
                  </a>
                </p>
              </div>
            ) : (
              type === "crypton_promo_code" && (
                <div className="font-circe-bold flex flex-col gap-3 text-base/[125%] mt-6">
                  <p>Поздравляем! Промокод успешно получен.</p>
                  <p>
                    Активировать промокод можно на{" "}
                    <a
                      href="https://id.crypton.xyz"
                      target="_blank"
                      className="underline underline-offset-4"
                    >
                      ID Crypton
                    </a>
                  </p>
                </div>
              )
            )
          ) : type === "nft" ? (
            <>
              <p className="font-circe-bold text-sm/[125%] tracking-[0.02em] text-black mt-6">
                После подтверждения NFT отправится на TON кошелёк с этим
                адресом:
              </p>
              <p className="font-circe-bold text-xs break-words phone:text-sm/[125%] tracking-[0.02em] text-black mt-3">
                {profileData && profileData.tonAddress !== null
                  ? Address.parseRaw(
                      Address.parseFriendly(
                        profileData.tonAddress
                      ).address.toRawString()
                    ).toString({ bounceable: false })
                  : ""}
              </p>
              <p className="font-circe-bold text-red mt-2">
                Внимание! Кошелёк телеграмм не поддерживается, используйте{" "}
                <a
                  href="https://tonkeeper.com/"
                  target="_blank"
                  className="underline underline-offset-4"
                >
                  Tonkeeper
                </a>
              </p>
              <div className="flex items-center justify-center mt-10 phone:mt-auto">
                <button
                  className="relative group flex justify-center items-center gap-2 h-10 phone:h-[42px] px-6 bg-red text-red font-docker-one text-xs/none phone:text-sm/none tracking-[0.2em] text-center transition-colors hover:text-white [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
                  onClick={onSubmit}
                >
                  <div
                    className={cn(
                      "w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] group-hover:bg-red bg-white [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] transition-colors"
                    )}
                  />
                  {isLoading && (
                    <LoaderIcon className="w-4 h-4 animate-spin relative" />
                  )}
                  <span className="relative">Активировать</span>
                </button>
              </div>
            </>
          ) : (
            type === "crypton_promo_code" && (
              <>
                <p className="font-circe-bold text-sm/[125%] tracking-[0.02em] text-black mt-6">
                  После подтверждения вы получите промокод, который сможете
                  применить на{" "}
                  <a
                    href="https://id.crypton.xyz"
                    target="_blank"
                    className="underline underline-offset-4"
                  >
                    ID Crypton
                  </a>
                </p>
                <div className="flex items-center justify-center mt-10 phone:mt-auto">
                  <button
                    className="relative group flex justify-center items-center gap-2 h-10 phone:h-[42px] px-6 bg-red text-red font-docker-one text-xs/none phone:text-sm/none tracking-[0.2em] text-center transition-colors hover:text-white [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
                    onClick={onSubmit}
                  >
                    <div
                      className={cn(
                        "w-[calc(100%-4px)] h-[calc(100%-4px)] 2xl:w-[calc(100%-6px)] 2xl:h-[calc(100%-6px)] absolute inset-0.5 2xl:inset-[3px] group-hover:bg-red bg-white [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] transition-colors"
                      )}
                    />
                    {isLoading && (
                      <LoaderIcon className="w-4 h-4 animate-spin relative" />
                    )}
                    <span className="relative">Активировать</span>
                  </button>
                </div>
              </>
            )
          )}

          <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
            <CloseIcon className="w-6 sm:w-[36px] 3xl:w-[44px]" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ClaimDialog
