import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req) => {
    const body = await req.json()
    try {
        if(body.name){
        const musics = await prisma.music.findMany({
            where: {
                artistIds:body.artistId
            }
        })
            
            return NextResponse.json(musics,{status:200})
        } else {
            const musics = await prisma.music.findUnique({
                where: {
                    musicName:body.musicName
                }
            })
            return NextResponse.json(music,{status:200})
        }
        
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" },{status:500}) 
    }
}