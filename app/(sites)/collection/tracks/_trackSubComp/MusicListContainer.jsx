"use client"
import { StaticCarosel } from '@/components/StaticCarosel'
import { LikedList } from "@/components/musicList/LikedList";
import React from 'react'
import { Musics } from './data'

const MusicListContainer = () => {
  return (
    <>
    <StaticCarosel displayCol>
          {Musics.map((item,i)=>
           <LikedList key={item.id} music={item} index={i+1} />
          )}
    </StaticCarosel>
    </>
  )
}

export default MusicListContainer