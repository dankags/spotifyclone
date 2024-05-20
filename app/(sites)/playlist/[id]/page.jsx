import { NavBar } from "@/components/navigationbar/NavBar";
import React, { Suspense } from "react";
import PlaylistWrapper from "./_playlistComp/PlaylistWrapper";
import Image from "next/image";
import PlaylistAction from "./_playlistComp/PlaylistAction";
import MusicTitles from "./_playlistComp/MusicTitles";
import { StaticCarosel } from "@/components/StaticCarosel";
import { Musics } from "../../collection/tracks/_trackSubComp/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { LikedList } from "@/components/musicList/LikedList";
import prisma from "@/utils/connect";
import { LuMusic4, LuUser } from "react-icons/lu";
import  PlaylistUpdateForm  from "./_playlistComp/PlaylistUpdateForm";
import TopSection from "./_playlistComp/TopSection";
import DynamicCarosel from "./_playlistComp/DynamicCarosel";
import PlaylistSearchComp from "./_playlistComp/PlaylistSearchComp";


const PlayList = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/dashboard/login");
  }
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id:true,
      creatorId: true,
      musiclist: true,
      image: true,
      name: true,
      Desc:true,
      slug:true
    },
  });
   if (!playlist) {
     redirect("/not-found");
   }
  const creator =playlist.creatorId === session.user.id ? session.user : await prisma.user.findUnique({
    where: {
      id: playlist.creatorId,
    },
    select: {
      image: true,
      name: true,
      id: true,
    },
  });

  const musics = await prisma.music.findMany({
    where: {
      id: {
        in: playlist.musiclist,
      }
    },
      select: {
        id: true,
        musicName: true,
        artistId: true,
        musicImage: true,
        duration: true,
        otherFeaturedArtist: true,
        uploaded: true,
      },
  });


  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="w-full h-full">
        <PlaylistWrapper playlistImg={playlist.image}>
          {playlist.creatorId === session.user.id ? (
            <TopSection playlist={playlist} creator={creator} />
          ) : (
            <div>
              <div className={`w-full flex pl-4 pb-4 pt-6 relative items-end `}>
                <div
                  className={` w-3/12 aspect-square relative rounded-md flex justify-center items-center shadow-[0_4px_60px_0]  shadow-black/60`}
                >
                  <>
                    {playlist.image ? (
                      <Image
                        src={playlist.image}
                        alt={playlist.name}
                        fill
                        className="shadow-[0_4px_60px_0]  shadow-black/60 rounded-md object-cover"
                      />
                    ) : (
                      <LuMusic4 className="text-stone-400 text-5xl" />
                    )}
                  </>
                </div>
                <div
                  className={`pb-1 w-9/12 pl-4
              }`}
                >
                  <section className="">
                    <div className="mb-2">
                      <span className="font-medium text-neutral-50 drop-shadow-xl">
                        {playlist.slug}
                      </span>
                    </div>
                    
                      <div className="drop-shadow-xl">
                        <span
                          className={`w-full capitalize  text-3xl md:text-5xl font-bold text-neutral-50  whitespace-nowrap text-ellipsis overflow-hidden drop-shadow-xl`}
                        >
                          {playlist.name}
                        </span>
                        {playlist.Desc && (
                          <p className="text-start text-stone-100 text-base font-normal first-letter:capitalize">
                            {playlist.Desc}
                          </p>
                        )}
                      </div>
                    
                    <div className="pt-6 flex items-center gap-x-2">
                      <div className="flex items-center justify-between drop-shadow-xl">
                        <div className="relative rounded-full min-w-[30px] min-h-[30px]">
                          {creator.image ? (
                            <Image
                              src={creator.image}
                              alt=""
                              fill
                              className="rounded-full"
                            />
                          ) : (
                            <LuUser className="text-white" size={20} />
                          )}
                        </div>
                        <span className="pl-2 text-sm text-white font-bold capitalize">
                          {creator.name}
                        </span>
                      </div>
                      <p className="text-sm text-left text-stone-200 font-medium truncate">
                        {creator.Desc}
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
          <div className="p-3 bg-gradient-to-t from-[94%] from-neutral-900 to-neutral-900/30">
            <PlaylistAction
              musics={musics}
              playlistName={playlist.name}
              urlPlaylist={playlist}
            />
            <MusicTitles />
            {playlist.creatorId === session.user.id ? 
              <DynamicCarosel musics={musics} playlist={playlist}>
                <PlaylistSearchComp playlist={playlist}/>
             </DynamicCarosel>
          : <StaticCarosel displayCol showAll>
              {musics.map((item, i) => (
                <LikedList
                  key={item.id}
                  music={item}
                  index={i + 1}
                  urlName={playlist.name}
                  musics={musics}
                  urlPlaylist={playlist}
                />
              ))}
            </StaticCarosel>}
          </div>
        </PlaylistWrapper>
      </div>
    </Suspense>
  );
};

export default PlayList;
