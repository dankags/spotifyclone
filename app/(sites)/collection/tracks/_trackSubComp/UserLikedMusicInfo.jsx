"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { LuUser2 } from 'react-icons/lu'

const UserLikedMusicInfo = () => {
  const { data } = useSession()
  const {likedSongs}=useAppSelector((state)=>state.currentmusic)
  const [noOfMusics, setNoOfMusics] = useState(null)
  
  useEffect(() => {
  if (likedSongs) {
    setNoOfMusics(likedSongs.songs.length >0 ?setNoOfMusics(likedSongs.songs.length):null)
  }
},[likedSongs?.songs])

  return (
    <div className="flex items-center mt-7">
                  <div className="h-6 w-6 mr-2">
        {data?.user.image ?
          <Image
                      src={ data.user.image }
                      alt="userProfile"
                      width={250}
                      height={250}
                      className="w-full h-full rounded-full object-cover shadow-md shadow-neutral-950"
                    />
                  :
                  
                  <LuUser2 size={20} className='m-auto h-6 w-6 p-1 rounded-full bg-neutral-900/80 shadow-md shadow-neutral-950/20 text-stone-300'/>                
                }
                  </div>
                  <span className="mr-2 text-sm text-neutral-50 font-semibold ">
                    {data?.user.name ? data.user.name : "User" } .
                  </span>
                  <span className="text-sm text-neutral-50 font-medium">
                    {noOfMusics < 10 ?`0${noOfMusics} Songs`:`${noOfMusics} Songs`}
                  </span>
                </div>
  )
}

export default UserLikedMusicInfo