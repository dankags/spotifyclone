"use client"
import Footer from '@/components/Footer';
import { NavBar } from '@/components/navBar/NavBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDarkVibrantColor, useVibrantColor } from '@/lib/hooks/colorHooks'
import React from 'react'

const PlaylistWrapper = ({children}) => {
    const bgColor=useVibrantColor("/playlist.jpg",0.8);
  return (
    <ScrollArea className='w-full h-full rounded-md' style={{backgroundColor:`${bgColor}`}}>
      <div>
        <div className='sticky top-0'>
          <NavBar/>
        </div>
        {children}
        <Footer/>
        </div>  
    </ScrollArea>
  )
}

export default PlaylistWrapper