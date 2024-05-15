import prisma from "@/utils/connect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const body = await req.json();
  let noOfSpaces = 0
  if (body?.searchQuery?.length === 0) {return NextResponse.json('no search input',{status:400})}
  for (let i = 0; i < body?.searchQuery?.length; i++){
    if (body?.searchQuery[i] === " ") {
      noOfSpaces++
    }
  }
  
    
    try {
      if(!body){return NextResponse.json("no input provided",{status:400})}
     
      if (noOfSpaces > 1) {
        if (
          body?.searchQuery.includes("by") ||
          body?.searchQuery.includes(" ")
        ) {
          const splitedSearch = body.searchQuery.split(" ");
          const musicname = splitedSearch[0] ?? body.searchQuery.split("by")[0];
          const artist =
            body.searchQuery.split("by")[1] ?? splitedSearch.slice(1).join(" ");
          console.log(artist, musicname);

          const searchedMusic = await prisma.music.findMany({
            where: {
              musicName: { contains: musicname },
            },
            select: {
              musicImage: true,
              artistId: true,
              otherFeaturedArtist: true,
              musicName: true,
            },
          });
          const saerchedPlaylist = await prisma.playlist.findMany({
            where: {
              name: { contains: musicname },
            },
            select: {
              id: true,
              name: true,
              image: true,
              creatorId: true,
            },
          });

          let artistId = null;
          if (body.searchQuery.includes("by")) {
            artistId = await prisma.user.findMany({
              where: {
                name: { contains: artist.split(" ").slice(1).join(" ") },
              },
              select: {
                id: true,
                name: true,
              },
            });
          } else {
            artistId = await prisma.user.findMany({
              where: {
                name: { contains: artist },
              },
              select: {
                id: true,
                name: true,
              },
            });
          }

          console.log(artistId, searchedMusic);

          if (searchedMusic.length !== 0 && artistId.length !== 0) {
            if (
              searchedMusic[0]?.otherFeaturedArtist.includes(artistId[0].id)
            ) {
              const artists = await prisma.user.findMany({
                where: {
                  id: searchedMusic[0].otherFeaturedArtist,
                },
                select: {
                  id: true,
                  name: true,
                },
              });
              artists.push(artistId[0]);
              const response = {
                searched: searchedMusic[0],
                artist: artists,
                slug: "song",
              };
              return NextResponse.json(response, { status: 200 });
            }
            if (searchedMusic[0].artistId === artistId[0].id) {
              const response = {
                searched: searchedMusic[0],
                artist: [artistId[0]],
                slug: "song",
              };
              return NextResponse.json(response, { status: 200 });
            }
          }
          if (saerchedPlaylist.length !== 0 && artistId.length !== 0) {
            if (saerchedPlaylist[0].creatorId === artistId[0].id) {
              const artists = Array([]).push(artistId[0]);
              const response = {
                searched: saerchedPlaylist[0],
                artist: artists,
                slug: "playlist",
              };
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
      }

      const searchedArtist = await prisma.user.findMany({
        where: {
          name: { contains: body?.searchQuery },
          roles:"ARTIST"
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });
        if (searchedArtist.length !==0) {
          console.log(searchedArtist);
          
          const artistResponse = { searched:searchedArtist[0],artist:[], slug: "artist" }
          return NextResponse.json(artistResponse,{status:200})
      }
      const saerchedMusic = await prisma.music.findMany({
        where: {
          musicName: {contains:body?.searchQuery},
        },
        select: {
          id: true,
          musicName: true,
          musicImage: true,
          artistId:true,
        },
      });

        if (saerchedMusic.length !== 0) {
          // console.log(saerchedMusic);
          
          const mainArtist = await prisma.user.findUnique({
              where: {
                  id:saerchedMusic[0].artistId
              },
              select: {
                  id: true,
                  name: true,
                  
              }
          })
          const artist=[{...mainArtist,slug:"artist"}]
          const artistResponse = { searched: saerchedMusic[0], artist: artist, slug: "song" };
          console.log(artistResponse);
          
           return NextResponse.json(artistResponse, { status: 200 });
      }

      const saerchedPlaylist = await prisma.playlist.findMany({
        where: {
          name: {contains:body?.searchQuery},
        },
        select: {
          id: true,
          name: true,
          image: true,
          creatorId:true,
        },
      });

        if (saerchedPlaylist.length !== 0) {
          console.log(saerchedPlaylist);
          
           const playlistCreator = await prisma.user.findUnique({
             where: {
               id: saerchedPlaylist[0].creatorId,
             },
             select: {
               id: true,
               name: true,
             },
           });
           const creatorObj = { ...playlistCreator, slug: "artist" };
           const artistResponse = {
             searched:saerchedPlaylist[0],
             artist: [creatorObj],
             slug: "playlist",
           };
           return NextResponse.json(artistResponse, { status: 200 });
    }

         
      if (searchedArtist.length === 0 || saerchedMusic.length ===0 || saerchedPlaylist.length === 0) {
        return NextResponse.json("artist or music doesnot exist", {
          status: 404,
        });
      }


    } catch (error) {
        console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
