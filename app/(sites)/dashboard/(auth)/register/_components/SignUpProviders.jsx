"use client"
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoLogoFacebook } from 'react-icons/io'

export const SignUpProviders = () => {
  return (
    <div>
      <div className="flex items-center justify-center pt-16 pb-4">
        <Image
          src="/bd9c04eda323d3e2eab326fc056adf19.jpg"
          alt=""
          height={50}
          width={50}
          className=""
        />
        <span className="text-2xl font-bold ">Spotify</span>
      </div>
      <div className="flex flex-col items-center gap-6">
        <span className="text-2xl font-bold mb-2">
          Sign up for free to start listening.
        </span>
        <div className="w-full flex justify-center items-center gap-3 ring-0 bg-blue-900 rounded-3xl px-6 py-3 font-medium text-sm text-white hover:bg-blue-800 cursor-pointer">
          <IoLogoFacebook size={20} className="" />
          Sign up with Facebook
        </div>
        <div
          className="w-full px-6 py-2 ring-2 flex justify-center items-center gap-4 ring-stone-400 rounded-3xl font-medium text-sm text-stone-500 hover:bg-neutral-800/10 cursor-pointer"
          onClick={() => signIn("google")}
        >
          <FcGoogle size={20} className=''/>
          Sign up with Google
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-2 mt-5 pb-5">
        <hr className="w-5/12 dark:border-neutral-400" />
        <span className="w-1/12 text-center text-base font-medium text-neutral-500 ">
          or
        </span>
        <hr className="w-5/12 dark:border-neutral-400" />
      </div>
    </div>
  )
}
 