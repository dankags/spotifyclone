"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { filterLikedSongs, pushToLikedSongs } from "@/lib/redux/slices/currentMusic";
import { filterLikedMusics, pushToLikedMusics } from "@/lib/redux/slices/likedSongs";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "sonner";


const LikeButton = ({ music }) => {
  const { data } = useSession()
  const dispatch=useAppDispatch()
  const [like, setLike] = useState(false);
  const {likedMusics}=useAppSelector((state)=>state.likedMusics)
  
  useEffect(() => {
    if (likedMusics) {
      setLike(likedMusics?.includes(music.id))
    }
  },[music,likedMusics])

  const handleLike =async () => {
    if (data.user) {
      try {
        const res=await fetch("/api/likedSongs",
        {
          method:"PUT",
          body:JSON.stringify({
            userId:data.user.id,
            musicId:music.id
          })
        }
        )
        const response=await res.json()
        if (response === "added to liked songs") {
          setLike(true);
          dispatch(pushToLikedMusics(music.id))
          toast("added to liked songs", {});
          return;
        }
        if (response === 'unliked the song') {
          setLike(false);
         dispatch(filterLikedMusics(music.id))
          toast(
            `unliked this music`,
            {}
          );
          return;
        }
      } catch (error) {
        setLike(false);
        console.log(error)
      }
    }
    toast.error("not autheticated")
  };
  return (
    <>
    {/* <ToastContainer/> */}
      <button
        onClick={handleLike}
        className={cn("text-green-500 hover:text-green-400")}
      >
        {like ? (
          <MdOutlineFavorite size={24} />
        ) : (
          <MdOutlineFavoriteBorder
            size={24}
            className="text-stone-400 hover:text-white"
          />
        )}
      </button>
    </>
  );
};

export default LikeButton;
