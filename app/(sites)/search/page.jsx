import Footer from '@/components/Footer'
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'

function Search() {
  return (
    <ScrollArea className='w-full'>
      <div>
        <div>
        <NavBar/>
        search
      </div>
      <section>
        <Footer/>
        </section>
      </div>
      <ScrollBar/>
    </ScrollArea>
  )
}

export default Search