import { Dispatch, SetStateAction, useEffect, useState } from "react"
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

import {
  useAuthMobileMutation,
  useLazyCheckIdTokenQuery,
  useLoginMobileMutation,
} from "@/redux/api/auth"

import { MAIL_TO_LINK } from "./constants"

const LoginMailFormMobile = ({
  emailInput,
  setEmailInput,
  onOpenChange,
}: {
  emailInput: string
  setEmailInput: Dispatch<SetStateAction<string>>
  onOpenChange: (open: boolean) => void
}) => {
  const [emailDomain, setEmailDomain] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)

  const [refetch] = useLazyCheckIdTokenQuery()

  const [
    loginMobile,
    {
      isLoading: isLoadingMobile,
      isSuccess: isSuccessMobile,
      error: errorMobile,
    },
  ] = useLoginMobileMutation({
    fixedCacheKey: "login-by-mail-mobile",
  })

  const [
    triggerAuth,
    {
      isError: isAuthError,
      isSuccess,
      error: authError,
      isLoading: isAuthLoading,
    },
  ] = useAuthMobileMutation()

  const formSchema = z.object({
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

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    const cleanEmail = email.toLowerCase().trim()

    setEmailInput(cleanEmail)
    setEmailDomain(cleanEmail.split("@")[1])

    const redirect_url = window.location.origin + "/quest/phase-1"

    try {
      await loginMobile({
        email: cleanEmail,
        redirect_url,
      }).unwrap()
      setEmailInput("")
    } catch {
      console.log("error")
    }
  }

  useEffect(() => {
    if (isSuccessMobile) {
      setIsCodeSent(true)
    }
  }, [isSuccessMobile])

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => refetch(), 100)
      onOpenChange(false)
    }
  }, [isSuccess])

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
                    <AuthInput placeholder="Введите вашу почту" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ActionButton type="submit" isLoading={isLoadingMobile}>
              Получить код
            </ActionButton>
          </form>
        </Form>
      )}

      <div className="flex mt-3">
        {isSuccessMobile && !isAuthError && (
          <ResponseSuccessText>
            Код для входа успешно отправлен вам на почту{" "}
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

export default LoginMailFormMobile
