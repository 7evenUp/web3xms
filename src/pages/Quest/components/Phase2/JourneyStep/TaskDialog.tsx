import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { toast } from "sonner"
import PuzzleIcon from "@/assets/icons/puzzle-icon.svg?react"
import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import { useCompleteChapterMutation, useDemoProgressQuery } from "@/redux/api/demo"
import { demoTasks } from "@/demo/tasks"
import { cn } from "@/lib/cn"
const TaskDialog = ({ accentColor, chapterId = 1 }: { accentColor?: string; chapterId?: number }) => {
  const [open, setOpen] = useState(false)
  const [answer, setAnswer] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [complete, { isLoading }] = useCompleteChapterMutation()
  const { data: completed } = useDemoProgressQuery()
  const task = demoTasks[chapterId - 1]
  const isDone = completed?.includes(chapterId)
  if (!task) return null
  const onSubmit = async () => {
    if (isLoading || isDone) return
    if (answer !== task.correct) { setError("Попробуй ещё раз. Ответ можно найти во вступлении и на странице кейсов."); return }
    await complete({ chapterId }).unwrap()
    toast.success("Задание выполнено! +80 XP")
    setOpen(false)
  }
  return <Dialog.Root open={open} onOpenChange={(value) => { setOpen(value); setAnswer(null); setError("") }}>
    <Dialog.Trigger asChild>
      <button className="relative group flex items-center w-fit h-fit bg-white text-white font-docker-one text-[10px]/none 2xl:text-xs/none 3xl:text-sm/none tracking-[0.2em] pl-2 pr-3 py-1.5 text-center hover:text-black [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]">
        <div className={cn("absolute inset-0.5 group-hover:bg-white bg-[#CAAC3D] [clip-path:polygon(0_0,94%_16%,100%_83%,0_100%)]", accentColor === "red" && "bg-red", accentColor === "green" && "bg-[#388863]", accentColor === "violet" && "bg-[#664DBB]", accentColor === "cyan" && "bg-[#1D9CAD]", accentColor === "gold" && "bg-[#99790D]", accentColor === "blue" && "bg-[#046BB3]", accentColor === "purple" && "bg-[#B766E5]", accentColor === "burgundy" && "bg-[#9E3233]")} />
        <span className="relative flex items-center gap-2"><PuzzleIcon className="w-5" />{isDone ? "Выполнено" : "К заданиям"}</span>
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed z-[100] inset-0 backdrop-blur-sm" />
      <Dialog.Content className="fixed z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-[470px] max-h-[90dvh] overflow-auto bg-white text-black p-6 font-circe-bold">
        <Dialog.Title className="text-xl pr-8">Задание главы {chapterId}</Dialog.Title>
        <Dialog.Description className="mt-3 text-sm">Правильный ответ принесёт 80 демо-XP. Награда начисляется один раз за главу.</Dialog.Description>
        {isDone ? <p className="mt-6 text-green-700">Задание уже выполнено, награда получена.</p> : <>
          <p className="mt-6 text-lg">{task.question}</p>
          <fieldset className="flex flex-col gap-3 mt-4"><legend className="sr-only">Выбери ответ</legend>
            {task.answers.map((text, index) => <label key={text} className="flex gap-3 items-center border border-gray/30 p-3 cursor-pointer"><input type="radio" name={"chapter-" + chapterId} checked={answer === index} onChange={() => { setAnswer(index); setError("") }} />{text}</label>)}
          </fieldset>
          {error && <p role="alert" className="text-red text-sm mt-3">{error}</p>}
          <button disabled={isLoading || answer === null} onClick={onSubmit} className="mt-5 px-5 py-3 bg-red text-white disabled:opacity-50">{isLoading ? "Проверяем…" : "Проверить ответ"}</button>
        </>}
        <Dialog.Close aria-label="Закрыть задание" className="absolute top-4 right-4"><CloseIcon className="w-6 h-6" /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
export default TaskDialog
