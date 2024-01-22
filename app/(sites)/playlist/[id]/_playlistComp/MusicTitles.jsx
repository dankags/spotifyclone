"use client"
import React from 'react'
import { MdOutlineAccessTime } from 'react-icons/md'

const MusicTitles = () => {
  return (
    <div className="w-full py-3 flex text-stone-400">
        <div className="w-1/12 flex justify-center  ">
                  <span className='w-5 text-sm font-medium' >#</span>
                  </div>
                  <span className="w-5/12 pl-4 flex items-center text-sm font-medium  ">
                    Title
                  </span>
                  <span className="w-3/12 flex items-center justify-start text-sm font-medium  ">
                    Album
                  </span>
                  <span className="w-3/12 flex items-center justify-center">
                    <MdOutlineAccessTime size={20} className="  text-xl font-medium" />
                  </span>
      </div>
  )
}

export default MusicTitles