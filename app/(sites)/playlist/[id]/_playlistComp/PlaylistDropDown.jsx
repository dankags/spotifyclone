"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { filterLibrary} from "@/lib/redux/slices/library";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineAddToPhotos, MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const PlaylistDropDown = ({ children, playlist }) => {
    
    
 const { data } = useSession();
 const router=useRouter()
 const dispatch = useDispatch();

 const handleDeletePlaylist = async () => {
    
     try {
       
     const res = await fetch(`/api/playlist/${playlist.id}`, {
       method: "DELETE",
     });
     if (res.ok) {
       await dispatch(filterLibrary(playlist));
       router.push("/")
       toast.success("playlist created successfully");
       return;
     }
   } catch (error) {
     toast.error("playlist not deleted");
   }
 };

 return (
   <DropdownMenu>
     <DropdownMenuTrigger asChild className="focus:outline-none focus:ring-0">
       {children}
     </DropdownMenuTrigger>
     <DropdownMenuContent
       align="start"
       className="w-52 mt-3 p-1 rounded-md shadow-[0_4px_60px_0] shadow-black/60 bg-neutral-800 outline-none ring-0 border-none"
     >
       <DropdownMenuGroup >
         {playlist?.creatorId === data?.user?.id && (
           <DropdownMenuItem
             onClick={handleDeletePlaylist}
             className="px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer focus:bg-neutral-700 hover:outline-none "
           >
             <div className="flex items-center gap-2 text-sm font-semibold text-nowrap text-stone-200 bg-transparent">
               <MdOutlineDelete size={20} />{" "}
               <span className="first-letter:capitalize">delete playlist</span>
             </div>
           </DropdownMenuItem>
         )}
         <DropdownMenuItem className="px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer focus:bg-neutral-700 hover:outline-none ">
           <div className="flex items-center gap-2 text-sm font-semibold text-nowrap text-stone-200 bg-transparent">
             <MdOutlineAddToPhotos size={20} />{" "}
             <span className="first-letter:capitalize">Add to library</span>
           </div>
         </DropdownMenuItem>
       </DropdownMenuGroup>
     </DropdownMenuContent>
   </DropdownMenu>
 );

};

export default PlaylistDropDown;
