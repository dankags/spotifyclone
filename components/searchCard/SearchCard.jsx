import Image from 'next/image'
import React, { useEffect } from 'react'
import "./SearchCard.globals.css"
import { useRouter } from 'next/navigation'

const SearchCard = ({ category, pageCurrentWidth }) => {
 

  return (
    <div className={` w-full aspect-video relative rounded-lg  overflow-hidden p-3 text-white cursor-pointer   `} style={category?{backgroundColor:`${category.backgroundColor}`}:{backgroundColor:"rgb(255,255,255,0.6)"}}>
      <span className='font-bold max-sm:text-base max-md:text-lg md:text-xl'>{ category.category}</span>   
      <div className={`  ${pageCurrentWidth <= 700 ? " -bottom-0 -right-3" : " -bottom-20 -right-28"} absolute  `}>
             <div className='relative min-h-20 min-w-20'>
              <Image src={category. backgroundImg} alt="" fill={true} className='imageRotation'/>
              </div>
      </div>
    </div>
  )
}

export default SearchCard