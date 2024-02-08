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

const ChangeCoverImg = ({artistBackImg, artistImg, isArtist,artistId }) => {
  const dispatch = useAppDispatch();
  const { imgurl } = useAppSelector((state) => state.artistBackCover);
  const [currentFileColor,setCurrentFileColor]=useState(null)
  const [imgFile, setImgFile] = useState({
    file: null,
    url: "",
  });
  const bgColor = useDarkVibrantColor(`${imgFile.url}`, 1);
  
  
console.log(currentFileColor)
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
      const cloudunaryUrl = cloudinaryRes.url
      if (cloudunaryUrl) {
        const updateBackImage = await fetch(`/api/artist/${artistId}`, {
        method:"PUT",
        body: JSON.stringify({
          backImg: cloudunaryUrl,
        })
      })
      if (updateBackImage.ok) {
        toast.success("updated successfully")
      }}
      const url = URL.createObjectURL(file);
      setImgFile((prev) => ({ ...prev, file: file, url: url }));
      // let extractedUrl = url.split("blob:")[1];
      // console.log(extracturl)
      // dispatch(setGradientColor(url));
      dispatch(setImageUrl(url));
    }
  };
  if (!isArtist) {
    return;
  }
  return (
    <label htmlFor="backImgFile" className="absolute bottom-6 right-6 ">
      {imgFile.file ? (
        <div
          className={`flex justify-center items-center p-3 rounded-full cursor-pointer  hover:shadow-xl hover:shadow-neutral-900`}
          style={{
            backgroundColor: `${useDarkVibrantColor(imgFile.url, 1)}`,
          }}
        >
          <MdAddAPhoto />
        </div>
      ) : (
        <div
          className={`flex justify-center items-center p-3 rounded-full cursor-pointer  hover:shadow-xl hover:shadow-neutral-900`}
          style={{
            backgroundColor: `${useDarkVibrantColor(
              `${
                artistImg
                  ? artistImg
                  : "/ab6761860000101694cd60dbca59178bcdcc8edc.jpg"
              }`,
              1
            )}`,
          }}
        >
          <MdAddAPhoto />
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

export default ChangeCoverImg