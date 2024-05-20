"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pushToLibrary } from "@/lib/redux/slices/library";
import {  useSession } from "next-auth/react";
import React from "react";
import { PiMusicNotesPlus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


const CreatePlaylistDropDown = ({children}) => {
    const { data } = useSession()
    const dispatch=useDispatch()
    const handleCreatePlaylist = async () => {
      try {
          const res =await fetch(`/api/playlist/create/${data.user.id}`, {
            method:"POST"
          })
          if (res.ok) {
              const playlist = await res.json()
              await dispatch(pushToLibrary(playlist))
              toast.success("playlist created successfully")
              return
          }
      } catch (error) {
       toast.error("playlist not created")
      }
  }

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
          <DropdownMenuItem
            onClick={handleCreatePlaylist}
            className="px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer focus:bg-neutral-700 hover:outline-none "
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-nowrap text-stone-200 bg-transparent">
              <PiMusicNotesPlus size={20} />{" "}
              <span className="first-letter:capitalize">create playlist</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreatePlaylistDropDown;


