"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import { setMusicBySelect } from '@/lib/redux/slices/currentMusic'
import { setIndexBySelect } from '@/lib/redux/slices/playlistMusicIndex'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosPlay } from 'react-icons/io'
import { LuMusic3 } from 'react-icons/lu'
import { useDispatch } from 'react-redux'


const UpComingMusic = () => {
  const {
    music,
    playlist,
  } = useAppSelector((state) => state.currentmusic);
  const { musicIndex, playlistLength } = useAppSelector(
    (state) => state.musicIndex
  );
  const dispatch=useDispatch()
  const [mouseOver, setMouseOver] = useState(false);
  const [nextMusic, setNextMusic] = useState(null)
  const [artists, setArtists] = useState(null)
  const [mainArtist, setMainArtist] = useState(null);
  
  useEffect(() => {
    const handleNextMusic = () => {
      
      
      const nextIndex = (musicIndex + 1) % playlistLength ;
      setNextMusic(playlist[nextIndex])
    }
    if (playlist) {
      handleNextMusic()
    }
  }, [music, musicIndex, playlist])
  
  
  
  useEffect(() => {
     const controller = new AbortController();
     const fetchArtists = async () => {
       try {
         const artist = await fetch(`/api/artist/profile/${nextMusic.artistId}`, {
           method: "GET",
           signal: controller.signal,
         });
         if (artist.ok) {
           const mainArtists = await artist.json();
           setMainArtist(mainArtists);
           const featuredArtist = await fetch("/api/artist/profile", {
             method: "POST",
             body: JSON.stringify(nextMusic.otherFeaturedArtist),
             signal: controller?.signal,
           });
           if (featuredArtist.ok) {
             const artists = await featuredArtist.json();
             setArtists(artists);
             return;
           }
         }
       } catch (error) {
         console.log(error);
       }
     };
       
       
       music && fetchArtists();
     return () => controller.abort();
  },[nextMusic])

  const handlePlayNext = async() => {
    if (!playlist) { return } 
    await dispatch(setMusicBySelect(nextMusic))
    const musicToPlayIndex = playlist.findIndex(
      (item) => item.id === nextMusic?.id
    );
    await dispatch(setIndexBySelect(musicToPlayIndex))
    
  }
 
  
  
  
  return (
    <div
      className="flex w-full items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-700 truncate"
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      {mouseOver ? (
        <button className="w-1/6" onClick={handlePlayNext}>
          <IoIosPlay size={20} />
        </button>
      ) : (
        <span className="w-1/6" id="nextMusic">
          <LuMusic3 size={20} />
        </span>
      )}
      <Image
        src={nextMusic?.musicImage ? nextMusic.musicImage : ""}
        alt=""
        width={45}
        height={45}
        className="rounded-lg object-cover"
      />
      <div className="w-3/6 flex flex-col justify-between gap-1 pl-2">
        <Link
          href={`/album/${nextMusic?.id}`}
          className="font-medium text-base capitalize hover:underline truncate"
        >
          {nextMusic?.musicName}
        </Link>
        <div className='truncate'>
          <Link
            href={`/artist/${mainArtist?.id}`}
            className="font-normal text-sm capitalize text-zinc-400 whitespace-nowrap text-ellipsis overflow-hidden hover:underline hover:text-white"
          >
            {mainArtist?.name}
          </Link>
          {artists?.map((item) => (
            <Link
              key={item.id}
              href={`/artist/${item.id}`}
              className="font-normal text-sm capitalize text-zinc-400 whitespace-nowrap text-ellipsis overflow-hidden hover:underline hover:text-white"
            >
              {`, ${item.name}`}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpComingMusic