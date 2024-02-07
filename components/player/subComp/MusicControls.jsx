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
import { useAppSelector } from '@/lib/hooks/reduxHooks'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

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
  const {data}=useSession()
  const [musicProgress,setMusicProgress]=useState(0)
  const [defaultVol,setDefaultVol]=useState(40)
  const [play,setPlay]=useState(false)
  const [mute,setmute]=useState(false)
  const {music, playlist}=useAppSelector(state=>state.currentmusic)


  useEffect(()=>{
    setAudio(new Audio());
    if (audio) {
       audio.volume=0.40
    }
  }, []);
  

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const res = await fetch("/api/music/audio", {
          method: "POST",
          body: JSON.stringify({
            musicId:music.id
          })
        })
        if (res.ok) {
          const serverResponse = await res.json()
          console.log(serverResponse.audioUrl)
          audio.src = `${serverResponse.audioUrl}`
          audio.play()
          setPlay(true)
        }
        
      } catch (error) {
        toast.error(`${error}`)
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
    // music&&fetchMusic()
  },[music])
 
  

    useEffect(() => {
    audio?.addEventListener("timeupdate", (e) => {
      const currentTime = e.target.currentTime;
      const musicDuration = e.target.duration;
      // const durationInMinute = Math.floor((musicDuration % 3600) / 60);
      // const durationInSecond = Math.floor((musicDuration % 3600) % 60);
      const currentminute = Math.floor((currentTime % 3600) / 60);
      const currentSecond = Math.floor((currentTime % 3600) % 60);
      
      // setDurationTime({
      //   min:`${durationInMinute < 10 ? `0${durationInMinute}` : `${durationInMinute}`}`,
      //   sec:`${durationInSecond < 10 ? `0${durationInSecond}` : `${durationInSecond}`}`
      // })
      setMusicProgress((100 * currentTime) / musicDuration);
      // musicSlider.current.style.background = `linear-gradient(to right, ${(100 * currentTime) / musicDuration} ${(100 * currentTime) / musicDuration}%,#3a3a3a ${(100 * currentTime) / musicDuration}%)`;
      setCurrentTime(prev=>({...prev,min:`${currentminute < 10 ? `0${currentminute}` : `${currentminute}`}`}) );
      setCurrentTime(prev=>({...prev,sec:`${currentSecond < 10 ? `0${currentSecond}` : `${currentSecond}`}`}));
      if (currentTime === musicDuration) {
        setMusicProgress(0);
        setPlay(false)
        setCurrentTime(prev=>({...prev,min:`${ currentminute < 10 ? `00` : `00`}`}));
        setCurrentTime(prev=>({...prev,sec:`${currentSecond < 10 ? `00` : `00`}`}) );
      }
    });
  }, [audio?.src]);

  if (!data) {
    return
  }
  if (pathName.includes("/not-found") || pathName.includes("/dashboard")   ) {
    if(audio){
      audio.pause()
    setPlay(prev=>!prev)}
  }

  const handleplay=()=>{
    if(audio){
      
      if (!play) {
        audio.play()
        setPlay(prev=>!prev)
        return
      }
      audio.pause()
      setPlay(prev=>!prev)
    }
  }
  const handleVolume=(e)=>{
    if (audio) {
      if (e == 0) {
       setmute(true)
       audio.volume=0
       return
      }
      setmute(false)
      audio.volume=e/100
   }
  }
  const handleMute=()=>{
    if(audio){
      if (!mute) {
        audio.muted=true;
        setmute(prev=>!prev)
        return
      }
      setmute(prev=>!prev)
      audio.muted=false
    }
  }
  const musicInputProgresshandler=(e)=>{
    const songDuration = audio?.duration;
    const tempSliderValue = (e / 100) * 100;
    setMusicProgress(tempSliderValue);
    audio.currentTime = (tempSliderValue * songDuration) / 100;
  }
  return (
    <div className='flex items-center justify-between'>
        <div className='w-8/12 flex flex-col justify-center gap-y-2'>
            <div className='w-full flex items-center justify-center gap-x-3'>
                <button disabled={music ? false : true} className='text-stone-400 hover:text-white disabled:cursor-not-allowed disabled:text-stone-400'><LuShuffle size={18}/></button>
                <button disabled={music ? false : true} className='text-stone-400 hover:text-white disabled:cursor-not-allowed disabled:text-stone-400'><MdSkipPrevious size={30}/></button>
                <button onClick={handleplay} disabled={music ? false : true} className='h-9 w-9 text-black flex justify-center items-center bg-white rounded-full disabled:cursor-not-allowed disabled:bg-neutral-700'>{play ? <IoIosPause size={25}/> : <IoIosPlay size={25}/>}</button>
                <button disabled={music ? false : true} className='text-stone-400 hover:text-white disabled:cursor-not-allowed disabled:text-stone-400'><MdSkipNext size={30}/></button>
                <button disabled={music ? false : true} className='text-stone-400  hover:text-white disabled:cursor-not-allowed disabled:text-stone-400'><SlLoop className='rounded-md' size={18} strokeWidth={30}/></button>
            </div>
            <div className='flex items-center justify-center gap-x-2'>
                {music ? 
                <span className='text-xs text-stone-400 font-medium'>{currentTime.min}:{currentTime.sec}</span> 
                :
                 <span className='text-xs text-stone-400 font-medium'>-- : --</span> 
                 }
                <div className='w-[80%]'>
                  <Slider disabled={music ? false : true} value={[musicProgress]} step={0.5} defaultValue={[0]} onValueChange={musicInputProgresshandler} max={100} className={cn(music ? "" : "cursor-not-allowed")}/>
                  </div>
                {music ? 
                <span className='text-xs text-stone-400 font-medium'>{durationTime.min}:{durationTime.sec}</span> 
                :
                 <span className='text-xs text-stone-400 font-medium'>-- : --</span> 
                 }
            </div>
        </div>
        <div className='w-4/12 flex items-center justify-end gap-x-3'>
          <button className='text-stone-400 hover:text-white'><TbMicrophone2 size={20}/></button>
          <button className='text-stone-400 hover:text-white'><HiOutlineQueueList size={20}/></button>
          <button className='text-stone-400 hover:text-white'><LuMonitorSpeaker size={20}/></button>
          <button onClick={handleMute} className='text-stone-400 hover:text-white'>{mute ? <PiSpeakerSimpleXFill size={20}/> : <IoMdVolumeHigh size={20}/>} </button>
          <div className='w-[34%]'><Slider defaultValue={[defaultVol]} max={100} onValueChange={handleVolume}/></div>
          <button className='text-stone-400 hover:text-white'><CgMiniPlayer size={20}/></button>
        </div>
    </div>
  )
}

export default MusicControls