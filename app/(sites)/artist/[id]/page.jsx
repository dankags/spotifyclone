import Image from 'next/image'
import React from 'react'
import ArtistLayout from './_artistpageComp/ArtistLayout'

import { MdVerified} from 'react-icons/md'
import ArtistBottom from './_artistpageComp/ArtistBottom'
import Footer from '@/components/Footer'
import { LikedList } from '@/components/likedList/LikedList'
import { StaticCarosel } from '@/components/StaticCarosel'
import ArtistAbout from './_artistpageComp/ArtistAbout'
import ArtistPick from './_artistpageComp/ArtistPick'
import ChangeCoverImg from './_artistpageComp/ChangeCoverImg'

const ArtistPage = () => {
  return (
    <div className='relative w-full h-full overflow-hidden rounded-md'>
      <div className='absolute left-0 w-full h-[95%] rounded-md overflow-hidden '>
         <Image src={"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif" }alt='' fill className='object-cover fixed top-0' />
       </div>
       <ArtistLayout>
       <div className={`h-64 flex flex-col justify-center relative pl-4 `}>
           <ChangeCoverImg artistImg={"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"}/>
          
         <div className='h-1/6 flex items-end gap-2'>
           <span><MdVerified className='text-sky-600'/></span>
           <span className='flex items-center font-medium text-sm'>Verified Artist </span>
         </div>
         <div className=' h-3/6 flex flex-col justify-center'>
           <span className={`sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold truncate capitalize`}>ava max</span>
         </div>
         <div className='h-2/6 flex flex-col justify-center'>
           <p className='text-base font-medium'>31,976,259 <span className='text-sm'>monthly listeners </span></p>
        </div>
       </div>
       <ArtistBottom artistImg={"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"}>
       <div className=' pt-3'>
            <span className='mb-3 pl-3 text-xl font-semibold'>Popular</span>
            <div className='w-full pt-2'>
           
             <StaticCarosel displayCol>

            <LikedList/>
             </StaticCarosel>
              
            </div>
        </div>
        <div className=' flex flex-col p-4 gap-2'>
            <span className='text-xl font-semibold'>Artist Pick</span>
           <ArtistPick/>
         
            <div className=' flex flex-col py-4 gap-2'>
              <span className='text-xl font-bold'>About</span>
              <ArtistAbout/>
            </div>
          </div>
       </ArtistBottom>
       <Footer/>
       </ArtistLayout>
    </div>
  )
}

export default ArtistPage 