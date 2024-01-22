import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const PUT = async (req) => {
    const {userName}=req.query
    const body = await req.json()
    try {
        const artist = await prisma.artist.findUnique({
            where: {
                id: body.artistId,
                name:body.artistName
            }
        })
        const user = await prisma.user.findUnique({
            where: {
                name: userName,
               email:body.userEmail 
            }
        })
        if (!user.following.includes(user.id)) {
            if (!user.following.includes(artist.id)) {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        following: [...following, artist.id]
                    }
                })
                if (!artist.followers.includes(user.id)) {
                    await prisma.artist.update({
                        where: {
                            id: artist.id
                        },
                        data: {
                            followers: [...followers, user.id]
                        }
                    })
                }
            } else {
                return NextResponse.json("You already follow this artist", { status: 403 })
            }
        }
        return NextResponse.json("you cannot follow your self",{status:403})
        
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
}