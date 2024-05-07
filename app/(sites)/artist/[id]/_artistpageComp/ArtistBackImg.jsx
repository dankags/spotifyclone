"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import Image from 'next/image'
import React from 'react'

const ArtistBackImg = ({ artistBackImg }) => {
    const {imgurl}=useAppSelector((state)=>state.artistBackCover)
   
  return (
    <>
      {imgurl ? (
        <div className="relative top-0 w-full h-full">
          <Image
            src={imgurl}
            alt=""
            fill
            loading="lazy"
            className=" object-cover object-center w-full"
          />
        </div>
      ) : (
        <div className="w-full h-[70vh] md:h-[80vh] relative top-0">
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