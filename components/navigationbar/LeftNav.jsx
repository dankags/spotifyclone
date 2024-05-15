"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { setSearchinputValue } from '@/lib/redux/slices/mainSearchBar';
import { cn } from '@/lib/utils';
import { useHistoryState } from '@uidotdev/usehooks'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowForward, IoIosPause, IoIosPlay } from "react-icons/io"
import { IoSearchSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux';


export const LeftNav = ({children}) => {
  const {data,status}=useSession()
  const router=useRouter();
  const searchInputRef=useRef()
  const pathName=usePathname();
  const history=useHistoryState()
  const [play, setPlay] = useState(false)
  const dispatch=useDispatch()
  const [currentPlayList,setCurrentPlayingList]=useState(true)
  const { playingUrl} = useAppSelector((state) => state.urlPlaying);

  useEffect(()=>{
     if(pathName === "/search"){
      searchInputRef?.current.focus()
      return
     }
  }, [pathName])
  
  const handleSearchInput = async (e) => {
    const searchValue = e.target.value
    
    if (searchValue) {
      await dispatch(setSearchinputValue(searchValue))
    }
  }

  return (
    <div className="w-full px-3 flex items-center">
      <div className="w-2/12 lg:w-6/12 flex items-center justify-between gap-x-3 truncate">
        <div className={`w-2/12 flex items-center gap-2 mr-2`}>
          <button
            className="p-2 flex items-center justify-center rounded-full text-white bg-neutral-950/80  hover:bg-neutral-950/95 disabled:cursor-not-allowed disabled:bg-neutral-950/40 disabled:hover:bg-neutral-950/50"
            onClick={() => router.back()}
          >
            <IoIosArrowBack size={20} className="" />
          </button>
          <button
            className="hidden p-2 lg:flex items-center justify-center rounded-full text-white bg-neutral-950/80 hover:bg-neutral-950/95 disabled:cursor-not-allowed disabled:bg-neutral-950/40 disabled:hover:bg-neutral-950/50 "
            onClick={() => router.forward()}
          >
            <IoIosArrowForward size={20} className="" />
          </button>
        </div>
        <div
          className={`w-10/12 h-full flex items-center justify-start truncate`}
        >
          {!pathName.includes("search") ? (
            <ActiveMusicPlaying
              currentPlayList={currentPlayList}
              setPlay={setPlay}
              playingUrl={playingUrl}
            />
          ) : (
            <>
              <div
                className={cn(
                  " lg:flex hidden group w-full py-3 px-2  items-center justify-center rounded-full bg-neutral-800  transition-all ease-in-out duration-500  cursor-pointer focus-within:ring-2 focus-within:ring-neutral-100 focus-within:ring-inset"
                )}
              >
                <span className=" shrink-0 text-stone-50  group-hover:text-white">
                  <BiSearch size={20} />
                </span>
                <input
                    ref={searchInputRef}
                    onChange={handleSearchInput}
                  placeholder="What do you want to play?"
                  className={cn(
                    " w-full pl-2 tracking-wide text-sm font-medium placeholder:text-sm bg-neutral-800 focus:border-none focus:outline-none text-white placeholder:text-stone-500"
                  )}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
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
  return (
    <div className="w-full pl-3 h-full  items-center hidden lg:flex">
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
      <span className={`pl-2 text-xl  font-bold capitalize truncate`}>
        daniel kagombe
      </span>
    </div>
  );
}