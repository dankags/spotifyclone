"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiBell } from 'react-icons/bi'
import { FiArrowDownCircle } from "react-icons/fi"
import { LuUser2 } from "react-icons/lu"
import { ToolTip } from '../../ToolTip'
import { NavMenu } from './NavMenu'

export const RightNavBar = () => {
   
   const {data}=useSession() 
   const [showDropDown,setShowDropDown]=useState(false)
    
  return (
    <div className="w-6/12 flex items-center justify-end gap-2 relative pr-2">
    <div className="p-2 ml-2 flex items-center rounded-2xl bg-neutral-50 cursor-pointer">
      <span className="font-bold text-xs text-ellipsis overflow-hidden whitespace-nowrap text-neutral-900 rounded-2xl ">
        Explore premium
      </span>
    </div>
    <div className="p-2 rounded-2xl bg-neutral-900/80  cursor-pointer hover:bg-neutral-800/80">
      <span className="font-semibold flex shrink-0 gap-x-2 items-center text-xs text-neutral-50  text-nowrap whitespace-nowrap">
        <FiArrowDownCircle size={20} /> 
        <span>Install app</span>
      </span>
    </div>
    <div className="p-1 rounded-full bg-neutral-900/80  cursor-pointer hover:bg-neutral-800/80">
      <Link href={"/"} className="w-6 h-6 font-semibold  flex justify-center items-center shrink-0 gap-x-2  text-xs text-neutral-50 text-nowrap whitespace-nowrap">
       <ToolTip side={"bottom"} align={"center"} content={"notification"}>
        <BiBell size={20} />
        </ToolTip> 
      </Link>
    </div>
    <div className="h-8 w-8  flex justify-center items-center shrink-0 bg-neutral-900/80 rounded-full">
    <NavMenu>
      <span onClick={()=>setShowDropDown(!showDropDown)} className="w-6 h-6 relative text-center no-underline cursor-pointer">
       {data?.user.image ? <Image
          src={data.user.image}
          alt="userProfile"
          fill
          title={data?.user.name}
          className=" rounded-full object-cover"
        />
      :
      <LuUser2 size={20} className='m-auto text-stone-300'/>
      }
      </span>
      </NavMenu>
    </div>
    {/* {
       showDropDown ?
      <div className="w-32 absolute right-3 top-14 bg-neutral-800 text-base flex flex-col items-center rounded-md " >
            <span className='w-full rounded-t-md py-2 text-center cursor-pointer text-sm font-semibold hover:bg-neutral-700/75'>Account</span>
            <Link href="/user/disnciowowiwec" className="w-full  py-2 text-center cursor-pointer text-sm font-semibold hover:bg-neutral-700/75">Profile</Link>
            <span  className='w-full py-2 text-center cursor-pointer text-sm font-semibold hover:bg-neutral-700/75'>Playlist</span>
            <span className='w-full py-2 text-center cursor-pointer text-sm font-semibold hover:bg-neutral-700/75'>PlayList</span>
            <hr className='w-10/12 dark:border-neutral-700 my-2' />
            <span onClick={() => signOut()} className='w-full py-2 rounded-b-md text-center cursor-pointer text-sm font-semibold hover:bg-neutral-700/75'>LogOut</span>
          </div>
          :
        "" 
      } */}
  </div>
  )
}


