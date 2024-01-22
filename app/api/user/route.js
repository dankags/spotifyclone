import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const PUT = async (req) => {
    const body=await req.json()
    //update followings
    try {
        
    } catch (error) {
        return NextResponse.json("internal server error",{status:500})
    }
    
}