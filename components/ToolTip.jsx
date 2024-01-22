import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

export const ToolTip =({children,content,side,align}) => {
  return (
    <TooltipProvider>
    <Tooltip >
      <TooltipTrigger >
        <div >
        {children}
        </div>
        </TooltipTrigger>
      <TooltipContent className="text-white bg-neutral-800" side={side} align={align}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  
  )
}
