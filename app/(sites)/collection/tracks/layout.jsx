"use client"
import { NavBar } from '@/components/navBar/NavBar';
import React, { useRef, useState } from 'react'
import TopTrackSection from './_trackSubComp/TopTrackSection';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useNavBarDarkVibrant } from '@/lib/hooks/colorHooks';

const Layout = ({children}) => {
    const [containerColor,setContainerColor]=useState("rgba(64,64,64,0.2)");
    const [navColor, setNavcolor] = useState(false)
    const navBgColor=useNavBarDarkVibrant("https://res.cloudinary.com/dxqbb56ul/image/upload/v1707399980/likedSongs_sgfefa.png")
    const handleScroll = (e) => {
      const totalScrollHeight=e.target.scrollHeight
      const percentScrolled = (e.target.scrollTop / totalScrollHeight) * 100
      if (percentScrolled > 15) {
        setNavcolor(true)
        return
      }
      setNavcolor(false)
  };
  return (
    <ScrollArea 
    onScrollCapture={handleScroll}
    className= 'relative w-full h-full rounded-md'
    style={{
        backgroundImage: `linear-gradient(to top,rgb(23,23,23),rgba(80,56,160,0.75) 100%)`,
    }}
    >
      <div>
      <div className='sticky top-0 z-10'>
        <NavBar bgColor={navColor ? `${navBgColor}`:""}/>
        </div>  
        <TopTrackSection/>
        <div className=' pt-4  bg-gradient-to-t from-[94%] from-neutral-900 to-neutral-900/30 overflow-hidden'>
      {children}
      </div>
      </div>
      <ScrollBar className="z-20"/>
    </ScrollArea>
  )
}

export default Layout