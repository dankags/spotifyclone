import { DropdownMenuPortal, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ExternalLink } from 'lucide-react'
import React from 'react'
import { BiCopy } from 'react-icons/bi'
import { BsBroadcast } from 'react-icons/bs'
import { FaSpotify } from 'react-icons/fa'
import { LuSquareCode } from 'react-icons/lu'
import { MdIosShare, MdOutlineClose, MdOutlineReport, MdOutlineShare } from 'react-icons/md'

const DropDown = ({children}) => {
  return (
    <DropdownMenu  >
    <DropdownMenuTrigger asChild >
      {children}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-52 p-1 rounded-md shadow-md shadow-neutral-950 bg-neutral-800" align='start' >
      <DropdownMenuGroup >
        <DropdownMenuItem className='px-2 py-3 flex items-center gap-x-2 rounded-sm cursor-pointer hover:bg-neutral-700 hover:outline-none '>
          <MdOutlineClose size={20} className='text-green-500'/> 
          <span className='capitalize text-sm font-medium text-white '>Unfollow</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='px-2 py-3 flex items-center gap-x-2 rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
        <BsBroadcast size={20} className='text-neutral-400' />
          <span className=' text-sm font-medium text-white first-letter:capitalize'>Go to artist radio</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='px-2 py-3 flex items-center gap-x-2 rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
           <MdOutlineReport size={20} className='text-neutral-400' />
          <span className='capitalize text-sm font-medium text-white'>Report</span>
          
        </DropdownMenuItem>

        <DropdownMenuSub  >
            <DropdownMenuSubTrigger className="px-2 py-3 flex items-center gap-x-2 rounded-sm cursor-pointer focus:bg-neutral-700 data-[state=open]:bg-neutral-700  hover:outline-none ">
            <MdIosShare size={20} className='text-neutral-400' />
          <span className='capitalize text-sm font-medium text-white'>Share</span>
                </DropdownMenuSubTrigger>
            <DropdownMenuPortal >
              <DropdownMenuSubContent className="w-52 p-1 ml-1 rounded-md shadow-md shadow-neutral-950 bg-neutral-800" >
              <DropdownMenuItem className='px-2 py-3 flex items-center gap-x-2 rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
           <BiCopy size={20} className='text-neutral-400' />
          <span className='capitalize text-sm font-medium text-white'>copy link to artist</span>
          
        </DropdownMenuItem>
        <DropdownMenuItem className='px-2 py-3 flex items-center gap-x-2 rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
           <LuSquareCode size={20} className='text-neutral-400' />
          <span className='capitalize text-sm font-medium text-white'>embeded artist</span>
          
        </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

        <DropdownMenuItem className='px-2 py-3 flex items-center gap-x-2 rounded-sm cursor-pointer hover:bg-neutral-700  hover:outline-none '>
          
          <FaSpotify size={20} className='text-neutral-400' />
          <span className=' text-sm font-medium text-white first-letter:capitalize'>Open in desktop app</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default DropDown 