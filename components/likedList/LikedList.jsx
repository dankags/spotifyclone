"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { setMusicBySelect } from '@/lib/redux/slices/currentMusic'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoPlay } from 'react-icons/io5'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

export const LikedList = ({ music,index }) => {

  const {data}=useSession()
  const pathname=usePathname()
  const [showPlayIcon,setShowplayIcon]=useState(false)
  const {music:currentMusic}=useAppSelector(state=>state.currentmusic)
  console.log(currentMusic)
  const dispatch=useAppDispatch()
  const [currentSong,setCurrentSong]=useState({
    id: "3c3cd3a6-e459-434a-b649-ec0f661cfd87",
    musicName: "ghost",
    categoryName: "housemusic",
    artistIds: "a3f5954c-8702-4766-adde-e952af96306c",
    viewsNumber: "0",
    musicImage: "/ab67616d0000b273e6f407c7f3a0ec98845e4431.jpg",
    audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifyclone-d7d1f.appspot.com/o/Alan%20Walker%20_The%20Spectre%20(Lyrics%20_%20Lyrics%20Video)%20(1).mp3?alt=media&token=a22a55dc-4100-430b-9ea4-109f1d950909",
    duration: "205.061",
    uploaded:  "2023-11-02T07:45:52.027+00:00"  
  })
  const [liked,setLiked]=useState((pathname === "/collection/tracks" ? true : false))

  const handleLike=async()=>{
    if (data.user) {
      try {
        const res=await fetch("/api/likedSongs",
        {
          method:"PUT",

          body:JSON.stringify({
            userId:data.user.id,
            musicId:music.id
          })
        }
        )
        const response=await res.json()
        console.log(response)
        if (res.status === 200) {
          setLiked(true)
          return
        }
        if (res.status === 201) {
          setLiked(false)
          return
        }
      } catch (error) {
        setLiked(false);
        console.log(error)
      }
    }
  }

  return (
    <div onMouseOver={()=>setShowplayIcon(true)} onMouseOut={()=>setShowplayIcon(false)} className={cn('flex py-2 rounded-md hover:bg-neutral-700/20 group', currentMusic === music ? "bg-neutral-700/35":"")}>
    <div className='w-9/12 lg:w-6/12 pl-4 flex items-center max-md:justify-start shrink-0'>
      <div className='hidden lg:w-1/12 lg:flex items-center  overflow-hidden'>
          {showPlayIcon ?
            <span className='text-xl' onClick={()=>dispatch(setMusicBySelect(music))}> <IoPlay className='' /></span>
            :
            <div>
              {currentMusic === music ? 
              <Image src={"/equaliser-animated-green.f5eb96f2.gif"} alt="equilizer" width={20} height={20}/>
              :
              <span className=''>{index}</span>
              }
            </div>
          }
        </div>
        <div className='w-full lg:w-10/12 flex '>
      <div className='h-12 w-12 max-md:mr-4 lg:mx-4 relative'>
        <Image src={music?.musicImage ? music.musicImage :'/ab67616d0000b273726830445abf56cfff430dcf.jpg'} alt='' fill className='rounded-md'/>
      </div>
      <div className='flex flex-col'>
          <span className={cn('text-base font-semibold capitalize',currentMusic === music ? "text-green-600":"text-white")}>
            {music?.musicName ? music.musicName : "none"}
        </span>
        <span className='text-sm font-medium text-stone-400'>Jim Yosef</span>
          </div>
          </div>    
    </div>
    <div className='hidden lg:w-3/12 lg:flex items-center justify-start'>
       <span className='font-normal text-sm text-stone-400'>Link</span>
    </div>
    <div className='w-3/12 pl-2 flex items-center justify-center shrink-0'>
      <button onClick={handleLike} className='w-1/6 max-md:w-[50%] flex items-center justify-center '>{liked ? <MdOutlineFavoriteBorder size={24} className='text-stone-400 hover:text-white'/> : <MdOutlineFavorite size={20} className=' text-green-500 cursor-pointer'/>}</button>
      <div className='hidden w-3/12  lg:flex items-center justify-end text-sm text-stone-400'>
        <span className='w-[85%] text-sm text-center font-medium'>03:44</span>
      </div>
      <div className='w-2/12 max-md:w-[50%] flex items-center justify-center text-sm text-stone-400'>
        <button className={cn('w-[50%] text-sm text-stone-400 font-normal hidden group-hover:block hover:text-white')}> <BsThreeDots  size={24}/></button>
      </div>
    </div>
  </div>
  )
}
