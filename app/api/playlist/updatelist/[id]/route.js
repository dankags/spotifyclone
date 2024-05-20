import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//adding some musics in playlist
export const PUT = async (req, { params }) => {
  const { id } = params;
  const body = await req.json();

  const { user } = await getServerSession(authOptions);
  try {
    if (!user) {
      return NextResponse.json("you have not autheticated", { status: 401 });
    }

    const playlist = await prisma.playlist.findUnique({
      where: {
        id: id,
      },
      select: {
        musiclist: true,
        creatorId: true,
      },
    });

    if (!playlist) {
      return NextResponse.json("This playlist does not exist", {
        status: 404,
      });
    }
    if (playlist.creatorId !== user.id) {
      return NextResponse.json("you can only update your playlist", {
        status: 403,
      });
    }
    if (playlist.musiclist.includes(body.musicId)) {
      return NextResponse.json("You already added this music", {
        status: 403,
      });
    }
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: id,
      },
      data: {
        musiclist: { set: [...playlist.musiclist, body.musicId] },
      },
      select: {
        musiclist: true,
      },
    });

    if (updatedPlaylist) {
      const musicListLength = updatedPlaylist.musiclist.length;
      const recentMusicAdded = updatedPlaylist.musiclist[musicListLength - 1];
      return NextResponse.json("music added successfully", {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("internal server error", { status: 500 });
  }
};

//deleting music in the playlist
export const DELETE = async (req, { params }) => {
  const { id } = params;
  const body = await req.json();


  

  const { user } = await getServerSession(authOptions);
  try {
    if (!user) {
      return NextResponse.json("you have not autheticated", { status: 401 });
    }

    const playlist = await prisma.playlist.findUnique({
      where: {
        id: id,
      },
      select: {
        musiclist: true,
        creatorId: true,
      },
    });
   
     
    if (!playlist) {
      return NextResponse.json("This playlist does not exist", {
        status: 404,
      });
    }
    if (playlist.creatorId !== user.id) {
      return NextResponse.json("you can only update your playlist", {
        status: 403,
      });
    }
    if (playlist.musiclist.length === 0) {
      return NextResponse.json("do not have any music in your playlist", {
        status: 403,
      });
    }
    const afterRemoveMusic = playlist.musiclist?.filter(
      (item) => item !== body.musicId
    );
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: id,
      },
      data: {
        musiclist:afterRemoveMusic,
      },
      select: {
        musiclist: true,
      },
    });

    

    if (updatedPlaylist) {
      const musicListLength = updatedPlaylist.musiclist.length;
      const recentMusicAdded = updatedPlaylist.musiclist[musicListLength - 1];
      return NextResponse.json("music was removed successfully", {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    
    return NextResponse.json("internal server error", { status: 500 });
  }
};
