"use client"
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ExternalLink} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const NavMenu = ({children}) => {
  const router=useRouter()
  return (
        <DropdownMenu >
          <DropdownMenuTrigger asChild >
            {children}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 mt-3 p-1 rounded-md shadow-md shadow-neutral-950 bg-neutral-800" align='end' >
            <DropdownMenuGroup >
              <DropdownMenuItem className='px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer hover:bg-neutral-700 hover:outline-none '>
                <span className='capitalize text-sm font-medium text-white '>Account</span>
                <DropdownMenuShortcut ><ExternalLink size={20} /></DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>router.push(`/user/cju82dji2deiow293eioi43i`)} className='px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
                <span className='capitalize text-sm font-medium text-white'>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
                <span className='capitalize text-sm font-medium text-white'>Upgrade to premium</span>
                <DropdownMenuShortcut> <ExternalLink  size={20}  /></DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className='px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
                
                <span className='capitalize text-sm font-medium text-white'>Support</span>
                <DropdownMenuShortcut><ExternalLink  size={20}  /></DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className='px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
                
                <span className='capitalize text-sm font-medium text-white'>Download</span>
                <DropdownMenuShortcut><ExternalLink  size={20}  /></DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className='px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none  '>
                
                <span className='capitalize text-sm font-medium text-white'>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>          
            <DropdownMenuSeparator className='w-full h-[1px] bg-neutral-700'/>
            <DropdownMenuItem onClick={()=>signOut()} className='px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
              <span className='text-sm font-medium text-white'>Log out</span>
              <DropdownMenuShortcut><ExternalLink  size={20}  /></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}
