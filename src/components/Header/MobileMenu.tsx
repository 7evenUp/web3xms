import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

import CloseIcon from "@/assets/icons/close-dialog.svg?react"
import Web3Icon from "@/assets/icons/web3xms.svg?react"

import { cn } from "@/lib/cn"

const MobileMenu = () => {
  const { search } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const body = document.querySelector("body")

    if (menuOpen) {
      body?.classList.add("menu_opened")
    } else {
      body?.classList.remove("menu_opened")
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <button
        className="flex sm:hidden justify-center items-center gap-2"
        onClick={() => setMenuOpen(true)}
      >
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1H20M0 7H20M0 13H20"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      <div
        className={cn(
          "relative bg-black text-white fixed inset-0 z-[999] flex sm:hidden flex-col justify-center items-center h-[100dvh] w-screen overflow-hidden translate-x-full transition-transform",
          menuOpen && "translate-x-0"
        )}
      >
        <Web3Icon className="absolute left-4 top-4 w-[80px] md:w-[120px] 2xl:w-[160px] 3xl:w-[203px]" />
        <button
          role="close"
          onClick={closeMenu}
          className="flex fixed right-8 top-8 origin-center transition-transform hover:rotate-180"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <div className="flex flex-col gap-4">
          <NavLink
            to={"/main" + search}
            onClick={closeMenu}
            className={({ isActive }) =>
              cn(
                "w-[120px] h-[26px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] hover:text-yellow font-docker-one text-lg/none",
                isActive && "bg-red hover:bg-gray hover:text-black"
              )
            }
          >
            Главная
          </NavLink>
          <NavLink
            to={"/quest" + search}
            onClick={closeMenu}
            className={({ isActive }) =>
              cn(
                "w-[120px] h-[26px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] hover:text-yellow font-docker-one text-lg/none",
                isActive && "bg-red hover:bg-gray hover:text-black"
              )
            }
          >
            Квест
          </NavLink>
          <NavLink
            to={"/faq" + search}
            onClick={closeMenu}
            className={({ isActive }) =>
              cn(
                "w-[120px] h-[26px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] hover:text-yellow font-docker-one text-lg/none",
                isActive && "bg-red hover:bg-gray hover:text-black"
              )
            }
          >
            Faq
          </NavLink>
          <NavLink
            to={"/about" + search}
            onClick={closeMenu}
            className={({ isActive }) =>
              cn(
                "w-[120px] h-[26px] text-center flex justify-center items-center [clip-path:polygon(0_0,100%_0,97%_100%,3%_100%)] hover:text-yellow font-docker-one text-lg/none",
                isActive && "bg-red hover:bg-gray hover:text-black"
              )
            }
          >
            О нас
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
