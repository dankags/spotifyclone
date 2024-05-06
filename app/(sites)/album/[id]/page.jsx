import { StaticCarosel } from '@/components/StaticCarosel'
import AlbumActions from '@/components/albumPageComp/AlbumActions'
import AlbumTableTitle from '@/components/albumPageComp/AlbumTableTitle'
import AlbumWrapper from '@/components/albumPageComp/AlbumWrapper'
import DurationDate from "@/components/albumPageComp/DurationDate";
import { darkVibrantColor } from "@/lib/functions/colorFunc";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import prisma from "@/utils/connect";
import { LikedList } from "@/components/musicList/LikedList";

export const revalidate = 60 
const AlbumPage = async(param) => {
  const session=await getServerSession(authOptions)
  if (!session) {
    redirect("/dashboard/login")
  }
  const album = await prisma.music.findUnique({
    where: {
        id:param.params.id
    },
    select: {
      id:true,
      musicName: true,
      artistId: true,
      musicImage: true,
      duration: true,
      otherFeaturedArtist:true,
      uploaded:true,
    }
  })
  
  const artistProfile = await prisma.user.findUnique({
    where: {
      id:album.artistId
    },
    select: {
      name: true,
      image: true,
      id:true,
    }
  })
  const bgColor = await darkVibrantColor(`${album.musicImage}`, 1)
 
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="w-[100%] h-full rounded-md ">
        <AlbumWrapper album={album} color={bgColor}>
          <div>
            <div className={`w-full flex pl-4 pb-4 pt-6  relative items-end "`}>
              <div className={`pb-1 w-3/12   `}>
                <Image
                  src={album?.musicImage}
                  alt="likedImage"
                  width={230}
                  height={220}
                  className="z-0 rounded-[4px] shadow-[0_4px_60px_0] shadow-black/50"
                />
              </div>
              <div
                className={`pb-1 w-9/12 pl-4
              }`}
              >
                <section className="pl-2">
                  <div className="">
                    <span className="font-medium text-neutral-50 ">single</span>
                  </div>
                  <div>
                    <span
                      className={`w-full capitalize text-3xl md:text-5xl font-extrabold text-neutral-50  whitespace-nowrap text-ellipsis overflow-hidden`}
                    >
                      {album.musicName}
                    </span>
                  </div>
                  <div className="pt-6 flex items-center gap-x-2">
                    <div className="flex items-center justify-between">
                      <div className="relative min-w-[30px] min-h-[30px]">
                        <Image
                          src={
                            artistProfile.image
                              ? artistProfile.image
                              : "/allan2.jpg"
                          }
                          alt=""
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <span className="pl-2 text-sm font-bold capitalize">
                        {artistProfile.name}
                      </span>
                    </div>
                    <p className="text-sm text-left text-stone-200 font-medium">
                      <span className="capitalize">. {album.musicName}</span>
                      <DurationDate album={album} />
                      <span className="capitalize"> . 57,862,629</span>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="p-3 bg-gradient-to-t from-[80%] from-neutral-900 to-neutral-900/30">
            <AlbumActions album={album}/>
            <div className="w-full flex items-center gap-x-3 py-3 pl-2 rounded-md  hover:bg-neutral-800/40 ">
              <div className="relative min-w-[75px] min-h-[75px]">
                <Image
                  src={
                    artistProfile.image ? artistProfile.image : "/allan2.jpg"
                  }
                  alt=""
                  fill
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center gap-y-1">
                <span className="text-sm font-semibold text-white capitalize">
                  artist
                </span>
                <Link
                  href={`/artist/${artistProfile.id}`}
                  className="text-base font-semibold capitalize text-white hover:underline"
                >
                  {artistProfile.name}
                </Link>
              </div>
            </div>
            <AlbumTableTitle />
            <StaticCarosel displayCol showAll>
              <LikedList music={album} mainArtist={artistProfile} index={1} />
            </StaticCarosel>
          </div>
        </AlbumWrapper>
      </div>
    </Suspense>
  );
}

export default AlbumPage