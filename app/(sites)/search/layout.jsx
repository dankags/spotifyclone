"use client"
import { NavBar } from "@/components/navigationbar/NavBar";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect } from 'react'

const SearchLayout = ({ children }) => {
  const { searchInputvalue } = useAppSelector((state) => {
    state.mainSearchBarInput;
  }); 
  const [searchValue,setSearchValue]=useState(null)
  useEffect(() => {
    if (!searchInputvalue) { return }
    const fetchTheSearchValue = async () => {
      try {
        const res = await fetch("api/search", { method: "POST", body: searchInputvalue }).then((value) => value)
        setSearchValue(res)
        console.log(res);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchTheSearchValue()
  },[searchInputvalue])
  return (
    <ScrollArea className="w-full h-full">
      
        <div className='bg-neutral-900'>
          <div className="sticky top-0 z-10">
            {" "}
            <NavBar />
          </div>
          <div>{children}</div>
        </div>
      
      <ScrollBar />
    </ScrollArea>
  );
}

export default SearchLayout