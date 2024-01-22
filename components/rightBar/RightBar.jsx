"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import ArtistInfoCard from './subComp/ArtistInfoCard'
import NextQueueMusic from './subComp/NextQueueMusic'
import UpComingMusic from './subComp/NextQueueMusic'


const RightBar = ({children}) => {
    const [like,setLike]=useState(false)
    const handleLike=()=>{
      setLike(prev=>!prev)
    }
  return (
   
   <ScrollArea className=" w-full h-full px-3 z-10 bg-neutral-900 rounded-md " >
      
        <section className='py-2 mb-3 flex items-center justify-between'>
            <Link href={"/"} className='font-bold text-sm hover:underline'>Liked  Songs</Link>
            <button className='w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-700'><CgClose size={20}/></button>
        </section>
        <section className='w-full flex flex-col justify-center gap-y-2'>
            <div className=' relative aspect-square '>
                <Image src={"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"} alt={""} fill className='rounded-md'/> 
            </div>
            <div className='w-full flex items-center justify-between gap-x-3 pt-2 truncate'>
                <div className='w-8/12'>
                   
                    <div className='w-full font-bold  text-3xl overflow-hidden truncate'>
                     <Link href={`/album/sdft34wef34fcceg4gv5`} className=' capitalize mb-1 cursor-pointer hover:underline'>weapons</Link>
                    </div>
                    <div className='flex items-center overflow-hidden text-stone-400 truncate'>
                      <Link href={"/artist/dfgtr56ujj8k8k6h5h"} className='capitalize text-base font-normal truncate hover:text-white hover:underline'>ava max</Link>
                    </div>
                    
                </div>
                <div className='w-4/12 flex items-center justify-around gap-x-4'>
                    <button onClick={handleLike} className={cn("text-green-500 hover:text-green-400")}>{like ? <MdOutlineFavorite size={24}/> : <MdOutlineFavoriteBorder size={24} className='text-stone-400 hover:text-white'/> }</button>
                    <button className='text-stone-400 hover:text-white'><BsThreeDots  size={24}/></button>
                </div>
            </div>
        </section>
        <section className='mt-3'>
            <ArtistInfoCard/>
        </section>
        <section className='py-3 px-2 rounded-md bg-neutral-800 flex flex-col justify-center gap-4  '>
          <div className='w-full flex items-center justify-between gap-x-3'>
            <span className='font-semibold text-base flex items-center'>Next in queue</span>
            <Link href='/' className='font-medium text-sm dark:text-stone-300 items-center hover:underline'>Open queue</Link>
          </div>
          <UpComingMusic/>
        </section>
        
        </ScrollArea>
  )
}

export default RightBar