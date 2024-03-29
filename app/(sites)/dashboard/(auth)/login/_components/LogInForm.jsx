"use client"
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { SwitchThumb } from '@radix-ui/react-switch'
import { signIn, useSession ,} from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'

export const LogInForm = () => {
  const userCredential= JSON.parse(localStorage.getItem("credential"))
  const {update}=useSession()
  const router=useRouter()
    const [inputs,setInputs]=useState({
      email:userCredential?.email ? userCredential.email : "",
      password:userCredential?.password ? userCredential.password : ""
    })
    const [rememberMe,setRememberMe]=useState(userCredential?.remember ? userCredential.remember : false )
    
    const [error,setError]=useState(null)
    const [pending,setPending]=useState(false)
    const [showPassWord,setShowPassWord]=useState(false)
    const {data,status}=useSession();
    console.log(data,status)
    const handleInputs=(e)=>{
      const {name,value}=e.target
      setInputs(prev=>({...prev,[name]:value}))
    }
    const handleLogin=async(e)=>{
      e.preventDefault();
      if (!inputs.email || !inputs.password) {
        setError("credentials required to login")
        return
      }
      if(!rememberMe){
        await localStorage.removeItem("credential")
      }
      
      try {
        setPending(true)
        const res=await signIn("credentials",{...inputs,redirect:false});
        console.log(res)
        if (res.error) {
          setError("invalid credentials")
          setPending(false)
          return;
        }
        if (res.ok) {
          if(rememberMe){
            await localStorage.setItem("credential",JSON.stringify({
              remember:rememberMe,
              ...inputs
            }))
          }
          
          setError(null)
          setPending(false)
          router.replace("/")
        }
      } catch (error) {
        setError(error)
      }
     
    }
  return (
    <form onSubmit={handleLogin} className='w-7/12 flex flex-col items-center gap-4'>
      <div className='flex justify-center items-center'>
        {error ?
        <span className='text-base font-medium text-red-400'>{error}</span>
        :
        <></> 
        }
      </div>
    <div className='w-8/12 flex flex-col gap-2'>
      <label htmlFor="Email" className='text-sm font-medium'>Email</label>
    <input
     type="email"
     name="email"
     placeholder={userCredential?.email ? userCredential.email : "Email"}
      onChange={handleInputs}
       id="Email"
        className='h-10 rounded-sm px-2 text-sm text-black font-medium focus:outline-green-600' />
    </div>
    <div className='w-8/12 flex flex-col gap-2'>
      <label htmlFor="Password" className='text-sm font-medium'>Password</label>
      <div className='w-full flex gap-x-2 items-center rounded-sm bg-neutral-50 focus-within:ring-2 focus-within:ring-green-600'>
         <input type={showPassWord ? "text":"password"} placeholder={userCredential?.password ? userCredential.password : inputs.password} name="password"  onChange={handleInputs} id="password" className='h-10 w-[88%] rounded-sm px-2 text-sm text-black font-medium focus:outline-none ' />
         <div onClick={()=>setShowPassWord(prev=>!prev)} className={cn('flex items-center justify-center cursor-pointer text-neutral-700 opacity-0 transition',inputs?.password ? "opacity-100":"opacity-0")}>
         {showPassWord ? (
           <MdOutlineVisibilityOff size={20} />
           ) : (
              <MdOutlineVisibility size={20} />
            )}
         </div>
      </div>
      </div>
      <div className='w-8/12 flex items-center justify-start mb-4'>
        <Switch checked={rememberMe} onCheckedChange={()=>setRememberMe(prev=>!prev)} className="h-4 w-8"/>
          

        <span className='text-xs font-bold ml-2'>Remember me</span>
      </div>
    <button className='w-8/12 py-3 rounded-3xl text-lg font-bold text-neutral-900 bg-green-500 hover:bg-green-400' disabled={pending}>Log in</button>
    <Link href="" className='text-sm font-normal dark:text-white hover:underline'>Forgot Your Password?</Link>
    <div className='w-full'>
      <hr className='dark:border-neutral-700 mt-5 mb-9'/>
    </div>
    <p className='text-sm font-medium text-stone-400'>Do not have an account? <Link href="/dashboard/register" className='text-white hover:underline'>Sign up for Spotify</Link></p>
  </form>
  )
}
