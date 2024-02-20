import React, { Suspense } from 'react'
import PlayPlaylistBtn from './subComponents/PlayPlaylistBtn'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Skeleton } from '../ui/skeleton'

const PlayListCard = ({item}) => {
  const randomNumber = Math.floor(Math.random() * 633)
  return (
    <Suspense fallback={ <Loading/>}>
    <div className="group w-full  p-3 flex flex-col justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700/80">
    <div>
      <div className={`relative w-full h-48 `}>
        <div className="w-full h-full relative shadow-md shadow-neutral-900">
          <Image
            src={item?.img ? "":`https://source.unsplash.com/collection/490175/640x640/?sig=${randomNumber}`}
            // src={``}
            alt=""
            fill={true}
            className=" rounded-lg "
          />
        </div>
        {/* <div className="w-full h-full absolute rounded-lg top-0 left-0 bg-gradient-to-bl from-pink-600/40 to-blue-700/40"></div> */}
        <span className="w-14  absolute left-2 bottom-2 text-xs font-bold text-white ">
          {/* todo: show if its users playlist */}
          {/* Discover weekly{" "} */}
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
     </Suspense> 
  )
}

const Loading = () => {
  return (
    <div className=' w-full  p-3 flex flex-col justify-center rounded-lg bg-neutral-800 '>
      <div className='w-full h-48'>
        <Skeleton className={"w-full h-full"}/>
      </div>
      <div className="flex flex-col gap-3 justify-between pt-3">
        <div className='w-10'>
          <Skeleton className={"w-full h-2 "}/>
        </div>
        <div className='w-full h-14'>
          <Skeleton className={'w-full h-full'}/>
        </div>
      </div>
    </div>
  )
}

export default PlayListCard