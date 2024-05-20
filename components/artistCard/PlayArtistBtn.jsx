"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { playMusic,  setMusicByPlaylist,  setPlaylist } from '@/lib/redux/slices/currentMusic'
import { setIndexBySelect, setPlaylistLength } from '@/lib/redux/slices/playlistMusicIndex'
import { setPlayingUrl, setPlayingUrlName } from '@/lib/redux/slices/currentPlayingUrl'

const fetchArtistMusics = async (id) => {
  try {
    const res = await fetch(`/api/music/artist/${id}`);
    if (res.ok) {
      const fetchedMusics = await res.json();
      return fetchedMusics.musics;
    }
  } catch (error) {
    console.log(error);
  }
};

const PlayArtistBtn = ({ item, className }) => {
  
  const { data } = useSession() 
  const pathName = usePathname()
  const dispatch = useAppDispatch()
  const { playingUrl } = useAppSelector((state) => state.urlPlaying);
  const {music,playing,playlist}=useAppSelector((state)=>state.currentmusic)
  const [play, setPlay] = useState(false)
  
  
  

    const handleClick=async()=>{
      if (!data) { return }
      if (!playingUrl) { 
        await dispatch(setPlayingUrl(pathName))
        await dispatch(setPlayingUrlName(item.name))
      }
      
      if (!play) {
        if (playlist === null) {
          const musics = await fetchArtistMusics(item.id);
          dispatch(setPlaylist(musics))
          dispatch(setPlaylistLength(musics.length));
        }
        if (`/artist/${item.id}` !== playingUrl) {
          const musics = await fetchArtistMusics(item.id);
          await dispatch(setPlayingUrl(`/artist/${item.id}`));
          await dispatch(setPlayingUrlName(item.name));
          await dispatch(setPlaylist(musics));
          await dispatch(setMusicByPlaylist(0));
          await dispatch(setIndexBySelect(0));
          await dispatch(setPlaylistLength(musics.length));
        } 
        // !music && dispatch(setMusicByPlaylist(musicIndex))  
        !playing&&dispatch(playMusic())
        return
      }
      dispatch(playMusic())
      setPlay(false)
     
  }
  
  useEffect(() => {
    if (!playingUrl) { return }
    if (playingUrl === `/artist/${item.id}`) {
      setPlay(playing)
    }
  },[playing])

  return (
    <button
      onClick={handleClick}
      className={cn(
        `p-3 rounded-full shadow-md shadow-neutral-800 flex justify-center items-center bg-green-500 hover:bg-green-400 absolute bottom-1/3 right-4`,
        className,
        playingUrl === `/artist/${item.id}`&&"opacity-100"
      )}
    >
      {play ? (
        <IoIosPause size={27} className=" text-neutral-950" />
      ) : (
        <IoIosPlay size={27} className=" text-neutral-950" />
      )}
    </button>
  );
}

export default PlayArtistBtn