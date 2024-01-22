import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Form } from './_components/form'
import { SignUpProviders } from './_components/SignUpProviders'

function Register() {
  return (
    <div className=" w-full col-span-12 flex flex-col items-center bg-white text-black overflow-y-auto scrollbar  scrollbar-thumb-transparent hover:scrollbar-thumb-neutral-500 scro scrollbar-track-transparent ">
     <SignUpProviders/>
    <div className="w-4/12 flex flex-col items-center gap-4">
          
          <Form/>

      <div className=" w-full pb-12 flex items-center justify-center">
        <span className="mr-2 text-base font-medium">Have an account?</span>
        <Link
          href="/dashboard/login"
          className="text-base font-medium text-green-500 underline hover:text-green-400"
        >
          Login
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Register