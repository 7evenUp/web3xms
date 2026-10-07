import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"

import { Wrench, Copy, Check } from "iconoir-react"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import LoaderIcon from "@/assets/icons/loader.svg?react"

import { useRemintMutation } from "@/redux/api/remint"

const FormDialog = () => {
  const [isCopied, setIsCopied] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const [remint, { data, isLoading, isSuccess, isError }] = useRemintMutation()

  const onCopy = () => {
    navigator.clipboard.writeText(
      "UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ"
    )
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  const onSubmit = async () => {
    if (isLoading) return

    if (!inputValue) return

    setErrorMsg("")

    try {
      await remint({ tx_hash: inputValue }).unwrap()
    } catch (error) {
      // @ts-expect-error no-rtkq-error-types
      if (error.status === 401 || error.status === 403) {
        setErrorMsg("Вы не авторизованы. Войдите или перезагрузите страницу.")
        return
      }

      // @ts-expect-error no-rtkq-error-types
      if (error.status === 500) {
        setErrorMsg("Ошибка сервера. Пожалуйста, попробуйте позже.")
        return
      }

      // @ts-expect-error no-rtkq-error-types 1
      if (error.data.code === "too_many_requests") {
        setErrorMsg(
          "Замечено слишком много запросов. Пожалуйста, попробуйте позже."
        )
      }
      // @ts-expect-error no-rtkq-error-types 2
      if (error.data.code === "transaction_already_checked") {
        setErrorMsg("Данная транзакция уже была проверена.")
      }
      // @ts-expect-error no-rtkq-error-types 3
      if (error.data.code === "incorrect_transaction") {
        setErrorMsg("Введённый Вами tx hash некорректный.")
      }
      // @ts-expect-error no-rtkq-error-types 4
      if (error.data.code === "nft_not_burned") {
        setErrorMsg("NFT не было сожжено.")
      }
      // @ts-expect-error no-rtkq-error-types 5
      if (error.data.code === "nft_not_found_or_burned") {
        setErrorMsg("NFT не было найдено, либо не было сожжено.")
      }
      // @ts-expect-error no-rtkq-error-types 6
      if (error.data.code === "unexpected_error") {
        setErrorMsg(
          "Неизвестная ошибка. Проверьте корректность введённых Вами данных."
        )
      }
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="group z-50 font-circe-bold text-sm/none 2xl:text-base/none 3xl:text-xl/none tracking-[0.2em] text-red hover:text-white absolute left-2.5 md:left-5 2xl:left-[29px] top-[170px] 2xl:top-[200px] 3xl:top-[245px] flex items-center gap-2 2xl:gap-3 3xl:gap-[15px]">
        <div className="w-8 h-8 2xl:w-10 2xl:h-10 3xl:w-11 3xl:h-11 border-2 border-red group-hover:border-white rounded-full flex items-center justify-center">
          <Wrench className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7" />
        </div>
        Замена повреждённых деталей
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed z-[100] inset-0 backdrop-blur-sm" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-[101] top-[50%] left-[50%] h-[100dvh] w-screen phone:h-fit phone:w-[470px] translate-x-[-50%] translate-y-[-50%] focus:outline-none bg-white text-black flex flex-col p-6">
          <h2 className="font-docker-one mb-8">Замена повреждённых деталей</h2>

          <p className="font-circe-bold text-base/none mb-6">
            Поврежденными считаются детали, у которых отсутствуют атрибуты!
          </p>

          <p className="font-circe-bold text-base/none mb-2">
            1. Зайдите в Ваш кошелёк.
          </p>
          <p className="font-circe-bold text-base/none mb-2">
            2. Отправьте NFT на адрес
            <button
              className="flex items-center gap-2 text-xs/none font-sans py-1 hover:underline underline-offset-4 break-all"
              onClick={onCopy}
            >
              UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ
              {isCopied ? (
                <Check className="animate-in fade-in-0 shrink-0" />
              ) : (
                <Copy className="animate-in fade-in-0 shrink-0" />
              )}
            </button>
          </p>
          <p className="font-circe-bold text-base/none mb-2">
            3. Найдите tx hash у проделанной транзакции и вставьте в поле ввода
            ниже.
          </p>
          <p className="font-circe-bold text-base/none mb-6">
            4. Нажмите {'"Отправить"'}.
          </p>

          <p className="font-circe-bold text-base/none">
            <span className="text-red">! </span>
            <span>При отправке нормальных NFT замена не производится</span>
            <span className="text-red"> !</span>
          </p>

          <input
            className="border border-black focus:border-gray focus:placeholder:text-gray font-circe-bold text-base/none px-3 py-2 outline-none w-full mt-6 mb-4"
            placeholder="Введите tx hash"
            value={inputValue}
            onChange={(evt) => setInputValue(evt.currentTarget.value)}
          />
          {isSuccess && data && (
            <p className="mb-4 text-green-500 font-circe-bold">
              Замена произошла успешно.{" "}
              <a
                href={data.nftLink}
                className="underline underline-offset-4"
                target="_blank"
              >
                Ссылка на NFT
              </a>
            </p>
          )}
          {isError && (
            <p className="mb-4 text-red font-circe-bold text-base/none">
              {errorMsg}
            </p>
          )}
          <button
            className="w-fit py-2 px-6 mx-auto font-docker-one border border-red text-red hover:bg-red hover:text-white flex items-center gap-2"
            onClick={onSubmit}
          >
            {isLoading && <LoaderIcon className="animate-spin" />}
            Отправить
          </button>
          <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
            <CloseIcon className="w-6 sm:w-[36px] 3xl:w-[44px]" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FormDialog
