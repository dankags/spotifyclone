"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Children, useEffect, useMemo, useState,  } from 'react'
import { Skeleton } from './ui/skeleton';
import { LoadingPlaylistSkeleton } from './playlistCard/PlayListCard';

export const StaticCarosel = ({children,title,displayCol,showAll}) => {
  const { width } = useAppSelector(state => state.pagewidth)
  const { componentId } = useAppSelector((state) => state.filterComponent)
  const [loading,setLoading]=useState(true)
  const pathName=usePathname()
    const [childrenArray,setChildrenArray] =useState( Children.toArray(children).flat());
    const [visibleCounts,setVisibleCounts]=useState(null);
  const [visibleItems,setVisibleItems] = useState(childrenArray.slice(0, visibleCounts))
    children=displayCol ? childrenArray : visibleItems;

  useEffect(() => {
    if(children){setLoading(false)}
  },[children])

  
  

  //filters the list according to the unliked music
  //but will filter if its in the liked musics page or user profile page
  useEffect(() => {
    
    
    if (pathName.includes("user") || pathName === "/collection/tracks") {
      setChildrenArray(prev => prev.filter((item) => item.key.split(".$")[1] !== componentId))
    }
    if (pathName.includes("/artist/")) {
      
      setVisibleCounts(childrenArray.length)
    }
  }, [pathName, componentId])
  
  useEffect(() => {
    setVisibleItems(childrenArray.slice(0, visibleCounts))
 },[visibleCounts, childrenArray])

  //sets number of playlist or artist card  to be shown according to page width
  useEffect(() => {
    if (width >= 1250 ) {
      setVisibleCounts(5)
      return
    }
    if(width <= 500){
      setVisibleCounts(2)
      return;
    }
    if(width <= 918){
      setVisibleCounts(3)
      return;
    }
    setVisibleCounts(4)
  }, [width])
  
    if(loading){
      return (
        <>
          <LoadingSkele />
        </>
      );
    }
    
    return (
    
      <section className='p-3 flex flex-col justify-center gap-y-3'>
        {!showAll && <div className=' flex items-center justify-between'>
          <p className={cn("w-full text-xl font-bold  text-white", childrenArray > visibleCounts && "w-8/12")}>{title}</p>
          <div className='w-4/12 px-2 flex justify-end items-center'>
            {childrenArray.length > visibleCounts && <Link href={"/"} className='w-full font-semibold text-sm  text-right text-nowrap text-stone-400 hover:text-white hover:underline'>Show all</Link>}
          </div>
        </div>
      
        }
        {displayCol ?
          <div className='flex flex-col justify-center'>
            {childrenArray.map((item) => item)}
          </div>
          :
          <div className='flex items-center gap-3 '>
            {visibleItems.map((item) => item)}
          </div>
        }
      </section>
    )
  
}

const LoadingSkele = () => {
  return (
    <section className="p-3 flex flex-col justify-center gap-y-3 bg-neutral-800 rounded-md mb-3">
      <div className=" flex items-center justify-between">
        <Skeleton
          className={cn(
            "w-5/12 h-8 rounded-2xl shadow-[0_0px_40px_5px] shadow-neutral-950/40"
          )}
        />

        <div className="w-2/12 px-2 flex justify-end items-center">
          <Skeleton className="w-full h-8 rounded-2xl shadow-[0_0px_40px_5px] shadow-neutral-950/40" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-4 ">
        <LoadingPlaylistSkeleton />
        <LoadingPlaylistSkeleton />
        <LoadingPlaylistSkeleton />
        <LoadingPlaylistSkeleton />
      </div>
    </section>
  );
}
