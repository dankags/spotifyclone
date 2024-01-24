import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const DELETE = async (req) => {
    const {followId}=await req.query
    const body = await req.json()
    //update followings
    try {
        if(followId === body.id){NextResponse.json("you cannot unfollow your self",{status:403})}
        const followExist = await prisma.following.findUnique({
            where: {
                initiateFollowId : followId,
                followingId :body.id
            }
        })
        if(!followExist){return NextResponse.json("You cannot unfollow unexisting follow", { status: 403 })}
        const follow = await prisma.following.delete({
             where: {
                initiateFollowId : followId,
                followingId :body.id
            }
        })
        const follower = await prisma.followers.delete({
             where: {
                followerId :followId,
                followingId:body.id
           }
       })
       if(follow && follower){return NextResponse.json("You unfollowed this user", { status: 201 })}
        
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
    
}