"use client"
import React, { useRef, useState } from 'react'
import { TopSection } from './TopSection'
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ScrollAreaScrollbar } from '@radix-ui/react-scroll-area'

const HomeLayOut = ({children}) => {
    const [containerColor,setContainerColor]=useState("rgba(64,64,64,0.2)")
    const pageRef=useRef();
    const pageScroll=pageRef.current?.scrollY
    console.log(pageScroll)

  return (
    <ScrollArea
    ref={pageRef}
    className='relative h-full rounded-md  hover:transition-all hover:duration-700'
    style={{
        backgroundImage: `linear-gradient(to top,rgb(23,23,23)  40%,${containerColor} 100%)`,
        // transition:"back",
        // transitionDuration:"0.7s",
        // transitionTimingFunction:"ease-in-out"
        
    }}
    >
      <div>
      <div className='sticky top-0 z-10'>
        <NavBar/>
        </div>  
        <TopSection changeColor={setContainerColor}/>
      {children}
      </div>
      <ScrollBar ref={pageRef}/>
    </ScrollArea>
  )
}

export default HomeLayOut