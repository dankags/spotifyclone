"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosPlay } from 'react-icons/io'
import { LuMusic3 } from 'react-icons/lu'


const UpComingMusic = () => {
    const [mouseOver,setMouseOver]=useState(false);
    const handleMouse=()=>{
      setMouseOver(prev=>!prev)
    }
  return (
    <div className='flex w-full items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-700' onMouseOver={handleMouse}>
        <span className='w-1/6' id="nextMusic">{mouseOver?<IoIosPlay size={20}/>:<LuMusic3 size={20}/>}</span>
        <Image src="/faded.jpg" alt="" width={45} height={45} className='rounded-lg object-cover'/>
        <div className='w-3/6 flex flex-col justify-between gap-1 pl-2'>
        <Link href='/playlist/eiu923if3fi3993' onClick={()=>setNewUrl('/playlist/eiu923if3fi3993')}  className='font-medium text-base hover:underline'>Faded</Link>
        <Link href="/artist/2309r289nduiubhb" onClick={()=>setNewUrl('/artist/2309r289nduiubhb')} className='font-normal text-sm dark:text-zinc-400 whitespace-nowrap text-ellipsis overflow-hidden hover:underline'>Allan Walker</Link>
        </div>
     </div>
  )
}

export default UpComingMusic