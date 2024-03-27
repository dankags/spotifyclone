import Footer from '@/components/Footer'
import PlayFollowBtnContainer from '@/components/PlayFollowBtnCont'
import { StaticCarosel } from '@/components/StaticCarosel'
import React from 'react'
import { MdOutlineAccessTime } from 'react-icons/md'
import { LikedList } from '@/components/likedList/LikedList'
import prisma from '@/utils/connect'
import { authOptions } from '@/utils/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Tracks = async () => {
  const session =await getServerSession(authOptions)
  const likedList = await prisma.likedSong.findUnique({
    where: {
      userId:session.user.id
    },
    select: {
      coverImageUrl: true,
      songs:true

    }
  })
  const musics = await prisma.music.findMany({
    where:{
    id: {
        in:likedList.songs
      }
    },
    select: {
      id: true,
      musicName: true,
      artistId: true,
      otherFeaturedArtist: true,
      musicImage: true,
      duration: true,
    }
  })
  if(!session){
    redirect("/dashboard/login")
  }
  return (
    <>
      <div className='relative'>
        <PlayFollowBtnContainer musics={musics}/>
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
          {musics.map((item,i)=>
           <LikedList key={item.id} music={item} index={i+1}  musics={musics}/>
          )}
        </StaticCarosel>
        
      </div>
      
      <Footer/>
    </>
  )
}

export default Tracks