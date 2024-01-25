import React from 'react'
import UserLayOut from '../_userComp/UserLayOut'
import { BsThreeDots } from 'react-icons/bs'
import { StaticCarosel } from '@/components/StaticCarosel'
import ArtistCard from '@/components/artistCard/ArtistCard'
import { LikedList } from '@/components/likedList/LikedList'
import { Musics, artists } from '../_userComp/data'
import prisma from '@/utils/connect'


const User =async (params) => {
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
    artistId:params.params.id
  },
  select:{
    id:true,
  }
})
console.log(playlist)
  return (
    <div className='w-full h-full'>
      <UserLayOut followers={followers} followings={following} playlist={playlist}>
        <div className='p-3 flex flex-col justify-center'>
          <div className='py-3 '>
            <button  className='p-2  rounded-full text-stone-400 hover:text-white transition'>
              <BsThreeDots  size={35}/>
           </button>
          </div>
          <div>
            <StaticCarosel title={"Top artists this month"} >
              {artists.map((item,i)=>
                 < ArtistCard key={i} item={item}/>
              )}
            </StaticCarosel>
          </div>
          <div className="mt-10">
              <StaticCarosel title={"Top tracks this month"} displayCol>
                 { Musics.map((item,i)=>
                 <LikedList key={item.id} index={i+1} music={item} />
                 )  }     
                      
              </StaticCarosel>
             </div>
        </div>
      </UserLayOut>
    </div>
  )
}

export default User