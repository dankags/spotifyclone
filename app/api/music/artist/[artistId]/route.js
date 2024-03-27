import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const {artistId}=params
    try {
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
        const sendTenMusics = musics.slice(0, 11)
        return NextResponse.json({musics: sendTenMusics}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
