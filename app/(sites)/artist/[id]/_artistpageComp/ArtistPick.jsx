import Image from 'next/image'
import React from 'react'

const ArtistPick = ({ mainArtist, artistMusicPic }) => {

  return (
    <div className="w-11/12 lg:w-6/12 h-72 rounded-sm relative">
      <Image
        src={artistMusicPic?.musicImage ?? "/faded.jpg"}
        alt=""
        fill={true}
        loading='lazy'
        className="object-cover rounded-md "
      />
      <div className="w-full h-full relative top-0 left-0 bg-neutral-900/50">
        <div className="max-w-10/12 absolute top-2 left-2  flex items-center bg-neutral-100 p-1 rounded-2xl">
          {mainArtist.image ? (
            <Image
              src={mainArtist?.image}
              alt=""
              width={25}
              height={25}
              loading='lazy'
              className="object-cover rounded-full mr-2"
            />
          ) : (
            ""
          )}

          <p className=" text-black text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis pr-1">
            Posted by {mainArtist.name}
          </p>
        </div>
        <div className="absolute bottom-3 left-4 flex items-center">
          <div className="w-12 h-12  relative shadow-md shadow-neutral-900">
            <Image
              src={artistMusicPic?.musicImage ?? "/faded.jpg"}
              alt=""
              fill={true}
              loading='lazy'
              className="object-cover rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-1 pl-3 ">
            <span className="text-sm font-semibold first-letter:capitalize">
              {artistMusicPic?.musicName ?? "spectre"}
            </span>
            <span className="text-stone-300 text-xs font-medium">Single</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPick