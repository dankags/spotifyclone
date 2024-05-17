"use client"
import Footer from '@/components/Footer';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { NavBar } from "@/components/navigationbar/NavBar";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDarkVibrantColor, useMutedColor, useNavBarDarkVibrant, useVibrantColor } from '@/lib/hooks/colorHooks'
import React, { useEffect, useState } from 'react'

const PlaylistWrapper = ({children,playlistImg}) => {

  const [navColor, setNavcolor] = useState(false);
  const bgColor = useMutedColor(playlistImg ? playlistImg : "/playlist.jpg", 0.9);
  const navBgColor = useNavBarDarkVibrant(
    playlistImg ? playlistImg : "/playlist.jpg"
  );
  const [isLoading,setIsLoading]=useState(true)
  
  useEffect(() => {
    if (bgColor) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
  }, [bgColor])
  
  const handleScroll = (e) => {
    const totalScrollHeight = e.target.scrollHeight;
    const percentScrolled = (e.target.scrollTop / totalScrollHeight) * 100;
    if (percentScrolled > 13) {
      setNavcolor(true);
      return;
    }
    setNavcolor(false);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <ScrollArea
      onScrollCapture={handleScroll}
      className="w-full h-full rounded-md"
      style={{
        backgroundImage: `linear-gradient(to top,rgb(23,23,23),${bgColor} 100%)`,
      }}
    >
      <div>
        <div className="sticky top-0 z-10">
          <NavBar bgColor={navColor ? `${navBgColor}` : ""} />
        </div>
        {children}
        <Footer />
      </div>
    </ScrollArea>
  );
}

export default PlaylistWrapper