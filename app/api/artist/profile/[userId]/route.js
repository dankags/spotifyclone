import { authOptions } from "@/utils/auth"
import prisma from "@/utils/connect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async (req,{ params }) => {
    const { userId } = params
    const {user}=await getServerSession(authOptions)
    try {
         if (!user) {
           return NextResponse.json("you have not autheticated", {
             status: 401,
           });
         }
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