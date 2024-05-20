"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import { HiOutlineSpeakerWave } from 'react-icons/hi2'
import { BiSolidVolumeLow } from 'react-icons/bi'
import { LuMusic4, LuUser2 } from 'react-icons/lu'


export const ArtistPlaylistComp = ({ square, item, showContent ,userData}) => {
   const pathName=usePathname()
  const { playingUrl } = useAppSelector((state) => state.urlPlaying);
  const [loading,setLoading]=useState(true)
   const {playing}=useAppSelector((state)=>state.currentmusic)  
  
  useEffect(() => {
    if (item) {
      setLoading(false);
    }
  }, [item]);
  
  if (loading) {
    return(<Loading/>)
  }
  
  return (
    <Suspense fallback={<Loading />}>
      <Link
        href={
          item?.slug === "playlist"
            ? `/playlist/${item.id}`
            : `/artist/${item.id}`
        }
        className="p-2 flex shrink-0 items-center"
      >
        <div>
          <div
            className={cn(
              "h-12 w-12 flex items-center justify-center bg-neutral-700/50 rounded-md relative",
              !showContent && "h-11 w-11",
              item.roles === "ARTIST" && "rounded-full "
            )}
          >
            {item.image ? (
              <Image
                src={item.image ? item.image : "/noavatar.png"}
                alt={`${item.name}.jpg`}
                fill
                className={cn(
                  "",
                  item.slug === "playlist" ? "rounded-md " : "rounded-full "
                )}
              />
            ) : (
              <>
                {item.slug === "playlist" ? (
                  <LuMusic4 className="text-xl text-stone-200" />
                ) : (
                  <LuUser2 className="text-xl text-stone-200" />
                )}
              </>
            )}
          </div>
        </div>
        {showContent && (
          <div className="w-full h-full flex items-center justify-between">
            <div className="flex flex-col shrink-0 justify-center pl-3">
              <div
                className={cn(
                  "capitalize truncate text-white text-base font-medium",
                  playingUrl === `/playlist/${item.id}` ||
                    playingUrl === `/artist/${item.id}`
                    ? "text-green-500"
                    : ""
                )}
              >
                {item.name}
              </div>
              <div className="text-sm font-medium text-stone-400 capitalize">
                <p className="font-semibold">
                  {item.slug ? item.slug : item.roles?.toLowerCase()}
                  <span>
                    {item.numberOfMusics
                      ? ` .${item.numberOfMusics} songs`
                      : `${
                          item.creatorId === userData?.user.id
                            ? ` .${userData.user.name}`
                            : ``
                        }`}
                  </span>
                </p>
              </div>
            </div>
            {playing && (
              <div
                className={cn(
                  "w-full h-full pr-3 text-green-500 hidden items-center justify-end",
                  playingUrl === `/playlist/${item.id}` ||
                    playingUrl === `/artist/${item.id}`
                    ? "flex"
                    : ""
                )}
              >
                <BiSolidVolumeLow size={20} />
              </div>
            )}
          </div>
        )}
      </Link>
    </Suspense>
  );
}

const Loading = () => {
  return (
    <div className="p-2 bg-neutral-800 flex items-center gap-3 rounded-md mb-2">
      <div className="h-12 w-12 flex items-center justify-center relative">
        <Skeleton
          className={
            "w-full h-full rounded-full bg-neutral-600  shadow-[0_0px_40px_5px] shadow-neutral-950/60"
          }
        />
      </div>
      <div className="w-8/12 flex flex-col shrink-0 justify-center pl-3">
        <Skeleton
          className={
            "h-6 w-8/12 rounded-2xl shadow-[0_0px_40px_5px] shadow-neutral-950/60"
          }
        />
      </div>
    </div>
  );
}