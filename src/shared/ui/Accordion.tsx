import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import AccordionArrow from "@/assets/icons/accordion-arrow.svg?react"

import { cn } from "@/lib/cn"

import "./Accordion.css"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className="AccordionItem" {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "w-[80vw] h-[55px] small-phone:h-[50px] phone:w-[90vw] md:w-[650px] sm:h-[40px] 2xl:w-[820px] 2xl:h-[50px] 3xl:w-[1027px] 3xl:h-16 text-sm/none phone:text-base/none 2xl:text-xl/none 3xl:text-[26px] font-circe-bold transition-all hover:bg-opacity-80 active:bg-opacity-70 bg-black text-yellow [&[data-state=open]>div>svg]:rotate-180 [&[data-state=open]>div]:bg-yellow [&[data-state=open]>div]:text-black text-left",
        "outside",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-between pl-3 pr-2 phone:pl-6 phone:pr-4 2xl:pl-8 2xl:pr-6 3xl:pl-10",
          "inside"
        )}
      >
        {children}
        <AccordionArrow className="w-4 h-4 phone:w-5 phone:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 shrink-0 transition-transform duration-200" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "w-[80vw] phone:w-[90vw] md:w-[650px] 2xl:w-[820px] 3xl:w-[1027px] overflow-hidden text-sm/none phone:text-base/none 2xl:text-lg/none 3xl:text-[22px] text-black font-circe-regular transition-all pl-3 pr-2 phone:pl-6 phone:pr-4 2xl:pr-6 2xl:pl-8 3xl:pl-10 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-2 pt-3 3xl:pb-4 3xl:pt-6">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
