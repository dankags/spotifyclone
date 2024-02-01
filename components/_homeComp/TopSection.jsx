"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { UserRecomended } from './UserRecomended'
import { NavBar } from '@/components/navBar/NavBar'

export const TopSection = ({children,changeColor}) => {
    const pageRef=useRef();
    const recommended = [
        {   id:"1",
            img:"/allan.webp",
            name:"allan Walker",
        },
        {
            id:"2",
            img:"/ab6761610000e5eb41e4a3b8c1d45a9e49b6de21.jpg",
            name:"marshmello",
        },
        {
            id: "3",
            img:"/playlist.jpg",
            name:"danKags",
        },
        {
            id:"4",
            img:"/likedSongs.png",
            name:"likedSong",
        },
        {
            id:"5",
            img:"/ab6761610000e5ebdb68d678df6d89bf8a55d052.jpg",
            name:"chainSmokers",
        },
        {
            id:"6",
            img:"/ab6761610000e5ebb6f3a82acf4aa61603b353de.jpg",
            name:"k-391",
        }
    ]
    const [containerColor, setContainerColor] = useState("rgba(64,64,64,0.2");
    useEffect(()=>{
      changeColor(containerColor)
    },[containerColor])
    const pageWidth=pageRef.current?.clientWidth;
    
    
  return (
    <section className='reltive overflow-x-hidden ' ref={pageRef}  >
        <div className='w-full' >
        {children}
        </div>
        <div className='w-full  '>
        <div
          className={`w-full pt-2  mb-4 `}
          
        >
          
          <span className="w-full  font-bold px-4 text-4xl max-md:text-3xl ">
            Good afternoon
          </span>
          <div
            className={`w-full px-3 mt-3 grid justify-between flex-grow flex-wrap gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 `}
          >
            {recommended.map((item, i) => (
              <UserRecomended
                key={i}
                data={item}
                setContainerColor={setContainerColor}
              />
            ))}
          </div>
          </div>
        </div>
    </section>
  )
}
