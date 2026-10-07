import React from "react"

const OrderNumber = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="absolute left-4 top-4 sm:top-[22px] sm:left-3 2xl:top-[30px] 2xl:left-5 3xl:top-[36px] 3xl:left-[22px] font-circe-bold text-[10px] 2xl:text-xs tracking-widest text-white">
      {children}
    </span>
  )
}

export default OrderNumber
