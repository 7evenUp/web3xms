import { useEffect } from "react"

import AuthButton from "./AuthButton"
import ProfileButtons from "./ProfileButtons"

import { useProfileQuery } from "@/redux/api/profile"
import { useCheckIdTokenQuery } from "@/redux/api/auth"
import { useSetTimezoneMutation } from "@/redux/api/timezone"

const Profile = () => {
  const { data, isSuccess: isProfileSuccess } = useProfileQuery()
  const { isSuccess: isTokenSuccess } = useCheckIdTokenQuery()
  const [setTimezone] = useSetTimezoneMutation()

  useEffect(() => {
    if (!data) return

    if (data.timezone !== Intl.DateTimeFormat().resolvedOptions().timeZone) {
      setTimezone({
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    }
  }, [data])

  return (
    <div className="absolute top-[85px] left-2.5 md:left-5 2xl:top-[100px] 3xl:top-[130px] 2xl:left-[29px] flex flex-col gap-3 3xl:gap-4">
      {isProfileSuccess && isTokenSuccess ? (
        <ProfileButtons data={data} />
      ) : (
        <AuthButton />
      )}
    </div>
  )
}

export default Profile
