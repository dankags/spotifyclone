"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { setComponentId } from '@/lib/redux/slices/FilterMusic';
import {
  filterLikedSongs,
  playMusic,
  pushToLikedSongs,
  setLikedSongs,
  setMusicByPlaylist,
  setMusicBySelect,
  setPlaylist,
} from "@/lib/redux/slices/currentMusic";
import { setPlayingUrl } from '@/lib/redux/slices/currentPlayingUrl';
import { filterLikedMusics, pushToLikedMusics } from '@/lib/redux/slices/likedSongs';
import { setIndexBySelect, setPlaylistLength } from '@/lib/redux/slices/playlistMusicIndex';
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoPause, IoPlay } from "react-icons/io5";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { TbRuler } from 'react-icons/tb';
import { toast } from "sonner";

export const LikedList = ({ music, index,musics }) => {
  const { data } = useSession();
  const pathname = usePathname();
  const [showPlayIcon, setShowplayIcon] = useState(false);
  const [duration, setDuration] = useState({ min: "00",sec: "00",});
  const {
    music: currentMusic,
    playing,
    playlist,
  } = useAppSelector((state) => state.currentmusic);
  const { likedMusics } = useAppSelector((state) => state.likedMusics)
   const { playingUrl } = useAppSelector((state) => state.urlPlaying);
  const {playlistLength,musicIndex:Index}=useAppSelector((state)=>state.musicIndex)
  const dispatch = useAppDispatch();
  const [currentSong, setCurrentSong] = useState(currentMusic);
  const [liked, setLiked] = useState(false);
  const [play, setPlay] = useState(false)
  const [isMusicAtiveInPathName,setIsMusicAtiveInPathName]=useState(false)

  //fetch music artists
  const musicArtists = useMemo(() => {
    const controller = new AbortController();
    let artists = [];
    const fetchMainArtist = async () => {
      try {
        const res = await fetch(`/api/artist/profile/${music?.artistId}`, {
          method: "GET",
          signal: controller.signal,
        });
        if (res.ok) {
          const artist = await res.json();
          artists.push(artist)
        
        }
      } catch (error) {
        console.log(error)
      }
    };
    const fetchFeaturedArtists = async () => {
      try {
        const res = await fetch("/api/artist/profile", {
          method: "POST",
          body: JSON.stringify(music?.otherFeaturedArtist),
          signal: controller.signal,
        });
        if (res.ok) {
          const otherArtists = await res.json();
          artists.push(...otherArtists)
          
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchMainArtist();
    fetchFeaturedArtists();
    return artists
  },[music])

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
  const handlePlay =async() => {
    const musicDetails={...music,artists:musicArtists}
    if (data) {
      //play is true
      if (play) {
        playlistLength === 0&& await dispatch(setPlaylistLength(musics.length))
        playlist === null && dispatch(setPlaylist(musics));
        if (pathname !== playingUrl) {
          await dispatch(setPlaylist(musics));
          await dispatch(setMusicByPlaylist(index - 1));
          await dispatch(setIndexBySelect(0));
          await dispatch(setPlaylistLength(musics.length));
          dispatch(setPlayingUrl(pathname));
          setPlay(true);
          return
        } 
        if (music.id === currentMusic?.id) {
          await dispatch(playMusic());
          return
        }
        !playingUrl&&await dispatch(setPlayingUrl(pathname))
        await dispatch(setIndexBySelect((index-1)))
        dispatch(playMusic())
        setPlay(prev => !prev)
        return
      }
      // if play var is false
      if (pathname !== playingUrl) {
        await dispatch(setPlaylist(musics));
        await dispatch(setMusicByPlaylist(index - 1));
        await dispatch(setIndexBySelect(0));
        await dispatch(setPlaylistLength(musics.length));
        dispatch(setPlayingUrl(pathname));
        setPlay(true);
        return
      } 
      if (music.id === currentMusic?.id) {
        await dispatch(playMusic());
        return;
      }
      playlist === null && await dispatch(setPlaylist(musics));
      await dispatch(setIndexBySelect(index - 1));
      await dispatch(setMusicBySelect(musicDetails));
      dispatch(playMusic())
      setPlay(true)
    }

  }
  
  // set play or pause icon and also playing state
  useEffect(() => {
    if (currentMusic) {
      if (isMusicAtiveInPathName) {
        playing ? setPlay(true) : setPlay(false)
       
      }
    }
  },[playing])
 
  //check if current song isliked
  useEffect(() => {
    setLiked(likedMusics?.includes(`${music?.id}`));
  }, [likedMusics]);

  //set current music play icon whenever it changes
//   useEffect(() => {
//     if (currentMusic) {
//       if (currentMusic.id === music.id) {
//         const musicIndex = musics?.findIndex((item) => item.id === currentMusic.id)
//         setIsMusicAtiveInPathName(true)
//         dispatch(setIndexBySelect(index-1))
//         setPlay(true)
//         return
//       }
//       setPlay(false)
//     }
// },[currentMusic])

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

  //check if the music playing is in the current playing url musics
  //if true (exists playing url musics) the equilizer gif will show in that is playing
  //if false (thats if music playing exist in current url & playing url ) the equalizer gif will not show
  useEffect(() => {
    const getActiveSongByPathName = () => {
    
    
      if (pathname !== playingUrl) {
      
        
        setIsMusicAtiveInPathName(false);
        return;
      }
        if (currentMusic?.id === music?.id) {
          setIsMusicAtiveInPathName(true)
          const musicIndex = musics?.findIndex( (item) => item.id === currentMusic.id);
          setIsMusicAtiveInPathName(true);
          dispatch(setIndexBySelect(index - 1));
          setPlay(true);
          return
        }
        setPlay(false);
        setIsMusicAtiveInPathName(false)
        return
    }
    getActiveSongByPathName()

  },[pathname,currentMusic,playlist])

  return (
    <div
      onMouseOver={() => setShowplayIcon(true)}
      onMouseOut={() => setShowplayIcon(false)}
      className={cn(
        "flex py-2 rounded-md hover:bg-neutral-700/20 group",
        isMusicAtiveInPathName? "bg-neutral-700/35" : ""
      )}
    >
      <div className="w-9/12 lg:w-6/12 pl-4 flex items-center max-md:justify-start shrink-0">
        <div className="hidden lg:w-1/12 lg:flex items-center  overflow-hidden">
          {showPlayIcon ? (
            <span
              className="text-lg text-white"
              onClick={handlePlay}
            >
              {" "}
              {play ? <IoPause/> : <IoPlay className="" />}
            </span>
          ) : (
            <div>
              {isMusicAtiveInPathName? (
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
                isMusicAtiveInPathName ? "text-green-600" : "text-white"
              )}
            >
              {music?.musicName ? music.musicName : "none"}
            </Link>
            <p className="flex items-center justify-start text-stone-400">
              {musicArtists?.map((artist,indx) =>
                <Link
                  key={artist.id}
               href={`/artist/${
                 artist?.id ? artist.id : "uuew948ewn894en89"
               }`}
               className="text-sm font-medium capitalize hover:underline"
             >
                  {artist?.name ? `${indx===0 ? artist.name :", "+artist.name}` : "Jim Yosef"}
             </Link>
              )}

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
