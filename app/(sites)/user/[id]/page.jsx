import React from 'react'
import UserLayOut from '../_userComp/UserLayOut'
import { BsThreeDots } from 'react-icons/bs'
import { StaticCarosel } from '@/components/StaticCarosel'
import ArtistCard from '@/components/artistCard/ArtistCard'
import { LikedList } from '@/components/likedList/LikedList'
import prisma from '@/utils/connect'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/utils/auth'
import { VibrantColor } from '@/lib/functions/colorFunc'



const User =async (params) => {
  const session=await getServerSession(authOptions);
  console.log(session)


  const following= await prisma.following.findMany({
    where: {
        initiateFollowId : params.params.id
    }
})
const followers=await prisma.followers.findMany({
  where: {
     followingId:params.params.id
}
})
const playlist=await prisma.playlist.findMany({
  where:{
    creatorId:params.params.id
  },
  select:{
    id:true,
  }
})

const likedList=await prisma.likedSong.findUnique({
  where:{
    userId:params.params.id
  },
  select:{
    songs:true
  }
})
  const musics = await prisma.music.findMany({
    where: {
      id: {
        in: likedList?.songs
      },
    },
    select: {
      id: true,
      musicName: true,
      musicImage: true,
      duration: true,
      
    }
})

if( session?.user.id !== params.params.id){
  redirect("/not-found")
}
  
  return (
    <div className='w-full h-full'>
      <UserLayOut followers={followers} followings={following} playlist={playlist}  paramsId={params.params.id}>
        <div className='p-3 flex flex-col justify-center'>
          <div className='py-3 '>
            <button  className='p-2  rounded-full text-stone-400 hover:text-white transition'>
              <BsThreeDots  size={35}/>
           </button>
          </div>
        {following.length > 0 ?
         <div>
          <StaticCarosel title={"Top artists this month"} >
            {following.map((item,i)=>
                < ArtistCard key={i} item={item}/>
            )}
          </StaticCarosel>
        </div>
        :
        <div className='flex items-center justify-center font-bold text-3xl text-white first-letter:capitalize'>
          Not following any artist
        </div>
        }
         {likedList?.songs.length > 0 ?
          <div className="mt-10">
              <StaticCarosel title={"Top tracks this month"} displayCol>
                 { musics.map((item,i)=>
                 <LikedList key={item} index={i+1} mainArtist={session.user} music={item} />
                 )  }     
                      
              </StaticCarosel>
             </div>
            :
            <div className='mt-4 flex items-center justify-center font-bold text-3xl text-white first-letter:capitalize'>
            No music liked
          </div>
            }
        </div>
      </UserLayOut>
    </div>
  )
}

export default User