"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { BiBell, BiSearch } from "react-icons/bi";
import { FiArrowDownCircle } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { ToolTip } from "../ToolTip";
import { NavMenu } from "./NavMenu";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

export const RightNavBar = () => {
  const { data } = useSession();
  const pathName=usePathname()
  const searchInputRef = useRef()
  const dispatch=useDispatch()
  const [showSearchInputBtn,setShowSearchInputBtn]=useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    if (pathName === "/search") {
      setShowSearchInputBtn(true)
      return
    }
    setShowSearchInputBtn(false)
  },[pathName])

  const handleShowSearchInput=()=>{
     if(!showSearchInput){
      searchInputRef.current.focus()
      setShowSearchInput(!showSearchInput)
      return
     }
     searchInputRef.current.value=""
     setShowSearchInput(!showSearchInput)
  }

  const handleSearchInput = async (e) => {
     const searchValue = e.target.value;

     if (searchValue) {
       await dispatch(setSearchinputValue(searchValue));
     }
   };

  return (
    <div className="w-10/12 lg:w-6/12 flex items-center justify-end gap-2 relative pr-2">
      <div className="hidden  ml-2  items-center rounded-2xl bg-neutral-50 cursor-pointer lg:flex">
        <span className="p-2 font-bold text-xs text-ellipsis overflow-hidden whitespace-nowrap text-neutral-900 rounded-2xl ">
          Explore premium
        </span>
      </div>
      <div className="hidden cursor-pointer lg:block">
        <span className="py-2 px-4 rounded-2xl font-semibold bg-neutral-900/80 hover:bg-neutral-800/80  flex shrink-0 gap-x-2 items-center text-xs text-neutral-50  text-nowrap whitespace-nowrap">
          <FiArrowDownCircle size={20} />
          <span>Install app</span>
        </span>
      </div>
      {showSearchInputBtn && (
        <div
          className={cn(
            "lg:hidden group flex p-2  items-center justify-center rounded-full bg-neutral-900/80 hover:bg-neutral-800 transition-all ease-in-out duration-500 overflow-hidden cursor-pointer ",
            showSearchInput
              ? "w-full gap-x-2 flex items-center mr-3 bg-neutral-900/80 rounded-3xl  "
              : "w-8 h-8 rounded-full"
          )}
        >
          <span
            onClick={handleShowSearchInput}
            className=" shrink-0 text-stone-50  group-hover:text-white"
          >
            <BiSearch size={20} />
          </span>
          <input
            onChange={handleSearchInput}
            ref={searchInputRef}
            placeholder="Search"
            className={cn(
              " w-full tracking-wide text-base font-medium placeholder:text-sm bg-neutral-800 focus:border-none focus:outline-none text-white placeholder:text-stone-300",
              showSearchInput && "bg-transparent"
            )}
          />
        </div>
      )}
      <div className="p-1 rounded-full bg-neutral-900/80  cursor-pointer hover:bg-neutral-800/80">
        <Link
          href={"/"}
          className="w-6 h-6 font-semibold  flex justify-center items-center shrink-0 gap-x-2  text-xs text-neutral-50 text-nowrap whitespace-nowrap"
        >
          <ToolTip side={"bottom"} align={"center"} content={"notification"}>
            <BiBell size={20} />
          </ToolTip>
        </Link>
      </div>
      <div className="h-8 w-8  flex justify-center items-center shrink-0 bg-neutral-900/80 rounded-full">
        <NavMenu>
          <button className="w-6 h-6 relative text-center no-underline cursor-pointer">
            {data?.user.image ? (
              <ToolTip
                className={"mt-3"}
                side={"bottom"}
                align={"center"}
                content={data?.user.name}
              >
                <Image
                  src={data.user.image}
                  alt="userProfile"
                  fill
                  className=" rounded-full object-cover"
                />
              </ToolTip>
            ) : (
              <LuUser2 size={20} className="m-auto text-stone-300" />
            )}
          </button>
        </NavMenu>
      </div>
    </div>
  );
};
