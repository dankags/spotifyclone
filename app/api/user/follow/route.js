import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const {followId}=await req.query
    const body = await req.json()
    try {
        if(followId === body.id){NextResponse.json("you cannot follow your self",{status:403})}
        const followExist = await prisma.following.findUnique({
            where: {
                initiateFollowId : followId,
                followingId :body.id
            }
        })
        if(followExist){return NextResponse.json("You already follow this artist", { status: 403 })}
        const follow = await prisma.following.create({
             data: {
                initiateFollowId : followId,
                followingId :body.id
            }
        })
        const follower = await prisma.followers.create({
            data: {
                followerId :followId,
                followingId:body.id
           }
       })
       if(follow && follower){return NextResponse.json("You now follow this user", { status: 201 })}
        
        
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
}