import { NavBar } from '@/components/navbar/NavBar'
import MusicForm from './_subComp/MusicForm'
import Footer from '@/components/Footer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import LoadingSkeleton from '@/components/LoadingSkeleton'

const Music = async() => {
  const session=await getServerSession(authOptions)
  if (!session) {
    redirect("/dashboard/login")
  }
 
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ScrollArea className={` w-full h-full rounded-md`}>
        <div className={`h-full rounded-md relative bg-neutral-900`}>
          <div className="sticky top-0">
            <NavBar />
          </div>
          <MusicForm />
          <Footer />
        </div>
      </ScrollArea>
    </Suspense>
  );
}
export default Music
