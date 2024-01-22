"use client"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdOutlineFavorite, MdPictureInPicture } from 'react-icons/md'

const CurrentMusicCard = ({children}) => {
    const [showRightBar,setShowRightBar]=useState(true);
    const handleShowRightBar=()=>{
        setShowRightBar(prev=>!prev);
    }
    const pathName=usePathname()

  if(pathName.includes("/dashboard")){
    return
  }

  return (
    <div className="w-full h-[80px] px-2 pb-2 gap-x-2 flex items-center justify-between">
        <div className='w-[27.6%] h-full p-2 flex items-center justify-between gap-x-2 '>
          <div className='w-2/12 pl-1'>
          <div className="group w-14 h-14 rounded-md relative">
            <button
              className="p-1 group-hover:opacity-100 group-hover:transition-opacity z-10 opacity-0 absolute right-1 top-1 rounded-full bg-neutral-900/90 text-neutral-50 "
              onClick={handleShowRightBar}
            >
              {showRightBar ? (
                <IoIosArrowDown size={20} />
              ) : (
                <IoIosArrowUp size={20}/>
              )}
            </button>
            <Image
              src={"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"}
              alt="music"
              width={56}
              height={56}
              className="object-cover rounded-md"
            />
          </div>
          </div>
          <div className='w-8/12 pl-3 flex flex-col justify-center gap-y-1 capitalize '>
            <span className='text-base font-medium truncate text-white cursor-pointer hover:underline'>weapons</span>
            <span className='text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline '>ava max</span>
          </div>
          <div className='w-2/12 flex justify-between items-center'>
            <button>
                <MdOutlineFavorite size={20} className='text-xl text-green-600 hover:text-green-500 cursor-pointer'/>
            </button>
            <button className='text-stone-400 hover:text-white'>
            <MdPictureInPicture size={20} />
            </button>
          </div>
        </div>
        <main className='w-[72.4%] h-full p-2'>{children}</main>
    </div>
  )
}

export default CurrentMusicCard