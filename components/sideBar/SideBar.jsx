"use client"
import { usePathname } from 'next/navigation'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { IoLibrary, IoSearchSharp } from "react-icons/io5"
import {GoHome} from "react-icons/go"
import { SideBarItem } from './_subComp/SideBarItem'

import { cn } from '@/lib/utils'  

import { SideBarBottom } from './_subComp/SideBarBottom'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import RightBar from '../rightBar/RightBar'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { setWidth } from '@/lib/redux/slices/pageWidth'
import { BiSearch } from 'react-icons/bi'
import { Skeleton } from '../ui/skeleton'
import LoadingSkeleton from '../LoadingSkeleton'

  

const SideBar = ({children}) => {
  const {data,status}=useSession()
  const pageRef = useRef(null)
  const pageWidth=pageRef.current?.clientWidth
  const pathName=usePathname()
  const { opened } = useAppSelector(state => state.rightbar)
  const [sidebarSpan,setSideBarSpan]=useState(true)
  const dispatch=useAppDispatch()
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
   useEffect(() => {
    if (pageWidth) {
      dispatch(setWidth(pageWidth))
     }
    },[pageWidth])
    
    


    if(pathName.includes("/dashboard")){
      return(
        <div className={cn('w-full flex h-[100vh] p-2' , pathName.includes("dashboard") ? "p-0" : undefined)}>
         <main className={cn('h-full ml-2 ', pathName.includes("dashboard") ? "w-full ml-0" : undefined)}>{children}</main>
     </div>
      )
    }
  return (
    <div className={cn('w-full h-[100vh] flex lg:h-[calc(100vh-80px)] lg:p-2 gap-x-2' ,data ? "lg:h-[calc(100vh-80px)]" :"lg:h-[100vh]")}>
       <div className={cn("hidden lg:block",sidebarSpan ? 'w-[370px]' : "w-[85px] overflow-hidden")}>
       <div className='flex flex-col justify-between w-full h-1/6 py-2 bg-neutral-900 rounded-md'>
                {routes.map((item,i)=>
                    <SideBarItem key={i} item={item} showContent={sidebarSpan}/>
                )}
        </div>
        {status !== "loading" ? 
          <>
            {!data ?
            <>
              
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
             
            <div className='h-5/6 pt-2 w-full rounded-md'>

            <SideBarBottom setSideBarSpan={setSideBarSpan} sidebarSpan={sidebarSpan}/>
            </div>
           </>
           }
          </>
        :
        <div className='h-5/6 pt-2 w-full  '>
        <LoadingSkeleton/>
            </div>
           }
        </div>
        <div ref={pageRef} className={cn('w-full h-full  flex items-center justify-between',sidebarSpan ? 'lg:w-[calc(100%-370px)]' : "lg:w-[calc(100%-85px)]")}>
        {opened ? 
        <>
        <main className={cn('lg:w-[70%] relative w-full  h-full rounded-md')}>
          {children}
        </main>
        <div className={cn("hidden   h-full overflow-hidden justify-start pl-2 lg:w-[30%] lg:flex ")}>
          <RightBar/>
          </div> 
          </>
        :
        <main className={cn('w-full  h-full rounded-md')}>
            {children}
            {/* navbar and footer in small screens */}
          <div className='w-full h-14 p-3 fixed bottom-0 bg-neutral-900/95  flex items-center justify-between lg:hidden'>
         <div>
          <Link href={"/"} className={cn('flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white',pathName === "/" && "text-white")}>
            <GoHome size={24}/>
            <span className='capitalize text-xs font-bold'>home</span>
          </Link>
         </div>
         <div>
         <Link href={"/search"} className={cn('flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white',pathName === "/search" && "text-white")}>
            <IoSearchSharp  size={24}/>
            <span className='capitalize text-xs font-bold'>search</span>
          </Link>
         </div>
         <div>
         <Link href={"/collection/tracks"} className={cn('flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white',pathName === "/collection/tracks" && "text-white")}>
            <IoLibrary  size={24}/>
            <span className='capitalize text-xs font-bold'>library</span>
          </Link>
         </div>
        </div>
        </main>
          } 
        </div>
        
    </div>
  )
}

const Loading = () => {
  return (
    <div className='h-5/6 w-full pt-2 '>
      <Skeleton className={"h-full w-full rounded-md "}/>
    </div>
  )
}

export default SideBar