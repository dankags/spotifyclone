"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { filterLibrary, pushToLibrary } from "@/lib/redux/slices/library";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import React from "react";
import { MdOutlineAddToPhotos, MdOutlineDelete } from "react-icons/md";
import { filterFromPlaylist } from "@/lib/redux/slices/playlistPageMusics";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";


const ListMenu = ({ children, playlist, music,setIsListFocused }) => {

    const { data } = useSession()
    const dispatch = useAppDispatch();
    const { playlistMusics } = useAppSelector(
      (state) => state.playlistPageMusics
    );
    
    const handleDeleteMusicPlaylist = async () => {
        setIsListFocused(false)
       try {
           const res = await fetch(`/api/playlist/updatelist/${playlist.id}`, {
               method: "DELETE",
               body:JSON.stringify({musicId:music.id})
           })
           if (res.ok) {
               const resData = await res.json()
               
               
             if (playlistMusics.length === 0) {
                        return;
                      }
                      await dispatch(filterFromPlaylist(music));
                      toast.success("music removed successfully");
                      return;
           }
       } catch (error) {
        toast.success("music was not removed ")
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
        <DropdownMenuGroup>
          {playlist && (
            <>
              {playlist?.creatorId === data?.user?.id && (
                <DropdownMenuItem
                  onClick={handleDeleteMusicPlaylist}
                  className="px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer focus:bg-neutral-700 hover:outline-none "
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-nowrap text-stone-200 bg-transparent">
                    <MdOutlineDelete size={20} />{" "}
                    <span className="first-letter:capitalize">
                      remove from playlist
                    </span>
                  </div>
                </DropdownMenuItem>
              )}
            </>
          )}
          <DropdownMenuItem onClick={()=>setIsListFocused(false)} className="px-2 py-3 flex items-center justify-between rounded-sm cursor-pointer focus:bg-neutral-700 hover:outline-none ">
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

export default ListMenu;
