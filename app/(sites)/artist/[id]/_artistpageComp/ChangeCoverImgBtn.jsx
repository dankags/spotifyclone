"use client"
import { DarkVibrantColor, darkVibrantColor } from "@/lib/functions/colorFunc";
import { useDarkVibrantColor, useVibrantColor } from "@/lib/hooks/colorHooks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import {
  setGradientColor,
  setImageUrl,
} from "@/lib/redux/slices/ChangeArtistBackImg";
import React, { useEffect, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { toast } from "sonner";

const ChangeCoverImgBtn = ({artistBackImg, artistImg, isArtist,artistId }) => {
  const dispatch = useAppDispatch();
  const { imgurl } = useAppSelector((state) => state.artistBackCover);
  const [currentFileColor,setCurrentFileColor]=useState(null)
  const [imgFile, setImgFile] = useState({
    file: null,
    url: "",
  });
  
  const bgColor = useDarkVibrantColor(`${imgFile.url}`, 1);
  const btnBgColor=useDarkVibrantColor(`${artistImg ? artistImg : "/ab6761860000101694cd60dbca59178bcdcc8edc.jpg"}`, 1 )
  
  const handleChangeCoverImg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      
      const formData = new FormData()
      const imageUniqueId = new Date().getTime + file.name
      formData.append("file", file)
      formData.append("publicId", imageUniqueId)
      formData.append("upload_preset", "my-uploads")
      const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/dxqbb56ul/image/upload", {
        method: "POST",
        body: formData
      }).then(res => res.json()).catch((error) => {
        console.log(error)
        return
      })
      const cloudunaryUrl = cloudinaryRes.secure_url
      if (cloudunaryUrl) {
        const updateBackImage = await fetch(`/api/artist/${artistId}`, {
        method:"PUT",
        body: JSON.stringify({
          backImg: cloudunaryUrl,
        })
      })
        if (updateBackImage.ok) {
          const url = URL.createObjectURL(file);
        setImgFile((prev) => ({ ...prev, file: file, url: url }));
        // let extractedUrl = url.split("blob:")[1];
        // dispatch(setGradientColor(url));
        await dispatch(setImageUrl(url));
        toast.success("updated successfully")
      }}
    }
  };
  if (!isArtist) {
    return;
  }
  return (
    <label htmlFor="backImgFile" className="absolute bottom-6 right-6 ">
      {imgFile.file ? (
        <div
          className={`flex justify-center text-white items-center p-3 rounded-full cursor-pointer  hover:shadow-xl hover:shadow-neutral-900`}
          style={{
            backgroundColor: `${bgColor}`,
          }}
        >
          <MdAddAPhoto />
        </div>
      ) : (
        <div
          className={`flex justify-center items-center p-3 text-white rounded-full cursor-pointer  hover:shadow-xl hover:shadow-neutral-900`}
          style={{
            backgroundColor: `${btnBgColor}`,
          }}
        >
          <MdAddAPhoto className=""/>
        </div>
      )}
      <input
        type="file"
        name=""
        accept="image/*"
        id="backImgFile"
        className="hidden"
        onChange={handleChangeCoverImg}
      />
    </label>
  );
};

export default ChangeCoverImgBtn