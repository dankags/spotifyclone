import { NavBar } from '@/components/navbar/NavBar'
import MusicForm from './_subComp/MusicForm'
import Footer from '@/components/Footer'
import { ScrollArea } from '@/components/ui/scroll-area'

const Music = () => {

 
  return (
    <ScrollArea className={` w-full h-full rounded-md`} >
    <div className={`h-full rounded-md relative bg-neutral-900`}>
      <div className='sticky top-0'>
      <NavBar/>
      </div>
      <MusicForm/>
      <Footer/>
      </div>
      </ScrollArea>
    
  )
}
export default Music
