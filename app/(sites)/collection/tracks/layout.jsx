"use client"
import { NavBar } from '@/components/navBar/NavBar';
import React, { useRef, useState } from 'react'
import TopTrackSection from './_trackSubComp/TopTrackSection';
import { ScrollArea } from '@/components/ui/scroll-area';

const Layout = ({children}) => {
    const [containerColor,setContainerColor]=useState("rgba(64,64,64,0.2)");
    const pageRef=useRef();
    const pageScroll=pageRef.current?.event
    console.log(pageScroll) 
  return (
    <ScrollArea 
    ref={pageRef}
    className= 'relative w-full h-full rounded-md'
    style={{
        backgroundImage: `linear-gradient(to top,rgb(23,23,23),rgba(80,56,160,0.75) 100%)`,
    }}
    >
      <div className='sticky top-0 z-10'>
        <NavBar/>
        </div>  
        <TopTrackSection/>
        <div className=' pt-4  bg-gradient-to-t from-[94%] from-neutral-900 to-neutral-900/30 overflow-hidden'>
      {children}
      </div>
    </ScrollArea>
  )
}

export default Layout