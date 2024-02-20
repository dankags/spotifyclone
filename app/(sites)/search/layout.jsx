import Footer from '@/components/Footer'
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'

const SearchLayout = ({children}) => {
  return (
    <ScrollArea className="w-full h-full">
      
        <div className='bg-neutral-900'>
          <div className="sticky top-0 z-10">
            {" "}
            <NavBar />
          </div>
          <div>{children}</div>
        </div>
      
      <ScrollBar />
    </ScrollArea>
  );
}

export default SearchLayout