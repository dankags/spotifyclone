"use client"
import React, { useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'

const PlayPlaylistBtn = ({item}) => {
    const [play,setPlay]=useState(false)
    const handleClick=()=>{
      setPlay(prev=>!prev)
    }
  return (
    <button onClick={handleClick} className="playListCardBtn p-3 absolute right-2 bottom-2 hidden items-center justify-center rounded-full shadow-lg shadow-neutral-900 group-hover:flex bg-green-600 hover:bg-green-500">
         {play ? <IoIosPause size={27} className=" text-neutral-950"/> : <IoIosPlay size={27} className=" text-neutral-950" />}
     </button>
  )
}

export default PlayPlaylistBtn