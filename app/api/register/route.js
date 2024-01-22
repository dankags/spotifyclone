import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST =async (req,res) => {
   const body=req.json();


 try {
    const account= await prisma.user.findUnique({
        where:{
            email:body.email
        }
    })
     if(account){return NextResponse.json({message:"Account already exists"},{status:403})}

    const user=await prisma.user.create({data:body}) 
    if(user){ return NextResponse.json(user,{status:201}) }else{
        return NextResponse.json({message:"something went wrong"},{status:400})
    }
 } catch (error) {
    return NextResponse.json({message:"internal server error"},{status:500})
 }
}
