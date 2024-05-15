import prisma from "@/utils/connect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    const body = await req.json();
    
    try {
      if(!body){return NextResponse.json("no input provided",{status:400})}
        if (body?.searchQuery.includes("by") || body?.searchQuery.includes(" ")) {
          const splitedSearch = body.searchQuery.split(" ");
          const musicname = splitedSearch[0] ?? body.searchQuery.split("by")[0];
         const artist = body.searchQuery.split("by")[1] ?? splitedSearch.slice(1).join(" ");
          
        const searchedMusic = await prisma.music.findUnique({
          where: {
            musicName: musicname,
          },
          select: {
            musicImage: true,
            artistId: true,
            otherFeaturedArtist: true,
            musicName: true,
          },
        });
        const saerchedPlaylist = await prisma.playlist.findUnique({
          where: {
            name: musicname,
          },
          select: {
            id: true,
            name: true,
            image: true,
            creatorId: true,
          },
        });
        const artistId = await prisma.user.findMany({
          where: {
            name: artist,
          },
          select: {
            id: true,
            name: true,
          },
        });
          
            if (searchedMusic && artistId.length !== 0) {
             if (searchedMusic?.otherFeaturedArtist.includes(artistId[0].id)) {
              const artists = await prisma.user.findMany({
                where: {
                  id: searchedMusic.otherFeaturedArtist,
                },
                select: {
                  id: true,
                  name: true,
                },
              });
               artists.push(artistId[0]);
              const response = { searched:searchedMusic, artist:artists, slug: "song" };
              return NextResponse.json(response, { status: 200 });
            }
          if (searchedMusic.artistId === artistId[0].id) {
            const response = { searched:searchedMusic, artist:[artistId], slug: "song" };
            return NextResponse.json(response, { status: 200 });
            }
            
            }
            if (saerchedPlaylist && artistId.length !==0) {
                if (saerchedPlaylist.creatorId === artistId[0].id) {
                    const artists = Array([]).push(artistId[0]);
                    const response = { searched:saerchedPlaylist, artist:artists, slug: "playlist" };
                    return NextResponse.json(response, { status: 200 });
                }
            }
        
             if (!searchedMusic || artistId === 0 || !saerchedPlaylist) {
               return NextResponse.json(
                 "music or artist searched could not be found",
                 { status: 404 }
               );
             }
      }
      
      const searchedArtist = await prisma.user.findMany({
        where: {
          name: body?.searchQuery,
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });
        if (searchedArtist.length !==0) {
          console.log(searchedArtist);
          
          const artistResponse = { searched:searchedArtist, slug: "artist" }
          return NextResponse.json(artistResponse,{status:200})
      }
      const saerchedMusic = await prisma.music.findUnique({
        where: {
          musicName: body?.searchQuery,
        },
        select: {
          id: true,
          musicName: true,
          musicImage: true,
          artistId:true,
        },
      });

        if (saerchedMusic) {
          // console.log(saerchedMusic);
          
          const mainArtist = await prisma.user.findUnique({
              where: {
                  id:saerchedMusic.artistId
              },
              select: {
                  id: true,
                  name: true,
                  
              }
          })
          const artist=[{...mainArtist,slug:"artist"}]
          const artistResponse = { searched: saerchedMusic, artist: artist, slug: "song" };
          console.log(artistResponse);
          
           return NextResponse.json(artistResponse, { status: 200 });
      }

      const saerchedPlaylist = await prisma.playlist.findUnique({
        where: {
          name: body?.searchQuery,
        },
        select: {
          id: true,
          name: true,
          image: true,
          creatorId:true,
        },
      });

        if (saerchedPlaylist) {
          console.log(saerchedPlaylist);
          
           const playlistCreator = await prisma.user.findUnique({
             where: {
               id: saerchedPlaylist.creatorId,
             },
             select: {
               id: true,
               name: true,
             },
           });
           const creatorObj = { ...playlistCreator, slug: "artist" };
           const artistResponse = {
             searched:saerchedPlaylist,
             artist: creatorObj,
             slug: "playlist",
           };
           return NextResponse.json(artistResponse, { status: 200 });
    }

      if (searchedArtist === 0 || !saerchedMusic || !saerchedPlaylist) {
        return NextResponse.json("artist or music doesnot exist", {
          status: 404,
        });
      }


    } catch (error) {
        console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
