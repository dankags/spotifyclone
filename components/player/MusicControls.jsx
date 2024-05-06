"use client"
import { Slider } from '@/components/ui/slider'
import React, { useEffect, useState } from 'react'
import { IoIosPause, IoIosPlay, IoMdVolumeHigh } from 'react-icons/io'
import { LuShuffle, LuMonitorSpeaker } from 'react-icons/lu'
import { PiSpeakerSimpleXFill } from "react-icons/pi";
import { CgMiniPlayer } from "react-icons/cg";
import { HiOutlineQueueList } from "react-icons/hi2";
import {SlLoop} from "react-icons/sl"
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { TbMicrophone2 } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { playMusic, setMusicByPlaylist, setPlayMusicValue } from '@/lib/redux/slices/currentMusic'
import { addMusicIndex, reduceMusicIndex, setIndexBySelect } from '@/lib/redux/slices/playlistMusicIndex'
import { ToolTip } from '@/components/ToolTip'

const MusicControls = () => {
  const [audio,setAudio]=useState(null)
  const [currentTime,setCurrentTime]=useState(
    {
      min:`00`,
      sec:`00`
    }
  )
  const [durationTime,setDurationTime]=useState(
    {
      min:`00`,
      sec:`00`
    }
  )
  const pathName=usePathname()
  const { data, status } = useSession()
  const [trackAudioSrc,setTrackAudioSrc]=useState(null)
  const [musicProgress,setMusicProgress]=useState(0)
  const [defaultVol,setDefaultVol]=useState(20)
  const [play,setPlay]=useState(false)
  const [mute, setMute] = useState(false)
  const dispatch=useAppDispatch()
  const { music, playlist, playing } = useAppSelector(state => state.currentmusic)
  const { musicIndex, playlistLength } = useAppSelector(
    (state) => state.musicIndex
  );
  const [hasMusicEnded, setHasMusicEnded] = useState(false)
  
  //initialize audio
  useEffect(()=>{
      const newAudio = new Audio();
      newAudio.volume = 0.2;
      setAudio(newAudio);
  }, []);
  
 //fetch music audio
  useEffect(() => {
    const controller=new AbortController();
    const fetchMusic = async () => {
      try {
        const res = await fetch("/api/music/audio", {
          method: "POST",
          body: JSON.stringify({
            musicId:music.id
          }),
          signal:controller.signal
        })
        if (res.ok) {
          const serverResponse = await res.json()
          audio.src = `${serverResponse.audioUrl}`
          setTrackAudioSrc(`${serverResponse.audioUrl}`);
          audio.play()
          setPlay(true)
          await dispatch(setPlayMusicValue(true))
          return;
        }
        await dispatch(setPlayMusicValue(false));
        return
      } catch (error) {
        console.log(error);
        
      }
    }
    if (music) {
      const durationInMinute = Math.floor((music.duration % 3600) / 60);
      const durationInSecond = Math.floor((music.duration % 3600) % 60);

      setDurationTime({
        min:`${durationInMinute < 10 ? `0${durationInMinute}` : `${durationInMinute}`}`,
        sec:`${durationInSecond < 10 ? `0${durationInSecond}` : `${durationInSecond}`}`
      })
      setCurrentTime({ min: "00", sec: "00" })
      setMusicProgress(0);
      // setPlay(false)

      fetchMusic()
    }
    return ()=>controller.abort()
  },[music])
 
  //pause or play music whenever the redux playing state changes
  useEffect(() => {
    if (music) {
      if (playing) {
        !trackAudioSrc && audio.pause()
          audio.play()
          setPlay(true)
        return
      }
      audio.pause()
      setPlay(false)
    }
  },[playing])

  //calulate current time whenever the audio sourcechanges or is playing 
  useEffect(() => {
    const handleTimeUpdate = (e) => {
       const currentTime = e.target.currentTime;
       const musicDuration = e.target.duration;
       const currentminute = Math.floor((currentTime % 3600) / 60);
      const currentSecond = Math.floor((currentTime % 3600) % 60);
      
      setMusicProgress((100 * currentTime) / musicDuration);
       setCurrentTime((prev) => ({ ...prev,min: `${currentminute < 10 ? `0${currentminute}` : `${currentminute}`}`,}));
       setCurrentTime((prev) => ({...prev,sec: `${currentSecond < 10 ? `0${currentSecond}` : `${currentSecond}`}`,}));

      if (currentTime === parseFloat(music?.duration)) {
         audio.pause()
         setTrackAudioSrc(null)
         setHasMusicEnded(true);
         dispatch(playMusic());
         if (playlist) {
           dispatch(addMusicIndex());
         }
         setMusicProgress(0);
         setPlay(false);
       setCurrentTime({ min: "00", sec: "00",});
       }
    }
    if (audio?.src) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
        if (audio?.src || music) {
          audio.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
  }, [trackAudioSrc]);
       

  //every time the musicend this useEffect is fired
  useEffect(() => {
      const dispatchActions = () => {
        
        if (playlist) {
         
          dispatch(setMusicByPlaylist(musicIndex))
          
        }
      }
      // if music has ended it will dispatch this actions
      if (hasMusicEnded) {
        dispatchActions()
        setHasMusicEnded(false)
      }
    },[hasMusicEnded])

  //if not autheticated do not render the audio controls
  if (status === "unauthenticated" || !data) {
    return
  }

  //pause the audio if user is on this pages
  if (pathName.includes("/not-found") || pathName.includes("/dashboard")   ) {
    if(audio){
      audio.pause()
      setAudio(null)
    setPlay(prev=>!prev)}
  }

  const handleplay=()=>{
    if(audio){
      
      if (!play) {
        audio.play()
        setPlay(prev => !prev)
        dispatch(playMusic())
        return
      }
      audio.pause()
      dispatch(playMusic())
      setPlay(prev=>!prev)
    }
  }
  
  //TODO:fix the music index problem
   const handleNext=()=>{
   if (!audio || playlist === null) {
     return;
     }
     const nextIndex = (musicIndex + 1) >= playlistLength ? 0 : musicIndex + 1;
    dispatch(setMusicByPlaylist(nextIndex));
    dispatch(addMusicIndex());
  }
  const handlePrev = () => {
     
     if (!audio || playlist === null) {
       return;
     }
     if (audio.currentTime > (music?.duration * 0.1)&&music?.duration !== null) {
       audio.currentTime = 0;
        setMusicProgress(0);
        return;
    }
     const prevMusicIndex = (musicIndex - 1 + playlistLength) % playlistLength;
     dispatch(setMusicByPlaylist(prevMusicIndex));
     dispatch(reduceMusicIndex())
   };
  const handleVolume=(e)=>{
   if (!audio) {
     return;
   }
   
   
   if (e[0] === 0) {
     audio.muted = true;
     setDefaultVol(e[0]);
     setMute(true);
   } else {
     audio.muted = false;
     setMute(false);
     setDefaultVol(e[0])
     audio.volume = e[0] / 100;
   }
   
  }
  const handleMute=()=>{
    if (!audio) {
      return;
    }

    if (audio.muted && defaultVol === 0) {
      audio.volume = 0.2
      setDefaultVol(20)
    }
    audio.muted = !mute;
    setMute((prev) => !prev);
  }
  const musicInputProgresshandler = (e) => {
     if (!audio || isNaN(audio?.duration)) {
       return;
     }

     const tempSliderValue = e[0];
     setMusicProgress(tempSliderValue);
     audio.currentTime = (tempSliderValue * audio.duration) / 100;
  }
  return (
    <div className="flex items-center justify-between">
      <div className="w-8/12 flex flex-col justify-center gap-y-2">
        <div className="w-full flex items-center justify-center gap-x-3">
          <button
            disabled={music ? false : true}
            className="text-stone-400 hover:text-white disabled:cursor-not-allowed disabled:text-stone-400"
          >
            <LuShuffle size={18} />
          </button>
          <button
            onClick={handlePrev}
            disabled={playlist ? false : true}
            className="text-stone-400 hover:text-white disabled:cursor-not-allowed disabled:text-stone-400"
          >
            <MdSkipPrevious size={30} />
          </button>
          <button
            onClick={handleplay}
            disabled={music ? false : true}
            className="h-8 w-8 text-black flex justify-center items-center bg-white rounded-full disabled:cursor-not-allowed disabled:bg-neutral-700"
          >
            {play ? <IoIosPause size={25} /> : <IoIosPlay size={25} />}
          </button>
          <button
            onClick={handleNext}
            disabled={playlist ? false : true}
            className="text-stone-400 hover:text-white disabled:cursor-not-allowed disabled:text-stone-400"
          >
            <MdSkipNext size={30} />
          </button>
          <button
            disabled={music ? false : true}
            className="text-stone-400  hover:text-white disabled:cursor-not-allowed disabled:text-stone-400"
          >
            <SlLoop className="rounded-md" size={18} strokeWidth={30} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          {music ? (
            <span className="min-w-10 text-xs text-stone-400 font-normal">
              {currentTime.min}:{currentTime.sec}
            </span>
          ) : (
            <span className="min-w-10 text-xs text-stone-400 font-normal">
              -- : --
            </span>
          )}
          <div className="w-[100%]">
            <Slider
              disabled={music ? false : true}
              value={[musicProgress]}
              step={0.5}
              defaultValue={[0]}
              onValueChange={musicInputProgresshandler}
              max={100}
              className={cn(music ? "" : "cursor-not-allowed")}
            />
          </div>
          {music ? (
            <span className="min-w-10 text-xs text-stone-400 font-medium">
              {durationTime.min}:{durationTime.sec}
            </span>
          ) : (
            <span className="min-w-10 text-xs text-stone-400 font-medium">
              -- : --
            </span>
          )}
        </div>
      </div>
      <div className="w-4/12 flex items-center justify-end gap-x-3">
        <button className="text-stone-400 hover:text-white">
          <TbMicrophone2 size={20} />
        </button>
        <button className="text-stone-400 hover:text-white">
          <HiOutlineQueueList size={20} />
        </button>
        <button className="text-stone-400 hover:text-white">
          <LuMonitorSpeaker size={20} />
        </button>
        <ToolTip content={mute ? "unmute" : "mute"} side={"top"}>
          <button
            onClick={handleMute}
            className="text-stone-400 hover:text-white"
          >
            {mute ? (
              <PiSpeakerSimpleXFill size={20} />
            ) : (
              <IoMdVolumeHigh size={20} />
            )}{" "}
          </button>
        </ToolTip>
        <div className="w-[34%]">
          <Slider
            defaultValue={[defaultVol]}
            value={[defaultVol]}
            max={100}
            onValueChange={handleVolume}
          />
        </div>
        <button className="text-stone-400 hover:text-white">
          <CgMiniPlayer size={20} />
        </button>
      </div>
    </div>
  );
}

export default MusicControls