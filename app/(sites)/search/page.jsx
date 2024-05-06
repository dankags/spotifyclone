import Footer from '@/components/Footer'
import { NavBar } from "@/components/navigationbar/NavBar";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React, { Suspense } from 'react'
import SearchBody from './_searchComponents/SearchBody'
import prisma from '@/utils/connect'
import LoadingSkeleton from '@/components/LoadingSkeleton'

async function Search() {
  const categories=await prisma.category.findMany()

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div>
        <div>
          <SearchBody categories={categories} />
        </div>
        <section>
          <Footer />
        </section>
      </div>
    </Suspense>
  );
}

export default Search