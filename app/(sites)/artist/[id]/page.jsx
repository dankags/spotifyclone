import Image from 'next/image'
import React, { Suspense } from 'react'
import ArtistLayout from './_artistpageComp/ArtistLayout'
import ArtistBottom from './_artistpageComp/ArtistBottom'
import Footer from "@/components/Footer";
import { StaticCarosel } from "@/components/StaticCarosel";
import ArtistAbout from "./_artistpageComp/ArtistAbout";
import ArtistPick from "./_artistpageComp/ArtistPick";
import ChangeCoverImgBtn from "./_artistpageComp/ChangeCoverImgBtn";
import prisma from "@/utils/connect";
import ArtistBackImg from "./_artistpageComp/ArtistBackImg";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { MutedColor, darkVibrantColor } from "@/lib/functions/colorFunc";
import { redirect } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { LikedList } from "@/components/musicList/LikedList";

const fetchArtist = async (id) => {
  let artist = null;
 try {
  artist = await prisma.artist.findUnique({
    where: {
      userId: id,
    },
  });
   if(artist){return artist}
 } catch (error) {
  console.log(error);
 }
  
}
const fetchMainArtist = async (artistsInfo) => {
 
   try {
     const artist =await prisma.user.findUnique({
       where: {
         id: artistsInfo.userId,
       },
       select: {
         name: true,
         id: true,
         image: true,
         artist: {
           select: {
             slug: true,
           },
         },
       },
     });
     return artist
     
   } catch (error) {
     return error
   }
 
}
const fetchMusics = async (artistId) => {
 
    try {
      
      const musics =await prisma.music.findMany({
        where: {
          OR: [
            {
              artistId: artistId,
            },
            {
              otherFeaturedArtist: {
                has: artistId,
              },
            },
          ],
        },
        select: {
          id: true,
          artistId: true,
          musicName: true,
          duration: true,
          musicImage: true,
          otherFeaturedArtist: true,
        },
      });
      
      return musics
    } catch (error) {
      return error
    }

}


const ArtistPage = async (params) => {
  const session = await getServerSession(authOptions);
  let bgColor = null
  
  if (!session) {
    redirect("/dashboard/login")
  }

//fetching artist and computing the image darkVibrant color
const artist = await fetchArtist(params.params.id);
const mainArtist = await fetchMainArtist(artist)
const musics = await fetchMusics(params.params.id);
bgColor = await darkVibrantColor(
  artist?.backImg ? artist?.backImg : "public/pexels-ahmed-adly-1270184.jpg",
  0.9
);
  
  
  
  
  const followings = await prisma.follow.findMany({
    where: {
      followerId: session?.user.id
    },
    select: {
      followingId:true
    }
  })
 
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="relative w-full h-full overflow-hidden rounded-md">
        <div className="absolute left-0 w-full h-[95%]  rounded-md overflow-hidden ">
          {artist?.backImg&&
          <ArtistBackImg artistBackImg={artist?.backImg} />}
        </div>
        <ArtistLayout imageUrl={artist?.backImg}>
          <div className={`h-64 flex flex-col justify-end md:justify-center relative pl-4 `}>
            <ChangeCoverImgBtn
              artistImg={
                artist
                  ? artist.backImg
                  : "/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"
              }
              isArtist={session?.user.id === artist?.userId}
              artistId={artist?.id}
            />

            <div className="h-[10%] lg:h-[15%] flex items-center gap-2">
              {artist?.verified ? (
                <>
                  <div className="h-5 w-5 md:h-7 md:w-7 relative flex items-center">
                    <Image
                      src={"/verified.png"}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="flex items-center font-medium text-sm text-white">
                    Verified Artist
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="h-fit flex flex-col justify-center">
              <span
                className={`py-2 text-4xl md:text-5xl text-white font-bold truncate capitalize cursor-default`}
              >
                { mainArtist?.name??"hello" }
              </span>
            </div>
            <div className="h-[15%] flex flex-col justify-center">
              <p className="text-base font-medium text-white">
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
              <span className="mb-3 pl-3 text-xl font-semibold text-white">Popular</span>
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
              <span className="text-xl text-white font-semibold">Artist Pick</span>
              <ArtistPick mainArtist={mainArtist} artistMusicPic={musics[0]} />

              <div className=" flex flex-col py-4 gap-2">
                <span className="text-xl text-white font-bold">About</span>
                <ArtistAbout />
              </div>
            </div>
          </ArtistBottom>
          <Footer />
        </ArtistLayout>
      </div>
    </Suspense>
  );
}

export default ArtistPage 