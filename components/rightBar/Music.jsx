"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import LikeButton from "./likeButton";
import { toast } from "sonner";
import { IoDiscOutline } from "react-icons/io5";

const Music = ({ musicItem }) => {
  const [mainArtist, setMainArtist] = useState(null);
  const [featuredArtists, setFeaturedArtists] = useState(null);
  const music = useMemo(() => {
    if (musicItem) {
      return musicItem
    }
  },[musicItem])

  useEffect(() => {
    const fetchMainArtist = async () => {
      try {
        const res = await fetch(`/api/artist/profile/${music.artistId}`, {
          method: "GET",
        });
        if (res.ok) {
          const artist = await res.json();
          setMainArtist(artist);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    const fetchFeaturedArtists = async () => {
      try {
        const res = await fetch(`/api/artist/profile`, {
          method: "POST",
          body: JSON.stringify(music?.otherFeaturedArtist),
        });
        if (res.ok) {
          const artists = await res.json();
          setFeaturedArtists(artists);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (music) {
      if (!music.artist) {
        fetchMainArtist();
        fetchFeaturedArtists();
      }
    }
  }, [music]);
  return (
    <div className="w-full flex flex-col justify-center">
      <div className=" relative flex items-center justify-center rounded-md aspect-square bg-neutral-950 text-stone-400 text-4xl">
        {music.musicImage ? (
          <Image
          src={
              music?.musicImage
                ? music?.musicImage
                : "/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"
            }
            alt={""}
            fill
            className="rounded-md aspect-square shadow-[0_4px_60px_0] shadow-black/65"
            />
          ) : (
          <IoDiscOutline  className="" />
        )}
      </div>
      <div className="w-full flex items-center justify-between pt-2">
        <div className="w-[75%]">
          <div className="w-full flex items-center justify-start font-bold  text-lg ">
            <Link
              href={`/album/${music?.id}`}
              className="w-full capitalize mb-1 truncate cursor-pointer hover:underline"
            >
              {music?.musicName}
            </Link>
          </div>
          <div className="flex items-center overflow-hidden text-stone-400 truncate">
            {/* display artists name and their link */}
            {music.artists ? (
              <>
                <Link
                  key={music.artists[0].id}
                  href={`/artist/${music.artists[0].id}`}
                  className="capitalize text-base font-normal truncate hover:text-white hover:underline"
                >
                  {music.artists[0].name}
                </Link>
                {music.artists?.slice(1).map((artist, index) => (
                  <Link
                    key={artist.id}
                    href={`/artist/${artist?.id}`}
                    className="capitalize text-base font-normal truncate hover:text-white hover:underline"
                  >
                    , {artist.name}
                  </Link>
                ))}
              </>
            ) : (
              <>
                <Link
                  href={`/artist/${mainArtist?.id}`}
                  className="capitalize text-base font-normal truncate hover:text-white hover:underline"
                >
                  {mainArtist?.name}
                </Link>
                {featuredArtists?.map((artist) => (
                  <Link
                    key={artist.id}
                    href={`/artist/${artist?.id}`}
                    className="capitalize text-base font-normal truncate hover:text-white hover:underline"
                  >
                    , {artist.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="w-[25%] flex items-center justify-between ">
          <LikeButton music={music} />
          <button className="text-stone-400 hover:text-white">
            <BsThreeDots size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};



export default Music;
