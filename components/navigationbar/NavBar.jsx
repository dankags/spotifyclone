import React from 'react'
import { LeftNav } from "./LeftNav";
import { RightNavBar } from "./RightNavBar";

export const NavBar = ({bgColor}) => {
  return (
    <nav className='py-3' style={{backgroundColor:`${bgColor}`}}>
         <LeftNav>
        <RightNavBar/>
        </LeftNav>
    </nav>
  )
}
