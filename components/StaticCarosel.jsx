"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Children, useEffect, useMemo, useState,  } from 'react'

export const StaticCarosel = ({children,title,displayCol,showAll}) => {
  const { width } = useAppSelector(state => state.pagewidth)
  const {componentId}=useAppSelector((state)=>state.filterComponent)
  const pathName=usePathname()
    const [childrenArray,setChildrenArray] =useState( Children.toArray(children).flat());
    const [visibleCount,setVisibleCount]=useState(4);
  const visibleItems = useMemo(()=>{return childrenArray.slice(0, visibleCount) } ,[visibleCount,childrenArray])
    children=displayCol ? childrenArray : visibleItems;


  //filters the list according to the unliked music
  //but will filter if its in the liked musics page or user profile page
  useEffect(() => {
    if (pathName.includes("user") || pathName === "/collection/tracks") {
      setChildrenArray(prev => prev.filter((item) => item.key.split(".$")[1] !== componentId))
    }
  }, [pathName, componentId])
  
  
  //sets number of playlist or artist card  to be shown according to page width
  useEffect(() => {
    if (width >= 1250 ) {
      setVisibleCount(5)
    }
    if(width <= 500){
      setVisibleCount(2)
    }
    if(width <= 918){
      setVisibleCount(3)
    }
    setVisibleCount(4)
  }, [width])
  
  return (
    <section className='p-3 flex flex-col justify-center gap-y-3'>
        {!showAll && <div className=' flex items-center justify-between'>
         <p  className={cn("w-full text-2xl font-bold max-md:text-xl ",childrenArray > visibleCount && "w-8/12")}>{title}</p>
         <div className='w-4/12 px-2 flex justify-end items-center'>
        {childrenArray.length > visibleCount && <Link href={"/"} className='w-full font-semibold text-sm  text-right text-nowrap text-stone-400 hover:text-white hover:underline'>Show all</Link>}
        </div>
        </div>
      
      }
       {displayCol ? 
        <div className='flex flex-col justify-center'>
          {visibleItems.map((item)=>item)}
        </div>
        :
        <div className='flex items-center justify-between gap-x-2 '>
          {visibleItems.map((item)=>item)}
        </div>
    }
    </section>
  )
}
