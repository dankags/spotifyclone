import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    const { id } = params
    const { user } = await getServerSession(authOptions)
    
    try {
        if (!user) { return NextResponse.json("you have not autheticated", { status: 401 }) }
       
        const playlist = await prisma.playlist.findUnique({
          where: {
            id: id,
          },
          select: {
            musiclist: true,
          },
        });
        if (!playlist) { return NextResponse.json("This playlist does not exist", {
          status: 404,
        });   
        }
        const musics = await prisma.music.findMany({
          where: {
            id: playlist,
          },
          select: {
            id: true,
            musicName: true,
            artistId: true,
            otherFeaturedArtist: true,
            musicImage: true,
            duration: true,
          },
        });
        if (musics.length === 0) {
            return NextResponse.json("This musics do not exist", {
              status: 404,
            });
        }
       return  NextResponse.json(musics, {
          status: 200,
        });
    } catch (error) {
        return NextResponse.json("internal server error", { status: 500 });
    }
}