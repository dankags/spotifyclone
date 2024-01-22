"use client"
import Footer from '@/components/Footer'
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDarkVibrantColor, useVibrantColor } from '@/lib/hooks/colorHooks'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import UserDialog from './UserDialog'

const UserLayOut = ({children}) => {
    const {data}=useSession()
    const [imgNameChoosen,setImgNameChoosen]=useState({
      img:'',
      name:''
    })
    const userImgbgColor= useVibrantColor(data?.user.img,1)
    // const userBottomSectionColor=useVibrantColor(data?.user.img,0.6)
    // const choosenbottomColor=useVibrantColor(imgNameChoosen?.img,0.4)
    const choosenImgColor= useVibrantColor(imgNameChoosen?.img,1)
    
  return (
    <div className='w-full h-full rounded-md  top-0' style={{backgroundColor:`${imgNameChoosen ? choosenImgColor : userImgbgColor}`}}>
        <ScrollArea className='w-full h-full rounded-md bg-neutral-900/30'>
        <div className='sticky z-10 top-0'>
          <NavBar/>
        </div>
        <section className={` w-full flex items-end gap-3 pl-4 pb-4 relative `}>
             
            <div
              className={`pb-1 flex justify-start w-3/12    `}
                  >
              <UserDialog setImgName={setImgNameChoosen} >
              <button  className={`group relative w-full aspect-square cursor-pointer `}>       
              <Image
                src={data?.user.image?data?.user.image:imgNameChoosen.img }
                alt="likedImage"
                fill
                className="object-cover shadow-2xl shrink-0 shadow-black rounded-full"
                                />
                <div className='w-full h-full absolute top-0 left-0 rounded-full flex flex-col justify-center items-center gap-2 opacity-0 transition duration-300 text-neutral-50 group-hover:bg-neutral-900/75 group-hover:opacity-100'>
                  <MdOutlineEdit className='text-6xl'/> 
                   <span className='text-lg font-semibold '>Choose photo</span>            
                </div>                
              </button> 
                </UserDialog>                
            </div>
            <div
              className={`pb-1 mt-4 h-full w-9/12 pl-2 flex flex-col justify-end`}
            >
              <section className='flex flex-col justify-end'>
                <div className={``}>
                  <span className="font-medium text-neutral-50 drop-shadow-xl">Profile</span>
                </div>
                <div>
                  <UserDialog setImgName={setImgNameChoosen}>
                  <button
                    className={`w-[90%] cursor-pointer text-left text-8xl py-2 font-extrabold text-neutral-50  truncate capitalize drop-shadow-2xl `}
                  >
                  {data?.user.name?data?.user.name:imgNameChoosen.name }
                  </button>
                  </UserDialog>
                </div>
                <div className={`flex items-center pt-7`}>
                  <span className="mr-2 text-sm text-neutral-50 font-semibold drop-shadow-xl">
                    2 Public Playlist .
                  </span>
                  <span className="text-sm text-neutral-50 font-medium drop-shadow-xl">
                    5 Following
                  </span>
                </div>
              </section>
            </div>
              </section>
        <div className='bg-gradient-to-t from-90% from-neutral-900 to-neutral-900/20'>
        {children}
        </div>
        <Footer/>
        </ScrollArea>
    </div>
  )
}

export default UserLayOut