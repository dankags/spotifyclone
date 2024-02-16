import prisma from '@/utils/connect'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import LikeButton from './likeButton'

const fetchmusic=async(musicId)=>{
  const music=await prisma.music.findUnique({ 
    where:{
        id:musicItem,
    }
})
return music 
}

const Music = ({musicItem}) => {
  let music=null;
  if(!musicItem.musicImage){
    music=async()=>{
        const fetchedMusic=await fetchmusic(musicItem);
        return fetchedMusic;
   }
  }
  if(musicItem.musicImage){
  music=musicItem;
}
    console.log(music)
  return (
    <div className='w-full flex flex-col justify-center'>
          <div className=' relative aspect-square '>
                <Image src={music?.musicImage ? music?.musicImage :"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"} alt={""} fill className='rounded-md aspect-square'/> 
            </div>
            <div className='w-full flex items-center justify-between pt-2'>
                <div className='w-[75%]'>
                   
                    <div className='w-full flex items-center justify-start font-bold  text-3xl '>
                     <Link href={`/album/sdft34wef34fcceg4gv5`} className='w-full capitalize mb-1 truncate cursor-pointer hover:underline'>{music?.musicName}</Link>
                    </div>
                    <div className='flex items-center overflow-hidden text-stone-400 truncate'>
                      <Link href={"/artist/dfgtr56ujj8k8k6h5h"} className='capitalize text-base font-normal truncate hover:text-white hover:underline'>{music?.musicName}</Link>
                    </div>
                    
                </div>
                <div className='w-[25%] flex items-center justify-between '>
                    <LikeButton music={music}/>
                    <button className='text-stone-400 hover:text-white'><BsThreeDots  size={24}/></button>
                </div>
            </div>
    </div>
  )
}

export default Music