"use client"
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { BsThreeDots } from "react-icons/bs"

const PlayFollowBtnContainer = ({params}) => {
    const {data}=useSession()
    const pathName=usePathname()
    const [play,setPlay]=useState(false)
    const [followState,setFollowState]=useState(true)
    const handleClick=()=>{
      setPlay(prev=>!prev)
    }
    const handleFollow=()=>{
       setFollowState(prev=>!prev)
    }
  return (
    <div className='relative p-3 flex justify-start items-center gap-x-6'>
       <button
       onClick={handleClick}
                className="w-14 h-14 flex items-center sticky top-16 justify-center rounded-full bg-green-500/80 hover:bg-green-500 hover:scale-[1.03] hover:w-14 hover:h-14 transition cursor-pointer"
                role="play button"

     >
       {play ? <IoIosPause size={27} className=" text-neutral-950"/> : <IoIosPlay size={27} className=" text-neutral-950" />}
      </button>

    {pathName.includes("artist") &&
     <button onClick={handleFollow} className='py-1 px-6 text-center text-white text-base font-bold rounded-3xl ring-1 ring-stone-500 transition ease-in-out hover:ring-white hover:ring-1 hover:text-base hover:font-bold hover:scale-105 '>
        {followState ? <span>following</span> : <span>follow</span> }
     </button>
     }
      {pathName == "/collection/tracks" ? <></> : <button  className='p-2  rounded-full text-stone-400 hover:text-white transition'>
      <BsThreeDots  size={29}/>
      </button>}
    </div>
  )
}

export default PlayFollowBtnContainer