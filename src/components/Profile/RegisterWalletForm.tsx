import { useState } from "react"
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

import { WalletReqParams, useRegisterByWalletMutation } from "@/redux/api/auth"

import { shortenWallet } from "@/utils/shortenWallet"
import { INVALID_DATA } from "@/utils/errorCodes"

import { MAIL_TO_LINK } from "./constants"

const AUTH_MESSAGE = "Authorization"

const RegisterWalletForm = ({
  back,
  signature,
}: {
  signature: string
  back: () => void
}) => {
  const [emailDomain, setEmailDomain] = useState("")

  const { address } = useAccount()

  const [regWallet, { isSuccess, isLoading, error }] =
    useRegisterByWalletMutation()

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

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
      <Form {...form}>
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
      <div className="flex mt-3">
        {isSuccess && (
          <ResponseSuccessText>
            Вы успешно зарегистрированы! Перейдите по ссылке, которую мы
            отправили вам на почту{" "}
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
      </div>
    </>
  )
}

export default RegisterWalletForm
