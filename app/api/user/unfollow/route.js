import { authOptions } from "@/utils/auth"
import prisma from "@/utils/connect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const DELETE = async (req) => {
    const url = new URL(req.url)
    const unfollowId = url.searchParams.get('unfollowId')
     const {user} = await getServerSession(authOptions);
    const body = await req.json()
    //update followings
    try {
         if (!user) {
           return NextResponse.json("you have not autheticated", {
             status: 401,
           });
         }
        if(!unfollowId && !body?.id){return NextResponse.json("you content provided",{status:403})}
        if(unfollowId === body.id){return NextResponse.json("you cannot unfollow your self",{status:403})}
        const followExist = await prisma.follow.findMany({
            where: {
                    followerId: body.id,
                    followingId: unfollowId   
            }
        })
        if(followExist.length < 1){return NextResponse.json("You cannot unfollow unexisting follow", { status: 403 })}
        const Follow = await prisma.follow.deleteMany({
              where:{
                followerId: body.id,
                followingId: unfollowId 
            }
          });
       
       return NextResponse.json("You unfollowed this user", { status: 201 })
        
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
    
}