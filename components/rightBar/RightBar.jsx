"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import ArtistInfoCard from './subcomp/ArtistInfoCard'
import UpComingMusic from './subcomp/NextQueueMusic'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks/reduxHooks'
import { closeRightbar } from '@/lib/redux/slices/rightbar'
import Music from './subcomp/Music'
import { useSession } from 'next-auth/react'
import { setFollowings } from '@/lib/redux/slices/followings'



export default function RightBar({children}){

  const { data } = useSession()
  const { opened } = useAppSelector(state => state.rightbar)
  const { followings } = useAppSelector((state) => state.userFollowings);
  const { music, playlist } = useAppSelector((state) => state.currentmusic);
  const { musicIndex, playlistLength } = useAppSelector(
     (state) => state.musicIndex
  );
  const [showNextQueueMusic,setShowNextQueueMusic]=useState(true)
  const dispatch = useAppDispatch()
  const [userFollowings,setUserFollowings]=useState(null)
  
  useEffect(() => {
    const fetchUserFollowings = async () => {
      try {
        const res = await fetch(`/api/user/userFollowings/${data.user.id}`, { method: "GET" })
        if (res.ok) {
          const following = await res.json()
          dispatch(setFollowings(following.followings))
          setUserFollowings(following.followings)
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    if (data) {
      followings.length === 0&&fetchUserFollowings()
    }
  }, [])
  
  useEffect(() => {
    if (playlistLength === 0) {
      setShowNextQueueMusic(false)
      return
    }
    setShowNextQueueMusic(true)
  },[playlistLength])

  
  

  return (
    <div className={cn("w-full h-full", opened ? "block" : "hidden")}>
      <ScrollArea
        className={cn(" w-full h-full px-3 z-10 bg-neutral-900 rounded-md")}
      >
        <div className="w-full pb-3">
          <section className="py-2 mb-3 flex items-center justify-between">
            <Link href={"/"} className="font-bold text-sm hover:underline">
              Liked Songs
            </Link>
            <button
              onClick={() => dispatch(closeRightbar())}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-700"
            >
              <CgClose size={20} />
            </button>
          </section>
          <section className="w-full flex flex-col justify-center gap-y-2">
            <Music musicItem={music} />
          </section>
          <section className="mt-3">
            <ArtistInfoCard
              artistId={music?.artistId}
              followings={userFollowings}
            />
          </section>
           
            <section className="py-3 px-2 rounded-md bg-neutral-800 flex flex-col justify-center gap-4  ">
              <div className="w-full flex items-center justify-between gap-x-3">
                <span className="font-semibold text-base flex items-center">
                  Next in queue
                </span>
                <Link
                  href="/"
                  className="font-medium text-sm dark:text-stone-300 items-center hover:underline"
                >
                  Open queue
                </Link>
              </div>
              {showNextQueueMusic ? (
                  <UpComingMusic />
              ) : (
                <div className="w-full flex items-center justify-start">
                  <Link
                    href={"/search"}
                    className="py-1 px-4 text-base font-bold rounded-3xl ring-1 ring-stone-300 transition hover:ring-white hover:ring-1 hover:text-base hover:font-bold hover:scale-105"
                  >
                    Search for something new
                  </Link>
                </div>
              )}
            </section>
          
        </div>
      </ScrollArea>
    </div>
  );
}

