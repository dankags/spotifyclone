"use client"
import { NavBar } from "@/components/navigationbar/NavBar";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { setMusicBySelect, setNotByPlayList, setPlayMusicValue, setPlaylist } from "@/lib/redux/slices/currentMusic";
import { setPlayingUrl, setPlayingUrlName, setPlayngId } from "@/lib/redux/slices/currentPlayingUrl";
import { setSearchinputValue } from "@/lib/redux/slices/mainSearchBar";
import { setIndexBySelect, setPlaylistLength } from "@/lib/redux/slices/playlistMusicIndex";
import { cn } from "@/lib/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { useDispatch } from "react-redux";

const fetchData = async ( slug, id ) => {

  
  try {
    if (slug === "playlist") {
      const res = await fetch(`/api/playlist/${id}`)
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    }
    if (slug === "artist") {
      const res = await fetch(`/api/music/artist/${id}`)
      if (res.ok) {
        const data=await res.json()
        return data.musics;
      }
    }
  } catch (error) {
    console.log(error);
    
    return error
  }
}

const SearchLayout = ({ children }) => {
  const { searchInputvalue } = useAppSelector((state) => state.mainSearchBarInput);
  const debouncedSearchTerm = useDebounce(searchInputvalue, 500)
  const [searchValue, setSearchValue] = useState(null)
  const router=useRouter()
  const dispatch = useAppDispatch();



  useEffect(() => {
    const fetchTheSearchValue = async () => {
      try {
        const serverRes = await fetch("api/search", {
          method: "POST",
          body: JSON.stringify({ searchQuery: searchInputvalue.toLowerCase() }),
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

  return (
    <ScrollArea className="w-full h-full">
      <div className="bg-neutral-900">
        <div className="sticky top-0 z-10 bg-neutral-950">
          {" "}
          <NavBar />
        </div>

        <div>
          {searchValue && (
            <div className="text-white">
              <div className="w-full p-3 text-white flex items-center justify-start">
                <span className="text-xl font-bold">Top results</span>
              </div>
              <div className="w-full  flex md:justify-start items-center p-3">
                <div className=" hidden md:block group p-3 relative w-5/12 aspect-video bg-neutral-800 rounded-md transition-all duration-300 hover:bg-neutral-700/60 hover:shadow-[0_4px_60px_0] hover:shadow-neutral-950">
                  <div className=" p-4 w-full  flex flex-col justify-center gap-2 hover:cursor-pointer">
                    <div
                      className="w-full flex flex-col justify-center gap-2"
                      onClick={() =>
                        router.push(
                          `/${
                            searchValue?.slug === "song"
                              ? "album"
                              : searchValue?.slug
                          }/${searchValue?.searched.id}`
                        )
                      }
                    >
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
                          <>
                            {searchValue?.slug === "playlist" ? (
                              <Image
                                src={
                                  searchValue?.searched.image ??
                                  "/604199df880fb029291ddd7c382e828b.jpg"
                                }
                                alt={""}
                                fill
                                className="rounded-md object-cover shadow-[0_4px_60px_0] shadow-black/60"
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
                          </>
                        )}
                      </div>
                      <div className="text-white text-xl font-bold first-letter:capitalize">
                        {" "}
                        {searchValue?.slug === "artist" ||
                        searchValue?.slug === "playlist"
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
                  <PlayBtn item={searchValue} />
                </div>
                {/* search component on mobile */}
                <div
                  className="p-3 rounded-md w-full flex items-center gap-3 md:hidden hover:bg-neutral-800 active:hover:bg-neutral-700/60"
                  onClick={() =>
                    router.push(
                      `/${
                        searchValue?.slug === "song"
                          ? "album"
                          : searchValue?.slug
                      }/${searchValue?.searched.id}`
                    )
                  }
                >
                  <div className="relative w-16 aspect-square rounded-full">
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
                      <>
                        {searchValue?.slug === "playlist" ? (
                          <Image
                            src={
                              searchValue?.searched.image ??
                              "/604199df880fb029291ddd7c382e828b.jpg"
                            }
                            alt={""}
                            fill
                            className="rounded-md object-cover shadow-[0_4px_60px_0] shadow-black/60"
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
                      </>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-center gap-2">
                    <div className="capitalize text-start text-lg font-semibold text-white">
                      {searchValue?.slug === "artist" ||
                      searchValue?.slug === "playlist"
                        ? searchValue?.searched.name
                        : searchValue?.searched.musicName}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="capitalize text-stone-400 font-semibold text-sm">
                        {searchValue?.slug ?? song} .{" "}
                      </span>
                      {searchValue?.artist.length !== 0 && (
                        <div className="flex items-center text-white">
                          {searchValue?.artist.map((item, i) => (
                            <span
                              key={item?.id}
                              className={"capitalize font-semibold text-sm"}
                            >
                              {i > 1 ? `,${item?.name}` : item.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
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


const PlayBtn = ({item,classname}) => {
  const { data } = useSession()
  const router = useRouter()
  const dispatch=useDispatch()
  const [isPlay, setIsPlay] = useState(false);
  const { playingUrl } = useAppSelector((state) => state.urlPlaying);
  const { music, playing, playlist } = useAppSelector(
    (state) => state.currentmusic
  );
  console.log(item);
  
  const handlePlay = async () => {
    //if not logged in redirects you to sign in page || log in page
    if (!data) {
      router.push("/dashboard/login")
      return
    }
    // if no item searched 
    if (!item) {return}
    const dataUrl = item.slug === "song" ? `/album/${item.searched.id}` : `/${item.slug}/${item.searched.id}`
    if (dataUrl === playingUrl) {
      console.log(dataUrl,playingUrl);
      
      await dispatch(setPlayMusicValue(!playing))
      setIsPlay(!isPlay)
      console.log("this playing url logic runs");
      
      return
    }
    // if there is no playing url
    if (!isPlay) {
     
        //if its a single song
        if (item.slug === "song") {
          await dispatch(setNotByPlayList(item.searched));
          await dispatch(setPlayingUrl(`/album/${item.searched.id}`));
          await dispatch(setPlaylist(null))
          await dispatch(setIndexBySelect(0));
          await dispatch(setPlaylistLength(0));
          await dispatch(setPlayingUrlName(item.searched.musicName))
          setIsPlay(!isPlay);
          return
        }
        //if its artist or playlist
        
        
        const musics = await fetchData(item.slug, item.searched.id)
       
        
        if (musics || musics.length > 0) {
        await dispatch(setPlayingUrl(`/${item.slug}/${item.searched.id}`));
        await dispatch(setPlayingUrlName(item.searched.name));
        await dispatch(setPlayngId(item.searched.id));
        await dispatch(setPlaylist(musics));
        await dispatch(setPlaylistLength(musics.length));
        await dispatch(setMusicBySelect(musics[0]));
        await dispatch(setIndexBySelect(0));
        await dispatch(setPlayMusicValue(true));
          setIsPlay(!isPlay);
        }
        return
      }
    
  };

  useEffect(() => {

    
      if (!data) {return;}
    if (!item) { return; }
    const handlePlayingState=async()=>{
      const dataUrl = item.slug === "song" ? `/album/${item.searched.id}` : `/${item.slug}/${item.searched.id}`;
      if (dataUrl === playingUrl) {
      
        
        setIsPlay(playing);
        return;
      }
      setIsPlay(false);
    }
    handlePlayingState()

  },[item,playing])

  return (
    <button
      onClick={handlePlay}
      className={cn(
        `opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full shadow-lg shadow-neutral-900 flex justify-center items-center bg-green-500 hover:bg-green-400 hover:scale-105 active:scale-100 absolute bottom-6 right-6`,
        playingUrl === `/artist/dsuneriviuneveu` && "opacity-100",classname
      )}
    >
      {isPlay ? (
        <IoIosPause size={27} className=" text-neutral-950" />
      ) : (
        <IoIosPlay size={27} className=" text-neutral-950" />
      )}
    </button>
  );
}

export default SearchLayout