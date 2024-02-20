"use client"
import Footer from '@/components/Footer'
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {  useNavBarDarkVibrant, useVibrantColor } from '@/lib/hooks/colorHooks'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import UserDialog from './UserDialog'
import { LuUser2 } from 'react-icons/lu'

const UserLayOut = ({children,followings,followers,playlist,paramsId,user,bgColor}) => {
  
    const {data}=useSession()
    const randomNumber = Math.floor(Math.random() * 633)
    const [imgNameChoosen,setImgNameChoosen]=useState({
      img:'',
      name:''
    })
    const choosenImgColor= useVibrantColor(`${imgNameChoosen.img ? imgNameChoosen.img:data?.user.image }`,1)
    const [navColor, setNavcolor] = useState(false)
    const navBgColor=useNavBarDarkVibrant(user?.image)
    const handleScroll = (e) => {
      const totalScrollHeight=e.target.scrollHeight
      const percentScrolled = (e.target.scrollTop / totalScrollHeight) * 100
      if (percentScrolled > 13) {
        setNavcolor(true)
        return
      }
      setNavcolor(false)
  };
  
  return (
    <div className='w-full h-full rounded-md  top-0' style={{backgroundColor:`${imgNameChoosen ? choosenImgColor : "rgba(127.5,127.5,127.5,1)"}`}}>
        <ScrollArea onScrollCapture={handleScroll} className='w-full h-full rounded-md bg-neutral-900/30'>
          <main className='relative'>
        <div className='sticky z-10 top-0'>
          <NavBar bgColor={navColor ? `${navBgColor}`:""}/>
        </div>
        <section className={` w-full flex items-end gap-3 pl-4 pb-4 relative `}>
             
            <div
              className={`pb-1 flex justify-start w-3/12    `}
                  >
             {paramsId === data?.user.id ?
              <UserDialog setImgName={setImgNameChoosen} >
              <button  className={`group relative w-full aspect-square cursor-pointer `}>       
            {data?.user.image ?  <Image
                src={data?.user.image?data?.user.image:imgNameChoosen.img }
                alt="userImage"
                fill
                className="object-cover shadow-2xl shrink-0 shadow-black rounded-full"
                    />
                      :
                      <LuUser2  className='m-auto text-7xl text-stone-300'/> 
                   }
                <div className='w-full h-full absolute top-0 left-0 rounded-full flex flex-col justify-center items-center gap-2 opacity-0 transition duration-300 text-neutral-50 group-hover:bg-neutral-900/75 group-hover:opacity-100'>
                  <MdOutlineEdit className='text-6xl'/> 
                   <span className='text-lg font-semibold '>Choose photo</span>            
                </div>                
              </button> 
                </UserDialog>  
                :
                <div  className={`group relative w-full aspect-square `}>       
                <Image
                  src={data?.user.image?data?.user.image:"" }
                  alt="likedImage"
                  fill
                  className="object-cover shadow-2xl shrink-0 shadow-black rounded-full"
                                  />              
                </div> 
              }   
            </div>
            <div
              className={`pb-1 mt-4 h-full w-9/12 pl-2 flex flex-col justify-end`}
            >
              <section className='flex flex-col justify-end'>
                <div className={``}>
                  <span className="font-medium text-neutral-50 drop-shadow-xl textShadow">Profile</span>
                </div>
                <div>
           { paramsId === data?.user.id ?  
              <UserDialog setImgName={setImgNameChoosen}>
                  <button
                    className={`w-[90%] cursor-pointer text-left text-8xl py-3 font-extrabold text-neutral-50  truncate capitalize `}
                  >
                  {data?.user.name?data?.user.name:imgNameChoosen.name }
                  </button>
                  </UserDialog>
                  :
                  <span
                    className={`w-[90%]  text-left text-8xl py-2 font-extrabold text-neutral-50  truncate capitalize textShadow`}
                  >
                  {data?.user.name?data?.user.name:imgNameChoosen.name }
                  </span>

                }
                </div>
                <div className={`flex items-center gap-x-2 pt-7`}>
                  <span className="mr-2 text-sm text-neutral-50 font-semibold drop-shadow-xl textShadow">
                    { playlist.length } Public Playlist  .
                  </span>
                  <span className="text-sm text-left text-neutral-50 font-medium  drop-shadow-xl textShadow ">
                  { followings.length } Following
                  </span>
                  {followers.length > 0  ? <span className="text-sm text-neutral-50 font-medium drop-shadow-xl textShadow">
                    {followers.length} Followers
                  </span>
                  :
                  <></>
                  }
                </div>
              </section>
            </div>
              </section>
        <div className='bg-gradient-to-t from-90% from-neutral-900 to-neutral-900/20'>
        {children}
        </div>
        <Footer/>
        </main>
        </ScrollArea>
    </div>
  )
}

export default UserLayOut