import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { artistId } = params
     const {user} = await getServerSession(authOptions);
    try {
         if (!user) {
           return NextResponse.json("unautheticaed", { status: 401 });
         }
        const musics = await prisma.music.findMany({
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
        //sends only the first ten musics
        const sendTenMusics = musics.slice(0, 11)
        return NextResponse.json({musics: sendTenMusics}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error},
      { status: 500 }
    );
  }
};
