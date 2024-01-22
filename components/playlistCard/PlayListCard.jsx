import React from 'react'
import PlayPlaylistBtn from './subComponents/PlayPlaylistBtn'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const PlayListCard = ({item}) => {
  return (
    <div className="group w-full  p-3 flex flex-col justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700/80">
    <div>
      <div className={`relative w-full h-48 `}>
        <div className="w-full h-full relative shadow-md shadow-neutral-900">
          <Image
            src="/ab67616d0000b273726830445abf56cfff430dcf.jpg"
            alt=""
            fill={true}
            className=" rounded-lg "
          />
        </div>
        {/* <div className="w-full h-full absolute rounded-lg top-0 left-0 bg-gradient-to-bl from-pink-600/40 to-blue-700/40"></div> */}
        <span className="w-14  absolute left-2 bottom-2 text-xs font-bold text-white ">
          Discover weekly{" "}
        </span>
        <PlayPlaylistBtn/>
      </div>
    </div>
    <div className="flex flex-col gap-3 justify-between pt-3">
      <span className="text-base font-bold text-white ">Discover weekly</span>
      <p className="font-medium text-xs text-stone-400 overflow-hidden text-ellipsis">
        Your weekly mixtape of fresh music. Enjoy Lorem ipsum, dolor sit amet
        consectetur adipisicing elit.{" "}
      </p>
    </div>
  </div>
  )
}

export default PlayListCard