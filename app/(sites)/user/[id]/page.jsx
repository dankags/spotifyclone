import React from 'react'
import UserLayOut from '../_userComp/UserLayOut'
import { BsThreeDots } from 'react-icons/bs'
import { StaticCarosel } from '@/components/StaticCarosel'
import ArtistCard from '@/components/artistCard/ArtistCard'
import { LikedList } from '@/components/likedList/LikedList'
import { Musics, artists } from '../_userComp/data'


const User = () => {
  return (
    <div className='w-full h-full'>
      <UserLayOut>
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