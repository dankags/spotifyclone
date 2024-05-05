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
  
    const handlePlay=async()=>{
      if (!data) { return }
      if (!playingUrl) {
        await dispatch(setPlayingUrl(pathName));
      }
      if (!play) {
      
        if (playlist === null) {
          dispatch(setPlaylist(musics))
          dispatch(setPlaylistLength(musics.length));
        }
        if (pathName !== playingUrl) {
          
          
          await dispatch(setPlayingUrl(pathName))
          await dispatch(setPlaylist(musics));
          await dispatch(setMusicByPlaylist(0)); 
          await dispatch(setIndexBySelect(0));
          await dispatch(setPlaylistLength(musics.length));
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
        onClick={handlePlay}
        className="p-4 flex items-center sticky top-16 justify-center rounded-full bg-green-500 hover:scale-105 hover:bg-green-400 hover:shadow-md hover:shadow-neutral-900 transition-transform shadow shadow-neutral-950  cursor-pointer"
        role="play button"
      >
        {play ? (
          <IoIosPause size={27} className=" text-neutral-950 text-xl" />
        ) : (
          <IoIosPlay size={27} className=" text-neutral-950 text-xl" />
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