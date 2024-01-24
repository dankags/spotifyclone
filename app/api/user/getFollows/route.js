import prisma from "@/utils/connect"
import { NextResponse } from "next/server"
import { useId } from "react"

export const GET = async (req) => {
    const userId=await req.params
    //update followings
    try {
        const followings = await prisma.following.findUnique({
            where: {
                initiateFollowId : userId
            }
        })
        const followers = await prisma.followers.findUnique({
            where: {
               followingId:userId
          }
      })
        return NextResponse.json({following:followings,followers:followers}, { status: 200 })
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
    
}