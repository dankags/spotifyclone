"use client "
import {  useVibrantColor } from '@/lib/hooks/colorHooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io';
import { Skeleton } from '../ui/skeleton';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks';
import { setPlayingUrl, setPlayingUrlName, setPlayngId } from '@/lib/redux/slices/currentPlayingUrl';
import { playMusic, setMusicBySelect, setPlayMusicValue, setPlaylist } from '@/lib/redux/slices/currentMusic';
import { setIndexBySelect, setPlaylistLength } from '@/lib/redux/slices/playlistMusicIndex';
import Link from 'next/link';
import { LuMusic4, LuUser2 } from 'react-icons/lu';
import { toast } from 'sonner';

const fetchMusics = async (id) => {
  try {
    const res = await fetch(`/api/music/artist/${id}`)
    if (res.ok) {
      const fetchedMusics = await res.json() 
      return fetchedMusics.musics
    }
  } catch (error) {
    console.log(error);
    
  }
}

const checkingUrl = (func, data, currentPlayingUrl, playing = true) => {
  if (!data) { return }
  const dataSlug = data?.slug ? data.slug : data.roles;
if (dataSlug === "ARTIST") {
  if (currentPlayingUrl === `/artist/${data.id}`) {
    func(playing)
   return
 };
  func(false);
  return;
}
if (dataSlug === "playlist") {
  if (currentPlayingUrl === `/playlist/${data.id}`) {
    func(playing);
   return
 }
  func(false);
  return;
}
if (data.title === "liked songs") {
  if (currentPlayingUrl === `/collection/tracks`) {
    func(playing);
    return
  }
  func(false);
  return;
}
}

