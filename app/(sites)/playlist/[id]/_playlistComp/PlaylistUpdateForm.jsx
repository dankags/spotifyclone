"use client"
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { RiAlbumLine } from "react-icons/ri";
import { LuPen} from 'react-icons/lu'
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { filterLibrary, pushToLibrary } from '@/lib/redux/slices/library';

const updatePlaylistInfo = async (info,id) => {
    try {
       
        
        const updatePlaylist = await fetch(`/api/playlist/${id}`, {
          method: "PUT",
          body: JSON.stringify(info),
        });
        if (updatePlaylist.ok) {
            const res=await updatePlaylist.json()
            toast.success("updated playlist")
            return res
        }
    } catch (error) {
        toast.error(error)
       return error 
    }
}

export default function PlaylistUpdateForm ({ children, playlist,setPlaylist }){
  
  const [personalInfo, setPersonalinfo] = useState({
    image: "",
    name: "",
    Desc:""
  });
  const [imageFile, setImgFile] = useState(null);
  const dispatch=useDispatch()

  useEffect(() => {
    const upload = async () => {
      const formData = new FormData();
      const imageUniqueId = new Date().getTime + imageFile.name;
      formData.append("file", imageFile);
      formData.append("publicId", imageUniqueId);
        formData.append("upload_preset", "my-uploads");
        try {
            const cloudinaryRes = await fetch(
              "https://api.cloudinary.com/v1_1/dxqbb56ul/image/upload",
              {
                method: "POST",
                body: formData,
              }
            )
              
              if (cloudinaryRes.ok) {
                  const res = await cloudinaryRes.json()
                const updatedImage = await updatePlaylistInfo({ image: res.secure_url }, playlist.id)
                if (updatedImage) {
                  
                  
                  setPlaylist({ image: res.secure_url });
                  await dispatch(filterLibrary(playlist));
                  await dispatch(pushToLibrary(updatedImage));
                  setPersonalInfo(prev => ({ ...prev, image: res.secure_url }))
                  return
                }
              }
              
        } catch (error) {
            toast.error("image not uploaded")
        }
      // setImgCloudinaryUrl(`${cloudinaryRes.url}`)
    };
    imageFile && upload();
  }, [imageFile]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (name == "file") {
      const file = e.target.files[0];
      if (file) {
        setImgFile(file);
        const ImgUrl = URL.createObjectURL(file);
        setPersonalinfo((prev) => ({ ...prev, image: ImgUrl }));
      }
    }
    setPersonalinfo((prev) => ({ ...prev, [name]: value.toLowerCase() }));
  
  };
  const handleForm = async(e) => {
      e.preventDefault()
      
      if(!playlist){return}
      if (personalInfo.name && personalInfo.Desc) {
          const { image, ...info } = personalInfo
        const res = await updatePlaylistInfo(info, playlist.id)
        if (res) {
          await dispatch(filterLibrary(playlist))
        await dispatch(pushToLibrary(res))
        setPlaylist(info)
          return
        }
      }
      if (personalInfo.name && !personalInfo.Desc) {
          const { name, ...info } = personalInfo
          
          
          const res = await updatePlaylistInfo({ name:name.toLowerCase() },playlist.id);
        if (res) {
          await dispatch(filterLibrary(playlist));
          await dispatch(pushToLibrary(res));
          setPlaylist({name:name})
          return
        }
      }
      if (!personalInfo.name && personalInfo.Desc) {
        const { Desc, ...info } = personalInfo;
        const res = await updatePlaylistInfo({ Desc: Desc.toLowerCase() }, playlist.id)
        if (res) {
        setPlaylist({ Desc: Desc });}
        return
      }
    };
    
    
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:min-w-[425px] bg-neutral-800 shadow-lg shadow-neutral-950 border-none rounded-md">
        <DialogHeader>
          <DialogTitle className="text-xl">profile details</DialogTitle>
        </DialogHeader>
        <div
          onSubmit={handleForm}
          className="flex flex-col md:flex-row md:items-center items-center gap-5 md:gap-3"
        >
          <div className="w-4/12 flex items-center justify-center ">
            <label
              htmlFor="image"
              className="group relative h-44 w-44 cursor-pointer"
            >
              <div className="min-h-44 min-w-44 flex items-center justify-center relative rounded-md shadow-[0_4px_60px_0] shadow-black/60">
                {playlist?.image ? (
                  <Image
                    src={
                      personalInfo.image ?personalInfo.image : playlist.image
                    }
                    alt={"profile"}
                    fill
                    className=" object-cover rounded-md"
                  />
                ) : (
                  <RiAlbumLine className="m-auto text-7xl text-stone-300" />
                )}
              </div>
              <div className="w-full h-full absolute top-0 left-0 rounded-md flex flex-col justify-center items-center gap-2 opacity-0 text-neutral-50 group-hover:bg-neutral-900/75 group-hover:opacity-100">
                <LuPen className="text-4xl" />
                <span className="text-base font-semibold ">Choose photo</span>
              </div>
              <input
                onChange={handleInputs}
                type="file"
                name="file"
                id="image"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          <div className="w-8/12 pl-3 flex flex-col justify-center gap-3">
            <input
              type="text"
              placeholder={playlist?.name ? playlist.name : "Username"}
              name="name"
              id=""
              onChange={handleInputs}
              className="px-3 py-3 text-base font-medium rounded-md bg-neutral-700  placeholder:text-stone-200 placeholder:capitalize  focus:outline-neutral-50 "
            />
            <textarea
              name="Desc"
              id=""
              placeholder={playlist?.Desc ? playlist.Desc : "Description"}
              className="min-h-20 max-h-24 px-3 py-3 text-sm font-medium rounded-md bg-neutral-700  placeholder:text-stone-200 placeholder:capitalize focus:outline-1 focus:outline-neutral-50 "
              onChange={handleInputs}
            ></textarea>
            <div className="w-full flex items-center justify-center pt-3 md:pt-0 md:justify-end ">
              <button
                onClick={handleForm}
                className="w-4/12  md:w-3/12 py-2 px-3 text-base font-bold rounded-3xl bg-neutral-50 text-neutral-900  hover:scale-105 active:scale-100"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogDescription className="w-full flex items-center justify-start text-xs text-white font-bold">
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

