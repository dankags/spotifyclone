"use client"
import React from 'react'
import PlayArtistBtn from './PlayArtistBtn'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ArtistCard = ({ item }) => {
  
  const router=useRouter()
  
  const handleClick = () => {
    if(!item){return}
    router.push(`/artist/${item.id}`)
  }

  return (
    <div className="group relative">
      <div
        onClick={handleClick}
        className=" px-3 pt-3 rounded-lg  bg-neutral-800 flex flex-col items-center hover:bg-neutral-700 transition duration-200"
      >
        <div
          className={`relative w-44 h-44  py-3 flex items-center justify-center lg:mb-6 md:mb-4 sm:mb-3`}
        >
          <Image
            src={item.image ? item.image : "/allan2.jpg"}
            alt="artist img"
            fill
            className=" object-cover rounded-full shadow-lg shadow-neutral-900"
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center ">
          <Link
            href={item ? `/artist/${item.id}` : "/artist/eiewfj929ds9e"}
            className="md:text-base lg:text-lg font-semibold hover:underline text-white capitalize"
          >
            {item ? item.name : "Zero Venture"}
          </Link>
          <span className="mb-5 text-sm font-normal text-stone-400">
            Artist
          </span>
        </div>
      </div>
      <PlayArtistBtn
        item={item}
        className="opacity-0 group-hover:opacity-100"
      />
    </div>
  );
}

export default ArtistCard