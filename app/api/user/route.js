import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const DELETE = async (req) => {
    const url = new URL(req.url)
    const unfollowId=url.searchParams.get('unfollowId')
    const body = await req.json()
    //update followings
    try {
        if(unfollowId === body.id){NextResponse.json("you cannot unfollow your self",{status:403})}
        const followExist = await prisma.following.findUnique({
            where: {
                initiateFollowId : body.id,
                followingId : unfollowId
            }
        })
        if(!followExist){return NextResponse.json("You cannot unfollow unexisting follow", { status: 403 })}
        const follow = await prisma.following.delete({
             where: {
                initiateFollowId : body.id,
                followingId : unfollowId
            }
        })
        const follower = await prisma.followers.delete({
             where: {
                followerId :body.id,
                followingId:unfollowId
           }
       })
       return NextResponse.json("You unfollowed this user", { status: 201 })
        
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
    
}