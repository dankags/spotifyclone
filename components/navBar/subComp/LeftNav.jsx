"use client"
import { useHistoryState } from '@uidotdev/usehooks'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward, IoIosPause, IoIosPlay } from "react-icons/io"
import { IoSearchSharp } from 'react-icons/io5'


export const LeftNav = ({children}) => {
  const {data,status}=useSession()
  console.log(data?.user,status)
  const router=useRouter();
  const pathName=usePathname();
  const history=useHistoryState()
  const [play,setPlay]=useState(false)
  const [currentPlayList,setCurrentPlayingList]=useState(true)
  // console.log(router.back())
  return (
    <div className='w-full px-3 flex items-center'>
    <div className="w-2/12 lg:w-6/12 flex items-center justify-between gap-x-3 truncate">
    <div className={`w-2/12 flex items-center gap-2 mr-2`}>
      <button 
      className="p-2 flex items-center justify-center rounded-full bg-neutral-950/80  hover:bg-neutral-950/95 disabled:cursor-not-allowed disabled:bg-neutral-950/40 disabled:hover:bg-neutral-950/50"
       onClick={()=>router.back()}
       
       >
        <IoIosArrowBack size={20} className="text-lg" />
      </button>
      <button 
      className="hidden p-2 lg:flex items-center justify-center rounded-full bg-neutral-950/80 hover:bg-neutral-950/95 disabled:cursor-not-allowed disabled:bg-neutral-950/40 disabled:hover:bg-neutral-950/50 "
      onClick={()=>router.forward()}
      
        >
        <IoIosArrowForward size={20} className="text-lg" />
      </button>
    </div>
    <div className={`w-10/12 h-full flex items-center justify-start truncate`}>
      { !pathName.includes("search") ?
        <ActiveMusicPlaying currentPlayList={currentPlayList} setPlay={setPlay}/>
      :
      <SearchInput/>
    }
    </div>
  </div>
 
    {children}
     
  </div>
  )
}

const SearchInput=(setSearchValue)=>{
  return(
    <div className="p-2 w-full flex items-center border-2 bg-gray-500/20 justify-between gap-1 rounded-3xl   ">
    <IoSearchSharp size={20}/>
    <input type="search" name="" id="" placeholder='What do you want to listen to?' className={`w-11/12 text-base placeholder:text-base font-normal text-white focus:outline-none bg-transparent`} />
</div>
  )
}
const ActiveMusicPlaying=({currentPlaylist,setPlay})=>{
   const [isPlaying,setIsPlaying]=useState(false)
   const handleClick=()=>{
    setPlay(!isPlaying);
    setIsPlaying(!isPlaying);
   }
  if(currentPlaylist){
    return
  }
  return(
    <div className='pl-3 opacity-0 truncate flex items-center'>
    <button
  className=" flex items-center justify-center shrink-0 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"
  onClick={handleClick}
>
  {isPlaying ? (
    <IoIosPlay size={27} className="m-2 text-neutral-900 text-2xl" />
  ) : (
    <IoIosPause size={27} className="m-2 text-neutral-900 text-3xl" />
  )}
</button>
<span className={`pl-2 text-2xl py-2 font-bold capitalize truncate`}>daniel kagombe</span>
   </div> 
  )
}