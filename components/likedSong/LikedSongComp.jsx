"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { HiOutlineSpeakerWave } from 'react-icons/hi2'
import { Skeleton } from '../ui/skeleton'
import { BiSolidVolumeLow } from 'react-icons/bi'

const LikedSongComp = ({showContent,library}) => {
  const {data} =useSession()
  const { likedSongs, playing } = useAppSelector((state) => state.currentmusic);
  const { likedMusicsLength, likedMusics } = useAppSelector((state) => state.likedMusics)
  const { playingUrl } = useAppSelector((state) => state.urlPlaying);
  const [loading,setLoading]=useState(true)
  const numberOfSongs=useMemo(()=>likedMusicsLength < 10 ? `0${likedMusicsLength}`:`${likedMusicsLength}`,[likedMusics])
  
  useEffect(() => {
    if (library) {
      setLoading(false);
    }
  }, [library]);

  if (!likedSongs) {
  return
}

  if (loading) {
    return(<LoadingSkele/>)
  }

  return (
    <Suspense fallback={<LoadingSkele />}>
      <Link href={"/collection/tracks"} className="p-2 flex shrink-0 items-center">
        <div>
          <div
            className={cn(
              "h-12 w-12 flex items-center justify-center relative",
              !showContent && "h-11 w-11"
            )}
          >
            <Image
              src={"/likedSongs.png"}
              alt={`likedSongs.jpg`}
              fill
              className={cn("rounded-md")}
            />
          </div>
        </div>
        {showContent ? (
          <div className="w-full h-full flex items-center justify-between">
            <div className=" h-full flex flex-col shrink-0 justify-center pl-3">
              <div
                className={cn(
                  "capitalize truncate text-white text-base font-medium",
                  playingUrl === `/collection/tracks` && "text-green-500"
                )}
              >
                liked songs
              </div>
              <div className="text-sm font-medium text-stone-400 capitalize">
                <p className="font-semibold">
                  playlist{" "}
                  <span>.{numberOfSongs > 0 ? numberOfSongs : ""} Songs</span>
                </p>
              </div>
            </div>
            {playing && (
              <div
                className={cn(
                  "w-full h-full pr-3 text-green-500 hidden items-center justify-end",
                  playingUrl === `/collection/tracks` && "flex"
                )}
              >
                <BiSolidVolumeLow  size={20} />
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </Link>
    </Suspense>
  );
}

const LoadingSkele=()=>{
  return (
    <div className="p-2 bg-neutral-800 flex items-center gap-3 rounded-md mb-2">
      <div className="h-12 w-12 flex items-center justify-center relative">
        <Skeleton
          className={
            "w-full h-full rounded-md bg-neutral-600  shadow-[0_0px_40px_5px] shadow-neutral-950/60"
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
  
  )
}

export default LikedSongComp