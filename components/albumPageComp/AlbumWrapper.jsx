"use client"
import { useNavBarDarkVibrant, useVibrantColor } from '@/lib/hooks/colorHooks'
import React, { useState } from 'react'
import { NavBar } from '../navBar/NavBar'
import Footer from '../Footer'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'


const getVibrantColor=(img,opacity=0.8)=>{
  let vibrant = new Vibrant(imageUrl)
  vibrant.getPalette().then((palette) => {
      return `rgba(${palette.Vibrant.getRgb()},${opacity})`
      }).catch((error)=>{
          console.log(error);
      })
}

const AlbumWrapper = ({children,album,color}) => {
  const bgColor = useVibrantColor(`${album?.musicImage}`, 0.8)
  const [navColor, setNavcolor] = useState(false)
  const navBgColor=useNavBarDarkVibrant(album?.musicImage)
  const handleScroll = (e) => {
    const totalScrollHeight=e.target.scrollHeight
    const percentScrolled = (e.target.scrollTop / totalScrollHeight) * 100
    if (percentScrolled > 13) {
      setNavcolor(true)
      return
    }
    setNavcolor(false)
  };
  return (
    <ScrollArea onScrollCapture={handleScroll} className={' h-full rounded-md'}>
    <div className='w-full h-full relative' style={{backgroundColor:`${bgColor}`}}>
      <div className="sticky top-0 z-10">
        <NavBar bgColor={navColor ? `${navBgColor}`:""}/>
        </div>  
      {children}
      <Footer/>
      </div>
      <ScrollBar className={''} />
      </ScrollArea>
  )
}

export default AlbumWrapper