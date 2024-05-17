"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import Image from 'next/image'
import React from 'react'

const ArtistBackImg = ({ artistBackImg }) => {
    const {imgurl}=useAppSelector((state)=>state.artistBackCover)
   
  return (
    <>
      {imgurl ? (
        <div className="relative top-0 w-full aspect-square md:aspect-video ">
          <Image
            src={imgurl}
            alt=""
            fill
            loading="lazy"
            className=" object-cover object-center "
          />
        </div>
      ) : (
        <div className="w-full aspect-square md:aspect-video relative top-0">
          <Image
            src={
              artistBackImg ? artistBackImg : "/pexels-ahmed-adly-1270184.jpg"
            }
            alt=""
            fill
            loading="lazy"
            className="object-cover object-center "
          />
        </div>
      )}
    </>
  );
}

export default ArtistBackImg