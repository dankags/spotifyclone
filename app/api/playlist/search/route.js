import prisma from "@/utils/connect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const body = await req.json();
 
  
  let noOfSpaces = 0;
  if (body?.searchQuery?.length === 0) {
    return NextResponse.json("no search input", { status: 400 });
  }
  for (let i = 0; i < body?.searchQuery?.length; i++) {
    if (body?.searchQuery[i] === " ") {
      noOfSpaces++;
    }
  }

  try {
    if (!body) {
      return NextResponse.json("no input provided", { status: 400 });
    }

    if (noOfSpaces > 1) {
      if (body?.searchQuery.includes("by") || body?.searchQuery.includes(" ")) {
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
            id:true,
            musicImage: true,
            mainArtist: {
              select:{name:true}
            },
            artistId: true,
            otherFeaturedArtist: true,
            musicName: true,
            duration:true
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
          if (searchedMusic[0]?.otherFeaturedArtist.includes(artistId[0].id)) {
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
            return NextResponse.json([searchedMusic[0]], { status: 200 });
          }
          if (searchedMusic[0].artistId === artistId[0].id) {
            const response = {
              searched: searchedMusic[0],
              artist: [artistId[0]],
              slug: "song",
            };
            return NextResponse.json([searchedMusic[0]], { status: 200 });
          }
        }
       

        if (!searchedMusic || artistId === 0 ) {
          return NextResponse.json(
            "music or artist searched could not be found",
            { status: 404 }
          );
        }
      }
    }

    
    const saerchedMusic = await prisma.music.findMany({
      where: {
        musicName: { startsWith: body?.searchQuery },
      },
      select: {
        id: true,
        musicName: true,
        musicImage: true,
        mainArtist: {
          select: {
            name: true,
          },
          },
        otherFeaturedArtist:true,
        artistId: true,
        duration: true,
      },
      take: 10,
    });
   
      

    if (saerchedMusic.length !== 0) {
      // console.log(saerchedMusic)
      return NextResponse.json(saerchedMusic, { status: 200 });
    }


    if ( saerchedMusic.length === 0 ) {
      return NextResponse.json("artist or music doesnot exist", {
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
