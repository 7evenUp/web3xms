import { Dispatch, SetStateAction, useEffect, useState } from "react"
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

import {
  MailRegParams,
  useAuthMobileMutation,
  useLazyCheckIdTokenQuery,
  useRegisterMobileMutation,
} from "@/redux/api/auth"

import { MAIL_TO_LINK } from "./constants"

const RegisterMailFormMobile = ({
  emailInput,
  setEmailInput,
  resetLoginError,
  onOpenChange,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
  resetLoginError: () => void
  onOpenChange: (open: boolean) => void
}) => {
  const [emailDomain, setEmailDomain] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)

  const [refetch] = useLazyCheckIdTokenQuery()

  const [
    registerMobile,
    {
      isLoading: isRegisterLoading,
      isSuccess: isSuccessMobile,
      error: errorMobile,
    },
  ] = useRegisterMobileMutation()

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
      email: emailInput || "",
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

    registerMobile(payload)
  }

  useEffect(() => {
    if (isSuccessMobile) {
      setIsCodeSent(true)
    }
  }, [isSuccessMobile])

  useEffect(() => {
    if (isAuthSuccess) {
      setTimeout(() => refetch(), 100)
      onOpenChange(false)
    }
  }, [isAuthSuccess])

  return (
    <>
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
            <ActionButton type="submit" isLoading={isRegisterLoading}>
              Зарегистрироваться
            </ActionButton>
          </form>
        </Form>
      )}

      <div className="flex mt-3">
        {isSuccessMobile && !isAuthError && (
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

        {errorMobile && (
          <ResponseErrorText>
            {
              // @ts-expect-error No-Error-Types
              errorMobile.status === 429
                ? "Замечено много попыток авторизации. Пожалуйста, повторите позже"
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

export default RegisterMailFormMobile
