"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { UserRecomended, UserRecommendedLoadingSkele } from './UserRecomended'
import { NavBar } from '@/components/navBar/NavBar'
import { useAppSelector } from '@/lib/hooks/reduxHooks'

export const TopSection = ({children,changeColor}) => {
  const pageRef = useRef();
  const { userLibrary } = useAppSelector((state) => state.userLibrary)
  const [recommended,setRecommnded] =useState(null) 
  const [containerColor, setContainerColor] = useState("rgba(64,64,64,0.2");
  
  useEffect(()=>{
      changeColor(containerColor)
    },[containerColor])
    const pageWidth=pageRef.current?.clientWidth;
  
  useEffect(() => {
    if (userLibrary) {
      setRecommnded(userLibrary.slice(0,6))
    }
  },[userLibrary])
    
  return (
    <section className="reltive overflow-x-hidden " ref={pageRef}>
      <div className="w-full">{children}</div>
      <div className="w-full  ">
        <div className={`w-full pt-2  mb-4 `}>
          <span className="w-full  font-bold px-4 text-4xl max-md:text-3xl ">
            Good afternoon
          </span>
          <div
            className={`w-full px-3 mt-3 grid justify-between flex-grow flex-wrap gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 `}
          >
            {userLibrary ? (
              <>
                {recommended?.map((item, i) => (
                  <UserRecomended
                    key={item.id}
                    data={item}
                    setContainerColor={setContainerColor}
                  />
                ))}
              </>
            ) : (
              <>
                <UserRecommendedLoadingSkele />
                <UserRecommendedLoadingSkele />
                <UserRecommendedLoadingSkele />
                <UserRecommendedLoadingSkele />
                <UserRecommendedLoadingSkele />
                <UserRecommendedLoadingSkele />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
