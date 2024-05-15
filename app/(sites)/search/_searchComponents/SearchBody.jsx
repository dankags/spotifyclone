"use client"
import SearchCard from '@/components/searchCard/SearchCard'
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import React from 'react'

const SearchBody = ({ categories }) => {
    const {width}=useAppSelector((state)=>state.pagewidth)
  return (
    <div className='flex flex-col gap-x-3 gap-y-5 py-3 px-5'>
        <div className=''>
          <span className='text-lg font-bold text-white'>Browse all</span>
        </div>
        <div className={`w-full grid grid-flow-row gap-4 ${width<=700 ? "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1" : "grid-cols-4"} `}>
          {
            categories.map((cat) => 
              <SearchCard key={cat.id} category={cat } pageCurrentWidth={width}  />
            )
          }
        </div>
      </div>
  )
}

export default SearchBody