import Image from 'next/image'
import React from 'react'
import ArtistLayout from './_artistpageComp/ArtistLayout'
import ArtistBottom from './_artistpageComp/ArtistBottom'
import Footer from '@/components/Footer'
import { LikedList } from '@/components/likedList/LikedList'
import { StaticCarosel } from '@/components/StaticCarosel'
import ArtistAbout from './_artistpageComp/ArtistAbout'
import ArtistPick from './_artistpageComp/ArtistPick'
import ChangeCoverImg from './_artistpageComp/ChangeCoverImg'
import prisma from '@/utils/connect'
import ArtistBackImg from './_artistpageComp/ArtistBackImg'
import { authOptions } from '@/utils/auth'
import { getServerSession } from 'next-auth'
import { darkVibrantColor } from '@/lib/functions/colorFunc'
import { redirect } from 'next/navigation'

const ArtistPage = async (params) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login")
  }
  const artist = await prisma.artist.findUnique({
    where: {
      userId: params.params.id,
    },
  });
  
  const bgColor = await darkVibrantColor(`${artist.backImg ? artist.backImg : "public/pexels-ahmed-adly-1270184.jpg"}`, 0.9);
  
  const musics = await prisma.music.findMany({
      where: {
        OR: [
          {
            artistId: params.params.id,
          },
          {
            otherFeaturedArtist: {
              has: params.params.id,
            },
          },
        ],
      },
    select: {
      id: true,
      artistId:true,
      musicName:true,
      duration:true,
      musicImage:true,
      otherFeaturedArtist:true,
    },
  });
  const mainArtist=await prisma.user.findUnique({
    where:{
      id:artist.userId
    },
    select:{
      name:true,
      id: true,
      image: true,
      artist: {
        select: {
         slug:true   
        }
    },
    }
  })
 
  const followings = await prisma.follow.findMany({
    where: {
      followerId: session?.user.id
    },
    select: {
      followingId:true
    }
  })
 
  return (
    <div className="relative w-full h-full overflow-hidden rounded-md">
      <div className="absolute left-0 w-full h-[95%]  rounded-md overflow-hidden ">
        <ArtistBackImg artistBackImg={artist.backImg} />
      </div>
      <ArtistLayout imageUrl={artist.backImg}>
        <div className={`h-64 flex flex-col justify-center relative pl-4 `}>
          <ChangeCoverImg
            artistImg={artist.backImg ? artist.backImg:"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"}
            isArtist={session?.user.id === artist.userId}
            artistId={artist?.id}
            />

          <div className="h-[15%] flex items-end gap-2">
            {artist.verified ?
              <>
                <div className='h-7 w-7 relative flex items-center'>
                  <Image src={"/verified.png"} alt="" fill className='object-cover'/> 
                </div>                  
                <span className="flex items-center font-medium text-sm">
                  Verified Artist
                </span>
              </>
              :
              ""
            }
          </div>
          <div className="h-[70%] flex flex-col justify-center">
            <span
              className={`py-2 sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold truncate capitalize cursor-default`}
            >
              {mainArtist?.name ? mainArtist.name : "ava max"}
            </span>
          </div>
          <div className="h-[15%] flex flex-col justify-center">
            <p className="text-base font-medium">
              31,976,259 <span className="text-sm">monthly listeners </span>
            </p>
          </div>
        </div>
        <ArtistBottom
          key={params.params.id}
          // artistImg={"/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"}
          bgColor={bgColor}
          mainArtist={mainArtist}
          followings={followings}
          artistId={artist?.userId}
          artist={artist}
          musics={musics}
          userId={session?.user.id}
        >
          <div className=" pt-3">
            <span className="mb-3 pl-3 text-xl font-semibold">Popular</span>
            <div className="w-full pt-2">
              <StaticCarosel displayCol>
                {musics?.map((song, i) => (
                  <LikedList
                    key={song.id}
                    index={i + 1}
                    music={song}
                    musics={musics}
                  />
                ))}
              </StaticCarosel>
            </div>
          </div>
          <div className=" flex flex-col p-4 gap-2">
            <span className="text-xl font-semibold">Artist Pick</span>
            <ArtistPick />

            <div className=" flex flex-col py-4 gap-2">
              <span className="text-xl font-bold">About</span>
              <ArtistAbout />
            </div>
          </div>
        </ArtistBottom>
        <Footer />
      </ArtistLayout>
    </div>
  );
}

export default ArtistPage 