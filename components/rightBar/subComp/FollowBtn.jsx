"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import React, { useEffect, useState } from 'react'

const FollowBtn = ({artistId}) => {
  const [followState, setFollowState] = useState(false)
  const { followings } = useAppSelector((state) => state.userFollowings);
  
  useEffect(() => {
    if (followings) {
      followings.some((item) => item.followingId === artistId)
        ? setFollowState(true)
        : setFollowState(false);
    }
  },[followings])

    const handleFollow=()=>{
        setFollowState(prev=>!prev)
    }
  return (
    <button onClick={handleFollow} className='py-0.5 px-4 text-center text-white text-sm font-semibold rounded-3xl ring-1 ring-stone-500 transition ease-in-out hover:ring-white hover:ring-1 hover:text-sm hover:font-semibold hover:scale-105 '>
        {followState ? <span>following</span> : <span>follow</span> }
     </button>
  )
}

export default FollowBtn