import Footer from '@/components/Footer'
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React from 'react'
import SearchBody from './_searchComponents/SearchBody'
import prisma from '@/utils/connect'

async function Search() {
  const categories=await prisma.category.findMany()

  return (

      <div>
        <div>
        <SearchBody categories={ categories} />
      </div>
      <section>
        <Footer/>
        </section>
      </div>
     
  )
}

export default Search