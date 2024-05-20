"use client"
import { ArtistPlaylistComp } from "@/components/ArtistPlaylistComp";
import LikedSongComp from "@/components/likedSong/LikedSongComp";
import CreatePlaylistDropDown from "@/components/sideBar/CreatePlaylistDropDown";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { cn } from "@/lib/utils";
import { ArrowRight, PlusIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { BiLibrary } from "react-icons/bi";
import { IoGridOutline } from "react-icons/io5";
import { LuArrowDownUp, LuUser2 } from "react-icons/lu";


const sortTypes = [
  {
    label: "playlist",
    sort: "playlist",
  },
  {
    label: "by you",
    sort: "by you",
  },
];

const UserLibrary = () => {
    const { data } = useSession()
    const [sortTypeSelected, setSortTypeSelect] = useState([]);
    const { userLibrary } = useAppSelector((state) => state.userLibrary);
    const { playingUrl } = useAppSelector((state) => state.urlPlaying);
    const { likedMusics } = useAppSelector((state) => state.likedMusics);

    if (!data?.user) {
        return
    }
    return (
      <ScrollArea className="w-full h-full">
        <div className="w-full relative ">
          <div className="sticky top-0 flex flex-col gap-3 z-10">
            <div className="w-full h-[16%] pr-2 flex items-center justify-between ">
              <div className={"w-full flex items-center justify-center "}>
                <div
                  className={cn(
                    "px-3 pt-2 w-full  flex justify-start items-center  text-stone-400 hover:text-white cursor-pointer"
                  )}
                >
                  <div className="relative w-12 aspect-square rounded-full bg-neutral-800 shadow-[0_4px_60px_0]  shadow-black/60">
                    {data?.user.image ? (
                      <Image
                        src={data?.user.image}
                        alt={data?.user.name}
                        fill
                        className={"rounded-full object-cover"}
                      />
                    ) : (
                      <LuUser2 className="text-xl text-white" />
                    )}
                  </div>

                  <span className="font-bold text-xl pl-2 text-white">
                    Your Library
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center gap-3 ">
                <CreatePlaylistDropDown>
                  <button className="group rounded-full hover:bg-neutral-800/80 cursor-pointer">
                    {" "}
                    <PlusIcon
                      size={35}
                      className="p-1  text-stone-50 group-hover:text-white"
                    />
                  </button>
                </CreatePlaylistDropDown>
              </div>
            </div>
            <div>
              <ScrollArea className={cn("w-full h-[13%]  px-3 ")}>
                <div className="w-max flex items-center space-x-1 ">
                  <button
                    onClick={() => setSortTypeSelect([])}
                    className={cn(
                      "mr-2 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 block transition-transform duration-300",
                      sortTypeSelected.length === 0 && "hidden"
                    )}
                  >
                    <X size={24} />
                  </button>
                  {sortTypes.map((s, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        setSortTypeSelect((prev) => [...prev, s?.sort])
                      }
                    >
                      <SortComponent
                        sortTypeSelectedIncludes={sortTypeSelected.includes(
                          s.sort
                        )}
                        sort={s}
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between pt-3 px-3">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className={"text-white"}>
                  <LuArrowDownUp />
                </span>
                <span className="text-xs font-semibold text-white first-letter:capitalize ">
                  recents
                </span>
              </div>
              <div>
                <button className="text-white text-lg">
                  <IoGridOutline />
                </button>
              </div>
            </div>
            {/* user library */}
            <div>
              <ul
                className={cn("pt-3 px-1 shrink-0")}
              >
                <li
                  key={likedMusics?.id}
                  className={cn(
                    "rounded-md hover:bg-neutral-800/75 active:bg-neutral-950 cursor-pointer",
                    playingUrl === `/collection/tracks` && "bg-neutral-800"
                  )}
                >
                  <LikedSongComp
                    library={userLibrary && true}
                    showContent
                  />
                </li>
                {userLibrary?.map((item) => (
                  <li
                    key={item.id}
                    className={cn(
                      "rounded-md hover:bg-neutral-800/75 active:bg-neutral-950 cursor-pointer",
                      playingUrl === `/playlist/${item.id}` ||
                        playingUrl === `/artist/${item.id}`
                        ? "bg-neutral-800"
                        : ""
                    )}
                  >
                    <ArtistPlaylistComp
                      key={item.id}
                      item={item}
                      userData={data}
                      showContent
                      square={item.type === "playlist"}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollArea>
    );
};

const SortComponent = ({ sortTypeSelectedIncludes, sort }) => {
  return (
    <div
      className={cn(
        "text-white text-sm flex items-center justify-center shrink-0 text-center  font-semibold capitalize rounded-3xl px-5 py-2 mr-2 bg-neutral-800 hover:bg-neutral-700 cursor-pointer ",
        sortTypeSelectedIncludes &&
          "bg-white text-black font-semibold transition-colors duration-300 hover:bg-white"
      )}
    >
      <span className="text-nowrap ">{sort?.sort}</span>
    </div>
  );
};

export default UserLibrary;
