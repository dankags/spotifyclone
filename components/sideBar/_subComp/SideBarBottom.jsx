"use client"
import { ArtistPlaylistComp } from '../../ArtistPlaylistComp'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { ArrowRight, PlusIcon, X } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { BiLibrary, BiSearch } from 'react-icons/bi'
import { FaList } from 'react-icons/fa'


const dummyData=[
  {
    id:"hifhi38843f8",
    name:"allan walker",
    image:"/allan2.jpg",
    type:"artist"
  },
  {
    id:"dyuy27827378",
    name:"liked songs",
    href:"/collection/tracks",
    image:"/likedSongs.png",
    numberOfMusics:44,
    type:"playlist"
  },
   {
    id:"dyuy27827379",
    name:"DanKags",
    href:"/playlist/tyghi98k-90u9h6g6g766y87",
    image:"/playlist.jpg",
    type:"playlist",
    userPlayList:"DanielKagombe"
  },
  {
    id:"hifhi38843f98",
    name:"k-391",
    image:"/ab6761610000e5ebb6f3a82acf4aa61603b353de.jpg",
    type:"artist"
  },
  {
    id:"hifhi38843f92",
    name:"the chainsmokers",
    image:"/ab6761610000e5ebdb68d678df6d89bf8a55d052.jpg",
    type:"artist"
  },
  {
    id:"hifhi38843f93",
    name:"marshmello",
    image:"/ab6761610000e5eb41e4a3b8c1d45a9e49b6de21.jpg",
    type:"artist"
  }

]

const sortTypes=[
  {
    label:"playlist",
    sort:"playlist"
  },
  {
    label:"by you",
    sort:"by you"
  },
  {
    label:"playlist",
    sort:"playlist"
  },
  {
    label:"by you",
    sort:"by you"
  },{
    label:"playlist",
    sort:"playlist"
  },
  {
    label:"by you",
    sort:"by you"
  }
]
export const SideBarBottom = ({setSideBarSpan,sidebarSpan}) => {
  const [sortTypeSelected,setSortTypeSelect]=useState([]);
  const [showSearchInput,setShowSearchInput]=useState(false)
  const [activeComp,setActiveComp]=useState(null)
  return (
    <div className={cn('w-full h-full bg-neutral-900 rounded-md pl-3 ', sidebarSpan ? " pr-2 pl-2" : "" )}>
              <div className='h-[16%] pr-2 flex items-center justify-between'>
                <div className={!sidebarSpan && "w-full flex items-center justify-center "}>
                    <div className={cn('px-3 pt-2 flex text-stone-400 hover:text-white cursor-pointer',!sidebarSpan && "w-full  flex justify-start items-center ")} onClick={()=>setSideBarSpan(!sidebarSpan)}>
                        <div><BiLibrary size={25}/></div>
                        {sidebarSpan && <span className='font-bold text-lg pl-2'>Your Library</span>}
                    </div>
                </div>
               {sidebarSpan ? 
                <div className='flex justify-between items-center gap-3 '>
                  <PlusIcon size={30} className='p-1 rounded-full text-stone-400 hover:text-white hover:bg-neutral-800/80 cursor-pointer'/>
                  <ArrowRight size={30} className='p-1 rounded-full text-stone-400 hover:text-white hover:bg-neutral-800/80 cursor-pointer'/>
                </div>
              :
              <></>  
              }
              </div>
              {sidebarSpan ? 
              <ScrollArea  className={cn("w-full h-[13%]  px-3 shadow-lg ")}>
                <div className='w-max flex items-center space-x-1 '>
                <button onClick={()=>setSortTypeSelect([])} className={cn("mr-2 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 block transition-transform duration-300",sortTypeSelected.length===0 && "hidden")}><X size={20}/></button>
                {sortTypes.map((s,i)=>
                  <div key={i} onClick={()=>setSortTypeSelect(prev=>[...prev,s?.sort])} >
                      <SortComponent sortTypeSelectedIncludes={sortTypeSelected.includes(s.sort)} sort={s}/>
                  </div>
                )}
                </div>
              <ScrollBar orientation="horizontal" />
              </ScrollArea>
            :
            <></>  
            }
              
            <ScrollArea className={cn(' w-full h-[71%] pt-2 pr-2 ',!sidebarSpan ? "h-5/6" : "" )}>
            {sidebarSpan ? 
              <div className='flex items-center justify-between'>
                <div className={cn("group flex p-2 ml-1  items-center justify-center rounded-full hover:bg-neutral-800 transition-all ease-in-out duration-500 overflow-hidden ",showSearchInput ? "w-4/6 gap-x-2 flex items-center bg-neutral-800 rounded-md  " :"w-9")}>
                  <span onClick={()=>setShowSearchInput(!showSearchInput)}  className=' shrink-0 text-stone-400  group-hover:text-white'>
                  <BiSearch size={20}/>
                  </span>
                  <input  placeholder="Search" className={cn(" w-full tracking-wide text-sm placeholder:text-sm bg-neutral-800 focus:border-none focus:outline-none ")}/>
                </div>
                <div>
                  <div className='w-2/6 mr-2  flex justify-start items-center gap-x-2 text-stone-400 hover:text-white cursor-pointer'>
                    <span className='truncate shrink-0 text-sm font-semibold'>Recent</span>
                    <FaList size={15} className='shrink-0'/>
                  </div>
                    
                </div>
              </div>
              :
              <></>
            }
            <ul className={cn('pt-3 px-1 shrink-0',!sidebarSpan ? "px-0" : "")}>
              {dummyData.map((item)=>
              <li onClick={()=>setActiveComp(item.id)} 
               key={item.id} 
               className={cn('p-2  rounded-md hover:bg-neutral-800/75 active:bg-neutral-950 cursor-pointer',!sidebarSpan && "aspect-square rounded-md flex items-center justify-center",activeComp === item?.id && "bg-neutral-800")}
               >
                <ArtistPlaylistComp key={item.id} item={item} showContent={sidebarSpan} square={item.type === "playlist"}/>
              </li>
              )

              } 
              </ul> 
            </ScrollArea>
            </div>
  )
}

const SortComponent=({sortTypeSelectedIncludes,sort} )=>{
  
   return(
    <div className={cn('text-sm flex items-center justify-center shrink-0 text-center  font-medium capitalize rounded-3xl px-3 py-2 mr-2 bg-neutral-800 hover:bg-neutral-700 cursor-pointer ',sortTypeSelectedIncludes && "bg-white text-black font-normal transition-colors duration-300 hover:bg-white")}>
      <span className='text-nowrap'>{sort?.sort}</span>
      </div>
   )
}

