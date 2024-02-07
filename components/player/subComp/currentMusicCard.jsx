"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { filterLikedSongs, pushToLikedSongs } from '@/lib/redux/slices/currentMusic'
import { closeRightbar, openRightbar } from '@/lib/redux/slices/rightbar'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdPictureInPicture } from 'react-icons/md'
import { toast } from 'sonner'

const CurrentMusicCard = ({ children }) => {
  
  const { data } = useSession();
  const dispatch=useAppDispatch()
  const { opened } = useAppSelector((state) => state.rightbar);
  const { music, likedSongs } = useAppSelector((state) => state.currentmusic);
  const [like, setLike] = useState(false);
  const dispath = useAppDispatch();

  useEffect(() => {
    if (likedSongs) {
      setLike(likedSongs.includes(music?.id));
    }
  }, [likedSongs, music]);

  const handleLikeSong = async () => {
    if (data.user) {
      try {
        const res=await fetch("/api/likedSongs",
        {
          method:"PUT",
          body:JSON.stringify({
            userId:data.user.id,
            musicId:music.id
          })
        }
        )
        const response=await res.json()
        console.log(response)
        if (response === "added to liked songs") {
          setLike(true);
          dispatch(pushToLikedSongs(music.id))
          toast("added to liked songs", {});
          return;
        }
        if (response === 'unliked the song') {
          setLike(false);
         dispatch(filterLikedSongs(music.id))
          toast(
            `unliked this music`,
            {}
          );
          return;
        }
      } catch (error) {
        setLike(false);
        console.log(error)
      }
      
    }
    toast.error("not autheticated")
  }
  
    const handleShowRightBar = () => {
      if (opened) {
        dispath(closeRightbar());
        return;
      }
      dispath(openRightbar());
    };
    const pathName = usePathname();

    if (pathName.includes("/dashboard")) {
      return;
    }

  return (
    <div className={cn("hidden w-full lg:h-[80px] px-2 pb-2 gap-x-2 lg:flex items-center justify-between",data ? "lg:h-[80px]":"lg:hidden")}>
      <div className="w-[27.6%] h-full">
        {music ? (
          <div className="w-full h-full p-2 flex items-center justify-between gap-x-2 ">
            <div className="w-2/12 pl-1">
              <div className="group w-14 h-14 rounded-md relative">
                <button
                  className="p-1 group-hover:opacity-100 group-hover:transition-opacity z-10 opacity-0 absolute right-1 top-1 rounded-full bg-neutral-900/90 text-neutral-50 "
                  onClick={handleShowRightBar}
                >
                  {opened ? (
                    <IoIosArrowDown size={20} />
                  ) : (
                    <IoIosArrowUp size={20} />
                  )}
                </button>
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
              <span className="text-base font-medium truncate text-white cursor-pointer hover:underline">
                {music.musicName}
              </span>
              <span className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline ">
                ava max
              </span>
            </div>
            <div className="w-2/12 flex justify-between items-center">
              <button onClick={handleLikeSong}>
                {like ? (
                  <MdOutlineFavorite
                    size={20}
                    className="text-xl text-green-600 hover:text-green-500 cursor-pointer"
                  />
                ) : (
                  <MdOutlineFavoriteBorder
                    size={20}
                    className="text-stone-400 hover:text-white"
                  />
                )}
              </button>
              <button className="text-stone-400 hover:text-white">
                <MdPictureInPicture size={20} />
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <main className="w-[72.4%] h-full p-2">{children}</main>
    </div>
  );
}

export default CurrentMusicCard