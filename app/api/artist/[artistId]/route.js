import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";


export const GET = async (req, { params }) => {
    const { artistId } = params
    const {user}=await getServerSession(authOptions)
    try {
        if(!user){NextResponse.json("unautheticated",{status:401})}
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
    const body = await req.json()
    const {artistId}=params
    try { 
        const artist = await prisma.artist.update({
            where: {
                id:artistId
            },
            data: {
               ...body
            }
        })
        return NextResponse.json(artist,{status:200})
    } catch (error) {
        return  NextResponse.json("internal Server Error",{status:500})
    }
}

