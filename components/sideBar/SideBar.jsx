"use client"
import { usePathname } from 'next/navigation'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { IoLibrary, IoSearchSharp } from "react-icons/io5"
import {GoHome, GoHomeFill} from "react-icons/go"
import { SideBarItem } from './SideBarItem'

import { cn } from '@/lib/utils'  

import { SideBarBottom } from "./SideBarBottom";
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { setWidth } from '@/lib/redux/slices/pageWidth'

import { Skeleton } from '../ui/skeleton'
import LoadingSkeleton from '../LoadingSkeleton'
import { PiMagnifyingGlassFill } from 'react-icons/pi'
import RightBar from '../rightBar/RightBar'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { MdSkipNext } from 'react-icons/md'
import Image from 'next/image'
import { addMusicIndex } from '@/lib/redux/slices/playlistMusicIndex'
import { playMusic, setMusicByPlaylist } from '@/lib/redux/slices/currentMusic'
import { useDarkVibrantColor } from '@/lib/hooks/colorHooks'





export default function SideBar({children}){
  const {data,status}=useSession()
  const pageRef = useRef(null)
  const pageWidth=pageRef.current?.clientWidth
  const pathName=usePathname()
  const { opened } = useAppSelector(state => state.rightbar)
  const [sidebarSpan,setSideBarSpan]=useState(true)
  const dispatch=useAppDispatch()
  const routes = useMemo(
    () => [
      {
        label: "Home",
        icon: pathName !== "/" ? <GoHome size={26} /> : <GoHomeFill size={26} />,
        href: "/",
        active: pathName === "/",
      },
      {
        label: "Search",
        icon: pathName !== "/search" ? < IoSearchSharp size={ 26} /> : < PiMagnifyingGlassFill size = { 26} />,
        href: "/search",
        active: pathName === "/search",
      },
    ],
    [pathName]
  );
   useEffect(() => {
    if (pageWidth) {
      dispatch(setWidth(pageWidth))
     }
    },[pageWidth])
    
    


    if(pathName.includes("/dashboard")){
      return(
        <div className={cn('w-full flex h-[100vh] p-2' , pathName.includes("dashboard") ? "p-0" : undefined)}>
         <main className={cn('h-full ml-2 ', pathName.includes("dashboard") ? "w-full ml-0" : undefined)}>{children}</main>
     </div>
      )
    }
  return (
    <div
      className={cn(
        "w-full h-[100vh] flex lg:h-[calc(100vh-80px)] lg:p-2 gap-x-2",
        data ? "lg:h-[calc(100vh-80px)]" : "lg:h-[100vh]"
      )}
    >
      <div
        className={cn(
          "hidden lg:block",
          sidebarSpan ? "w-[370px]" : "w-[85px] overflow-hidden"
        )}
      >
        <div className="flex flex-col justify-between w-full h-1/6 py-2 bg-neutral-900 rounded-md">
          {routes.map((item, i) => (
            <SideBarItem key={i} item={item} showContent={sidebarSpan} />
          ))}
        </div>
        {status !== "loading" ? (
          <>
            {!data ? (
              <>
                <div className="h-5/6 pt-2 w-full  ">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-y-3 bg-neutral-900 rounded-md">
                    <div>
                      <span className="font-medium text-center">
                        Please signin ?
                      </span>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={"dashboard/login"}
                        className="no-underline text-black font-semibold px-4 py-3 rounded-3xl bg-green-600 hover:bg-green-500 hover:ring-2 hover:ring-white"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="h-5/6 pt-2 w-full rounded-md">
                  <SideBarBottom
                    setSideBarSpan={setSideBarSpan}
                    sidebarSpan={sidebarSpan}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <div className="h-5/6 pt-2 w-full  ">
            <LoadingSkeleton />
          </div>
        )}
      </div>
      <div
        ref={pageRef}
        className={cn(
          "w-full h-full  flex items-center justify-between",
          sidebarSpan ? "lg:w-[calc(100%-370px)]" : "lg:w-[calc(100%-85px)]"
        )}
      >
        {opened ? (
          <>
            <main
              className={cn("lg:w-[70%] relative w-full  h-full rounded-md")}
            >
              {children}
              <div className="px-2 w-full fixed bottom-16 ">
                <MobilePlayer />
              </div>
              <div className="w-full h-14 px-4 py-3 fixed bottom-0 bg-neutral-900/95  flex items-center justify-between lg:hidden">
                <div>
                  <Link
                    href={"/"}
                    className={cn(
                      "flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white",
                      pathName === "/" && "text-white"
                    )}
                  >
                    {pathName !== "/" ? (
                      <GoHome size={26} />
                    ) : (
                      <GoHomeFill size={26} />
                    )}
                    <span className="capitalize text-xs font-bold">home</span>
                  </Link>
                </div>
                <div>
                  <Link
                    href={"/search"}
                    className={cn(
                      "flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white",
                      pathName === "/search" && "text-white"
                    )}
                  >
                    {pathName !== "/search" ? (
                      <IoSearchSharp size={26} />
                    ) : (
                      <PiMagnifyingGlassFill size={26} />
                    )}
                    <span className="capitalize text-xs font-bold">search</span>
                  </Link>
                </div>
                <div>
                  <Link
                    href={"/collection/tracks"}
                    className={cn(
                      "flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white",
                      pathName === "/collection/tracks" && "text-white"
                    )}
                  >
                    <IoLibrary size={24} />
                    <span className="capitalize text-xs font-bold">
                      library
                    </span>
                  </Link>
                </div>
              </div>
            </main>
            <div
              className={cn(
                "hidden   h-full overflow-hidden justify-start pl-2 lg:w-[30%] lg:flex "
              )}
            >
              <RightBar />
            </div>
          </>
        ) : (
          <main className={cn("w-full  h-full rounded-md")}>
            {children}
            {/* navbar and footer in small screens */}
            <div className="px-2 w-full fixed bottom-16 ">
              <MobilePlayer />
            </div>
            <div className="w-full h-14 px-4 py-3 fixed bottom-0 bg-neutral-900/95  flex items-center justify-between lg:hidden">
              <div>
                <Link
                  href={"/"}
                  className={cn(
                    "flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white",
                    pathName === "/" && "text-white"
                  )}
                >
                  {pathName !== "/" ? (
                    <GoHome size={26} />
                  ) : (
                    <GoHomeFill size={26} />
                  )}
                  <span className="capitalize text-xs font-bold">home</span>
                </Link>
              </div>
              <div>
                <Link
                  href={"/search"}
                  className={cn(
                    "flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white",
                    pathName === "/search" && "text-white"
                  )}
                >
                  {pathName !== "/search" ? (
                    <IoSearchSharp size={26} />
                  ) : (
                    <PiMagnifyingGlassFill size={26} />
                  )}
                  <span className="capitalize text-xs font-bold">search</span>
                </Link>
              </div>
              <div>
                <Link
                  href={"/collection/tracks"}
                  className={cn(
                    "flex flex-col justify-center items-center gap-y-2 text-stone-400 hover:text-white",
                    pathName === "/collection/tracks" && "text-white"
                  )}
                >
                  <IoLibrary size={24} />
                  <span className="capitalize text-xs font-bold">library</span>
                </Link>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <div className='h-5/6 w-full pt-2 '>
      <Skeleton className={"h-full w-full rounded-md "}/>
    </div>
  )
}

 const MobilePlayer = () => {
   const { music, playing, playlist } = useAppSelector(
     (state) => state.currentmusic
   );
  
   const { musicIndex, playlistLength } = useAppSelector(
     (state) => state.musicIndex
   );
   const dispatch = useAppDispatch();
   const color = useDarkVibrantColor(music && music.musicImage, 1);
   const [mainArtist, setMainArtist] = useState(null);
   const [artists, setArtists] = useState(null);
   const [isPlaying, setIsPlaying] = useState(false);

   useEffect(() => {
     const controller = new AbortController();
     const fetchArtists = async () => {
       try {
         const artist = await fetch(`/api/artist/profile/${music.artistId}`, {
           method: "GET",
           signal: controller.signal,
         });
         if (artist.ok) {
           const mainArtists = await artist.json();
           setMainArtist(mainArtists);
           const featuredArtist = await fetch("/api/artist/profile", {
             method: "POST",
             body: JSON.stringify(music.otherFeaturedArtist),
             signal: controller?.signal,
           });
           if (featuredArtist.ok) {
             const artists = await featuredArtist.json();
             setArtists(artists);
             return;
           }
         }
       } catch (error) {
         console.log(error);
       }
     };
     if (music) {
       !music.artists && fetchArtists();
     }
     return () => controller.abort();
   }, [music]);

   useEffect(() => {
     if (!music) {
       return;
     }
     setIsPlaying(playing)
   }, [playing]);

   const handleplay = () => {
     if (!music) {
       return;
     }
     if (isPlaying) {
       setIsPlaying((prev) => !prev);
       dispatch(playMusic());
       return;
     }
     dispatch(playMusic());
     setIsPlaying((prev) => !prev);
   };

   const handleNext = async () => {
     if (playlist === null) {
       return;
     }
     const nextIndex = (musicIndex - 1 + playlistLength) % playlistLength;
     await dispatch(setMusicByPlaylist(nextIndex));
     await dispatch(addMusicIndex());
   };
   
   if (!music || !color) {
     return
   }

   return (
     <div
       className="w-full rounded-md p-3 flex items-center justify-between lg:hidden"
       style={{ backgroundColor: `${color}` }}
     >
       <div
         className={
           "w-9/12 h-full px-2 flex items-center justify-between truncate "
         }
       >
         {music ? (
           <>
             <div className="">
               <div className="group w-14 h-14 rounded-md relative">
                 <Image
                   src={
                     music?.musicImage
                       ? music.musicImage
                       : "/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"
                   }
                   alt="music"
                   width={56}
                   height={56}
                   className="object-cover rounded-md shadow-md shadow-neutral-900"
                 />
               </div>
             </div>
             <div className="w-11/12 pl-4 flex flex-col justify-center items-start  capitalize gap-2">
               {/* display musicname and link */}
               <Link
                 key={music.id}
                 href={`/album/${music.id}`}
                 className="text-base font-medium truncate text-white cursor-pointer hover:underline"
               >
                 {music.musicName}
               </Link>

               {/* display artists names and links*/}
               <div className="flex items-center truncate">
                 {music.artists ? (
                   <>
                     <Link
                       key={music.artists[0]?.id}
                       href={`/artist/${music.artists[0]?.id}`}
                       className="text-xs font-medium truncate  cursor-pointer text-white hover:underline "
                     >
                       {music.artists[0]?.name}
                     </Link>

                     {music.artists?.slice(1).map((artist) => {
                       return (
                         <Link
                           key={artist?.id}
                           href={`/artist/${artist?.id}`}
                           className="text-xs font-medium truncate  cursor-pointer text-white hover:underline "
                         >
                           {`, ${artist?.name}`}
                         </Link>
                       );
                     })}
                   </>
                 ) : (
                   <>
                     <Link
                       key={mainArtist?.id}
                       href={`/artist/${mainArtist?.id}`}
                       className="text-xs font-medium truncate  cursor-pointer text-white hover:underline "
                     >
                       {mainArtist?.name}
                     </Link>

                     {artists?.map((artist) => (
                       <Link
                         key={artist.id}
                         href={`/artist/${artist.id}`}
                         className="text-xs font-medium truncate  cursor-pointer text-white hover:underline "
                       >
                         {`, ${artist.name}`}
                       </Link>
                     ))}
                   </>
                 )}
               </div>
             </div>
           </>
         ) : (
           <></>
         )}
       </div>
       <div className="w-3/12 flex items-center justify-end pr-3 gap-3">
         <button onClick={handleplay} className="hover:scale-105">
           {isPlaying ? (
             <IoIosPause className="text-neutral-50 text-xl" />
           ) : (
             <IoIosPlay className="text-xl text-neutral-50" />
           )}
         </button>
         {playlist && (
           <button
             onClick={handleNext}
             className="text-neutral-50 hover:scale-105"
           >
             <MdSkipNext size={30} />
           </button>
         )}
       </div>
     </div>
   );
 };