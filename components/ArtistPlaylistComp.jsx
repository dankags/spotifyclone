"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'


export const ArtistPlaylistComp = ({square,item,showContent}) => {
  return (
      <Link href={item?.href ? item.href : "/"} className='flex shrink-0 items-center'>
        <div >
          <div className={cn('h-12 w-12 flex items-center justify-center relative',!showContent && "h-11 w-11")}>
            <Image src={item.image ? item.image : "/noavatar.png"} alt={`${item.name}.jpg`} fill className={cn("",square ? "rounded-md " : "rounded-full ")} />
          </div>  
        </div>
       {showContent && <div className='flex flex-col shrink-0 justify-center pl-3'>
            <div className='capitalize truncate text-white text-base font-medium'>{item.name}</div>
            <div className='text-sm font-medium text-stone-400 capitalize'>
                <p className='font-semibold'>{item.type}<span>{item.numberOfMusics?` .${item.numberOfMusics} songs`:`${item.userPlayList ? ` .${item.userPlayList}` :"" }`}</span></p>
            </div>
        </div>}
      </Link>
  )
}
