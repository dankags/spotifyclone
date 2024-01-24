import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-y-3'>
      <div className="flex items-center gap-x-2 mb-4">
        <div className='w-10 h-10 relative'>
          <Image src={"/1cfa810c59bd2aa3ce06d4e7ccc3a7e8.jpg"} alt="" fill />
        </div>
        <div className='text-white text--base font-semibold'>Spotify</div>
      </div>
      <div className='text-xl text-white font-semibold mb-3'>
        404 | not-found
      </div> 
      <div>
        <Link href={"/"} className="px-3 py-2 rounded-3xl text-base font-semibold text-neutral-900 bg-green-500 transition no-underline ring-0 hover:scale-105  hover:ring-4 hover:ring-neutral-50 ">Go home</Link>
      </div>
      </div>
  )
}

export default NotFound