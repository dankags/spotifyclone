import { NavBar } from '@/components/navBar/NavBar'
import React, { Suspense } from 'react'
import PlaylistWrapper from './_playlistComp/PlaylistWrapper'
import Image from 'next/image'
import PlaylistAction from './_playlistComp/PlaylistAction'
import MusicTitles from './_playlistComp/MusicTitles'
import { StaticCarosel } from '@/components/StaticCarosel'
import { Musics } from '../../collection/tracks/_trackSubComp/data'
import { LikedList } from '@/components/likedList/LikedList'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'
import { redirect } from 'next/navigation'
import LoadingSkeleton from '@/components/LoadingSkeleton'

const PlayList = async({params}) => {
   const session=await getServerSession(authOptions)
  if (!session) {
    redirect("/dashboard/login")
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="w-full h-full">
        <PlaylistWrapper>
          <div>
            <div className={`w-full flex pl-4 pb-4 pt-6  relative items-end "`}>
              <div className={`pb-1 w-3/12   `}>
                <Image
                  src={"/playlist.jpg"}
                  alt="likedImage"
                  width={230}
                  height={220}
                  className="shadow-2xl sha shadow-black rounded-md object-cover"
                />
              </div>
              <div
                className={`pb-1 w-9/12 pl-4
              }`}
              >
                <section className="">
                  <div className="mb-2">
                    <span className="font-medium text-neutral-50 ">
                      playlist
                    </span>
                  </div>
                  <div>
                    <span
                      className={`w-full capitalize  text-7xl font-extrabold text-neutral-50  whitespace-nowrap text-ellipsis overflow-hidden`}
                    >
                      unity
                    </span>
                  </div>
                  <div className="pt-6 flex items-center gap-x-2">
                    <div className="flex items-center justify-between">
                      <div className="relative min-w-[30px] min-h-[30px]">
                        <Image
                          src="/allan2.jpg"
                          alt=""
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <span className="pl-2 text-sm font-bold capitalize">
                        ava max
                      </span>
                    </div>
                    <p className="text-sm text-left text-stone-200 font-medium truncate">
                      <span className="capitalize">. weapons</span>
                      <span className="capitalize"> . 2022</span>
                      <span className="capitalize"> . 2:31</span>
                      <span className="capitalize"> . 57,862,629</span>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="p-3 bg-gradient-to-t from-[94%] from-neutral-900 to-neutral-900/30">
            <PlaylistAction />
            <MusicTitles />
            <StaticCarosel displayCol showAll>
              {Musics.map((item, i) => (
                <LikedList key={item.id} music={item} index={i + 1} />
              ))}
            </StaticCarosel>
          </div>
        </PlaylistWrapper>
      </div>
    </Suspense>
  );
}

export default PlayList