"use client"
import { useDarkVibrantColor } from '@/lib/hooks/colorHooks'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosPlay } from 'react-icons/io'
import DropDown from './DropDown'

const ArtistBottom = ({children,artistImg}) => {
    const [followState,setFollowState]=useState(true)
    const handleFollow=()=>{
        setFollowState(prev=>!prev)
     }
  return (
    <div style={{ backgroundImage: `linear-gradient(to top,#171717  88%,${useDarkVibrantColor( `${artistImg ? artistImg : "/ab6761860000101694cd60dbca59178bcdcc8edc.jpg"} `,  0.8)} 100%)`}}>
        <div className='w-full px-4 py-3 relative flex items-center gap-5 '>
            <button className='w-14 h-14 flex items-center sticky top-16 justify-center rounded-full bg-green-500 hover:bg-green-400 cursor-pointer' role='play button'>
              <IoIosPlay className='text-neutral-900 text-4xl'/>
            </button>
            <button onClick={handleFollow} className='py-1 px-6 text-center text-white text-base font-bold rounded-3xl ring-1 ring-stone-500 transition ease-in-out hover:ring-white hover:ring-1 hover:text-base hover:font-bold hover:scale-105 '>
        {followState ? <span>following</span> : <span>follow</span> }
     </button>
     <DropDown>
     <button  className='p-2  rounded-full text-stone-400 hover:text-white no-underline border-none outline-none transition'>
      <BsThreeDots  size={29}/>
      </button>
      </DropDown>
          </div>
          {children}
    </div>
  )
}

export default ArtistBottom