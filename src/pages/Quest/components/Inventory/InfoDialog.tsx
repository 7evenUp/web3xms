import * as Dialog from "@radix-ui/react-dialog"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"

const InfoDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="font-circe-bold text-sm/none sm:text-base/none tracking-widest text-black mt-2 mb-4 hover:underline underline-offset-4 hover:text-white text-center">
        Как активировать?
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed z-[100] inset-0 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-[101] top-[50%] left-[50%] h-[100dvh] w-screen phone:h-fit phone:w-[470px] translate-x-[-50%] translate-y-[-50%] focus:outline-none bg-white text-black flex flex-col p-6">
          {children}
          <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
            <CloseIcon className="w-6 sm:w-[36px] 3xl:w-[44px]" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default InfoDialog
