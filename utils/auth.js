import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import prisma from "./connect"
import { getServerSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {},
        async authorize(credentials) {
         try {
          const user=await prisma.user.findOne({email:credentials.email})
          if (!user) {return "invalid user credentials"}
          const correctPassword=await bcrypt.compare(credentials.password,user.password);
          if (!correctPassword) {return "invalid user credentials"}
          return user;
         } catch (error) {
          console.log(error)
          return "something went wrong"
         }
        
      
        }}
      )
    ],
   
    
}
  
export const getAuthSession=()=>getServerSession(authOptions)