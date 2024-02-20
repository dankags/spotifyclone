"use client"
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useNavBarDarkVibrant } from '@/lib/hooks/colorHooks'
import React, { useState } from 'react'

const ArtistLayout = ({ children,imageUrl }) => {
  const [navColor, setNavcolor] = useState(false)
  const navBgColor=useNavBarDarkVibrant(imageUrl)
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
    <ScrollArea onScrollCapture={handleScroll} className='w-full h-full bg-gradient-to-t from-neutral-900  to-transparent'>
      <div className='w-full h-full relative'> 
         <div className='sticky top-0 z-10 w-full'>
            <NavBar bgColor={navColor ? `${navBgColor}`:""}/>
        </div>
      {children}
      </div>
      <ScrollBar className="z-20"/>
    </ScrollArea>
  )
}

export default ArtistLayout