import React from 'react'
import { LeftNav} from './subComp/LeftNav'
import { RightNavBar } from './subComp/RightNavBar'

export const NavBar = ({bgColor}) => {
  return (
    <nav className='py-1' style={{backgroundColor:`${bgColor}`}}>
         <LeftNav>
        <RightNavBar/>
        </LeftNav>
    </nav>
  )
}
