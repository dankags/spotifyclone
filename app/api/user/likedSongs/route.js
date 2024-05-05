import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { user } = await getServerSession(authOptions);
 
  //update followings
  try {
    if (!user) {
      return NextResponse.json("you have not autheticated", {
        status: 401,
      });
    }
    const likedList = await prisma.likedSong.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        coverImageUrl: true,
        songs: true,
      },
    });
      if(!likedList){return NextResponse.json("user does not have liked songs library",{status:404})}
    const musics = await prisma.music.findMany({
      where: {
        id: {
          in: likedList.songs,
        },
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

    return NextResponse.json(musics, { status: 200 });
  } catch (error) {
    return NextResponse.json("internal server error", { status: 500 });
  }
};
