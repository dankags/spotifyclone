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
            id: { in: playlist.musiclist },
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

export const POST = async (req,  {params}) => {
  const { id } = params;
  const  body  =await req.json()
  
  
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
         creatorId:true,
       },
     });
    
    
     if (!playlist) {
       return NextResponse.json("This playlist does not exist", {
         status: 404,
       });
    }
    if(playlist.creatorId !== user.id){return NextResponse.json("you can only update your playlist", {
      status: 403,
    });
    }
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id:id
      },
      data: {
        ...body
      }
    })
    
    
    if (updatedPlaylist) {
      return NextResponse.json(updatedPlaylist, {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("internal server error", { status: 500 });
  }
}

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
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: id,
      },
      data: {
        musiclist: { set: [...playlist.musiclist, body.musicId] },
      },
      select: {
        musiclist:true,
      },
    });

    if (updatedPlaylist) {
      const musicListLength = updatedPlaylist.musiclist.length;
      const recentMusicAdded = updatedPlaylist.musiclist[musicListLength-1];
      return NextResponse.json(updatedPlaylist, {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("internal server error", { status: 500 });
  }
};

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
    if (updatedPlaylist.musiclist.length === 0) {
       return NextResponse.json("do not have any music in your playlist", {
         status: 403,
       });
    }
    const afterRemoveMusic=updatedPlaylist.musiclist?.filter((item)=>item !== body.musicId)
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: id,
      },
      data: {
        musiclist: { set: [afterRemoveMusic] },
      },
      select: {
        musiclist: true,
      },
    });

    if (updatedPlaylist) {
      const musicListLength = updatedPlaylist.musiclist.length;
      const recentMusicAdded = updatedPlaylist.musiclist[musicListLength - 1];
      return NextResponse.json(updatedPlaylist, {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("internal server error", { status: 500 });
  }
};