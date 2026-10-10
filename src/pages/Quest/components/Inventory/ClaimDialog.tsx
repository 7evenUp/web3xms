import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { toast } from "sonner"
import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import { useClaimMutation } from "@/redux/api/inventory"
const ClaimDialog = ({ id, onOpenChange, open, type }: {
  id: number; open: boolean; onOpenChange: (open: boolean) => void;
  type: "nft" | "crypton_promo_code" | "sponsor_promo_code"
}) => {
  const [code, setCode] = useState("")
  const [claim, { isLoading }] = useClaimMutation()
  const onSubmit = async () => {
    if (isLoading) return
    try {
      const result = await claim({ inventory_prize_id: id }).unwrap()
      setCode(result.prize_code ?? "DEMO")
    } catch { toast.error("Не удалось активировать приз. Попробуй ещё раз.") }
  }
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed z-[100] inset-0 backdrop-blur-sm" />
      <Dialog.Content className="fixed z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-[470px] bg-white text-black flex flex-col p-6 font-circe-bold">
        <Dialog.Title className="text-xl pr-8">{code ? "Приз активирован!" : "Активация демо-приза"}</Dialog.Title>
        <Dialog.Description className="text-sm mt-4">{type === "nft" ? "Демонстрационная активация NFT без кошелька и блокчейна." : "Получение демонстрационного кода награды."} Все подарки виртуальные.</Dialog.Description>
        {code ? <>
          <p className="text-green-700 mt-6">Награда активирована и сохранена в инвентаре.</p>
          <p className="mt-4 text-xl select-all break-all">{code}</p>
          <button className="mt-4 underline" onClick={async () => {
            try { await navigator.clipboard.writeText(code); toast.success("Код скопирован") }
            catch { toast.info("Выдели код и скопируй его вручную") }
          }}>Скопировать демо-код</button>
          <Dialog.Close className="mt-6 border border-red text-red p-3">Готово</Dialog.Close>
        </> : <button disabled={isLoading} onClick={onSubmit} className="bg-red text-white mt-6 p-3 disabled:opacity-50">{isLoading ? "Активируем…" : "Активировать"}</button>}
        <Dialog.Close aria-label="Закрыть активацию" className="absolute top-4 right-4"><CloseIcon className="w-6 h-6" /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
export default ClaimDialog
