"use client"
import { LikedList } from "@/components/musicList/LikedList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { pushToPlaylist } from "@/lib/redux/slices/playlistPageMusics";
import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const PlaylistSearchComp = ({playlist}) => {
    const [isSearchOpened,setIsSearchedOpened]=useState(false)
    const searchBarRef = useRef()
    const [searchValue, setSearchValue] = useState("")
    const [searchRes,setSearchRes]=useState(null)
    const debouncedValue = useDebounce(searchValue, 500)
    
    useEffect(() => {
        const fetchSearchedMusics = async () => {
          try {
              const res = await fetch(`/api/playlist/search`, {
                method: "POST",
                body: JSON.stringify({ searchQuery:debouncedValue.toLowerCase() }),
              });
              if (res.ok) {
                  const data = await res.json()
                  if (data) {
                      setSearchRes(data)
                      return
                  }
              }
          } catch (error) {
            console.log(error)
          }
        }
        debouncedValue && fetchSearchedMusics()
  },[debouncedValue])

  
    const handleToogle = () => {
        if (!isSearchOpened) {
           
       searchBarRef.current.focus();
       setIsSearchedOpened(prev=>!prev);
       return
     }
         searchBarRef.current.value = "";
     setIsSearchedOpened((prev) => !prev);
   };

    return (
      <div className="w-full">
        <div
          className={cn(
            "hidden w-full  justify-end items-center",
            !isSearchOpened && "flex"
          )}
        >
          <button
            onClick={handleToogle}
            className="pr-3 md:pr-4 text-sm font-semibold  text-stone-300 first-letter:capitalize hover:text-stone-50"
          >
            find more
          </button>
        </div>
        <div
          className={cn(
            "w-full hidden flex-col justify-center gap-3",
            isSearchOpened && "flex"
          )}
        >
          <div className="w-full flex items-center">
            <div className="w-10/12 md:w-6/12 flex flex-col justify-center gap-3">
              <span className={"font-bold text-lg text-white"}>
                Lets find something for your playlist
              </span>
              <div
                className={
                  "flex items-center gap-2 p-3 text-stone-400 text-lg bg-neutral-800 rounded-md "
                }
              >
                <BiSearch classname={"text-stone-400"} />
                <input
                  ref={searchBarRef}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for songs"
                  className={cn(
                    " w-full tracking-wide text-sm text-white font-medium bg-neutral-800 placeholder:text-sm  focus:border-none focus:outline-none "
                  )}
                />
              </div>
            </div>
            <div className="w-2/12 md:w-6/12 pr-3 flex items-center justify-end gap-3 ">
              <button
                onClick={handleToogle}
                className="group rounded-full  hover:bg-neutral-800/80 cursor-pointer text-2xl"
              >
                {" "}
                <IoClose className="p-1 text-stone-400 group-hover:text-white" />
              </button>
            </div>
          </div>
          <ScrollArea className={"w-full"}>
            <div className="min-h-28 max-h-96">
              {searchRes?.length > 0 || searchRes ? (
                searchRes?.map((item, indx) => (
                  <SearchedElement
                    music={item}
                    index={indx}
                    key={item.id}
                    playlist={playlist}
                    urlName={playlist.name}
                  />
                ))
              ) : (
                <div
                  className={
                    "text-lg font-semibold text-stone-400 first-letter:capitalize"
                  }
                >
                  find some musics{" "}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
};

const SearchedElement=({music,urlName,playlist})=>{

    const dispatch = useAppDispatch()
    const { playlistMusics } = useAppSelector(
      (state) => state.playlistPageMusics
    );
     
    const handleMusicAddition = async () => {
        if (!music) { return }
        try {
            const res = await fetch(`/api/playlist/updatelist/${playlist.id}`, {
                method: "PUT",
                body:JSON.stringify({musicId:music.id})
            })
            if (res.ok) {
                const musicData = await res.json()
                if (playlistMusics.length === 0) {
            await dispatch(pushToPlaylist(music));
            toast.success("music added to this playlist")
            return
        }
                if (playlistMusics.some((item) => item.id === music.id)) {
                    toast.success("music already exist");
                    return
                }
      await dispatch(pushToPlaylist(music))
      toast.success("music added to this playlist")
      return
    
            }
        } catch (error) {
            toast.error("music has not been added")
        }
        if (playlistMusics.length === 0) {
            await dispatch(pushToPlaylist(music));
            return
        }
      if (playlistMusics.some((item) => item.id === music.id)) { return }
      await dispatch(pushToPlaylist(music))
      return
    }
    
    return (
      <div className="w-full px-2 py-3 flex items-center rounded-md hover:bg-neutral-800">
        <div className={"w-8/12 md:w-5/12 flex items-center gap-3 "}>
          <div className="w-10 aspect-square relative">
            <Image src={music.musicImage?music.musicImage:"/faded.jpg"} alt={""} fill className="rounded-sm" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="text-white text-base font-normal first-letter:capitalize">{music.musicName ?? "Alone"}</span>
            <Link href={`/artist/${music.artistId}`} className={"hidden md:block  text-start text-sm font-semibold text-stone-400 hover:text-white hover:underline first-letter:capitalize"}>{ music.mainArtist ?music.mainArtist.name : "dhufhsjsdkk"}</Link>
          </div>
        </div>
        <div className={"hidden md:w-4/12 md:flex md:justify-center "}>
          <span className="text-stone-400 text-base font-medium">
            
          </span>
        </div>
        <div
          className={" w-4/12  md:w-3/12 pr-4 flex justify-end items-center "}
        >
          <button
            onClick={handleMusicAddition}
            className={
              "first-letter:capitalize text-white text-sm px-3 py-1 rounded-2xl font-semibold ring-2 ring-white hover:scale-105 active:scale-100"
            }
          >
            add
          </button>
        </div>
      </div>
    );

}

export default PlaylistSearchComp;
