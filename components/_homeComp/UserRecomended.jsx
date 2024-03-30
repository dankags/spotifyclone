"use client "
import {  useVibrantColor } from '@/lib/hooks/colorHooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io';
import { Skeleton } from '../ui/skeleton';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks';
import { setPlayingUrl, setPlayngId } from '@/lib/redux/slices/currentPlayingUrl';
import { playMusic, setMusicBySelect, setPlaylist } from '@/lib/redux/slices/currentMusic';
import { setIndexBySelect, setPlaylistLength } from '@/lib/redux/slices/playlistMusicIndex';

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

export const UserRecomended = ({ pageWidth, data, setContainerColor }) => {
  const color = useVibrantColor(data.image, 0.45);
  const dispatch = useAppDispatch();
  const { music, playing, playlist } = useAppSelector(
    (state) => state.currentmusic
  );
  const { userLibrary } = useAppSelector((state) => state.userLibrary)
   const { playingUrl,id } = useAppSelector((state) => state.urlPlaying);
  const pathName = usePathname();
  const defaultColor = useVibrantColor(userLibrary ? userLibrary[0].image:"/likedSongs.png", 0.45)
  const [loading, setLoading] = useState(true);
  
    const [currentPlayList,setCurrentPlayList]=useState( {   id:"1",
    img:"/allan.webp",
    name:"allan Walker",
})
    const [recommendedPlaying, setRecommendedPlaying] = useState(false)
    const [showEqualizerAnime,setShoEqualizerAnime]=useState(false)
   
  useEffect(() => {
      if(data){setLoading(false)}
      if (currentPlayList) {
        currentPlayList.id === data.id ?  setRecommendedPlaying(true) :  setRecommendedPlaying(false)
      }
      
    },[currentPlayList,data])
  
  useEffect(() => {
    if (!music) {
      return;
    }
    if (!playingUrl) {
      return;
    }
    if ( id === data.id ) {
      setRecommendedPlaying(playing);
      return;
    }
    setRecommendedPlaying(false);
  }, [id, playing]);
  
  useEffect(() => {
     recommendedPlaying
       ? setShoEqualizerAnime((prev) => !prev)
       : setShoEqualizerAnime((prev) => !prev);
  },[recommendedPlaying])
   
  const handleRecomended = async() => {
    
    
    if (!recommendedPlaying) {
      const dataSlug =  data?.slug ? data.slug : data.artist?.map((i) => i.slug)[0]
      
      if (data.id !== id) {  
      if ( dataSlug !== "artist") {
        return;
      }
      await dispatch(
        setPlayingUrl(`/artist/${data.id}`)
      );
      await dispatch(setPlayngId(data.id));
       const musics = await fetchMusics(data.id);
      await dispatch(setPlaylist(musics));
      await dispatch(setPlaylistLength(musics.length));
      await dispatch(setMusicBySelect(musics[0]));
      await dispatch(setIndexBySelect(0));
       await dispatch(playMusic());
       setRecommendedPlaying(true)
       return
      }
      setRecommendedPlaying(true)
      !playing && dispatch(playMusic());
      return;
    }
      dispatch(playMusic());
       setRecommendedPlaying(false) 
    //    recommendedPlaying ? setShoEqualizerAnime(prev=>!prev) : setShoEqualizerAnime(prev=>!prev)
    // if (currentPlayList) {
    //   currentPlayList.id!==data.id && setCurrentPlayList(data)
    // } else {
    //   console.log(data);
    //   setCurrentPlayList(data)
    // }  
  }
  
    const handleMouseOut=()=>{
      setContainerColor(defaultColor)
      recommendedPlaying && setShoEqualizerAnime(true)
  
    }
    const handleMouseOver=()=>{
      setContainerColor(color)
      setShoEqualizerAnime(false)
  }
  
  if (loading) {
    return(<UserRecommendedLoadingSkele/>)
  }
  
    return (
      <div
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        className={`group min-h-[64px] w-full cursor-pointer flex items-center rounded-md gap-2 overflow-hidden transition-all  ease-in-out  bg-neutral-100/10 hover:duration-300 hover:bg-neutral-500/20 `}
      >
        <div className="w-3/12 h-full flex justify-start shrink-0">
          <div className="min-h-[64px] min-w-[64px] relative shadow-[0_0px_40px_5px] shadow-neutral-950/60">
            <Image
              src={data.image}
              alt=""
              fill
              className="object-cover rounded-s-md"
            />
          </div>
        </div>
        <div className="w-6/12">
          <span className="w-full text-left capitalize text-white text-base font-bold pl-2">
            {data.name}
          </span>
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
              onClick={handleRecomended}
              className=" p-2 hidden rounded-full shadow-lg shadow-neutral-900 justify-center items-center transition-all ease-in-out bg-green-500 hover:bg-green-400 group-hover:flex max-md:hidden max-md:group-hover:hidden"
            >
              {recommendedPlaying ? (
                <IoIosPause className="text-neutral-900 text-2xl" />
              ) : (
                <IoIosPlay className="text-2xl text-neutral-900" />
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