import { ToolTip } from '@/components/ToolTip'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export const SideBarItem = ({item,showContent}) => {
  return ( 
   <div className={cn("cursor-pointer pl-2",!showContent && "w-full flex justify-start ")}>
      <ToolTip content={item.label} side={"right"} align={"right"}>
   <Link href={item.href} className={cn(`w-full h-9 no-underline flex justify-start items-center gap-3 px-4  text-stone-400 hover:text-white`,item.active && "text-white")}>
      <div className={cn("",!showContent && "px-1 font-semibold")}>{item.icon}</div>
      {showContent && <p className='font-bold text-base'>{item.label}</p>}
   </Link>
      </ToolTip>  
 </div>
 
  )
}

