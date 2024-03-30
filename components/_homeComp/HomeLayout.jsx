"use client"
import React, { useRef, useState } from 'react'
import { TopSection } from './TopSection'
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ScrollAreaScrollbar } from '@radix-ui/react-scroll-area'
import { useSession } from 'next-auth/react'
import { setLikedSongs } from '@/lib/redux/slices/currentMusic'
import { useAppDispatch } from '@/lib/hooks/reduxHooks'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useNavBarDarkVibrant, useNavBarVibrant } from '@/lib/hooks/colorHooks'


const HomeLayOut = ({ children, likedSongs }) => {
  const { data } = useSession()
  // const [likedList,saveLikedList]=useLocalStorage('likedSongs',likedSongs)
  const [containerColor, setContainerColor] = useState("rgba(64,64,64,0.2)");
  const [navColor, setNavcolor] = useState(false)
  const navBgColor=useNavBarDarkVibrant("https://res.cloudinary.com/dxqbb56ul/image/upload/v1707399980/likedSongs_sgfefa.png")
 
  const handleScroll = (e) => {
    const totalScrollHeight=e.target.scrollHeight
    const percentScrolled = (e.target.scrollTop / totalScrollHeight) * 100
    if (percentScrolled > 13) {
      setNavcolor(true)
      return
    }
    setNavcolor(false)
  };
 


  return (
    <ScrollArea
      onScrollCapture={handleScroll}
      className="relative h-full rounded-md transition-all duration-1000 ease-in-out "
      style={{
        backgroundImage: `linear-gradient(to top,rgb(23,23,23)  40%,${containerColor} 100%)`,
        // transition: "all 3s ease 1s",
        // transitionDuration:"0.7s",
        // transitionTimingFunction:"ease-in-out"
      }}
    >
      <div className="relative">
        <div className="sticky top-0 z-10">
          <NavBar bgColor={navColor ? `${navBgColor}` : ""} />
        </div>
        <TopSection changeColor={setContainerColor} />
        {children}
      </div>
      <ScrollBar className={"z-20"} />
    </ScrollArea>
  );
};

export default HomeLayOut