import { authOptions } from "@/utils/auth"
import prisma from "@/utils/connect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { useId } from "react"

export const GET = async (req) => {
    const userId = await req.params
     const {user} = await getServerSession(authOptions);
    //update followings
    try {
         if (!user) {
           return NextResponse.json("you have not autheticated", {
             status: 401,
           });
         }
        const followings = await prisma.follow.findMany({
            where: {
                followerId : userId
            }
        })
        const followers = await prisma.follow.findMany({
            where: {
               followingId:userId
          }
      })
        return NextResponse.json({following:followings,followers:followers}, { status: 200 })
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
    
}