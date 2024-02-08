import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const GET = async (req,{params}) => {
    const {id} = params
    try {
        const findLikedSong = await prisma.LikedSong.findUnique({
            where: {
                userId:id
            }
        })
        if (findLikedSong) {
           
            return NextResponse.json(findLikedSong,{status:200})
        }
        return NextResponse.json("you do not have any liked songs",{status:"404"})
  
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" },{status:500}) 
    }
  }