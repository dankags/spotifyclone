import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json()
     const {user} = await getServerSession(authOptions);

    try {
        if (!user) {
          return NextResponse.json("unautheticaed", { status: 401 });
        }
        const music = await prisma.music.findUnique({
            where: {
                id:body.musicId
            },
            select: {
                audioUrl:true
            }
        })
           if(!music){return NextResponse.json("music not found",{status:404})} 
            return NextResponse.json(music,{status:200})
        
        
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" },{status:500}) 
    }
}