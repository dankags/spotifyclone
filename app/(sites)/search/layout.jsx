"use client"
import { NavBar } from "@/components/navigationbar/NavBar";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { setSearchinputValue } from "@/lib/redux/slices/mainSearchBar";
import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { IoIosPause, IoIosPlay } from "react-icons/io";

const SearchLayout = ({ children }) => {
  const { searchInputvalue } = useAppSelector((state) => state.mainSearchBarInput);
  const debouncedSearchTerm = useDebounce(searchInputvalue, 500)
  const [isPlay,setIsPlay]=useState(false)
  const [searchValue, setSearchValue] = useState(null)
  const dispatch = useAppDispatch();
  const { playingUrl } = useAppSelector((state) => state.urlPlaying);
  const { music, playing, playlist } = useAppSelector(
      (state) => state.currentmusic
    );


  useEffect(() => {
    const fetchTheSearchValue = async () => {
      try {
        const serverRes = await fetch("api/search", {
          method: "POST",
          body: JSON.stringify({ searchQuery: searchInputvalue }),
        });
        if (serverRes.ok) {
          const res=await serverRes.json()
          setSearchValue(res);
          await dispatch(setSearchinputValue(null)) 
          console.log(res);
          return
        }
        
      } catch (error) {
        setSearchValue(null)
        console.log(error);
        
      }
    }
    debouncedSearchTerm&&fetchTheSearchValue()
  },[debouncedSearchTerm])


  const handlePlay = async () => {
    setIsPlay(!isPlay)
  }
  return (
    <ScrollArea className="w-full h-full">
      <div className="bg-neutral-900">
        <div className="sticky top-0 z-10 bg-neutral-950">
          {" "}
          <NavBar />
        </div>

        <div>
          {searchValue  && (
            <div className="text-white">
              <div className="w-full p-3 text-white flex items-center justify-start">
                <span className="text-xl font-bold">Top results</span>
              </div>
              <div className="w-full hidden md:flex md:justify-start md:items-center p-3">
                <div className=" group p-3 relative w-5/12 aspect-video bg-neutral-800 rounded-md transition-all duration-300 hover:bg-neutral-700/60 hover:shadow-[0_4px_60px_0] hover:shadow-neutral-950">
                  <div className=" p-4 w-full  flex flex-col justify-center gap-2">
                    <div className="w-full flex flex-col justify-center gap-2">
                      <div className="w-3/12 aspect-square relative">
                        {searchValue?.slug === "artist" ? (
                          <Image
                            src={
                              searchValue?.searched.image ??
                              "/604199df880fb029291ddd7c382e828b.jpg"
                            }
                            alt={""}
                            fill
                            className="rounded-full object-cover shadow-[0_4px_60px_0] shadow-black/60"
                          />
                        ) : (
                          <Image
                            src={
                              searchValue?.searched.musicImage ??
                              "/604199df880fb029291ddd7c382e828b.jpg"
                            }
                            alt={""}
                            fill
                            className="rounded-md object-cover shadow-[0_4px_60px_0] shadow-black/60"
                          />
                        )}
                      </div>
                      <div className="text-white text-xl font-bold first-letter:capitalize">
                        {" "}
                        {searchValue?.slug === "artist"
                          ? searchValue?.searched.name
                          : searchValue?.searched.musicName}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="capitalize text-stone-400 font-semibold text-base">
                        {searchValue?.slug ?? song} .{" "}
                      </span>
                      {searchValue?.artist.length !== 0 && (
                        <div className="flex items-center text-white">
                          {searchValue?.artist.map((item, i) => (
                            <Link
                              key={item?.id}
                              href={`artist/${item?.id}`}
                              className={
                                "capitalize hover:underline font-semibold text-base"
                              }
                            >
                              {i > 1 ? `,${item?.name}` : item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handlePlay}
                    className={cn(
                      `opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full shadow-lg shadow-neutral-900 flex justify-center items-center bg-green-500 hover:bg-green-400 hover:scale-105 active:scale-100 absolute bottom-6 right-6`,
                      playingUrl === `/artist/dsuneriviuneveu` && "opacity-100"
                    )}
                  >
                    {isPlay ? (
                      <IoIosPause size={27} className=" text-neutral-950" />
                    ) : (
                      <IoIosPlay size={27} className=" text-neutral-950" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full md:hidden"></div>
            </div>
          )}
          {children}
        </div>
      </div>

      <ScrollBar />
    </ScrollArea>
  );
}

export default SearchLayout