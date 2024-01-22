"use client"
import { useDarkVibrantColor } from '@/lib/hooks/colorHooks'
import React from 'react'
import { MdAddAPhoto } from 'react-icons/md'

const ChangeCoverImg = ({artistImg}) => {
    const handleChangeCoverImg=()=>{

    }
  return (
    <label htmlFor="backImgFile" className='absolute bottom-6 right-6 '>
    <div className={`flex justify-center items-center p-3 rounded-full cursor-pointer  hover:shadow-xl hover:shadow-neutral-900`} style={{backgroundColor:`${useDarkVibrantColor(`${artistImg ? artistImg : "/ab6761860000101694cd60dbca59178bcdcc8edc.jpg"}`,1)}`}}><MdAddAPhoto/></div> 
    <input type="file" name="" id="backImgFile" className="hidden" onChange={handleChangeCoverImg}/>
    </label>
  )
}

export default ChangeCoverImg