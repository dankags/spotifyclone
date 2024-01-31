import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";




export const GET = async (req, { params }) => {
    const { artistId } = params
    try {
        const artist = await prisma.artist.findUnique({
            where: {
                userId: artistId
            }
        })
        if(!artist){return NextResponse.json("artist not found",{status:404}) }
        return NextResponse.json({...artist},{status:200}) 
    } catch (error) {
        return NextResponse.json({ message: `${error}` },{status:500}) 
    }
}

export const PUT = async (req,{params}) => {
    const body =await req.json()
    const {artistId}=params
    try { 
        const artist = await prisma.artist.update({
            where: {
                id:artistId
            },
            data: {
                artistAbout:body.about ,
                profileImg: body.profileImg,
                backImg: body.backImg
            }
        })
        return NextResponse.json(artist,{status:200})
    } catch (error) {
        console.log(error);
        return  NextResponse.json(error,{status:500})
    }
}

