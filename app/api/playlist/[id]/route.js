import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//get playlist musics
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



export const PUT = async (req,  {params}) => {
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
        id: id,
      },
      data: {
        ...body,
      },
      select: {
        id: true,
        creatorId: true,
        name: true,
        image: true,
        slug: true,
      },
    });
    
    
    
    if (updatedPlaylist) {
      return NextResponse.json(updatedPlaylist, {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export const DELETE = async (req, { params }) => {


  const { id } = params;
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
        creatorId: true,
      },
    });
    
    
    if (!playlist) {
      return NextResponse.json("This playlist does not exist", {
        status: 404,
      });
    }
    if (playlist.creatorId !== user.id) {
      return NextResponse.json("Cannot delete others playlist", {
        status: 403,
      });
    }
    const deletePlaylist = await prisma.playlist.delete({
      where: {
        id: id,
      },
    });
    
    return NextResponse.json(deletePlaylist, {
      status: 200,
    });
  } catch (error) {
    
    
    return NextResponse.json("internal server error", { status: 500 });
  }
};
