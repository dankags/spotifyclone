"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

const LikedSongComp = ({showContent}) => {
  const {data} =useSession()
  const { likedSongs } = useAppSelector((state) => state.currentmusic)
  const { likedMusicsLength,likedMusics } = useAppSelector((state) => state.likedMusics)
  const numberOfSongs=useMemo(()=>likedMusicsLength < 10 ? `0${likedMusicsLength}`:`${likedMusicsLength}`,[likedMusics])
  
  if (!likedSongs) {
  return
}


  return (
    <Link
    href={'/collection/tracks'}
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
          src={"/likedSongs.png"}
          alt={`likedSongs.jpg`}
          fill
          className={cn("rounded-md")}
        />
      </div>
    </div>
    {showContent ?  <div className="flex flex-col shrink-0 justify-center pl-3">
        <div className="capitalize truncate text-white text-base font-medium">
          liked songs
        </div>
        <div className="text-sm font-medium text-stone-400 capitalize">
          <p className="font-semibold">
            playlist {" "}
            <span>
               .{numberOfSongs >0 ?numberOfSongs:""} Songs
            </span>
          </p>
        </div>
      </div> : ""}
    
  </Link>
  )
}

export default LikedSongComp