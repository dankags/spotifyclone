import React from 'react'
import { LogInForm } from './_components/LogInForm'
import Link from 'next/link'
import Image from 'next/image'
import { LogInProviders } from './_components/LogInProviders'
import { ScrollArea } from '@/components/ui/scroll-area'

function Login() {
  return (
    <ScrollArea className=' w-full h-full flex flex-col items-center bg-gradient-to-t from-neutral-950 to-neutral-900 gap-9 '>
    <div className='w-full py-8 pl-3 md:pl-10 gap-3 flex items-center justify-start bg-neutral-950'>
      <Image src='/1cfa810c59bd2aa3ce06d4e7ccc3a7e8.jpg' alt='' height={45} width={45} className='object-cover'/>
      <span className=' font-semibold text-xl dark:text-neutral-50  '>Spotify</span>
    </div>
    <div className='w-full flex items-center justify-center lg:mt-10'>
    <div className='w-full lg:w-7/12 lg:rounded-xl flex flex-col items-center justify-center py-14 bg-neutral-950 '>
    <h1 className='font-bold text-2xl py-4'>log in to Spotify</h1>
    <LogInProviders/>
    <div className='my-7 w-10/12 md:w-7/12'>
    <hr className='border-neutral-700' />
    </div>
      <LogInForm/>
    </div>
    </div>
  </ScrollArea>

  )
}

export default Login