import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const POST = async (req, res) => {
    const body=await req.json()
    
    try { 
        if(body.musicName){
        const music = await prisma.music.findUnique({
            where: {
                musicName:body.musicName
               }
        })
        if(music){return NextResponse.json("music exists",{status:403})}
            const newMusic = await prisma.music.create({
                data: {...body}
            })
           return NextResponse.json("music created successfully",{status:201})
        }
        return NextResponse.json("name of music required",{status:400})
       
    } catch (error) {
        console.log(error);
        return NextResponse.json(error ,{status:500}) 
    }
    
}


