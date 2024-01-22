import React from 'react'
import UserLikedMusicInfo from './UserLikedMusicInfo'
import Image from 'next/image'

const TopTrackSection = ({setColor}) => {
  return (
    <div
       className={`w-full flex pl-4 pb-4 pt-6  relative items-end "`}
       >
            <div
              className={`pb-1 w-3/12   `}
            >
              <Image
                src="/likedSongs.png"
                alt="likedImage"
                width={ 230}
                height={ 220}
                className="shadow-2xl shadow-neutral-950"
              />
            </div>
            <div
              className={`pb-1 w-9/12 pl-4
              }`}
            >
              <section className="">
                <div className="mb-2">
                  <span className="font-medium text-neutral-50 ">Playlist</span>
                </div>
                <div >
                  <span
                    className={`w-full  text-7xl font-extrabold text-neutral-50  whitespace-nowrap text-ellipsis overflow-hidden`}
                  >
                    Liked Songs
                  </span>
                </div>
                <UserLikedMusicInfo/>
              </section>
            </div>
          </div>
  )
}

export default TopTrackSection