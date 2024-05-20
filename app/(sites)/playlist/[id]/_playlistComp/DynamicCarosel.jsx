"use client"
import { LikedList } from "@/components/musicList/LikedList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { setPlaylistMusics } from "@/lib/redux/slices/playlistPageMusics";
import React, { useEffect, useState } from "react";


const DynamicCarosel = ({ children, musics,playlist }) => {
    const {playlistMusics}=useAppSelector((state)=>state.playlistPageMusics)
    const dispatch = useAppDispatch()
    const [dynamicPlaylistMusics,setDynamicPlaylistMusics]=useState(null)
    
    useEffect(() => {
        const setUpPlaylistRedux = async () => {
            await dispatch(setPlaylistMusics(musics))
        }
        if (musics?.length > 0) {
            setUpPlaylistRedux()
        }
},[])

    useEffect(() => {
    if (playlistMusics) {
        setDynamicPlaylistMusics(playlistMusics);
        return
    }
},[playlistMusics])

    return (
      <div className={"w-full flex flex-col justify-center gap-3"}>
        <div className="w-full">
          {dynamicPlaylistMusics ? (
            dynamicPlaylistMusics.map((item, idx) => (
              <LikedList
                musics={playlistMusics}
                index={idx +1}
                urlName={playlist.name}
                key={item.id}
                music={item}
                urlPlaylist={playlist}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div>{children}</div>
      </div>
    );
};

export default DynamicCarosel;
