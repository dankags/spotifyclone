import Footer from '@/components/Footer'
import PlayFollowBtnContainer from '@/components/PlayFollowBtnCont'
import { StaticCarosel } from '@/components/StaticCarosel'
import React from 'react'
import { MdOutlineAccessTime } from 'react-icons/md'
import { Musics } from './_trackSubComp/data'
import { LikedList } from '@/components/likedList/LikedList'

const Tracks = () => {
  return (
    <>
      <div className='relative'>
        <PlayFollowBtnContainer/>
      </div>
      <div>
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
        <StaticCarosel displayCol showAll>
          {Musics.map((item,i)=>
           <LikedList key={item.id} music={item} index={i+1} />
          )}
        </StaticCarosel>
        
      </div>
      
      <Footer/>
    </>
  )
}

export default Tracks