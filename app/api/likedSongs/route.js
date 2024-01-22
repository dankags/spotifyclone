import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req,res) => {
    const body = await req.json()
        try {
           
            const createLikedSongs = await prisma.LikedSong.upsert({
                where: {
                  userId:body.userId
                },
                update: {
                    songs:songs.push(req.musicId)  
                },
                create: {
                    userId:body.userId
                }
            }) 

            return NextResponse.json(createLikedSongs,{status:200})

        } catch (error) {
            return NextResponse.json({ message: "Internal Server Error" },{status:500}) 
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