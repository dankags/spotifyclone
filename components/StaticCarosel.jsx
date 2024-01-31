"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { Children, useMemo,  } from 'react'

export const StaticCarosel = ({children,title,displayCol,showAll}) => {
    
  const {width}=useAppSelector(state=>state.pagewidth)
    const childrenArray = Children.toArray(children).flat();
    const visibleCount=useMemo(()=>{
    if (width >= 1250 ) {
      return 5
    }
    if(width <= 918){
      return 3
    }
       return 4
    },[width]);
    const visibleItems=childrenArray.slice(0,visibleCount)
    children=displayCol ? childrenArray : visibleItems;
    
  return (
    <section className='p-3 flex flex-col justify-center gap-y-3'>
        {!showAll && <div className=' flex items-center justify-between'>
         <p  className={cn("w-full text-2xl font-bold ",childrenArray > visibleCount && "w-8/12")}>{title}</p>
         <div className='w-4/12 px-2 flex justify-end items-center'>
        {childrenArray.length > visibleCount && <Link href={"/"} className='w-full font-semibold text-sm text-right text-nowrap text-stone-400 hover:text-white hover:underline'>Show all</Link>}
        </div>
        </div>
      
      }
       {displayCol ? 
        <div className='flex flex-col justify-center'>
          {children}
        </div>
        :
        <div className='flex items-center justify-between gap-x-2 '>
          {children}
        </div>
    }
    </section>
  )
}
