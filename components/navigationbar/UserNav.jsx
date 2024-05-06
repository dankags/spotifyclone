import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { LuUser2 } from "react-icons/lu";

const UserNav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session?.user.image ? (
        <Image
          src={session.user.image}
          alt="userProfile"
          fill
          title={session?.user.name}
          className=" rounded-full object-cover"
        />
      ) : (
        <LuUser2 size={20} className="m-auto text-stone-300" />
      )}
    </div>
  );
};

export default UserNav;
