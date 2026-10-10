import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Wrench } from "iconoir-react"
import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import { useRemintMutation } from "@/redux/api/remint"
const FormDialog = () => {
  const [input, setInput] = useState("")
  const [remint, { isLoading, isSuccess, reset }] = useRemintMutation()
  return <Dialog.Root onOpenChange={() => { reset(); setInput("") }}>
    <Dialog.Trigger className="group z-20 font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em] text-red hover:text-white absolute left-2.5 md:left-5 2xl:left-[29px] top-[170px] 2xl:top-[200px] 3xl:top-[245px] flex items-center gap-2">
      <span className="w-8 h-8 border-2 border-red rounded-full flex items-center justify-center"><Wrench className="w-5 h-5" /></span>Замена повреждённых деталей
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed z-[100] inset-0 backdrop-blur-sm" />
      <Dialog.Content className="fixed z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-[470px] bg-white text-black flex flex-col p-6 font-circe-bold">
        <Dialog.Title className="text-xl pr-8">Замена повреждённых деталей</Dialog.Title>
        <Dialog.Description className="mt-5">В демо можно проверить замену NFT без отправки транзакций. Введи любое обозначение детали и нажми «Заменить».</Dialog.Description>
        <label className="mt-5">Обозначение детали<input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Например, demo-part-1" className="border border-gray p-3 mt-2 w-full" /></label>
        {isSuccess && <p role="status" className="mt-4 text-green-700">Демо-деталь успешно восстановлена и добавлена в инвентарь.</p>}
        <button disabled={isLoading || !input.trim() || isSuccess} className="mt-5 bg-red text-white p-3 disabled:opacity-50" onClick={() => remint({ tx_hash: input.trim() })}>{isLoading ? "Заменяем…" : "Заменить"}</button>
        <Dialog.Close aria-label="Закрыть замену" className="absolute top-4 right-4"><CloseIcon className="w-6 h-6" /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
export default FormDialog
