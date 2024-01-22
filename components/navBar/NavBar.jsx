import React from 'react'
import { LeftNav} from './subComp/LeftNav'
import { RightNavBar } from './subComp/RightNavBar'

export const NavBar = () => {
  return (
    <nav className='py-1'>
         <LeftNav>
        <RightNavBar/>
        </LeftNav>
    </nav>
  )
}
