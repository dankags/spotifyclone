"use client"
import { useVibrantColor } from '@/lib/hooks/colorHooks'
import React from 'react'
import { NavBar } from '../navBar/NavBar'
import Footer from '../Footer'
import Vibrant from 'node-vibrant'
import { ScrollArea } from '@radix-ui/react-scroll-area'

const getVibrantColor=(img,opacity=0.8)=>{
  let vibrant = new Vibrant(imageUrl)
  vibrant.getPalette().then((palette) => {
      return `rgba(${palette.Vibrant.getRgb()},${opacity})`
      }).catch((error)=>{
          console.log(error);
      })
}

const AlbumWrapper = ({children,album,color}) => {
    const bgColor=useVibrantColor(`${album?.musicImage}`,0.8)
  return (
    <div className='w-full h-full relative' style={{backgroundColor:`${bgColor}`}}>
      <div className="sticky top-0 z-10">
        <NavBar/>
        </div>  
      {children}
      <Footer/>
    </div>
  )
}

export default AlbumWrapper