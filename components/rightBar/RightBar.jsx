"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import ArtistInfoCard from './subComp/ArtistInfoCard'
import UpComingMusic from './subComp/NextQueueMusic'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks/reduxHooks'
import { closeRightbar } from '@/lib/redux/slices/rightbar'
import Music from './subComp/Music'
import { toast } from 'sonner'
import { artists } from '@/app/(sites)/user/_userComp/data'
import { useSession } from 'next-auth/react'


const RightBar = ({children}) => {
  const { opened } = useAppSelector(state => state.rightbar)
  const {data}=useSession()
    const { music, playlist } = useAppSelector((state) => state.currentmusic);
  const dispath = useAppDispatch()
  const [userFollowings,setUserFollowings]=useState(null)
  
  useEffect(() => {
    const fetchUserFollowings = async () => {
      try {
        const res = await fetch(`/api/user/userFollowings/${data.user.id}`, { method: "GET" })
        if (res.ok) {
          const followings = await res.json()
          setUserFollowings(followings.followings)
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    if (data) {
      fetchUserFollowings()
    }
  },[])

  
  

  return (
    <div className={cn("w-full h-full", opened ? "block" : "hidden")}>
      <ScrollArea
        className={cn(" w-full h-full px-3 z-10 bg-neutral-900 rounded-md")}
      >
        <div className="w-full">
          <section className="py-2 mb-3 flex items-center justify-between">
            <Link href={"/"} className="font-bold text-sm hover:underline">
              Liked Songs
            </Link>
            <button
              onClick={() => dispath(closeRightbar())}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-700"
            >
              <CgClose size={20} />
            </button>
          </section>
          <section className="w-full flex flex-col justify-center gap-y-2">
            <Music musicItem={music} />
          </section>
          <section className="mt-3">
            <ArtistInfoCard artistId={music?.artistId} followings={userFollowings} />
          </section>
          {playlist && (
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
              <UpComingMusic />
            </section>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default RightBar