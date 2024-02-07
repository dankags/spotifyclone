import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { musicId } = params;
    console.log(params)
    try {
        const music = await prisma.Music.findUnique({
            where: {
                id:musicId
            }
        })
        if (music) {
            const { audioUrl, categoryName, ...other } = music._doc
            await fetch("")
            return NextResponse.json(other, { status: 200 })
        }
        return NextResponse.json({ message: "there is no such music" },{status:404})
        
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" },{status:500})
    }
}