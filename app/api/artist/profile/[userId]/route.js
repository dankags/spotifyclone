import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const GET = async (req,{ params }) => {
    const { userId } = params
    try {
        const artist = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name:true
            }
        })
        if(!artist){return NextResponse.json("artist not found",{status:404}) }
        return NextResponse.json(artist,{status:200}) 
    } catch (error) {
        return NextResponse.json({ message: `${error}` },{status:500}) 
    }
}