import Footer from '@/components/Footer'
import { NavBar } from '@/components/navBar/NavBar'
import Image from 'next/image'
import { TopSection } from './_homeComp/TopSection'
import { BottomHomeSection } from './_homeComp/BottomHomeSection'
import HomeLayOut from './_homeComp/HomeLayout'

export default function Home() {
  return (
    <div className="w-full h-full  relative">
      <HomeLayOut>
        <BottomHomeSection/>
           <div className='w-full'>
         <Footer/>
      </div>
      </HomeLayOut>
    
    </div>
  )
}
