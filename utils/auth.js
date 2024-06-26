import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import prisma from "./connect"
import { getServerSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const authOptions = {
  adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {},
        async authorize(credentials) {
         try {
          const user=await prisma.user.findUnique({
            where:{email:credentials.email},
            select:{
              email:true,
              password:true,
              name:true,
              id:true,
              image:true,
              admin: true,
              roles:true
            }
          });
          if (!user) {throw new Error("invalid user credentials")}
          const correctPassword=await bcrypt.compare(credentials.password,user.password);
          if (!correctPassword) {throw new Error("invalid user credentials") }
          
          return user;
         } catch (error) {
          throw new Error("failed to login") 
         }
        
      
        }
      }
      )  
    ],
    session:{
      strategy:"jwt"
    },
   callbacks:{
    async session({session,token}){
      
      if(token){
      
       session.user.id=token.sub;
       session.user.image=token.picture
       session.user.name=token.name
       session.user.email=token.email
        session.user.admin = token.admin
        session.user.role=token.role
     }
      return session
   },
     async jwt({token,user,session,trigger}){
      if(trigger === 'update'){
        if (session?.name) {
          token.name=session.name
          await prisma.user.update({
            where:{
              id:token.sub
            },
            data:{
              name:token.name
            }
          })
        }
        if (session?.image) {
          token.picture=session.image
        await prisma.user.update({
            where:{
              id:token.sub
            },
            data:{
              image:token.picture
            }
          })
        }
      }
       if (user) { 
         token.name=user.name;
         token.picture=user.image;
         token.email=user.email;
         token.admin=user.admin
         token.sub=user.id
         token.role=user.roles
        }
        return token
      },
 
   },
  
    
}
  
export const getAuthSession=()=>getServerSession(authOptions)