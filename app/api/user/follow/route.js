import { authOptions } from "@/utils/auth"
import prisma from "@/utils/connect"
import { getServerSession } from "next-auth"
import { NextResponse,NextRequest } from "next/server"

export const POST = async (req,{params}) => {
    const url = new URL(req.url)
    
    const followId = url.searchParams.get('followId')
    const {user} = await getServerSession(authOptions);
    const body = await req.json()
    
    try {
          if (!user) {
            return NextResponse.json("you have not autheticated", {
              status: 401,
            });
          }
        if(!followId && !body?.id){return NextResponse.json("you content provided",{status:403})}
        if(followId === body.id){NextResponse.json("you cannot follow your self",{status:403})}
        console.log(body.id,followId)
        const followExist = await prisma.follow.findMany({
            where: {
                followerId: followId,
                followingId:body.id
            }
          })
        console.log(followExist)
        if(followExist.length > 0){return NextResponse.json("You already follow this artist", { status: 403 })}
        
        const follower = await prisma.follow.create({
            data: {
                followerId :followId,
                followingId:body.id
           }
       })
       if(follower){return NextResponse.json("You now follow this user", { status: 201 })}
        
        
    } catch (error) {
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
}