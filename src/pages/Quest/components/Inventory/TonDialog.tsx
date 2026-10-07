import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import LoaderIcon from "@/assets/icons/loader.svg?react"

import { useSetTonMutation } from "@/redux/api/tonWallet"
import { useRefetchProfileMutation } from "@/redux/api/profile"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import { AuthInput } from "@/components/Profile/AuthInput"

const TonDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [setTon, { error, isSuccess, isLoading }] = useSetTonMutation()
  const [refetch] = useRefetchProfileMutation()

  const formSchema = z.object({
    address: z
      .string()
      .min(1, {
        message: "Поле обязательно для заполнения",
      })
      .refine((val) => val.length === 48, {
        message: "Адрес кошелька TON должен составлять 48 символов",
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { address: "" },
  })

  const onSubmit = async ({ address }: z.infer<typeof formSchema>) => {
    try {
      await setTon({ address }).unwrap()
      setTimeout(() => {
        refetch()
      }, 1000)
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed z-[100] inset-0 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-[101] top-[50%] left-[50%] h-[100dvh] w-screen phone:h-[328px] phone:w-[470px] translate-x-[-50%] translate-y-[-50%] focus:outline-none bg-white text-black flex flex-col p-6">
          <h3 className="font-circe-bold text-2xl/[125%] tracking-[0.02em] mb-6 max-phone:pr-6">
            Заполнение адреса TON кошелька
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col flex-1 font-circe-bold"
            >
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-3 dark:text-gray-4 group-focus-within:text-gray-1 dark:group-focus-within:text-gray-5">
                      Адрес TON кошелька
                    </FormLabel>
                    <FormControl>
                      <AuthInput
                        className="text-sm aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error appearance-none"
                        placeholder="Введите ваш TON кошелёк"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <p className="text-red mt-2">
                  Не удалось установить TON кошелёк
                </p>
              )}

              {!isSuccess && !error && (
                <p className="text-red mt-2">
                  Внимание! Кошелёк телеграмм не поддерживается, используйте{" "}
                  <a
                    href="https://tonkeeper.com/"
                    target="_blank"
                    className="underline underline-offset-4"
                  >
                    Tonkeeper
                  </a>
                </p>
              )}
              {isSuccess && (
                <p className="text-green-400 mt-2">
                  TON кошелёк успешно установлен
                </p>
              )}

              <button
                type="submit"
                className="py-2 px-3 rounded-md border border-black text-black mt-6 phone:mt-auto hover:bg-black hover:text-white flex items-center justify-center gap-2"
              >
                {isLoading && <LoaderIcon className="w-6 h-6 animate-spin" />}
                Подтвердить
              </button>
            </form>
          </Form>

          <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
            <CloseIcon className="w-6 sm:w-[36px] 3xl:w-[44px]" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default TonDialog
