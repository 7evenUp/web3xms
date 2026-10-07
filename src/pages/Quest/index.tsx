import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { useProfileQuery, useRefetchProfileMutation } from "@/redux/api/profile"
import {
  useCheckIdTokenQuery,
  useObtainMutation,
  useRefreshMutation,
} from "@/redux/api/auth"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearAuthTokens, setTokens } from "@/redux/authTokens/slice"

const ERROR_401_MESSAGE = "Not authenticated"

const Quest = () => {
  const dispatch = useAppDispatch()

  const authRefreshToken = useAppSelector(
    (state) => state.authTokens.refreshToken
  )

  const { error } = useProfileQuery()
  const [triggerRefresh] = useRefreshMutation()
  const [refetchProfile] = useRefetchProfileMutation()
  const { data: idToken, isError, isSuccess } = useCheckIdTokenQuery()
  const [obtain] = useObtainMutation()

  useEffect(() => {
    if (isError) {
      dispatch(clearAuthTokens())
      setTimeout(() => {
        refetchProfile()
      }, 100)
    }

    if (isSuccess) {
      const obtainAsync = async () => {
        const authTokens = await obtain({ idToken: idToken.token }).unwrap()
        dispatch(
          setTokens({
            accessToken: authTokens.accessToken,
            refreshToken: authTokens.refreshToken,
          })
        )
        setTimeout(() => {
          refetchProfile()
        }, 100)
      }
      obtainAsync()
    }
  }, [isError, isSuccess])

  const refreshToken = async () => {
    if (error === undefined) return
    // @ts-expect-error RTKQ-No-Error-Types
    if (error.status === 401 && error.data.detail === ERROR_401_MESSAGE) {
      try {
        const refreshResponse = await triggerRefresh({
          refreshToken: authRefreshToken,
        }).unwrap()
        dispatch(
          setTokens({
            accessToken: refreshResponse.accessToken,
            refreshToken: refreshResponse.refreshToken,
          })
        )
        setTimeout(() => {
          refetchProfile()
        }, 100)
      } catch (error) {
        console.log("Error inside TRY-CATCH [refreshToken.Quest.tsx]: ", error)
        dispatch(clearAuthTokens())
      }
    }
  }

  useEffect(() => {
    refreshToken()
  }, [error])

  return (
    <>
      <Outlet />
    </>
  )
}

export default Quest
