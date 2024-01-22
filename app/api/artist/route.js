import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const POST = async (req, res) => {
    const body=await req.json()
    
    try { 
        if(body.name){
        const artist = await prisma.artist.findUnique({
            where: {
                   name:body.name
               }
        })
        if(artist){return NextResponse.json("artist exists",{status:403})}
            const newArtist = await prisma.artist.create({
                data: {...body}
            })
           return new NextResponse(JSON.stringify(newArtist,{status:201})) 
        }
        return NextResponse.json("name of artist required",{status:400})
       
    } catch (error) {
        console.log(error);
        return NextResponse.json("Internal Server Error" ,{status:500}) 
    }
    
}