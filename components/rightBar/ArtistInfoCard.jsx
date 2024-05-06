"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import FollowBtn from "./FollowBtn";
import prisma from "@/utils/connect";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

const ArtistInfoCard = ({ artistId, MusicId, userData }) => {
  const { data } = useSession();
  const [fetching, setFetching] = useState(true);
  const [artist, setArtist] = useState(null);
  useEffect(() => {
    setFetching(true);
    const fetchArtist = async () => {
      try {
        const res = await fetch(`/api/artist/${artistId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setFetching(false);
          setArtist(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtist();
  }, [artistId]);

  if (fetching) {
    return (
      <div className=" w-full bg-neutral-800 flex flex-col items-center justify-center gap-y-5 mb-4 relative rounded-lg">
        <div className="w-full relative aspect-square ">
          <Skeleton className="w-full min-h-64" />
        </div>
        <div className="w-full px-3 pb-3 flex flex-col gap-3 ">
          <div className="flex items-center justify-between gap-x-1 text-sm z-20 font-semibold ">
            <Skeleton className="w-8/12 h-6 rounded-3xl" />
            <Skeleton className="w-4/12 h-6 rounded-3xl" />
          </div>
          <Skeleton className="w-full h-[64px]" />
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full bg-neutral-800 flex flex-col items-center justify-center gap-y-5 mb-4 relative rounded-lg">
      <div className="w-full relative aspect-square ">
        <Image
          src={
            artist.profileCoverImage
              ? artist.profileCoverImage
              : "/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif"
          }
          alt=""
          fill
          className="object-cover rounded-t-lg "
        />
        <div className="w-full h-full rounded-lg absolute top-0 left-0  bg-gradient-to-b from-neutral-950/40 to-transparent ">
          {artist.verified && (
            <div className="absolute top-3 left-2 z-20 font-light  flex items-center gap-x-1">
              <div className="h-5 w-5 relative flex items-center">
                <Image
                  src={"/verified.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium"> verified</span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full px-3 pb-3 flex flex-col gap-3 ">
        <div className="flex items-center justify-between gap-x-1 text-sm z-20 font-semibold ">
          <p>
            971,407{" "}
            <span className="text-xs font-semibold">monthly listener</span>
          </p>
          {artistId !== data.user.id && <FollowBtn artistId={artistId} />}
        </div>
        <p className="text-sm font-medium z-20">
          {artist.artistAbout ? artist.artistAbout : "..."}
        </p>
      </div>
    </div>
  );
};

export default ArtistInfoCard;
