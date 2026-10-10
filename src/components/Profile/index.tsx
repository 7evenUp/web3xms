import ProfileButtons from "./ProfileButtons"
import { useProfileQuery } from "@/redux/api/profile"
const Profile = () => {
  const { data } = useProfileQuery()
  return (
    <div className="absolute top-[85px] left-2.5 md:left-5 2xl:top-[100px] 3xl:top-[130px] 2xl:left-[29px] flex flex-col gap-3 3xl:gap-4">
      {data && <ProfileButtons data={data} />}
    </div>
  )
}
export default Profile
