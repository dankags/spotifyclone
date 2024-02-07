"use client"
import { useDarkVibrantColor } from '@/lib/hooks/colorHooks'
import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosPlay } from 'react-icons/io'
import DropDown from './DropDown'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { darkVibrantColor } from '@/lib/functions/colorFunc'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

const ArtistBottom = ({children,artistImg,artist,bgColor,followings,artistId}) => {
  
  const {data}=useSession()
  const [followState, setFollowState] = useState(false)
  const [currentFileColor,setCurrentFileColor] = useState(null);
  const [following,setFollowing]=useState(null)
  const { imgurl } = useAppSelector((state) => state.artistBackCover)
  

  useEffect(() => {
    if (followings) {
      setFollowing(followings)
     followings.includes(data?.user.id)&& setFollowState(prev=>!prev)
   }
},[])

  useEffect(() => {
  console.log(imgurl)
    const getBgColor = async () => {
      setCurrentFileColor(await darkVibrantColor(`${imgurl}`,0.9)) 
    }
    getBgColor();
  
  }, [imgurl]);

  const handleFollow = async() => {
    if (followState) {
        //handle following
        try {
          const res = await fetch(`/api/user/follow/?followId=${data?.user.id}`, {
            method: "POST",
            body: JSON.stringify({
              id : artistId
            })
          })
          if (res.ok) {
            setFollowState(prev=>!prev)
          }
        } catch (error) {
          setFollowState(prev=>!prev)
          toast.error(`${error}`)
        }
        return
    }
    //handle unfollow
    try {
      const res = await fetch(`/api/user/unfollow/?unfollowId=${artistId}`, {
        method: "DELETE",
        body: JSON.stringify({
          id : data?.user.id,
        })
      })
      if (res.ok) {
        setFollowState(prev=>!prev)
      }
    } catch (error) {
      setFollowState(prev=>!prev)
      toast.error(`${error}`)
    }
        setFollowState(prev=>!prev)
  }
  const handlePlay = () => {
    //todo:set the current artist music as playlist
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top,#171717  88%,${
          currentFileColor
            ? `${currentFileColor}`
            : bgColor
        } 100%)`,
      }}
    >
      <div className="w-full px-4 py-3 relative flex items-center gap-5 ">
        <button
          onClick={handlePlay}
          className="w-14 h-14 flex items-center sticky top-16 justify-center rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"
          role="play button"
        >
          <IoIosPlay className="text-neutral-900 text-4xl" />
        </button>
        {artist?.userId !== data?.user.id && (
          <button
            onClick={handleFollow}
            className="py-1 px-6 text-center text-white text-base font-bold rounded-3xl ring-1 ring-stone-500 transition ease-in-out hover:ring-white hover:ring-1 hover:text-base hover:font-bold hover:scale-105 "
          >
            {followState ? <span>following</span> : <span>follow</span>}
          </button>
        )}
        <DropDown>
          <button className="p-2  rounded-full text-stone-400 hover:text-white no-underline border-none outline-none transition">
            <BsThreeDots size={29} />
          </button>
        </DropDown>
      </div>
      {children}
    </div>
  );
}

export default ArtistBottom