import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import ActionButton from "./ActionButton"
import { AuthInput } from "./AuthInput"

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

import { useLoginMutation } from "@/redux/api/auth"

import { MAIL_TO_LINK } from "./constants"

const LoginMailForm = ({
  emailInput,
  setEmailInput,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
}) => {
  const [emailDomain, setEmailDomain] = useState("")

  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Поле обязательно для заполнения",
      })
      .email("Неверный формат почты"),
  })

  const [trigger, { isLoading, isSuccess, error }] = useLoginMutation({
    fixedCacheKey: "login-by-mail",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailInput || "",
    },
  })

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    const cleanEmail = email.toLowerCase().trim()

    setEmailInput(cleanEmail)
    setEmailDomain(cleanEmail.split("@")[1])

    const redirect_url = window.location.origin + "/quest/phase-1"

    trigger({
      email: cleanEmail,
      redirect_url,
    })
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
                  <AuthInput placeholder="Введите вашу почту" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ActionButton type="submit" isLoading={isLoading}>
            Войти
          </ActionButton>
        </form>
      </Form>
      <div className="flex mt-3">
        {isSuccess && (
          <ResponseSuccessText>
            Ссылка для входа успешно отправлена вам на почту{" "}
            {emailDomain in MAIL_TO_LINK ? (
              <a
                href={
                  MAIL_TO_LINK[
                    emailDomain as "gmail.com" | "mail.ru" | "yandex.ru"
                  ].link
                }
                target="_blank"
                className="underline"
              >
                {
                  MAIL_TO_LINK[
                    emailDomain as "gmail.com" | "mail.ru" | "yandex.ru"
                  ].name
                }
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

export default LoginMailForm