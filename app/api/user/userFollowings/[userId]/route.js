import prisma from "@/utils/connect"
import { NextResponse } from "next/server"
import { useId } from "react"

export const GET = async (req, { params }) => {
  const {userId} = params;
  //update followings
  
  
  try {
    const followings = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });
   
    
    return NextResponse.json(
      { followings },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("internal server error", { status: 500 });
  }
};