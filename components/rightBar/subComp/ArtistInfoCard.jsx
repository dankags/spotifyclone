import Image from 'next/image'
import React from 'react'
import { MdVerified } from 'react-icons/md'
import FollowBtn from './FollowBtn'

const ArtistInfoCard = ({artistId,MusicId,userData}) => {
  return (
    <div className=' w-full bg-neutral-800 flex flex-col items-center justify-center gap-y-5 mb-4 relative rounded-lg'>
    <div className='w-full relative aspect-square '>
        <Image src="/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif" alt="" fill className='object-cover rounded-t-lg ' />
        <div className='w-full h-full rounded-lg absolute top-0 left-0  bg-gradient-to-b from-neutral-950/40 to-transparent '>
            <p className='absolute top-3 left-2 z-20 font-light text-sm flex items-center gap-x-1'>
                <MdVerified className='text-blue-500' /> 
               <span className='text-xs font-medium'> Verified Artist</span>
            </p>
            </div>
              
        </div>
           <div className='w-full px-3 pb-3 flex flex-col gap-3 '>
           <div className='flex items-center justify-between text-sm z-20 font-semibold '>
            <p>
            971,407 <span className='text-xs font-semibold'>monthly listener</span>
            </p>
            <FollowBtn/>
            </div>
           <p className='text-sm font-medium z-20'>Electronic music producer from Stolkholm,Sweden</p> 
           </div>
        </div>
  )
}

export default ArtistInfoCard