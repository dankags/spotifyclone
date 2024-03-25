"use client"
import { useDarkVibrantColor } from '@/lib/hooks/colorHooks'
import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import DropDown from './DropDown'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { darkVibrantColor } from '@/lib/functions/colorFunc'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { playMusic,  setMusicByPlaylist,  setPlaylist } from '@/lib/redux/slices/currentMusic'
import { setPlaylistLength } from '@/lib/redux/slices/playlistMusicIndex'
import { filterLibrary, pushToLibrary } from '@/lib/redux/slices/library'
import { usePathname } from 'next/navigation'

const ArtistBottom = ({children,mainArtist,artist,bgColor,followings,artistId,musics,userId}) => {
  
  const { data } = useSession()
  const pathName = usePathname()
  const [prevPathName,setPrevPathName]=useState(null)
  const dispatch = useAppDispatch()
  const {music,playing,playlist}=useAppSelector((state)=>state.currentmusic)
  const [followState, setFollowState] = useState(false);
  const [play,setPlay]=useState(false)
  const [currentFileColor,setCurrentFileColor] = useState(null);
  const [following,setFollowing]=useState(null)
  const { imgurl } = useAppSelector((state) => state.artistBackCover)
  const { musicIndex } = useAppSelector((state) => state.musicIndex);
  
  //sets the following button state if is following or not
  useEffect(() => {
    if (artist) {
      setFollowing(followings)
     followings.some((item)=>item.followingId === artist.userId)? setFollowState(true) : setFollowState(false)
   }
  }, [])
  
  //when the pathname changes the play button is set to default
  useEffect(() => {
    setPlay(false)
  },[pathName])

 //change the top color of the component gradient whenever the imageurl changes
  useEffect(() => {
    const getBgColor = async () => {
      setCurrentFileColor(await darkVibrantColor(`${imgurl}`,0.9)) 
    }
    getBgColor();
  
  }, [imgurl]);

  //checks if the current playing music exists in musics playlist
  //and playing state is true so as to set the icon
  useEffect(() => {
    if (music) {
      if (musics) {
        musics.includes(music) ? setPlay(true) : setPlay(false)
      }
    }
    
    }, [music,musics]);

  useEffect(() => {
    if (music) {
      playing ? setPlay(true) : setPlay(false)
    }
  }, [playing])
  
  useEffect(() => {
    if (playlist) {
      dispatch(setPlaylistLength(playlist.length))
    }
  },[playlist])

  const handleFollow = async() => {
    if (!followState) {
        //handle following
        try {
          const res = await fetch(`/api/user/follow/?followId=${data?.user.id}`, {
            method: "POST",
            body: JSON.stringify({
              id : artistId
            })
          })
          if (res.ok) {
            const resMessage = await res.json()
            dispatch(pushToLibrary(mainArtist))
            setFollowState(true)
            setFollowing(prev=>[...prev,artistId])
            toast.success(`${resMessage}`)
          }
        } catch (error) {
          setFollowState(false)
          toast.error(`${error}`)
        }
        return
    }
    //handle unfollow
    try {
      const res = await fetch(`/api/user/unfollow/?unfollowId=${artistId}`, {
        method: "DELETE",
        body: JSON.stringify({
          id : data?.user.id,
        })
      })
      if (res.ok) {
        const resMessage = await res.json()
        dispatch(filterLibrary(mainArtist))
        setFollowState(prev => !prev)
        setFollowing(followings.filter((item)=>item !== artistId))
        toast.success(`${resMessage}`)
      }
    } catch (error) {
      setFollowState(true)
      console.log(error)
      toast.error(`${error}`)
    }
  }

  //dispatches the musics playlist and sets the current music to the fist one in the list
  const handlePlay = () => {
    if (!data) { return }
      if (!play) {
        if (playlist === null) {
          dispatch(setPlaylist(musics))
          dispatch(setPlaylistLength(musics.length));
        }
        pathName !== prevPathName && dispatch(setPlaylist(musics));
        !music && dispatch(setMusicByPlaylist(musicIndex))  
        dispatch(playMusic())
        setPlay(true)
        setPrevPathName(pathName)
        return
      }
      dispatch(playMusic())
      setPlay(false)
    
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top,#171717  88%,${
          currentFileColor
            ? `${currentFileColor}`
            : bgColor
        } 100%)`,
      }}
    >
      <div className="w-full px-4 py-3 relative flex items-center gap-5 ">
        <button
          onClick={handlePlay}
          className="w-14 h-14 flex items-center sticky top-16 justify-center rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"
          role="play button"
        >
          {play ? <IoIosPause className="text-neutral-900 text-4xl"/>:<IoIosPlay className="text-neutral-900 text-4xl" />}
        </button>
        {artist?.userId !== data?.user.id && (
          <button
            onClick={handleFollow}
            className="py-1 px-6 text-center text-white text-base font-bold rounded-3xl ring-1 ring-stone-500 transition ease-in-out hover:ring-white hover:ring-1 hover:text-base hover:font-bold hover:scale-105 "
          >
            {followState ? <span>following</span> : <span>follow</span>}
          </button>
        )}
        <DropDown>
          <button className="p-2  rounded-full text-stone-400 hover:text-white no-underline border-none outline-none transition">
            <BsThreeDots size={29} />
          </button>
        </DropDown>
      </div>
      {children}
    </div>
  );
}

export default ArtistBottom