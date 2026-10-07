import { Dispatch, SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

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

import { MailRegParams, useRegisterMutation } from "@/redux/api/auth"

import { MAIL_TO_LINK } from "./constants"

const RegisterMailForm = ({
  emailInput,
  setEmailInput,
  resetLoginError,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
  resetLoginError: () => void
}) => {
  const [emailDomain, setEmailDomain] = useState("")

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation()

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
      email: emailInput || "",
    },
  })

  const onSubmit = async ({ email, username }: z.infer<typeof formSchema>) => {
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

    let payload: MailRegParams = {
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

    register(payload)
  }

  return (
    <>
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
                  <AuthInput
                    placeholder="Введите вашу почту"
                    {...field}
                    onChange={(evt) => {
                      setEmailInput(evt.currentTarget.value)
                      resetLoginError()
                    }}
                  />
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
              // @ts-expect-error No-Error-Types
              error.status === 429
                ? "Замечено много попыток авторизации. Пожалуйста, повторите позже"
                : "На стороне сервера произошла ошибка"
            }
          </ResponseErrorText>
        )}
      </div>
    </>
  )
}

export default RegisterMailForm
