import React from 'react'
import UserLikedMusicInfo from './UserLikedMusicInfo'
import Image from 'next/image'

const TopTrackSection = ({setColor}) => {
  return (
    <div
      className={`w-full flex flex-col md:flex-row md:items-center pl-4 pb-4 pt-6 "`}
    >
      <div
        className={`pb-1 w-full md:w-3/12 flex items-center justify-center md:block  `}
      >
        <div className="relative min-w-36 md:w-full aspect-square">
          <Image
            src="https://res.cloudinary.com/dxqbb56ul/image/upload/v1707399980/likedSongs_sgfefa.png"
            alt="likedImage"
            fill
            className="shadow-[0_4px_60px_0] shadow-black/50 rounded-md object-cover"
          />
        </div>
      </div>
      <div
        className={`pb-1 w-full md:w-9/12 md:pl-4 
              }`}
      >
        <section className="">
          <div className="mb-2">
            <span className="hidden md:block font-medium text-neutral-50 drop-shadow-xl">
              Playlist
            </span>
          </div>
          <div className="w-full flex">
            <span
              className={`w-full  text-center md:text-left  text-3xl md:text-5xl  font-extrabold text-neutral-50  whitespace-nowrap text-ellipsis overflow-hidden drop-shadow-xl`}
            >
              Liked Songs
            </span>
          </div>
          <UserLikedMusicInfo />
        </section>
      </div>
    </div>
  );
}

export default TopTrackSection