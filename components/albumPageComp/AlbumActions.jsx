"use client"
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

const AlbumActions = ({album}) => {
    const [play,setPlay]=useState(false)
    const [liked,setLiked]=useState(false)
    const handlePlay=()=>{
       setPlay(prev=>!prev)
    }
    const handleLike=()=>{
        setLiked(prev=>!prev)
    }
  return (
    <div className='relative py-3 flex justify-start items-center '>
       <button
       onClick={handlePlay}
                className="w-14 h-14 flex items-center sticky top-16 justify-center rounded-full bg-green-500/80 hover:bg-green-500 hover:scale-[1.03] hover:w-14 hover:h-14 transition cursor-pointer"
                role="play button"

     >
       {play ? <IoIosPause size={30} className=" text-neutral-950"/> : <IoIosPlay size={30} className=" text-neutral-950" />}
      </button>

     <button onClick={handleLike} className='py-1 px-6 text-center text-base font-bold rounded-3xl  transition ease-in-out hover:scale-105 '>
       {liked ? <MdOutlineFavorite size={40} className='text-green-500 cursor-pointer'/> : <MdOutlineFavoriteBorder size={40} className=' text-stone-400 hover:text-stone-200 cursor-pointer'/>}
     </button>
    
       <button  className='p-2  rounded-full text-stone-400 hover:text-white transition'>
      <BsThreeDots  size={29}/>
      </button>
    </div>
  )
}

export default AlbumActions