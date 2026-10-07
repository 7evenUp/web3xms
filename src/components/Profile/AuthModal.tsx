import { useEffect, useState } from "react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import * as Dialog from "@radix-ui/react-dialog"
import { toast } from "sonner"
import { isDesktop } from "react-device-detect"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import Loader from "@/assets/icons/loader.svg?react"
import Web3Logo from "@/assets/icons/Web3_logo.svg?react"
import MailLogo from "@/assets/icons/Mail_logo.svg?react"

import AuthModalButton from "./AuthModalButton"
import RegisterWalletForm from "./RegisterWalletForm"
import MailMode from "./MailMode"
import RegisterWalletFormMobile from "./RegisterWalletFormMobile"

import { useAuthByWalletMutation, useCheckIdTokenQuery } from "@/redux/api/auth"

import { cn } from "@/lib/cn"

import { shortenWallet } from "@/utils/shortenWallet"

const AUTH_MESSAGE = "Authorization"
const SIGN_REJECT_ERROR = "UserRejectedRequestError"
const CONNECTOR_NOT_FOUND_ERROR = "ConnectorNotFoundError"

const AuthModal = ({
  dialogOpen,
  onOpenChange,
}: {
  dialogOpen: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const [isAuthStarted, setIsAuthStarted] = useState(false)
  const [isMailMode, setIsMailMode] = useState(false)
  const [signature, setSignature] = useState("")

  const { address, isConnected, isDisconnected } = useAccount()
  const { isLoading: isLoadingSign, signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()

  const [
    authenticate,
    { isError: isAuthError, reset, isSuccess: isAuthSuccess },
  ] = useAuthByWalletMutation()
  const { refetch } = useCheckIdTokenQuery()

  useEffect(() => {
    if (isAuthSuccess) {
      setTimeout(() => refetch(), 100)
      onOpenChange(false)
    }
  }, [isAuthSuccess])

  useEffect(() => {
    const login = async () => {
      let signature

      try {
        signature = await signMessageAsync({ message: AUTH_MESSAGE })
      } catch (error) {
        // @ts-expect-error No-Error-Types
        if (error.name === SIGN_REJECT_ERROR) {
          toast.error("Вы отклонили подпись транзакции в кошельке")
        }

        // @ts-expect-error No-Error-Types
        if (error.name === CONNECTOR_NOT_FOUND_ERROR) {
          toast.error("Запрос уже был отправлен. Откройте Ваш кошелёк")
        }

        disconnect()
        setIsAuthStarted(false)
        return
      }

      setSignature(signature)
      const lowerAddress = isConnected && address ? address.toLowerCase() : ""
      await authenticate({
        address: lowerAddress,
        message: AUTH_MESSAGE,
        signature,
      })

      setIsAuthStarted(false)
    }
    if (isAuthStarted && isConnected) login()
  }, [isAuthStarted, isConnected])

  useEffect(() => {
    if (isDisconnected) {
      reset()
      setIsAuthStarted(false)
    }
  }, [isDisconnected])

  const handleConnect = async () => {
    setIsAuthStarted(true)
    if (!isConnected) open({ view: "Connect" })
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed z-50 inset-0 backdrop-blur-sm" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed z-[51] top-[50%] left-[50%] h-[100dvh] w-screen phone:h-auto phone:w-auto translate-x-[-50%] translate-y-[-50%] focus:outline-none bg-white text-black flex flex-col items-center justify-start phone:rounded-xl"
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <div
            className={cn(
              "flex flex-col justify-between gap-6 py-8 px-9 bg-white text-black w-[370px] min-h-[340px] rounded-xl"
            )}
          >
            <div className="flex flex-col">
              <h2
                className={cn(
                  "text-lg font-medium text-black mb-10 max-w-[260px]"
                )}
              >
                Вход в личный кабинет
              </h2>

              {!isMailMode && !isAuthError && (
                <div className={cn("flex gap-3 flex-wrap items-center my-3.5")}>
                  <AuthModalButton onClick={handleConnect}>
                    <Web3Logo />
                    <span>Кошелёк</span>
                  </AuthModalButton>

                  <AuthModalButton onClick={() => setIsMailMode(true)}>
                    <MailLogo />
                    <span>Почта</span>
                  </AuthModalButton>
                </div>
              )}

              {isAuthError &&
                (isDesktop ? (
                  <RegisterWalletForm
                    signature={signature}
                    back={() => reset()}
                  />
                ) : (
                  <RegisterWalletFormMobile
                    signature={signature}
                    back={() => reset()}
                    onOpenChange={onOpenChange}
                  />
                ))}

              {isMailMode && (
                <MailMode
                  back={() => setIsMailMode(false)}
                  onOpenChange={onOpenChange}
                />
              )}
            </div>
            {isLoadingSign && (
              <div
                className={cn(
                  "flex items-center gap-2 text-sm -tracking-[0.01em] mt-auto"
                )}
              >
                <Loader className={cn("animate-spin")} />
                <p>
                  Подтвердите подпись транзакции в кошельке
                  {address && shortenWallet(address)}
                </p>
              </div>
            )}
          </div>

          <Dialog.Close className="absolute right-4 top-4 sm:left-full sm:translate-x-2 md:translate-x-5 sm:top-0 text-black sm:text-white">
            <CloseIcon className="w-6 sm:w-[36px] 3xl:w-[44px]" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AuthModal
