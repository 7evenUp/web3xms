import { useState } from "react"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import { useRefillMutation } from "@/redux/api/profile"
import { useResetDemoMutation } from "@/redux/api/demo"
import type { Profile } from "@/types/profile"
const ProfilePopover = ({ data, children }: { data: Profile; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [refill, { isLoading }] = useRefillMutation()
  const [reset, { isLoading: isResetting }] = useResetDemoMutation()
  return <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>{children}</PopoverTrigger>
    <PopoverContent className="flex flex-col gap-4 w-[280px] p-5 text-white font-circe-bold">
      <h2 className="text-lg">{data.username}</h2>
      <p>Баланс: {data.expBalance} XP</p>
      <p className="text-sm text-white/70">Демо для портфолио. Вход не нужен. Прогресс сохраняется в этом браузере, все призы виртуальные.</p>
      <button disabled={isLoading || isResetting} className="border border-white rounded px-3 py-2 hover:bg-white/10 disabled:opacity-50" onClick={async () => {
        await refill().unwrap()
        toast.success("Начислено 400 демо-XP")
      }}>Получить 400 XP</button>
      <button disabled={isLoading || isResetting} className="text-sm underline underline-offset-4 disabled:opacity-50" onClick={async () => {
        await reset().unwrap()
        setOpen(false)
        toast.success("Демо начато заново")
      }}>Начать демо заново</button>
    </PopoverContent>
  </Popover>
}
export default ProfilePopover
