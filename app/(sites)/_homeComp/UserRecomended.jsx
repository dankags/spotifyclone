"use client "
import {  useVibrantColor } from '@/lib/hooks/colorHooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io';

export const UserRecomended = ({ pageWidth, data, setContainerColor }) => {
    const color = useVibrantColor(data.img,0.45);
    const defaultColor=useVibrantColor("/likedSongs.png",0.45)
  
    const [currentPlayList,setCurrentPlayList]=useState( {   id:"1",
    img:"/allan.webp",
    name:"allan Walker",
})
    const [recommendedPlaying, setRecommendedPlaying] = useState(false)
    const [showEqualizerAnime,setShoEqualizerAnime]=useState(false)
   
    useEffect(() => {
      if (currentPlayList) {
        currentPlayList.id === data.id ?  setRecommendedPlaying(true) :  setRecommendedPlaying(false)
      }
      
    },[currentPlayList,data])
  
  
   
  
    const handleRecomended = () => {
       setRecommendedPlaying(prev=>!prev) 
       recommendedPlaying ? setShoEqualizerAnime(prev=>!prev) : setShoEqualizerAnime(prev=>!prev)
    if (currentPlayList) {
      currentPlayList.id!==data.id && setCurrentPlayList(data)
    } else {
      console.log(data);
      setCurrentPlayList(data)
    }  
    }
    const handleMouseOut=()=>{
      setContainerColor(defaultColor)
      recommendedPlaying && setShoEqualizerAnime(true)
  
    }
    const handleMouseOver=()=>{
      setContainerColor(color)
      setShoEqualizerAnime(false)
    }
  
    return (
      <div
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        className={`group max-h-44 w-[32%] cursor-pointer flex items-center rounded-md gap-2 transition-all  ease-in-out  bg-neutral-100/10 hover:duration-300 hover:bg-neutral-500/20 `}
      >
        <div className="w-3/12 h-16 flex justify-start shrink-0">
        <div className='min-h-[64px] min-w-[64px] relative'>
          <Image
            src={data.img}
            alt=""
            fill
            className="object-cover rounded-s-md"
            />
            </div>
        </div>
        <div className="w-6/12">
          <span className="w-full text-left capitalize text-white text-sm font-bold pl-2">{data.name}</span>
        </div>
        <div className="w-3/12 flex items-center justify-center">
        {showEqualizerAnime ? 
        <Image
          src={"/equaliser-animated-green.f5eb96f2.gif"}
          alt=""
          height={20}
          width={20}
        />
        :
          <button onClick={handleRecomended} className=" p-2 hidden rounded-full shadow-lg shadow-neutral-900 justify-center items-center transition-all ease-in-out bg-green-500 hover:bg-green-400 group-hover:flex ">
            {recommendedPlaying ?
               <IoIosPause className="text-neutral-900 text-2xl" />
              :
              <IoIosPlay className="text-2xl text-neutral-900" />
            }
          </button>}
        </div>
      </div>
    );
}
