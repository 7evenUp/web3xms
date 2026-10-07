// import { useEffect, useState } from "react"
import { useState } from "react"

import ButtonBorder from "@/assets/svgs/profile-btn-border.svg?react"
import ProfileIcon from "@/assets/icons/profile-account.svg?react"

// import { useObtainMutation, useGetIdTokenMutation } from "@/redux/api/auth"
// import { useRefetchProfileMutation } from "@/redux/api/profile"
// import { setTokens } from "@/redux/authTokens/slice"
// import { useAppDispatch } from "@/redux/hooks"
import AuthModal from "./AuthModal"

const AuthButton = () => {
  // const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // const [getIdToken, { isLoading: isGetIdTokenLoading }] =
  //   useGetIdTokenMutation()
  // const [obtain, { isLoading: isObtainLoading }] = useObtainMutation()
  // const [refetchProfile] = useRefetchProfileMutation()

  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (isGetIdTokenLoading) {
  //     setIsLoading(true)
  //   }

  //   let timeoutId

  //   if (isLoading && !isGetIdTokenLoading) {
  //     timeoutId = setTimeout(() => {
  //       setIsLoading(false)
  //     }, 1000)
  //   }

  //   if (isObtainLoading) {
  //     setIsLoading(true)
  //     clearTimeout(timeoutId)
  //   }

  //   if (isLoading && !isObtainLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false)
  //     }, 1000)
  //   }
  // }, [isGetIdTokenLoading, isObtainLoading])

  // const onAuthClick = async () => {
  //   let idToken: string

  //   const url = new URL(location.href)
  //   const refValue = url.searchParams.get("ref")

  //   try {
  //     idToken = (await getIdToken().unwrap()).token
  //   } catch {
  //     if (refValue) {
  //       window.location.replace(
  //         `${import.meta.env.VITE_ID_URL}/?ref_code=${refValue}`
  //       )
  //     } else {
  //       window.location.replace(import.meta.env.VITE_ID_URL)
  //     }
  //     return
  //   }

  //   try {
  //     const authTokens = await obtain({ idToken }).unwrap()
  //     dispatch(
  //       setTokens({
  //         accessToken: authTokens.accessToken,
  //         refreshToken: authTokens.refreshToken,
  //       })
  //     )
  //     setTimeout(() => {
  //       refetchProfile()
  //     }, 100)
  //   } catch (error) {
  //     console.log("ERROR INSIDE TRY-CATCH in AuthButton.tsx")
  //   }
  // }

  return (
    <>
      <button
        className="group relative w-[220px] h-[43px] 2xl:w-[270px] 2xl:h-[50px] 3xl:w-[346px] 3xl:h-[57px] text-white hover:text-black flex justify-center items-center gap-1.5 2xl:gap-2 3xl:gap-3"
        // onClick={onAuthClick}
        onClick={() => setOpen(true)}
      >
        <ButtonBorder className="w-[230px] h-[46px] 2xl:w-[284px] 2xl:h-[53px] 3xl:w-[349px] 3xl:h-[60px] absolute inset-0 group-hover:fill-white" />
        <ProfileIcon className="relative z-10 w-[18px] h-4 2xl:w-[22px] 2xl:h-[20px] 3xl:w-[26px] 3xl:h-6" />
        <span className="relative z-10 font-docker-one text-xs/none 2xl:text-sm/none 3xl:text-lg/none tracking-[0.2em] mt-1">
          войти
        </span>
      </button>

      <AuthModal dialogOpen={open} onOpenChange={setOpen} />
    </>
  )
}

export default AuthButton
