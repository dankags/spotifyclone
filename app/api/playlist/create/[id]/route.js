import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const { id } = params;
  const { user } = await getServerSession(authOptions);
  
  
  try {
    if (!user) {
      return NextResponse.json("you have not autheticated", { status: 401 });
    }

    if (user.id !== id) {
      return NextResponse.json("You can create only your playlist", {
        status: 403,
      });
    }
    const usersPlaylists = await prisma.playlist.findMany({
      where: {
        creatorId: id,
      },
      select: {
        id: true,
      }
    });
   
    
    const playlist = await prisma.playlist.create({
      data: {
        creatorId: id,
        name: `my playlist #${usersPlaylists ? usersPlaylists.length : "1"}`,
      },
      select: {
        id: true,
        creatorId: true,
        name: true,
        image: true,
        slug: true,
      },
    });
  
  
    
    if (!playlist) {
      return NextResponse.json("Playlist couldnot created", {
        status: 404,
      });
    }
    
      return NextResponse.json(playlist, {
        status: 200,
      });
    
  } catch (error) {
   
    
    return NextResponse.json("internal server error", { status: 500 });
  }
};
