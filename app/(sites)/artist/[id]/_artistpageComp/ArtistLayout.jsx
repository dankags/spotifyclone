import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const ArtistLayout = ({children}) => {
  return (
    <ScrollArea className='w-full h-full bg-gradient-to-t from-neutral-900  to-transparent'>
      <div className='w-full h-full relative top-0'> 
         <div className='sticky top-0 z-10 w-full'>
            <NavBar/>
        </div>
      {children}
      </div>
    </ScrollArea>
  )
}

export default ArtistLayout