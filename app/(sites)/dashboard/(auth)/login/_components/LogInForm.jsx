"use client"
import { Switch } from '@/components/ui/switch'
import { SwitchThumb } from '@radix-ui/react-switch'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

export const LogInForm = () => {
    const [inputs,setInputs]=useState({
      email:"",
      password:""
    })
    const handleInputs=(e)=>{
      const {name,value}=e.target
      setInputs(prev=>({...prev,[name]:value}))
    }
    const handleLogin=async(e)=>{
     e.preventDefault();
     await signIn("credentials",inputs)
    }
  return (
    <form onSubmit={handleLogin} className='w-7/12 flex flex-col items-center gap-4'>
    <div className='w-8/12 flex flex-col gap-2'>
      <label htmlFor="Email" className='text-sm font-medium'>Email or Username</label>
    <input type="email" name="email" onChange={handleInputs} id="Email" className='h-10 rounded-sm px-2 text-sm text-black font-medium focus:outline-green-600' />
    </div>
    <div className='w-8/12 flex flex-col gap-2'>
      <label htmlFor="Password" className='text-sm font-medium'>Password</label>
    <input type="password" name="password" onChange={handleInputs} id="password" className='h-10 rounded-sm px-2 text-sm text-black font-medium focus:outline-green-600' />
      </div>
      <div className='w-8/12 flex items-center justify-start mb-4'>
        <Switch className="h-4 w-8"/>
        <span className='text-xs font-normal ml-2'>Remember me</span>
      </div>
    <button className='w-8/12 py-3 rounded-3xl text-lg font-bold text-neutral-900 bg-green-500 hover:bg-green-400'>Log in</button>
    <Link href="" className='text-sm font-normal dark:text-white hover:underline'>Forgot Your Password?</Link>
    <div className='w-full'>
      <hr className='dark:border-neutral-700 mt-5 mb-9'/>
    </div>
    <p className='text-sm font-medium text-stone-400'>Do not have an account? <Link href="/dashboard/register" className='text-white hover:underline'>Sign up for Spotify</Link></p>
  </form>
  )
}
