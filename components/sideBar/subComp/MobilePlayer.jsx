"use Client"
import { useDarkVibrantColor } from "@/lib/hooks/colorHooks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { playMusic, setMusicByPlaylist } from "@/lib/redux/slices/currentMusic";
import { addMusicIndex } from "@/lib/redux/slices/playlistMusicIndex";
import Image from "next/image";
import { Link } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { MdSkipNext } from "react-icons/md";

const checkingUrl = (func, data, currentPlayingUrl, playing = true) => {
  if (!data) {
    return;
  }
  const dataSlug = data?.slug ? data.slug : data.artist?.map((i) => i.slug)[0];
  if (dataSlug === "artist") {
    if (currentPlayingUrl === `/artist/${data.id}`) {
      func(playing);
      return;
    }
    func(false);
    return;
  }
  if (dataSlug === "playlist") {
    if (currentPlayingUrl === `/playlist/${data.id}`) {
      func(playing);
      return;
    }
    func(false);
    return;
  }
  if (data.title === "liked songs") {
    if (currentPlayingUrl === `/collection/tracks`) {
      func(playing);
      return;
    }
    func(false);
    return;
  }
};

 const MobilePlayer=()=>{
  const { music, playing,playlist } = useAppSelector((state) => state.currentmusic);
    const { playingUrl, id } = useAppSelector((state) => state.urlPlaying);
    const { musicIndex, playlistLength } = useAppSelector((state) => state.musicIndex);
  const dispatch = useAppDispatch();
  // const color = useDarkVibrantColor(music.musicImage, 0.45);
  const [mainArtist, setMainArtist] = useState(null);
    const [artists, setArtists] = useState(null);
    const [isPlaying,setIsPlaying]=useState(false)

  useEffect(() => {
    const controller = new AbortController();
    const fetchArtists = async () => {
      try {
        const artist = await fetch(`/api/artist/profile/${music.artistId}`, {
          method: "GET",
          signal: controller.signal,
        });
        if (artist.ok) {
          const mainArtists = await artist.json();
          setMainArtist(mainArtists);
          const featuredArtist = await fetch("/api/artist/profile", {
            method: "POST",
            body: JSON.stringify(music.otherFeaturedArtist),
            signal: controller?.signal,
          });
          if (featuredArtist.ok) {
            const artists = await featuredArtist.json();
            setArtists(artists);
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (music) {
      !music.artists && fetchArtists();
    }
    return () => controller.abort();
  }, [music]);
    
  useEffect(() => {
    if (!music) {
      return;
    }
    checkingUrl(setIsPlaying, mainArtist, playingUrl, playing);
  }, [playing]);  

    const handleplay=()=>{
      if(!music){return}
      if (!isPlaying) {
        setIsPlaying(prev => !prev)
        dispatch(playMusic())
        return
      }
      dispatch(playMusic())
      setIsPlaying(prev=>!prev)
    
    }
    
     const handleNext = async() => {
       if ( playlist === null) {
         return;
       }
       const nextIndex = musicIndex + 1 >= playlistLength ? 0 : musicIndex + 1;
       await dispatch(setMusicByPlaylist(nextIndex));
       await dispatch(addMusicIndex());
     };
    
  return (
    <div className="w-full rounded-md p-3 flex items-center bg-red-400">
      <div>
        {music ? (
          <div className="w-full h-full p-2 flex items-center justify-between gap-x-2 ">
            <div className="w-2/12 pl-1">
              <div className="group w-14 h-14 rounded-md relative">
                <Image
                  src={
                    music?.musicImage
                      ? music.musicImage
                      : "/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"
                  }
                  alt="music"
                  width={56}
                  height={56}
                  className="object-cover rounded-md"
                />
              </div>
            </div>
            <div className="w-8/12 pl-3 flex flex-col justify-center gap-y-1 capitalize ">
              {/* display musicname and link */}
              <Link
                key={music.id}
                href={`/album/${music.id}`}
                className="text-base font-medium truncate text-white cursor-pointer hover:underline"
              >
                {music.musicName}
              </Link>

              {/* display artists names and links*/}
              <div className="flex items-center">
                {music.artists ? (
                  <>
                    <Link
                      key={music.artists[0]?.id}
                      href={`/artist/${music.artists[0]?.id}`}
                      className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline "
                    >
                      {music.artists[0]?.name}
                    </Link>

                    {music.artists?.slice(1).map((artist) => {
                      return (
                        <Link
                          key={artist?.id}
                          href={`/artist/${artist?.id}`}
                          className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline "
                        >
                          {`, ${artist?.name}`}
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <Link
                      key={mainArtist?.id}
                      href={`/artist/${mainArtist?.id}`}
                      className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline "
                    >
                      {mainArtist?.name}
                    </Link>

                    {artists?.map((artist) => (
                      <Link
                        key={artist.id}
                        href={`/artist/${artist.id}`}
                        className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline "
                      >
                        {`, ${artist.name}`}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center">
        <button onClick={handleplay}>
          {isPlaying ? (
            <IoIosPause className="text-neutral-50 text-xl" />
          ) : (
            <IoIosPlay className="text-xl text-neutral-50" />
          )}
        </button>
        {playlist && (
          <button onClick={handleNext} className="text-neutral-50">
            <MdSkipNext size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobilePlayer
