"use client"
import { NavBar } from "@/components/navigationbar/NavBar";
import React, { Suspense, useRef, useState } from 'react'
import TopTrackSection from './_trackSubComp/TopTrackSection';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useNavBarDarkVibrant } from '@/lib/hooks/colorHooks';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useMutedColor } from "../../../../lib/hooks/colorHooks";

const Layout = ({children}) => {
    const [containerColor,setContainerColor]=useState("rgba(64,64,64,0.2)");
    const [navColor, setNavcolor] = useState(false)
  const navBgColor = useNavBarDarkVibrant("https://res.cloudinary.com/dxqbb56ul/image/upload/v1707399980/likedSongs_sgfefa.png")
  const bgColor = useMutedColor("https://res.cloudinary.com/dxqbb56ul/image/upload/v1707399980/likedSongs_sgfefa.png");
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
    <Suspense fallback={<LoadingSkeleton />}>
    <ScrollArea 
    onScrollCapture={handleScroll}
    className= 'relative w-full h-full rounded-md'
    style={{
        backgroundImage: `linear-gradient(to top,rgb(23,23,23),${bgColor} 100%)`,
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
      
      </Suspense>
  )
}

export default Layout