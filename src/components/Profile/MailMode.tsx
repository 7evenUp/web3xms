import { useState } from "react"
import { isDesktop } from "react-device-detect"

import MoveLeft from "@/assets/icons/move-left.svg?react"

import LoginMailForm from "./LoginMailForm"
import RegisterMailForm from "./RegisterMailForm"
import LoginMailFormMobile from "./LoginMailFormMobile"

import { useLoginMobileMutation, useLoginMutation } from "@/redux/api/auth"
import RegisterMailFormMobile from "./RegisterMailFormMobile"

const MailMode = ({
  back,
  onOpenChange,
}: {
  back: () => void
  onOpenChange: (open: boolean) => void
}) => {
  const [usedEmail, setUsedEmail] = useState("")

  const [, { isError, reset, error }] = useLoginMutation({
    fixedCacheKey: "login-by-mail",
  })
  const [, { isError: isMobileError, reset: mobileReset, error: mobileError }] =
    useLoginMobileMutation({
      fixedCacheKey: "login-by-mail-mobile",
    })

  return (
    <>
      <button
        className="text-sm flex items-center gap-2 text-black hover:text-gray mb-6 w-fit"
        onClick={back}
      >
        <MoveLeft className="w-3.5 h-3.5" />
        <span className="text-left">Другой метод авторизации</span>
      </button>
      {isDesktop ? (
        // @ts-expect-error No-Error-Types
        isError && error.status !== 429 ? (
          <RegisterMailForm
            emailInput={usedEmail}
            setEmailInput={setUsedEmail}
            resetLoginError={reset}
          />
        ) : (
          <LoginMailForm emailInput={usedEmail} setEmailInput={setUsedEmail} />
        )
      ) : // @ts-expect-error No-Error-Types
      isMobileError && mobileError.status !== 429 ? (
        <RegisterMailFormMobile
          emailInput={usedEmail}
          setEmailInput={setUsedEmail}
          resetLoginError={mobileReset}
          onOpenChange={onOpenChange}
        />
      ) : (
        // <RegisterMailForm
        //   emailInput={usedEmail}
        //   setEmailInput={setUsedEmail}
        //   resetLoginError={mobileReset}
        // />
        <LoginMailFormMobile
          emailInput={usedEmail}
          setEmailInput={setUsedEmail}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  )
}

export default MailMode

// import { useState } from "react"

// import MoveLeft from "@/assets/icons/move-left.svg?react"

// import LoginMailForm from "./LoginMailForm"
// import RegisterMailForm from "./RegisterMailForm"

// import { useLoginMutation } from "@/redux/api/auth"

// const MailMode = ({ back }: { back: () => void }) => {
//   const [usedEmail, setUsedEmail] = useState("")

//   const [, { isError, reset, error }] = useLoginMutation({
//     fixedCacheKey: "login-by-mail",
//   })

//   return (
//     <>
//       <button
//         className="text-sm flex items-center gap-2 text-black hover:text-gray mb-6 w-fit"
//         onClick={back}
//       >
//         <MoveLeft className="w-3.5 h-3.5" />
//         <span className="text-left">Другой метод авторизации</span>
//       </button>
//       {
//         // @ts-expect-error No-Error-Types
//         isError && error.status !== 429 ? (
//           <RegisterMailForm
//             emailInput={usedEmail}
//             setEmailInput={setUsedEmail}
//             resetLoginError={reset}
//           />
//         ) : (
//           <LoginMailForm emailInput={usedEmail} setEmailInput={setUsedEmail} />
//         )
//       }
//     </>
//   )
// }

// export default MailMode
