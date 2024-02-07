"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiBell, BiSearch } from 'react-icons/bi'
import { FiArrowDownCircle } from "react-icons/fi"
import { LuUser2 } from "react-icons/lu"
import { ToolTip } from '../../ToolTip'
import { NavMenu } from './NavMenu'
import { cn } from '@/lib/utils'
import { Tooltip } from '@/components/ui/tooltip'

export const RightNavBar = () => {
   
   const {data}=useSession() 
   const [showDropDown,setShowDropDown]=useState(false)
   const [showSearchInput,setShowSearchInput]=useState(false)
    
  return (
    <div className="w-10/12 lg:w-6/12 flex items-center justify-end gap-2 relative pr-2">
      <div className="hidden p-2 ml-2  items-center rounded-2xl bg-neutral-50 cursor-pointer lg:flex">
        <span className="font-bold text-xs text-ellipsis overflow-hidden whitespace-nowrap text-neutral-900 rounded-2xl ">
          Explore premium
        </span>
      </div>
      <div className="hidden  p-2 rounded-2xl bg-neutral-900/80  cursor-pointer hover:bg-neutral-800/80 lg:block">
        <span className="font-semibold flex shrink-0 gap-x-2 items-center text-xs text-neutral-50  text-nowrap whitespace-nowrap">
          <FiArrowDownCircle size={20} />
          <span>Install app</span>
        </span>
      </div>
      <div
        className={cn(
          "lg:hidden group flex p-2  items-center justify-center rounded-full bg-neutral-900/80 hover:bg-neutral-800 transition-all ease-in-out duration-500 overflow-hidden cursor-pointer ",
          showSearchInput
            ? "w-full gap-x-2 flex items-center mr-3 bg-neutral-900/80 rounded-3xl  "
            : "w-8 h-8 rounded-full"
        )}
      >
        <span
          onClick={() => setShowSearchInput(!showSearchInput)}
          className=" shrink-0 text-stone-50  group-hover:text-white"
        >
          <BiSearch size={20} />
        </span>
        <input
          placeholder="Search"
          className={cn(
            " w-full tracking-wide text-base font-medium placeholder:text-sm bg-neutral-800 focus:border-none focus:outline-none ",
            showSearchInput && "bg-transparent"
          )}
        />
      </div>
      <div className="p-1 rounded-full bg-neutral-900/80  cursor-pointer hover:bg-neutral-800/80">
        <Link
          href={"/"}
          className="w-6 h-6 font-semibold  flex justify-center items-center shrink-0 gap-x-2  text-xs text-neutral-50 text-nowrap whitespace-nowrap"
        >
          <ToolTip side={"bottom"} align={"center"} content={"notification"}>
            <BiBell size={20} />
          </ToolTip>
        </Link>
      </div>
      <div className="h-8 w-8  flex justify-center items-center shrink-0 bg-neutral-900/80 rounded-full">
        <NavMenu>
          <button className="w-6 h-6 relative text-center no-underline cursor-pointer">
            {data?.user.image ? (
              <ToolTip
                className={"mt-3"}
                side={"bottom"}
                align={"center"}
                content={data?.user.name}
              >
                <Image
                  src={data.user.image}
                  alt="userProfile"
                  fill
                  className=" rounded-full object-cover"
                />
              </ToolTip>
            ) : (
              <LuUser2 size={20} className="m-auto text-stone-300" />
            )}
          </button>
        </NavMenu>
      </div>
    </div>
  );
}


