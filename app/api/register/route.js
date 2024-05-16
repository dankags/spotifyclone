import prisma from "@/utils/connect";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export const POST =async (req,res) => {
   const body=await req.json();
   
   const account= await prisma.user.findUnique({
       where:{
           email:body.email
       }
   })
    if(account){return NextResponse.json({message:"Account already exists"},{status:403})}
   const {email,gender,birthDate,name}=body 
   try {
       const salt=await bcrypt.genSalt(10) 
       const hashpassword=await bcrypt.hash(body.password,salt)
       const user=await prisma.user.create({data:{
        email,
        gender,
        birthDate,
        name,
        password:hashpassword
       },
    }) 
       if (user) {
           await prisma.LikedSong.create({
             data: {
               userId: user.id,
             },
           });
           return NextResponse.json({ message: "registered successfully" }, { status: 201 })
       } else {
           return NextResponse.json({message:"something went wrong"},{status:400})
       }
   
 } catch (error) {
    return NextResponse.json({message:error},{status:500})
 }
}
