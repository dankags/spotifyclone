import Image from 'next/image'
import React, { useEffect } from 'react'
import "./SearchCard.globals.css"


const SearchCard = ({ category, pageCurrentWidth }) => {
 

  return (
    <div className={` w-full h-24 md:aspect-video relative rounded-md lg:rounded-lg overflow-hidden  p-3 text-white cursor-pointer   `} style={category?{backgroundColor:`${category.backgroundColor}`}:{backgroundColor:"rgb(255,255,255,0.6)"}}>
      <span className='font-bold max-sm:text-base max-md:text-lg md:text-xl'>{ category.category}</span>   
      <div className={`  bottom-0 -right-4  absolute  `}>
             <div className='relative w-14 h-14 md:w-16 md:h-16 xl:h-20 xl:w-20'>
              <Image src={category. backgroundImg} alt="" fill={true} className='imageRotation'/>
              </div>
      </div>
    </div>
  )
}

export default SearchCard