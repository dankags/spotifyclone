import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";

export const PUT = async(req,res) => {
    const body = await req.json()
    const {user} = await getServerSession(authOptions);
    if (!user) { return NextResponse.json("unautheticaed", { status: 401 }) }
    if (user.id !== body.userId){ return NextResponse.json("You can create only your own liked playlist", { status: 403 }); }
      try {
        const likedSong = await prisma.likedSong.findUnique({
          where: {
            userId: body.userId,
          },
        });
        if (!likedSong) {
          const createLikedSongs = await prisma.LikedSong.create({
            data: {
              userId: body.userId,
            },
          });
          if (createLikedSongs) {
            await prisma.likedSong.update({
              where: {
                userId: body.userId,
              },
              data: {
                songs: {
                  set: [...createLikedSongs.songs, body.musicId],
                },
              },
            });
            return NextResponse.json("LikedSong", { status: 200 });
          }
        }
        const musicidExist = likedSong.songs.find(
          (song) => song === body.musicId
        );
        if (musicidExist) {
          const filteredMusics = likedSong.songs.filter(
            (song) => song !== body.musicId
          );
          await prisma.likedSong.update({
            where: {
              userId: body.userId,
            },
            data: {
              songs: {
                set: [...filteredMusics],
              },
            },
          });
          return NextResponse.json("unliked the song", { status: 200 });
        }
        await prisma.likedSong.update({
          where: {
            userId: body.userId,
          },
          data: {
            songs: {
              set: [...likedSong.songs, body.musicId],
            },
          },
        });
        return NextResponse.json("added to liked songs", { status: 201 });
      } catch (error) {
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }
    

}

export const DELETE = async (req,res) => {
    const body = await req.json()
    try {
        const findLikedSong = await prisma.LikedSong.findUnique({
            where: {
                userId:body.userId
            }
        })
        if (findLikedSong) {
            const updateMusicList = await prisma.LikedSong.update({
                where: {
                    userId:body.userId
                },
                data: {
                   songs:songs.filter((songId)=>songId!==body.musicId)    
                }
            })
            return NextResponse.json(updateMusicList,{status:200})
        }
        return NextResponse.json({message:"cannot update an empty liked song list"})

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" },{status:500}) 
    }
}

