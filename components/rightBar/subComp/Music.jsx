"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import LikeButton from './likeButton'
import { toast } from 'sonner'

const Music =({musicItem}) => {
  let music=null;
  if(!musicItem.musicImage){
    music=fetchmusic(musicItem);
  }

  if(musicItem.musicImage){
  music=musicItem;
  }
  const [mainArtist, setMainArtist] = useState(null)
  const [featuredArtists,setFeaturedArtists]=useState(null)
  useEffect(() => {
    const fetchMainArtist = async () => {
      try {
        const res = await fetch(`/api/artist/profile/${music.artistId}`, {
          method:"GET"
        })
        if (res.ok) {
          const artist = await res.json()
          setMainArtist(artist)
        }
      } catch (error) {
        toast.error(error)
      }
    }
    const fetchFeaturedArtists =async () => {
      try {
        const res = await fetch(`/api/artist/profile`, {
          method: "POST",
          body:JSON.stringify(music?.otherFeaturedArtist)
        })
        if (res.ok) {
          const artists=await res.json()
          console.log(artists)
          setFeaturedArtists(artists)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (music) {
      fetchMainArtist()
      fetchFeaturedArtists()
    }
  },[music])
    console.log(music)
  return (
    <div className='w-full flex flex-col justify-center'>
          <div className=' relative aspect-square '>
                <Image src={music?.musicImage ? music?.musicImage :"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"} alt={""} fill className='rounded-md aspect-square'/> 
            </div>
            <div className='w-full flex items-center justify-between pt-2'>
                <div className='w-[75%]'>
                   
                    <div className='w-full flex items-center justify-start font-bold  text-3xl '>
                     <Link href={`/album/${music?.id}`} className='w-full capitalize mb-1 truncate cursor-pointer hover:underline'>{music?.musicName}</Link>
                    </div>
                    <div className='flex items-center overflow-hidden text-stone-400 truncate'>
                      <Link href={`/artist/${mainArtist?.id}`} className='capitalize text-base font-normal truncate hover:text-white hover:underline'>{mainArtist?.name}</Link>
            {featuredArtists?.map((artist) =>
                    <Link key={artist.id} href={`/artist/${artist?.id}`} className='capitalize text-base font-normal truncate hover:text-white hover:underline'>, {artist.name}</Link>  
                      )}
                    </div>
                    
                </div>
                <div className='w-[25%] flex items-center justify-between '>
                    <LikeButton music={music}/>
                    <button className='text-stone-400 hover:text-white'><BsThreeDots  size={24}/></button>
                </div>
            </div>
    </div>
  )
}

export default Music