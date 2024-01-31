"use client"
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

const LikeButton = ({music}) => {
    const [like,setLike]=useState(false)
    const handleLike=()=>{
      setLike(prev=>!prev)
    }
  return (
    <button onClick={handleLike} className={cn("text-green-500 hover:text-green-400")}>{like ? <MdOutlineFavorite size={24}/> : <MdOutlineFavoriteBorder size={24} className='text-stone-400 hover:text-white'/> }</button>
  )
}

export default LikeButton