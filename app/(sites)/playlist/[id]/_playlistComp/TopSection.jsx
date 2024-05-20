"use client"
import React, { useState } from "react";
import PlaylistUpdateForm from "./PlaylistUpdateForm";
import { LuMusic4, LuUser } from "react-icons/lu";
import Image from "next/image";

const TopSection = ({ playlist,creator }) => {
    const [playlistInfo, setPlaylistInfo] = useState(null)
    console.log(playlistInfo);
    
  return (
    <div>
      <div className={`w-full flex pl-4 pb-4 pt-6 relative items-end `}>
        <div
          className={` w-3/12 rounded-md flex justify-center items-center shadow-[0_4px_60px_0]  shadow-black/60`}
        >
          <PlaylistUpdateForm setPlaylist={setPlaylistInfo} playlist={playlist}>
            <button className="relative w-full aspect-square ">
              <>
                {playlistInfo?.image ? (
                  <Image
                    src={playlistInfo.image}
                    alt={playlist.name}
                    fill
                    className="shadow-[0_4px_60px_0]  shadow-black/60 rounded-md object-cover"
                  />
                ) : (
                  <>
                    {playlist.image ? (
                      <Image
                        src={playlist.image}
                        alt={playlist.name}
                        fill
                        className="shadow-[0_4px_60px_0]  shadow-black/60 rounded-md object-cover"
                      />
                    ) : (
                      <LuMusic4 className="text-stone-400 text-5xl" />
                    )}
                  </>
                )}
              </>
            </button>
          </PlaylistUpdateForm>
        </div>
        <div
          className={`pb-1 w-9/12 pl-4
              }`}
        >
          <section className="">
            <div className="mb-2">
              <span className="font-medium text-neutral-50 drop-shadow-xl">
                {playlist.slug}
              </span>
            </div>
            <PlaylistUpdateForm
              setPlaylist={setPlaylistInfo}
              playlist={playlist}
            >
              <button className="drop-shadow-xl">
                <span
                  className={`w-full capitalize  text-3xl md:text-5xl font-bold text-neutral-50  whitespace-nowrap text-ellipsis overflow-hidden drop-shadow-xl`}
                >
                  {playlistInfo?.name ? playlistInfo.name : playlist.name}
                </span>
                {playlistInfo?.Desc ? (
                  <p className="text-start text-stone-100 text-base font-normal first-letter:capitalize">
                    {playlistInfo.Desc}
                  </p>
                ) : (
                  <p className="text-start text-stone-100 text-base font-normal first-letter:capitalize">
                    {playlist.Desc}
                  </p>
                )}
              </button>
            </PlaylistUpdateForm>
            <div className="pt-6 flex items-center gap-x-2">
              <div className="flex items-center justify-between drop-shadow-xl">
                <div className="relative rounded-full min-w-[30px] min-h-[30px]">
                  {creator.image ? (
                    <Image
                      src={creator.image}
                      alt=""
                      fill
                      className="rounded-full"
                    />
                  ) : (
                    <LuUser className="text-white" size={20} />
                  )}
                </div>
                <span className="pl-2 text-sm text-white font-bold capitalize">
                  {creator.name}
                </span>
              </div>
              <p className="text-sm text-left text-stone-200 font-medium truncate">
                {creator.Desc}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
