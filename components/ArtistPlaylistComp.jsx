"use client"
import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import { HiOutlineSpeakerWave } from 'react-icons/hi2'


export const ArtistPlaylistComp = ({ square, item, showContent ,userData}) => {
   const pathName=usePathname()
   const { playingUrl } = useAppSelector((state) => state.urlPlaying);
   const {playing}=useAppSelector((state)=>state.currentmusic)  
  
  return (
    <Suspense fallback={<Loading />}>
      <Link
        href={
          item?.slug === "playlist"
            ? `/playlist/${item.id}`
            : `/artist/${item.id}`
        }
        className="flex shrink-0 items-center"
      >
        <div>
          <div
            className={cn(
              "h-12 w-12 flex items-center justify-center relative",
              !showContent && "h-11 w-11"
            )}
          >
            <Image
              src={item.image ? item.image : "/noavatar.png"}
              alt={`${item.name}.jpg`}
              fill
              className={cn(
                "",
                item.slug === "playlist" ? "rounded-md " : "rounded-full "
              )}
            />
          </div>
        </div>
        {showContent && (
          <div className="w-full h-full flex items-center justify-between">
            <div className="flex flex-col shrink-0 justify-center pl-3">
              <div
                className={cn(
                  "capitalize truncate text-white text-base font-medium",
                  playingUrl === `/playlist/${item.id}` ||
                    (playingUrl === `/artist/${item.id}` && "text-green-500")
                )}
              >
                {item.name}
              </div>
              <div className="text-sm font-medium text-stone-400 capitalize">
                <p className="font-semibold">
                  {item.slug ? item.slug : item.artist?.map((i) => i.slug)}
                  <span>
                    {item.numberOfMusics
                      ? ` .${item.numberOfMusics} songs`
                      : `${
                          item.creatorId === userData?.user.id
                            ? ` .${userData.user.name}`
                            : ""
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
                    (playingUrl === `/artist/${item.id}` && "flex")
                )}
              >
                <HiOutlineSpeakerWave size={20} />
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
    <div className='bg-neutral-700'>
      <div className='h-12 w-12 flex items-center justify-center relative'>
        <Skeleton className={"w-full h-full rounded-full bg-neutral-600"}/>
      </div>
      <div className="flex flex-col shrink-0 justify-center pl-3">
        <Skeleton className={"h-2 w-8  bg-neutral-600"} />
        <Skeleton className={"h-2 w-8  bg-neutral-600"}/>
      </div>
    </div>
  )
}