"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { filterLikedMusics, pushToLikedMusics } from '@/lib/redux/slices/likedSongs'
import { closeRightbar, openRightbar } from '@/lib/redux/slices/rightbar'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdPictureInPicture } from 'react-icons/md'
import { toast } from 'sonner'

const CurrentMusicCard = ({ children }) => {
  
  const { data } = useSession();
  const dispatch=useAppDispatch()
  const { opened } = useAppSelector((state) => state.rightbar);
  const {likedMusics}=useAppSelector((state)=>state.likedMusics)
  const { music } = useAppSelector((state) => state.currentmusic);
  const [like, setLike] = useState(false);
  const [mainArtist,setMainArtist]=useState(null)
  const [artists,setArtists]=useState(null)
  const dispath = useAppDispatch();

  //checks if the music playing is contained in the liked musics
  useEffect(() => {
    if (likedMusics) {
      setLike(likedMusics?.includes(music?.id));
    }
  }, [likedMusics, music]);

//fetch main artist and featured artists if currentmusic doesnot have
  useEffect(() => {
    const controller=new AbortController()
    const fetchArtists = async () => {
      try {
        const artist = await fetch(`/api/artist/profile/${music.artistId}`, { method: "GET",signal:controller.signal })
        if (artist.ok) {
          const mainArtists = await artist.json()
          setMainArtist(mainArtists)
          const featuredArtist = await fetch("/api/artist/profile", {
              method: "POST",
              body: JSON.stringify(music.otherFeaturedArtist),
              signal: controller?.signal,
          });
          if (featuredArtist.ok) {
            const artists=await featuredArtist.json()
            setArtists(artists)
            return
          }
          
        }
      } catch (error) {
       console.log(error) 
      }
    }
    if (music) {
      !music.artists && fetchArtists()
    }
    return ()=>controller.abort()
 },[music])

  //handle liking a song
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
          dispatch(pushToLikedMusics(music.id))
          toast("added to liked songs", {});
          return;
        }
        if (response === 'unliked the song') {
          setLike(false);
         dispatch(filterLikedMusics(music.id))
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
  
  //handle showing righBar
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
              {/* display musicname and link */}
              <Link key={music.id} href={`/album/${music.id}`} className="text-base font-medium truncate text-white cursor-pointer hover:underline">
                {music.musicName}
              </Link>


              {/* display artists names and links*/}
              <div className='flex items-center'>
                {music.artists ? 
                  <>
                     <Link key={music.artists[0]?.id} href={`/artist/${music.artists[0]?.id}`} className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline ">
            {music.artists[0]?.name}
              </Link>
              
                    {music.artists?.slice(1).map((artist) => {
                    return (
                        
                        <Link key={artist.id} href={`/artist/${artist.id}`} className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline ">
                        {`, ${artist.name}`}
                        </Link>
                        
                      ) 
                    }) }
                  </>
              :  
                  <>
                    <Link key={mainArtist?.id} href={`/artist/${mainArtist?.id}`} className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline ">
            {mainArtist?.name}
              </Link>
              
            {artists?.map((artist)=>
            <Link key={artist.id} href={`/artist/${artist.id}`} className="text-xs font-medium truncate text-stone-400 cursor-pointer hover:text-white hover:underline ">
            {`, ${artist.name}`}
          </Link>
            ) }
                  </>
              }
              
            </div>
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