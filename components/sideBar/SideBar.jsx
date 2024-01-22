"use client"
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5"
import {GoHome} from "react-icons/go"
import { SideBarItem } from './subComp/SideBarItem'

import { cn } from '@/lib/utils'  

import { SideBarBottom } from './subComp/SideBarBottom'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import RightBar from '../rightBar/RightBar'
  

const SideBar = ({children}) => {
  const {status}=useSession()
  const pathName=usePathname()
    const routes=useMemo(()=>[
      {
        label:"Home",
        icon:<GoHome size={26}/>,
        href:"/",
        active:pathName === "/"
      },
      {
        label:"Search",
        icon:<IoSearchSharp size={26}/>,
        href:"/search",
        active:pathName === "/search"
      }
    ],[pathName])
    const [sidebarSpan,setSideBarSpan]=useState(true)

    if(pathName.includes("/dashboard")){
      return(
        <div className={cn('w-full flex h-[100vh] p-2' , pathName.includes("dashboard") ? "p-0" : undefined)}>
         <main className={cn('h-full ml-2 ', pathName.includes("dashboard") ? "w-full ml-0" : undefined)}>{children}</main>
     </div>
      )
    }
  return (
    <div className={cn('w-full flex h-[calc(100vh-80px)] p-2 gap-x-2')}>
       <div className={cn("",sidebarSpan ? 'w-[370px]' : "w-[85px] overflow-hidden")}>
           { false ?
            <>
              <div className='flex flex-col justify-between w-full h-1/6 py-2 bg-neutral-900 rounded-md'>
                {routes.map((item,i)=>
                    <SideBarItem key={i} item={item} showContent={sidebarSpan}/>
                )}
            </div>
            <div className='h-5/6 pt-2 w-full  '>
               <div className='w-full h-full flex flex-col items-center justify-center gap-y-3 bg-neutral-900 rounded-md'>
                  <div>
                    <span className='font-medium text-center'>Please signin ?</span>
                  </div>
                  <div className='mt-4'>
                    <Link href={"dashboard/login"} className='no-underline text-black font-semibold px-4 py-3 rounded-3xl bg-green-600 hover:bg-green-500 hover:ring-2 hover:ring-white'>
                      Sign in
                    </Link>
                  </div>
               </div>
            </div>
           </>
           :
           <>
             <div className='flex flex-col justify-between w-full h-1/6 py-2 bg-neutral-900 rounded-md'>
                {routes.map((item,i)=>
                    <SideBarItem key={i} item={item} showContent={sidebarSpan}/>
                )}
            </div>
            <div className='h-5/6 pt-2 w-full'>

            <SideBarBottom setSideBarSpan={setSideBarSpan} sidebarSpan={sidebarSpan}/>
            </div>
           </>
           }
            
        </div>
        <div className={cn('w-full h-full flex items-center justify-between',sidebarSpan ? 'w-[calc(100%-370px)]' : "w-[calc(100%-85px)]")}>
        <main className={cn('w-full  h-full rounded-md')}>{children}</main>
        {/* <div className={cn("w-[30%]  h-full overflow-hidden flex justify-start pl-2")}>
          <RightBar/>
          </div>   */}
        </div>
    </div>
  )
}

export default SideBar