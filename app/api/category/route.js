import prisma from "@/utils/connect";
// import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req)=>{
   
   try{
       const categories = await prisma.Category.findMany()
      return NextResponse.json(categories,{status:200})

   }catch(error){
    return NextResponse.json({ message: "Internal Server Error" },{status:500}) 
   }

}