"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("group relative flex w-full touch-none select-none items-center cursor-pointer", className)}
    {...props}>
    <SliderPrimitive.Track
      className="relative h-1 w-full grow overflow-hidden rounded-full bg-neutral-800 ">
      <SliderPrimitive.Range className="absolute h-full bg-neutral-50 transition duration-300 group-hover:bg-green-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block opacity-0 h-3 w-3 rounded-full bg-white  transition duration-300 group-hover:opacity-100 focus-visible:outline-none   disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
