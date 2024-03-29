import { authOptions } from "@/utils/auth"
import prisma from "@/utils/connect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const PUT = async (req) => {
    const {userName}=req.query
    const body = await req.json()
     const {user} = await getServerSession(authOptions);

    try {
         if (!user) {
           return NextResponse.json("you have not autheticated", {
             status: 401,
           });
         }
        const artist = await prisma.artist.findUnique({
            where: {
                id: body.artistId,
                name:body.artistName
            }
        })
        const fetchedUser = await prisma.user.findUnique({
            where: {
                name: userName,
               email:body.userEmail 
            }
        })
        if (!fetchedUser.following.includes(fetchedUser.id)) {
            if (fetchedUser.following.includes(artist.id)) {
                await prisma.user.update({
                    where: {
                        id: fetchedUser.id
                    },
                    data: {
                        following: following.filter((follow)=>follow===artist.id)
                    }
                })
                if (artist.followers.includes(fetchedUser.id)) {
                    await prisma.artist.update({
                        where: {
                            id: artist.id
                        },
                        data: {
                            followers:followers.filter((follower)=>follower===fetchedUser.id) 
                        }
                    })
                }
            } else {
                return NextResponse.json("You already unfollowed this artist", { status: 403 })
            }
        }
        return NextResponse.json("you cannot unfollow yourSelf",{status:403})
        
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
}