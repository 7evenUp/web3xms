import { useState } from "react"
import { toast } from "sonner"

import { cn } from "@/lib/cn"

import InfoDialog from "./InfoDialog"
// import TonDialog from "./TonDialog"

import { useProfileQuery } from "@/redux/api/profile"

import ClaimDialog from "./ClaimDialog"

const COLORS = {
  common: "#D9D9D9",
  uncommon: "#008EFF",
  rare: "#615DFF",
  legendary: "#FF4654",
  immortal: "#FAC70E",
  contraband: "#fa940e",
}

const InventoryItem = ({
  id,
  title,
  imgSrc,
  rarity,
  type,
  userData,
  isUsed,
  instruction,
  className,
}: {
  id: number
  title: string
  imgSrc: string
  rarity: keyof typeof COLORS
  type: "nft" | "crypton_promo_code" | "sponsor_promo_code"
  userData: string | null
  isUsed: boolean
  instruction: string | null
  className?: string
}) => {
  // const [tonDialogOpen, setTonDialogOpen] = useState(false)
  const [claimDialogOpen, setClaimDialogOpen] = useState(false)

  const { data: profileData } = useProfileQuery()

  const onClaimClick = async () => {
    if (profileData?.tonAddress === null) {
      // setTonDialogOpen(true)
      toast.warning(
        "Для активации NFT Вам необходимо привязать TON кошелёк на https://id.crypton.xyz"
      )
    } else {
      setClaimDialogOpen(true)
    }
  }

  return (
    <>
      <div
        className={cn(
          "group/card flex flex-col p-3 pt-5 min-h-[280px] sm:min-h-[320px] xl:min-h-[360px] max-w-[335px] phone:max-w-[180px] sm:max-w-[245px] md:max-w-[259px] lg:max-w-[292px] 2xl:max-w-[250px] transition-all bg-gray",
          rarity === "common"
            ? "bg-[#A9A9A9] hover:bg-[#A9A9A9]"
            : rarity === "uncommon"
            ? "bg-[#008EFF] hover:bg-[#008EFF]"
            : rarity === "rare"
            ? "bg-[#615DFF] hover:bg-[#615DFF]"
            : rarity === "legendary"
            ? "bg-[#FF4654] hover:bg-[#FF4654]"
            : rarity === "immortal"
            ? "bg-[#FAC70E] hover:bg-[#FAC70E]"
            : rarity === "contraband" && "bg-[#fa940e] hover:bg-[#fa940e]",
          isUsed && "bg-gray",
          className
        )}
      >
        <h3 className="font-circe-bold text-base/none sm:text-lg/none tracking-[0.02em] text-white mt-auto mb-1.5">
          {title}
        </h3>

        <img
          src={imgSrc}
          className={cn(
            "aspect-square object-cover",
            isUsed && "grayscale group-hover/card:grayscale-0 transition-all"
          )}
        />

        {isUsed ? (
          type === "crypton_promo_code" ? (
            <p className="font-circe-bold sm:text-xl/none tracking-[0.02em] text-white text-center mt-2 h-[72px]">
              {userData && userData}
            </p>
          ) : (
            <p className="font-circe-bold sm:text-xl/none tracking-[0.02em] text-white text-center mt-2 h-[72px]">
              Приз активирован
            </p>
          )
        ) : (
          <>
            <InfoDialog>
              {type === "crypton_promo_code" ? (
                <>
                  <h3 className="font-circe-bold text-2xl/[125%] tracking-[0.02em] mb-6 max-phone:pr-6">
                    Как активировать промокод?
                  </h3>
                  <p className="font-circe-bold text-sm/[125%] phone:text-base/[125%] tracking-[0.02em]">
                    {instruction}
                  </p>
                </>
              ) : type === "nft" ? (
                <>
                  <h3 className="font-circe-bold text-2xl/[125%] tracking-[0.02em] mb-6 max-phone:pr-6">
                    Как активировать NFT?
                  </h3>
                  <p className="font-circe-bold text-sm/[125%] phone:text-base/[125%] tracking-[0.02em]">
                    {instruction}
                  </p>
                </>
              ) : (
                type === "sponsor_promo_code" && (
                  <>
                    <h3 className="font-circe-bold text-2xl/[125%] tracking-[0.02em] mb-6 max-phone:pr-6">
                      Как активировать приз?
                    </h3>
                    <p className="font-circe-bold text-sm/[125%] phone:text-base/[125%] tracking-[0.02em]">
                      {instruction}
                    </p>
                  </>
                )
              )}
            </InfoDialog>

            {type === "nft" ? (
              <button
                className="relative group w-fit mx-auto flex items-center bg-white text-white hover:text-black font-docker-one text-xs/none 3xl:text-sm/none tracking-[0.2em] py-3.5 px-6 phone:px-3 sm:px-6 text-center [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
                onClick={onClaimClick}
              >
                <div
                  className={cn(
                    "w-[calc(100%-6px)] h-[calc(100%-6px)] absolute inset-[3px] [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] bg-gray group-hover:bg-white",
                    rarity === "common"
                      ? "bg-[#A9A9A9]"
                      : rarity === "uncommon"
                      ? "bg-[#008EFF]"
                      : rarity === "rare"
                      ? "bg-[#615DFF]"
                      : rarity === "legendary"
                      ? "bg-[#FF4654]"
                      : rarity === "immortal"
                      ? "bg-[#FAC70E]"
                      : rarity === "contraband" && "bg-[#fa940e]"
                  )}
                />
                <div className="relative flex items-center justify-center gap-2 3xl:gap-3">
                  Активировать
                </div>
              </button>
            ) : type === "crypton_promo_code" ? (
              <button
                className="relative group w-fit mx-auto flex items-center bg-white text-white hover:text-black font-docker-one text-xs/none 3xl:text-sm/none tracking-[0.2em] py-3.5 px-6 phone:px-3 sm:px-6 text-center [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]"
                onClick={onClaimClick}
              >
                <div
                  className={cn(
                    "w-[calc(100%-6px)] h-[calc(100%-6px)] absolute inset-[3px] [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)] group-hover:bg-white",
                    rarity === "common"
                      ? "bg-[#A9A9A9]"
                      : rarity === "uncommon"
                      ? "bg-[#008EFF]"
                      : rarity === "rare"
                      ? "bg-[#615DFF]"
                      : rarity === "legendary"
                      ? "bg-[#FF4654]"
                      : rarity === "immortal"
                      ? "bg-[#FAC70E]"
                      : rarity === "contraband" && "bg-[#fa940e]"
                  )}
                />
                <div className="relative flex items-center justify-center gap-2 3xl:gap-3">
                  Активировать
                </div>
              </button>
            ) : (
              type === "sponsor_promo_code" && (
                <p className="font-circe-regular h-10 text-base/none tracking-[0.02em] text-white text-center">
                  {userData && userData}
                </p>
              )
            )}
          </>
        )}
      </div>

      {/* <TonDialog open={tonDialogOpen} onOpenChange={setTonDialogOpen} /> */}
      <ClaimDialog
        open={claimDialogOpen}
        onOpenChange={setClaimDialogOpen}
        id={id}
        type={type}
      />
    </>
  )
}

export default InventoryItem
