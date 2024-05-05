"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { useHistoryState } from '@uidotdev/usehooks'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosPause, IoIosPlay } from "react-icons/io"
import { IoSearchSharp } from 'react-icons/io5'


export const LeftNav = ({children}) => {
  const {data,status}=useSession()
  const router=useRouter();
  const pathName=usePathname();
  const history=useHistoryState()
  const [play,setPlay]=useState(false)
  const [currentPlayList,setCurrentPlayingList]=useState(true)
  const { playingUrl} = useAppSelector((state) => state.urlPlaying);

  return (
    <div className='w-full px-3 flex items-center'>
    <div className="w-2/12 lg:w-6/12 flex items-center justify-between gap-x-3 truncate">
    <div className={`w-2/12 flex items-center gap-2 mr-2`}>
      <button 
      className="p-2 flex items-center justify-center rounded-full bg-neutral-950/80  hover:bg-neutral-950/95 disabled:cursor-not-allowed disabled:bg-neutral-950/40 disabled:hover:bg-neutral-950/50"
       onClick={()=>router.back()}
       
       >
        <IoIosArrowBack size={20} className="" />
      </button>
      <button 
      className="hidden p-2 lg:flex items-center justify-center rounded-full bg-neutral-950/80 hover:bg-neutral-950/95 disabled:cursor-not-allowed disabled:bg-neutral-950/40 disabled:hover:bg-neutral-950/50 "
      onClick={()=>router.forward()}
      
        >
        <IoIosArrowForward size={20} className="" />
      </button>
    </div>
    <div className={`w-10/12 h-full flex items-center justify-start truncate`}>
      { !pathName.includes("search") ?
        <ActiveMusicPlaying currentPlayList={currentPlayList} setPlay={setPlay} playingUrl={playingUrl}/>
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
const ActiveMusicPlaying=({currentPlaylist,setPlay,playingUrl})=>{
   const [isPlaying,setIsPlaying]=useState(false)
   const handleClick=()=>{
    setPlay(!isPlaying);
    setIsPlaying(!isPlaying);
   }
  if(currentPlaylist || !playingUrl){
    return
  }
  return(
    <div className='w-full pl-3 h-full flex items-center'>
    <button
  className="p-2 flex items-center justify-center shrink-0 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"
  onClick={handleClick}
>
  {isPlaying ? (
    <IoIosPlay size={27} className=" text-neutral-900 " />
  ) : (
    <IoIosPause size={27} className=" text-neutral-900 " />
  )}
</button>
<span className={`pl-2 text-xl  font-bold capitalize truncate`}>daniel kagombe</span>
   </div> 
  )
}