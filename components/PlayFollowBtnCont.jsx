"use client"
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { BsThreeDots } from "react-icons/bs"
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import { playMusic, setMusicByPlaylist, setPlaylist } from '@/lib/redux/slices/currentMusic'
import { setIndexBySelect, setPlaylistLength } from '@/lib/redux/slices/playlistMusicIndex'
import { setPlayingUrl } from '@/lib/redux/slices/currentPlayingUrl'

const PlayFollowBtnContainer = ({params,musics}) => {
    const {data}=useSession()
  const pathName = usePathname()
  const { playingUrl } = useAppSelector((state) => state.urlPlaying);
    const { musicIndex } = useAppSelector((state) => state.musicIndex);
    const { playing,playlist,music } = useAppSelector(
      (state) => state.currentmusic
    );
    const dispatch=useDispatch()
    const [play,setPlay]=useState(false)
    const [followState, setFollowState] = useState(true)
  
  useEffect(() => {
    if (!music) {
      return;
    }
    if (!playingUrl) {
      return;
    }
    if (pathName === playingUrl) {
      setPlay(playing);
      return;
    }
    setPlay(false);
  }, [playingUrl, pathName, playing]);
  
    const handleClick=async()=>{
       if (!data) { return }
      if (!play) {
      
        if (playlist === null) {
          dispatch(setPlaylist(musics))
          dispatch(setPlaylistLength(musics.length));
        }
        if (pathName !== playingUrl) {
          dispatch(setPlaylist(musics));
          await dispatch(setMusicByPlaylist(0)); 
          await dispatch(setIndexBySelect(0));
          await dispatch(setPlaylistLength(musics.length));
          dispatch(setPlayingUrl(pathName))
        } 
        !music && dispatch(setMusicByPlaylist(musicIndex))  
        !playing&&dispatch(playMusic())
        return
      }
      dispatch(playMusic())
      setPlay(false)
      
    }
    const handleFollow=()=>{
       setFollowState(prev=>!prev)
    }
  return (
    <div className="relative p-3 flex justify-start items-center gap-x-6">
      <button
        onClick={handleClick}
        className="w-14 h-14 flex items-center sticky top-16 justify-center rounded-full bg-green-500/80 hover:bg-green-500 hover:scale-[1.03] hover:w-14 hover:h-14 shadow shadow-neutral-950 transition  cursor-pointer"
        role="play button"
      >
        {play ? (
          <IoIosPause size={27} className=" text-neutral-950" />
        ) : (
          <IoIosPlay size={27} className=" text-neutral-950" />
        )}
      </button>

      {pathName.includes("artist") && (
        <button
          onClick={handleFollow}
          className="py-1 px-6 text-center text-white text-base font-bold rounded-3xl ring-1 ring-stone-500 transition ease-in-out hover:ring-white hover:ring-1 hover:text-base hover:font-bold hover:scale-105 "
        >
          {followState ? <span>following</span> : <span>follow</span>}
        </button>
      )}
      {pathName == "/collection/tracks" ? (
        <></>
      ) : (
        <button className="p-2  rounded-full text-stone-400 hover:text-white transition">
          <BsThreeDots size={29} />
        </button>
      )}
    </div>
  );
}

export default PlayFollowBtnContainer