export const UserRecomended = ({ pageWidth, data, setContainerColor }) => {
  
  const color = useVibrantColor(data.image?data.image:"/pexels-ahmed-adly-1270184.jpg", 0.45);
  const router=useRouter()
  const dispatch = useAppDispatch();
  const { music, playing} = useAppSelector((state) => state.currentmusic);
  const { userLibrary } = useAppSelector((state) => state.userLibrary)
  const { playingUrl,id } = useAppSelector((state) => state.urlPlaying);
  const defaultColor = useVibrantColor(
    userLibrary
      ? userLibrary[0].image ?? "/likedSongs.png"
      : "/likedSongs.png",
    0.45
  );
  const [recommendedPlaying, setRecommendedPlaying] = useState(false)
  const [showEqualizerAnime, setShoEqualizerAnime] = useState(false)
  
  useEffect(() => {
    if (!playingUrl) { return }
    checkingUrl(setRecommendedPlaying, data, playingUrl)
},[playingUrl])
  
  useEffect(() => {
    if (!music) { return;}
    checkingUrl(setRecommendedPlaying, data, playingUrl, playing);
  }, [ playing]);
  
  useEffect(() => {
     checkingUrl(setShoEqualizerAnime, data, playingUrl);
  },[recommendedPlaying])
   
  const dispatches = async (url, data, musics) => {
    await dispatch(setPlayingUrl(`/${url}/${data.id}`));
    await dispatch(setPlayngId(data));
    await dispatch(setPlayingUrlName(data.name))
    await dispatch(setPlaylist(musics));
    await dispatch(setPlaylistLength(musics.length));
    await dispatch(setMusicBySelect(musics[0]));
    await dispatch(setIndexBySelect(0));
    await dispatch(setPlayMusicValue(true));
  };

  const handlePlayRecomended = async () => {
    
    if (!recommendedPlaying) {
      const dataSlug = data?.slug ? data.slug : data.roles
      
      
      if (dataSlug === "ARTIST") {
        if (playingUrl === `/artist/${data.id}`) {
          setRecommendedPlaying(true);
          !playing && dispatch(playMusic());
          return
        }
        const musics = await fetchMusics(data.id);
        await dispatches("artist", data, musics);
        setRecommendedPlaying(true);
        return;
      }
      if (dataSlug === "playlist") {
        if (playingUrl === `/playlist/${data.id}`) {
          setRecommendedPlaying(true);
          !playing && dispatch(playMusic());
          return;
        }
        try {
          const musics = await fetch(`/api/playlist/${data.id}`).then((res)=>res.json());
           console.log(musics);
           
          if (musics !== 'This musics do not exist') {
            console.log("its working");
            
            await dispatches("playlist", data, musics);
            setRecommendedPlaying(true);
            return;
          }
          toast.message("no songs in this playlist")
          setRecommendedPlaying(false);
          return;
        } catch (error) {
          return
        }
      }
      if (data.title === "liked songs") {
        if (playingUrl === `/collection/tracks`) {
          setRecommendedPlaying(true);
          !playing && dispatch(playMusic());
          return;
        }
        const musics = await fetch("api/user/likedSongs").then((res) => res.json());
        if (musics === "you have no songs") {
          setRecommendedPlaying(false);
          toast.message("no songs liked")
           return;
         }
        await dispatches("collection",{ id:"tracks",name:"liked songs"}, musics);
        setRecommendedPlaying(true);
        return;
      }
       
      setRecommendedPlaying(true)
      !playing && dispatch(playMusic());
      return;
    }
    dispatch(playMusic());
    setRecommendedPlaying(false)
  }
    const handleMouseOut=()=>{
      setContainerColor(defaultColor)
      checkingUrl(setShoEqualizerAnime, data, playingUrl);
    }
    const handleMouseOver=()=>{
      setContainerColor(color)
      setShoEqualizerAnime(false)
  }

  const handleRouteNavigation = () => {
    if (!data) { return }
    const dataSlug = data?.slug
      ? data.slug
      : data.roles;
    if (data.title === "liked songs") {
      router.push("collection/tracks")
      return
    }
    if (dataSlug === "ARTIST") {
      router.push(`artist/${data.id}`);
      return;
    }
     if (dataSlug === "playlist") {
       router.push(`playlist/${data.id}`);
       return;
     }
  }
  
  if (!data) {
    return(<UserRecommendedLoadingSkele/>)
  }
  
    return (
      <div
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        className={`group min-h-[64px] w-full cursor-pointer flex items-center rounded-md gap-2 overflow-hidden transition-all  ease-in-out  bg-neutral-100/10 hover:duration-300 hover:bg-neutral-500/20 `}
      >
        <div
          className="w-9/12 h-full flex items-center"
          onClick={handleRouteNavigation}
        >
          <div className="w-2/6 h-full flex justify-start shrink-0">
            <div className="min-h-[64px] min-w-[64px] flex items-center justify-center relative bg-neutral-900 shadow-[0_0px_40px_5px] shadow-neutral-950/60">
              {data.image ? (
                <Image
                  src={data.image ? data.image : "/billboard.jpg"}
                  alt=""
                  fill
                  className="object-cover rounded-s-md"
                />
              ) : (
                <>
                  {data.slug === "playlist" ? (
                    <LuMusic4 className="text-xl text-stone-200" />
                  ) : (
                    <LuUser2 className="text-xl text-stone-200" />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="w-4/6 h-full flex items-center justify-start pl-1">
            <span className="w-full truncate text-left capitalize text-white text-base font-bold pl-2">
              {data.name}
            </span>
          </div>
        </div>
        <div className="w-3/12 flex items-center justify-center">
          {showEqualizerAnime ? (
            <Image
              src={"/equaliser-animated-green.f5eb96f2.gif"}
              alt=""
              height={20}
              width={20}
            />
          ) : (
            <button
              onClick={handlePlayRecomended}
              className=" p-2 isolate hidden rounded-full shadow-lg shadow-neutral-900 justify-center items-center transition-all ease-in-out bg-green-500 hover:bg-green-400 group-hover:flex max-md:hidden max-md:group-hover:hidden"
            >
              {recommendedPlaying ? (
                <IoIosPause className="text-neutral-900 text-xl" />
              ) : (
                <IoIosPlay className="text-xl text-neutral-900" />
              )}
            </button>
          )}
        </div>
      </div>
    );
}


export const UserRecommendedLoadingSkele = () => {
  return (
    <div
      className={`min-h-[64px] w-full cursor-pointer flex items-center rounded-md gap-2 bg-neutral-800  `}
    >
      <div className="w-3/12 h-full flex justify-start shrink-0">
        <div className="min-h-[64px] min-w-[64px] relative">
          <Skeleton className="rounded-s-md w-full h-full shadow-[0_0px_40px_5px] shadow-neutral-950/60" />
        </div>
      </div>
      <div className="w-6/12">
        <Skeleton className="w-full h-6 rounded-2xl shadow-[0_0px_40px_5px] shadow-neutral-950/60" />
      </div>
    </div>
  );
}

