import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

export const GET = async (req,{params}) => {
    const { id } = params
    const{ user} = await getServerSession(authOptions);
    
    try {
         if (!user) {
           return NextResponse.json("you have not autheticated", {
             status: 401,
           });
        }
        if(user.id !== id){return NextResponse.json("You cannot fetch other users liked musics",{status:403})}
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