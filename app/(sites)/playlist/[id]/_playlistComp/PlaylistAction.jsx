"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { playMusic, setMusicByPlaylist, setPlaylist } from '@/lib/redux/slices/currentMusic'
import { setPlayingUrl, setPlayingUrlName } from '@/lib/redux/slices/currentPlayingUrl'
import { setIndexBySelect, setPlaylistLength } from '@/lib/redux/slices/playlistMusicIndex'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import PlaylistDropDown from './PlaylistDropDown'


const PlaylistAction = ({ musics,playlistName,urlPlaylist }) => {
  
    const [play,setPlay]=useState(false)
  const [liked, setLiked] = useState(false)
   const { data } = useSession();
   const pathName = usePathname();
   const { playingUrl } = useAppSelector((state) => state.urlPlaying);
   const dispatch = useAppDispatch();
   const { music, playing, playlist } = useAppSelector(
     (state) => state.currentmusic
  );
  const { musicIndex } = useAppSelector((state) => state.musicIndex);

    const handlePlay=async()=>{
      if (!data) { return }
      if (!play) {
         if (playlist === null) {
           dispatch(setPlaylist(musics));
           dispatch(setPlaylistLength(musics.length));
         }
        if (pathName !== playingUrl) {
          await dispatch(setPlayingUrl(pathName))
          await dispatch(setPlayingUrlName(playlistName))
          await dispatch(setPlaylist(musics));
          await dispatch(setMusicByPlaylist(0)); 
          await dispatch(setIndexBySelect(0));
          await dispatch(setPlaylistLength(musics.length));
        } 
        !music && dispatch(setMusicByPlaylist(musicIndex))  
        !playing && dispatch(playMusic())
        setPlay(true)
        return
      }
      dispatch(playMusic())
      setPlay(false)
    }
    const handleLike=()=>{
        setLiked(prev=>!prev)
    }

  useEffect(() => {
    if (playingUrl === pathName) {
      setPlay(playing);
      return;
    }
  }, [playingUrl,playing]);
  
  return (
    <div className="relative py-3 flex justify-start items-center ">
      <button
        disabled={musics.length === 0}
        onClick={handlePlay}
        className="p-3 flex items-center sticky top-16 justify-center rounded-full bg-green-500/80 hover:bg-green-500 hover:scale-105 transition cursor-pointer shadow shadow-neutral-950 disabled:cursor-not-allowed"
        role="play button"
      >
        {play ? (
          <IoIosPause className=" text-neutral-950 text-xl" />
        ) : (
          <IoIosPlay className=" text-neutral-950 text-xl" />
        )}
      </button>

      <button
        onClick={handleLike}
        className="py-1 px-6 text-center text-base font-bold rounded-3xl  transition ease-in-out hover:scale-105 "
      >
        {liked ? (
          <MdOutlineFavorite
            size={40}
            className="text-green-500 cursor-pointer"
          />
        ) : (
          <MdOutlineFavoriteBorder
            size={40}
            className=" text-stone-400 hover:text-stone-200 cursor-pointer"
          />
        )}
      </button>
      <PlaylistDropDown playlist={urlPlaylist}>
        <button className="p-2 rounded-full text-stone-400 hover:text-white transition">
          <BsThreeDots size={29} />
        </button>
      </PlaylistDropDown>
    </div>
  );
}

export default PlaylistAction