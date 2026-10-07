import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useAccount } from "wagmi"

import MoveLeft from "@/assets/icons/move-left.svg?react"

import { AuthInput } from "./AuthInput"
import ActionButton from "./ActionButton"

import ResponseErrorText from "./ResponseErrorText"
import ResponseSuccessText from "./ResponseSuccessText"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form"

import {
  WalletReqParams,
  useAuthMobileMutation,
  useLazyCheckIdTokenQuery,
  useRegisterByWalletMobileMutation,
} from "@/redux/api/auth"

import { shortenWallet } from "@/utils/shortenWallet"
import { INVALID_DATA } from "@/utils/errorCodes"

import { MAIL_TO_LINK } from "./constants"

const AUTH_MESSAGE = "Authorization"

const RegisterWalletFormMobile = ({
  back,
  signature,
  onOpenChange,
}: {
  signature: string
  back: () => void
  onOpenChange: (open: boolean) => void
}) => {
  const [emailDomain, setEmailDomain] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)

  const [refetch] = useLazyCheckIdTokenQuery()

  const { address } = useAccount()

  const [regWallet, { isSuccess, isLoading, error }] =
    useRegisterByWalletMobileMutation()

  const [
    triggerAuth,
    {
      isError: isAuthError,
      isSuccess: isAuthSuccess,
      error: authError,
      isLoading: isAuthLoading,
    },
  ] = useAuthMobileMutation()

  const formSchema = z.object({
    username: z.string().min(1, {
      message: "Поле обязательно для заполнения",
    }),
    email: z
      .string()
      .min(1, {
        message: "Поле обязательно для заполнения",
      })
      .email("Неверный формат почты"),
  })

  const codeFormSchema = z.object({
    code: z.string().min(1, {
      message: "Поле обязательно для заполнения",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: "",
    },
  })

  const onCodeSubmit = async ({ code }: z.infer<typeof codeFormSchema>) => {
    const cleanCode = code.trim()

    triggerAuth({ code: cleanCode })
  }

  const onSubmit = async ({ email, username }: z.infer<typeof formSchema>) => {
    if (!address) return

    try {
      const url = new URL(location.href)
      const refCode = url.searchParams.get("ref")
      const utm_source = url.searchParams.get("utm_source")
      const utm_medium = url.searchParams.get("utm_medium")
      const utm_campaign = url.searchParams.get("utm_campaign")
      const utm_content = url.searchParams.get("utm_content")

      const utm_data = {
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null,
      }

      const cleanEmail = email.toLowerCase().trim()
      setEmailDomain(cleanEmail.split("@")[1])

      const redirect_url = window.location.origin + "/quest/phase-1"

      let payload: WalletReqParams = {
        address: address.toLowerCase(),
        message: AUTH_MESSAGE,
        signature,
        email: cleanEmail,
        profile_username: username,
        redirect_url,
      }

      if (refCode) {
        payload = {
          ...payload,
          referral_code: refCode,
        }
      }

      if (utm_source || utm_medium || utm_campaign || utm_content) {
        payload = {
          ...payload,
          utmData: JSON.stringify(utm_data),
        }
      }

      await regWallet(payload)
    } catch (error) {
      console.log("Catch error: ", error)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setIsCodeSent(true)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isAuthSuccess) {
      setTimeout(() => refetch(), 100)
      onOpenChange(false)
    }
  }, [isAuthSuccess])

  if (!address) return null

  return (
    <>
      <button
        className="text-sm flex items-center gap-2 text-black hover:text-gray mb-6 w-fit"
        onClick={back}
      >
        <MoveLeft className="w-3.5 h-3.5" />
        <span className="text-left">Другой метод авторизации</span>
      </button>
      <p className="text-xs w-full mb-3">
        Создание аккаунта c кошельком: {shortenWallet(address)}
      </p>

      {isCodeSent ? (
        <Form {...codeForm} key="codeForm">
          <form
            onSubmit={codeForm.handleSubmit(onCodeSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              name="code"
              control={codeForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="group-focus-within:text-blue">
                    Код
                  </FormLabel>
                  <FormControl>
                    <AuthInput placeholder="Введите код" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ActionButton type="submit" isLoading={isAuthLoading}>
              Войти
            </ActionButton>
          </form>
        </Form>
      ) : (
        <Form {...form} key="EmailForm">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="group-focus-within:text-blue">
                    Почта
                  </FormLabel>
                  <FormControl>
                    <AuthInput placeholder="Введите вашу почту" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="group-focus-within:text-blue">
                    Имя пользователя
                  </FormLabel>
                  <FormControl>
                    <AuthInput
                      placeholder="Введите ваше имя пользователя"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ActionButton type="submit" isLoading={isLoading}>
              Зарегистрироваться
            </ActionButton>
          </form>
        </Form>
      )}

      <div className="flex mt-3">
        {isSuccess && !isAuthError && (
          <ResponseSuccessText>
            Вы успешно зарегистрированы! Код для входа успешно отправлен вам на
            почту{" "}
            {emailDomain in MAIL_TO_LINK ? (
              <a
                href={
                  MAIL_TO_LINK[emailDomain as keyof typeof MAIL_TO_LINK].link
                }
                target="_blank"
                className="underline"
              >
                {MAIL_TO_LINK[emailDomain as keyof typeof MAIL_TO_LINK].name}
              </a>
            ) : (
              <a
                href={`https://${emailDomain}`}
                target="_blank"
                className="underline"
              >
                {emailDomain}
              </a>
            )}
            . Пожалуйста, введите его в поле выше
          </ResponseSuccessText>
        )}
        {error && (
          <ResponseErrorText>
            {
              /* @ts-expect-error No-Error-Types */
              error.status === 429
                ? "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                : // @ts-expect-error No-Error-Types
                error.code === INVALID_DATA
                ? "Ваша почта уже зарегистрирована в системе, пожалуйста, войдите через нее, чтобы привязать кошелек!"
                : "На стороне сервера произошла ошибка"
            }
          </ResponseErrorText>
        )}

        {authError && (
          <ResponseErrorText>
            {
              // @ts-expect-error No-Error-Types
              authError.message === "Token not found"
                ? "Неверный код"
                : // @ts-expect-error No-Error-Types
                authError.status === 429
                ? "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                : "На стороне сервера произошла ошибка"
            }
          </ResponseErrorText>
        )}
      </div>
    </>
  )
}

export default RegisterWalletFormMobile
