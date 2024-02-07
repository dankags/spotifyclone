"use client";
import storage from "@/utils/fireBaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";

const categories = [
  "hiphop",
  "R&B",
  "jazz",
  "classical",
  "gospels",
  "housemusic",
  "raggae",
  "afro",
  "pop",
];

const MusicForm = () => {
  const { data } = useSession();
  const [musicName, setMusicName] = useState(null);
  const [categoryOpt, setCategoryOpt] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioDuration, setAudioDuration] = useState("");
  const [audio, setAudio] = useState(null);
  const [fireBaseAudioUrl, setFirebaseAudioUrl] = useState("");
  const [imgCloudinaryUrl, setImgCloudinaryUrl] = useState("");

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  const handleImageFile = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImgUrl(url);
  };
  const handleAudioFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setAudioName(file.name);
    setAudioFile(file);
    audio.src = url;
    audio.volume = 0;
    audio.play();
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= 0.5) {
        audio.pause();
        console.log(audio.duration);
        setAudioDuration(`${audio.duration}`);
        audio.src = null;
      }
    });
  };

  useEffect(() => {
    const upload = () => {
      const name = new Date().getTime + audioFile.name;
      const storageRef = ref(storage, audioFile.name);

      const uploadTask = uploadBytesResumable(storageRef, audioFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          return;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFirebaseAudioUrl(`${downloadURL}`);
          });
        }
      );
    };
    audioFile && upload();
  }, [audioFile]);

  useEffect(() => {
    const upload = async () => {
      const formData = new FormData();
      const imageUniqueId = new Date().getTime + imageFile.name;
      formData.append("file", imageFile);
      formData.append("publicId", imageUniqueId);
      formData.append("upload_preset", "my-uploads");
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dxqbb56ul/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
          return;
        });
      setImgCloudinaryUrl(`${cloudinaryRes.url}`);
    };
    imageFile && upload();
  }, [imageFile]);

  const handleUploadMusic = async (e) => {
    e.preventDefault();
    //upload image

    const musicdata = {
      musicName: musicName,
      categoryName: categoryOpt,
      artistId: data.user.id,
      musicImage: imgCloudinaryUrl,
      audioUrl: fireBaseAudioUrl,
      duration: audioDuration,
    };

    if (fireBaseAudioUrl) {
      try {
        const res = await fetch("/api/music/create", {
          method: "POST",
          body: JSON.stringify(musicdata),
        })
          .then((res) => res.json())
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="p-3 flex justify-start items-center">
        <span className="text-2xl font-bold mb-3">Upload music</span>
      </div>
      <form
        onSubmit={handleUploadMusic}
        className="w-full px-3 flex justify-center relative"
      >
        <div className="w-5/12 h-full">
          <label
            htmlFor="image"
            className="group w-full h-full rounded-md relative flex justify-center"
          >
            <Image
              src={imgUrl ? imgUrl : "/apple2.jpg"}
              alt=""
              width={320}
              height={320}
              className="rounded-md"
            />
            <div className="w-full h-full gap-y-3 flex flex-col items-center justify-center absolute top-0 left-0 bg-neutral-900/60 opacity-0 cursor-pointer group-hover:opacity-100">
              <span className="">
                <IoCreate className="text-5xl" />
              </span>
              <span className="text-base font-semibold">Choose a photo</span>
            </div>
            <input
              onChange={handleImageFile}
              type="file"
              name=""
              id="image"
              accept="image/*"
              style={{ display: "none" }}
              required
            />
          </label>
        </div>

        <div className="w-7/12 pl-2 flex flex-col gap-y-2 ">
          <span className="w-full text-xl text-center font-bold  ">
            upload form
          </span>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="musicName" className="text-sm font-medium">
              music name
            </label>
            <input
              onChange={(e) => setMusicName(e.target.value)}
              type="text"
              name=""
              id="musicName"
              required
              className="h-10 rounded-sm px-2 text-sm text-black font-medium focus:dark:outline-green-600"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="Email" className="text-sm font-medium">
              category
            </label>
            <select
              onChange={(e) => setCategoryOpt(e.target.value)}
              name="months"
              id="category"
              placeholder="Month"
              required
              className="pl-2 py-2 ring-1 ring-gray-500 rounded-md text-base font-medium text-neutral-950 focus:outline-green-500"
            >
              {/* <option value="" selected disabled className='text-stone-400 text-base font-medium'>Month</option> */}
              {categories.map((cat, i) => (
                <option
                  value={cat}
                  key={i}
                  className=" text-base font-medium hover:bg-neutral-500 text-neutral-950 hover:text-neutral-50"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className=" w-full flex flex-col gap-2 ">
            <span className="text-sm font-medium">music file</span>
            <div className="flex justify-between">
              <div className="w-10/12 flex items-center gap-2 ">
                <Image src="/apple2.jpg" alt="" width={45} height={45} />
                <span className="text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                  {audioName
                    ? `Choosen file is ${audioName}`
                    : "Enter music file"}
                </span>
              </div>
              <label
                htmlFor="audio"
                className="w-2/12 text-sm font-medium flex justify-end "
              >
                <span className="w-11/12 py-2 px-4 rounded-3xl text-base text-center font-bold text-black bg-green-500 cursor-pointer hover:dark:bg-green-400 capitalize">
                  file
                </span>
                <input
                  onChange={handleAudioFile}
                  type="file"
                  name=""
                  id="audio"
                  accept="audio/*"
                  style={{ display: "none" }}
                  required
                />
              </label>
            </div>
          </div>
          <div className="w-full flex justify-end items-center ">
            <button className="w-4/12 py-2 rounded-3xl text-base font-bold capitalize text-black  bg-green-500 hover:dark:bg-green-400">
              upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MusicForm;
