import { Slider } from '@/components/ui/slider'
import React from 'react'
import { IoIosPlay } from 'react-icons/io'
import { LuShuffle, LuMonitorSpeaker } from 'react-icons/lu'
import { PiSpeakerSimpleXFill } from "react-icons/pi";
import { CgMiniPlayer } from "react-icons/cg";
import { HiOutlineQueueList } from "react-icons/hi2";
import {SlLoop} from "react-icons/sl"
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { TbMicrophone2 } from "react-icons/tb";

const MusicControls = () => {
  return (
    <div className='flex items-center justify-between'>
        <div className='w-8/12 flex flex-col justify-center gap-y-2'>
            <div className='w-full flex items-center justify-center gap-x-3'>
                <button className='text-stone-400 hover:text-white'><LuShuffle size={18}/></button>
                <button className='text-stone-400 hover:text-white'><MdSkipPrevious size={30}/></button>
                <button className='h-9 w-9 pl-0.5 text-black flex justify-center items-center bg-white rounded-full'><IoIosPlay size={25}/></button>
                <button className='text-stone-400 hover:text-white'><MdSkipNext size={30}/></button>
                <button className='text-stone-400 hover:text-white'><SlLoop className='rounded-md' size={18} strokeWidth={30}/></button>
            </div>
            <div className='flex items-center justify-center gap-x-2'>
                <span className='text-xs text-stone-400 font-medium'>00:00</span>
                <div className='w-[80%]'><Slider/></div>
                <span className='text-xs text-right text-stone-400 font-medium'>03:45</span>
            </div>
        </div>
        <div className='w-4/12 flex items-center justify-end gap-x-3'>
          <button className='text-stone-400 hover:text-white'><TbMicrophone2 size={20}/></button>
          <button className='text-stone-400 hover:text-white'><HiOutlineQueueList size={20}/></button>
          <button className='text-stone-400 hover:text-white'><LuMonitorSpeaker size={20}/></button>
          <button className='text-stone-400 hover:text-white'><PiSpeakerSimpleXFill size={20}/> </button>
          <div className='w-[34%]'><Slider/></div>
          <button className='text-stone-400 hover:text-white'><CgMiniPlayer size={20}/></button>
        </div>
    </div>
  )
}

export default MusicControls