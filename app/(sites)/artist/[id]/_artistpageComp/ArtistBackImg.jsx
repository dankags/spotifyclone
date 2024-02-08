"use client"
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import Image from 'next/image'
import React from 'react'

const ArtistBackImg = ({ artistBackImg }) => {
    const {imgurl}=useAppSelector((state)=>state.artistBackCover)
   
  return (
      <>
          {imgurl ?
              <Image
          src={imgurl}
          alt=""
          fill
          className="aspect-square object-cover fixed top-0"
          /> 
              :
              <Image
              src={artistBackImg}
              alt=""
              fill
              className="aspect-square object-cover fixed top-0"
              />      
        }
      </>
  )
}

export default ArtistBackImg