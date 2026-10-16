import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import FloatingSoundPlayer from "@/components/AudioPlayer"

import Header from "@/components/Header"
import ScrollToTop from "@/components/ScrollToTop"
import { useSoundContext } from "@/components/SoundProvider"

import "./Root.css"

const Root = () => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()

  const { soundSrc } = useSoundContext()

  useEffect(() => {
    if (pathname === "/") {
      navigate("/main" + search, { replace: true })
    }
    if (pathname === "/quest") {
      navigate("/quest/phase-1" + search, { replace: true })
    }
  }, [pathname, search, navigate])

  return (
    <ScrollToTop>
      <Header />
      <main className="w-full flex flex-col justify-center">
        <Outlet />

        {soundSrc && (
          <>
            <div
              className="h-[330px] w-full bg-black sm:hidden"
              aria-hidden="true"
            />
            <FloatingSoundPlayer />
          </>
        )}
      </main>
    </ScrollToTop>
  )
}

export default Root
