"use client"
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'

const PlayArtistBtn = ({item ,className}) => {
    const [play,setPlay]=useState(false)
    const handleClick=()=>{
      setPlay(prev=>!prev)
     
    }
  return (
    <button onClick={handleClick} className={cn(` p-3 rounded-full shadow-md shadow-neutral-800 flex justify-center items-center bg-green-500 hover:bg-green-400 absolute bottom-1/3 right-4`,className)}>
       {play ? <IoIosPause size={27} className=" text-neutral-950"/> : <IoIosPlay size={27} className=" text-neutral-950" />}
    </button>
  )
}

export default PlayArtistBtn