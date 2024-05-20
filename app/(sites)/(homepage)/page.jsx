import Footer from '@/components/Footer'
import { NavBar } from "@/components/navigationbar/NavBar";
import Image from 'next/image'
import { TopSection } from '../../../components/homeComp/TopSection'
import { BottomHomeSection } from '../../../components/homeComp/BottomHomeSection'
import HomeLayOut from '../../../components/homeComp/HomeLayout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'
import prisma from '@/utils/connect'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { Suspense } from 'react'
import { redirect } from 'next/navigation';

export default async function Home () {
  const { user } = await getServerSession(authOptions)
  if (!user) {
    redirect("/dashboard/login")
  }

  const likedSong = await prisma.likedSong.findUnique({
       where: {
         userId: user.id,
       },
     });
  return (
    <Suspense fallback={<LoadingSkeleton />}>
    <div className="w-full h-full  relative">
      <HomeLayOut likedSongs={likedSong}>
        <BottomHomeSection/>
           <div className='w-full'>
         <Footer/>
      </div>
      </HomeLayOut>
    
    </div>
    </Suspense>
  )
}
