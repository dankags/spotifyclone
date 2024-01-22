"use client"
import Link from 'next/link'
import React from 'react'
import { FaFacebook } from 'react-icons/fa'
import { IoLogoApple } from 'react-icons/io'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

export const LogInProviders = () => {
  return (
    <div className='w-7/12 py-4 flex flex-col items-center gap-4'>
     <div  className="w-8/12 ring-2 flex justify-start items-center ring-stone-400 rounded-3xl pl-12  py-3 font-medium text-sm text-stone-300 hover:bg-neutral-800 cursor-pointer" onClick={()=>signIn("google")}><FcGoogle size={20} className='mr-5 '/> Continue with Google</div>
     <Link  href="" className="w-8/12 ring-2 flex justify-start items-center ring-stone-400 rounded-3xl  pl-12 py-3 font-medium text-sm text-stone-300 hover:bg-neutral-800"><FaFacebook size={20}  className='mr-5 text-blue-500'/> Continue with Facebook</Link>
     <Link  href="" className="w-8/12 ring-2 flex justify-start items-center ring-stone-400 rounded-3xl  pl-12 py-3 font-medium text-sm text-stone-300 hover:bg-neutral-800"><IoLogoApple size={20}  className='mr-5 dark:text-white'/> Continue with Apple</Link>
     <Link href="" className="w-8/12 ring-2 flex justify-center items-center ring-stone-400 rounded-3xl  px-4 py-3 font-medium text-sm text-stone-300 hover:bg-neutral-800"> Continue with phone number</Link>
      </div>
  )
}
