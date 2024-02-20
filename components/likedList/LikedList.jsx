"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { setComponentId } from '@/lib/redux/slices/FilterMusic';
import {
  filterLikedSongs,
  playMusic,
  pushToLikedSongs,
  setLikedSongs,
  setMusicBySelect,
} from "@/lib/redux/slices/currentMusic";
import { filterLikedMusics, pushToLikedMusics } from '@/lib/redux/slices/likedSongs';
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoPause, IoPlay } from "react-icons/io5";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "sonner";

export const LikedList = ({ music, index, mainArtist,musics }) => {
  const { data } = useSession();
  const pathname = usePathname();
  const [showPlayIcon, setShowplayIcon] = useState(false);
  const [duration, setDuration] = useState({ min: "00",sec: "00",});
  const { music: currentMusic,playing } = useAppSelector((state) => state.currentmusic);
  const {likedMusics}=useAppSelector((state)=>state.likedMusics)
  const dispatch = useAppDispatch();
  const [currentSong, setCurrentSong] = useState(currentMusic);
  const [liked, setLiked] = useState(false);
  const [play,setPlay]=useState(false)

  //handle likemusic
  const handleLike = async () => {
    if (data.user) {
      try {
        const res = await fetch("/api/likedSongs", {
          method: "PUT",
          body: JSON.stringify({
            userId: data.user.id,
            musicId: music.id,
          }),
        });
        const response = await res.json();
        if (response === "added to liked songs") {
          setLiked(true);
          dispatch(pushToLikedMusics(music.id));
          toast("added to liked songs", {});
          return;
        }
        if (response === "unliked the song") {
          setLiked(false);
          dispatch(filterLikedMusics(music.id));
          dispatch(setComponentId(music.id))
          toast(`unliked this music`, {});
          return;
        }
      } catch (error) {
        setLiked(false);
        console.log(error);
      }
    }
  };

  //handle play by select and also play and pause music
  const handlePlay = () => {
    if (data) {
      if (play) {
        dispatch(playMusic())
        setPlay(prev => !prev)
        return
      }
      dispatch(setMusicBySelect(music))
      dispatch(playMusic())
      setPlay(prev => !prev)
    }

  }

  // set play or pause icon and also playing state
  useEffect(() => {
    if (currentMusic) {
      if (currentMusic.id===music.id) {
        playing ? setPlay(true) :setPlay(false)
      }
    }
  },[playing])

  console.log(likedMusics)
  //check if current song isliked
  useEffect(() => {
    setLiked(likedMusics?.includes(`${music?.id}`));
  }, [likedMusics]);

  //set current music play icon whenever it changes
  useEffect(() => {
    if (currentMusic) {
      if (currentMusic.id === music.id) {
        setPlay(true)
        return
      }
      setPlay(false)
    }
},[currentMusic])

//calculate the duration of the given music
  useEffect(() => {
    const durationInMinute = Math.floor((music.duration % 3600) / 60);
    const durationInSecond = Math.floor((music.duration % 3600) % 60);

    setDuration({
      min: `${
        durationInMinute < 10 ? `0${durationInMinute}` : `${durationInMinute}`
      }`,
      sec: `${
        durationInSecond < 10 ? `0${durationInSecond}` : `${durationInSecond}`
      }`,
    });
    
  }, [music]);

  return (
    <div
      onMouseOver={() => setShowplayIcon(true)}
      onMouseOut={() => setShowplayIcon(false)}
      className={cn(
        "flex py-2 rounded-md hover:bg-neutral-700/20 group",
        currentMusic?.id === music?.id ? "bg-neutral-700/35" : ""
      )}
    >
      <div className="w-9/12 lg:w-6/12 pl-4 flex items-center max-md:justify-start shrink-0">
        <div className="hidden lg:w-1/12 lg:flex items-center  overflow-hidden">
          {showPlayIcon ? (
            <span
              className="text-xl text-white"
              onClick={handlePlay}
            >
              {" "}
              {play ? <IoPause/> : <IoPlay className="" />}
            </span>
          ) : (
            <div>
              {currentMusic?.id === music?.id ? (
                <Image
                  src={"/equaliser-animated-green.f5eb96f2.gif"}
                  alt="equilizer"
                  width={20}
                  height={20}
                />
              ) : (
                <span className="">{index}</span>
              )}
            </div>
          )}
        </div>
        <div className="w-full lg:w-10/12 flex ">
          <div className="h-12 w-12 max-md:mr-4 lg:mx-4 relative">
            <Image
              src={
                music?.musicImage
                  ? music.musicImage
                  : "/ab67616d0000b273726830445abf56cfff430dcf.jpg"
              }
              alt=""
              fill
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <Link
              href={`/album/${music?.id ? music.id : "ueued93dn389dd39d"}`}
              className={cn(
                "text-base font-semibold capitalize hover:underline",
                currentMusic?.id === music?.id ? "text-green-600" : "text-white"
              )}
            >
              {music?.musicName ? music.musicName : "none"}
            </Link>
            <p className="flex items-center justify-start text-stone-400">
              <Link
                href={`/artist/${
                  mainArtist?.id ? mainArtist.id : "uuew948ewn894en89"
                }`}
                className="text-sm font-medium hover:underline"
              >
                {mainArtist?.name ? mainArtist.name : "Jim Yosef"}
              </Link>
              ,
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:w-3/12 lg:flex items-center justify-start">
        <span className="font-normal text-sm text-stone-400">Link</span>
      </div>
      <div className="w-3/12 pl-2 flex items-center justify-center shrink-0">
        <button
          onClick={handleLike}
          className="w-1/6 max-md:w-[50%] flex items-center justify-center "
        >
          {liked ? (
            <MdOutlineFavorite
              size={20}
              className=" text-green-500 cursor-pointer"
            />
          ) : (
            <MdOutlineFavoriteBorder
              size={24}
              className="text-stone-400 hover:text-white"
            />
          )}
        </button>
        <div className="hidden w-3/12  lg:flex items-center justify-end text-sm text-stone-400">
          <span className="w-[85%] text-sm text-center font-medium">
            {duration ? `${duration.min}:${duration.sec}` : "03:44"}
          </span>
        </div>
        <div className="w-2/12 max-md:w-[50%] flex items-center justify-center text-sm text-stone-400">
          <button
            className={cn(
              "w-[50%] text-sm text-stone-400 font-normal hidden group-hover:block hover:text-white"
            )}
          >
            {" "}
            <BsThreeDots size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
