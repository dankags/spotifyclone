"use client"
import LikedSongComp from '@/components/likedSong/LikedSongComp'
import { ArtistPlaylistComp } from '../../ArtistPlaylistComp'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { setLikedSongs } from '@/lib/redux/slices/currentMusic'
import { pushToLibrary, setLibrary } from '@/lib/redux/slices/library'
import { setLikedMusics } from '@/lib/redux/slices/likedSongs'
import { cn } from '@/lib/utils'
import { ArrowRight, PlusIcon, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useMemo, useState } from 'react'
import { BiLibrary, BiSearch } from 'react-icons/bi'
import { FaList } from 'react-icons/fa'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

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

  const { data } = useSession()
  const { userLibrary } = useAppSelector((state) => state.userLibrary)
  const dispatch=useAppDispatch()
  const [sortTypeSelected, setSortTypeSelect] = useState([]);
  const [showSearchInput,setShowSearchInput]=useState(false)
  const [activeComp, setActiveComp] = useState(null)
  const [likedmusics, setLikedmusics] = useState(null)
  const [showLibraryShadow, setShowLibraryShadow] = useState(false)
  
 
  
  
  useEffect(() => {
    const fetchLikedSongsPlaylist = async () => {
      try {
        const likedSongs = await fetch(`/api/likedSongs/${data.user.id}`, {
          method: "GET",
        })
        if (likedSongs.ok) {
          const likedSong = await likedSongs.json()
          
          // likedSong&&dispatch(pushToLibrary(likedSong))
          setLikedmusics(likedSong)
          dispatch(setLikedMusics(likedSong.songs))
          dispatch(setLikedSongs(likedSong))
        }
      } catch (error) {
        console.log(error)
      }
    }
    const fetchlibrary = async () => {
      if (data.user) {
        try {
          const res = await fetch(`/api/user/library/${data.user.id}`, {
            method: "GET"
          })
         
          if (res.ok) {
            const serverResponse = await res.json()
            
            
            userLibrary && dispatch(setLibrary(serverResponse.library))
            // setLibrary(serverResponse.library)
          }
        } catch (error) {
          toast.error(error)
        
        }
      }
    }
    if (data) {
      fetchlibrary()
      fetchLikedSongsPlaylist()
    }
  }, [])
  
   
  const handleLibraryScroll = (e) => {
     const totalScrollHeight = e.target.scrollHeight;
     const percentScrolled = (e.target.scrollTop / totalScrollHeight) * 100;
    if (percentScrolled > 3) {
      setShowLibraryShadow(true)
      return
    }
    setShowLibraryShadow(false)
  }

  return (
    <div
      className={cn(
        "w-full h-full bg-neutral-900 rounded-md pl-3 ",
        sidebarSpan ? " pr-2 pl-2" : ""
      )}
    >
      <div className="h-[16%] pr-2 flex items-center justify-between">
        <div
          className={!sidebarSpan && "w-full flex items-center justify-center "}
        >
          <div
            className={cn(
              "px-3 pt-2 flex text-stone-400 hover:text-white cursor-pointer",
              !sidebarSpan && "w-full  flex justify-start items-center "
            )}
            onClick={() => setSideBarSpan(!sidebarSpan)}
          >
            <div>
              <BiLibrary size={25} />
            </div>
            {sidebarSpan && (
              <span className="font-bold text-lg pl-2">Your Library</span>
            )}
          </div>
        </div>
        {sidebarSpan ? (
          <div className="flex justify-between items-center gap-3 ">
            <PlusIcon
              size={30}
              className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-neutral-800/80 cursor-pointer"
            />
            <ArrowRight
              size={30}
              className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-neutral-800/80 cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {sidebarSpan ? (
        <ScrollArea className={cn("w-full h-[13%]  px-3 ")}>
          <div className="w-max flex items-center space-x-1 ">
            <button
              onClick={() => setSortTypeSelect([])}
              className={cn(
                "mr-2 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 block transition-transform duration-300",
                sortTypeSelected.length === 0 && "hidden"
              )}
            >
              <X size={20} />
            </button>
            {sortTypes.map((s, i) => (
              <div
                key={i}
                onClick={() => setSortTypeSelect((prev) => [...prev, s?.sort])}
              >
                <SortComponent
                  sortTypeSelectedIncludes={sortTypeSelected.includes(s.sort)}
                  sort={s}
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <></>
      )}

      <ScrollArea
        onScrollCapture={handleLibraryScroll}
        className={cn(
          ` w-full h-[71%] pt-2 pr-2 ${
            showLibraryShadow
              ? "shadow-[rgba(10,10,10)inset_0px_15px_10px_-10px]"
              : ""
          }`,
          !sidebarSpan ? "h-5/6" : ""
        )}
      >
        {sidebarSpan ? (
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "group flex p-2 ml-1  items-center justify-center rounded-full hover:bg-neutral-800 transition-all ease-in-out duration-500 overflow-hidden ",
                showSearchInput
                  ? "w-4/6 gap-x-2 flex items-center bg-neutral-800 rounded-md  "
                  : "w-9"
              )}
            >
              <span
                onClick={() => setShowSearchInput(!showSearchInput)}
                className=" shrink-0 text-stone-400  group-hover:text-white"
              >
                <BiSearch size={20} />
              </span>
              <input
                placeholder="Search"
                className={cn(
                  " w-full tracking-wide text-sm placeholder:text-sm bg-neutral-800 focus:border-none focus:outline-none "
                )}
              />
            </div>
            <div>
              <div className="w-2/6 mr-2  flex justify-start items-center gap-x-2 text-stone-400 hover:text-white cursor-pointer">
                <span className="truncate shrink-0 text-sm font-semibold">
                  Recent
                </span>
                <FaList size={15} className="shrink-0" />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <ul className={cn("pt-3 px-1 shrink-0", !sidebarSpan ? "px-0" : "")}>
          <li
            onClick={() => setActiveComp(likedmusics?.id)}
            key={likedmusics?.id}
            className={cn(
              "p-2  rounded-md hover:bg-neutral-800/75 active:bg-neutral-950 cursor-pointer",
              !sidebarSpan &&
                "aspect-square rounded-md flex items-center justify-center",
              activeComp === likedmusics?.id && "bg-neutral-800"
            )}
          >
            <LikedSongComp showContent={sidebarSpan} />
          </li>
          {userLibrary?.map((item) => (
            <li
              onClick={() => setActiveComp(item.id)}
              key={item.id}
              className={cn(
                "p-2  rounded-md hover:bg-neutral-800/75 active:bg-neutral-950 cursor-pointer",
                !sidebarSpan &&
                  "aspect-square rounded-md flex items-center justify-center",
                activeComp === item?.id && "bg-neutral-800"
              )}
            >
              <ArtistPlaylistComp
                key={item.id}
                item={item}
                userData={data}
                showContent={sidebarSpan}
                square={item.type === "playlist"}
              />
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}

const SortComponent=({sortTypeSelectedIncludes,sort} )=>{
  
   return(
    <div className={cn('text-sm flex items-center justify-center shrink-0 text-center  font-medium capitalize rounded-3xl px-3 py-2 mr-2 bg-neutral-800 hover:bg-neutral-700 cursor-pointer ',sortTypeSelectedIncludes && "bg-white text-black font-normal transition-colors duration-300 hover:bg-white")}>
      <span className='text-nowrap'>{sort?.sort}</span>
      </div>
   )
}



