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

const ChangeCoverImg = ({ artistImg, isArtist }) => {
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