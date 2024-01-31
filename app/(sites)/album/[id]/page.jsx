import Footer from '@/components/Footer'
import { StaticCarosel } from '@/components/StaticCarosel'
import AlbumActions from '@/components/albumPageComp/AlbumActions'
import AlbumTableTitle from '@/components/albumPageComp/AlbumTableTitle'
import AlbumWrapper from '@/components/albumPageComp/AlbumWrapper'
import { LikedList } from '@/components/likedList/LikedList'
import { NavBar } from '@/components/navBar/NavBar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link'
import Vibrant from 'node-vibrant'
import React from 'react'


const getVibrantColor=(img)=>{
  let vibrant = new Vibrant(img)
  vibrant.getPalette().then((palette) => {
      setDominantColor(`${palette.Vibrant.getRgb()}`)
      }).catch((error)=>{
         // console.log(error);
      })
}

const AlbumPage = ({param}) => {
    console.log(param)
    const album={
        id: "3c3cd3a6-e459-434a-b649-ec0f661cfd80",
        musicName: "weapons",
        categoryName: "housemusic",
        artistIds: "a3f5954c-8702-4766-adde-e952af96306c",
        viewsNumber: "0",
        musicImage: "/ab67616d0000b2732f6aa01115e00a9ea60eed31.jfif",
        audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifyclone-d7d1f.appspot.com/o/Alan%20Walker%20_The%20Spectre%20(Lyrics%20_%20Lyrics%20Video)%20(1).mp3?alt=media&token=a22a55dc-4100-430b-9ea4-109f1d950909",
        duration: "205.061",
        uploaded:  "2023-11-02T07:45:52.027+00:00"  
    }
    const bgColor=getVibrantColor(album.musicImage)
    console.log(bgColor)
  return (
    <ScrollArea className="w-[100%] h-full rounded-md ">
      <AlbumWrapper album={album} color={bgColor}>
       <div>
       <div
       className={`w-full flex pl-4 pb-4 pt-6  relative items-end "`}
       >
            <div
              className={`pb-1 w-3/12   `}
            >
              <Image
                src={album?.musicImage}
                alt="likedImage"
                width={ 230}
                height={ 220}
                className="z-0 shadow-2xl shadow-black rounded-md"
              />
            </div>
            <div
              className={`pb-1 w-9/12 pl-4
              }`}
            >
              <section className="pl-2">
                <div className="">
                  <span className="font-medium text-neutral-50 ">single</span>
                </div>
                <div >
                  <span
                    className={`w-full capitalize  text-7xl font-extrabold text-neutral-50  whitespace-nowrap text-ellipsis overflow-hidden`}
                  >
                    weapons
                  </span>
                </div>
                <div className='pt-6 flex items-center gap-x-2'>
                  <div className='flex items-center justify-between'>
                    <div className='relative min-w-[30px] min-h-[30px]'>
                     <Image src="/allan2.jpg" alt='' fill className='rounded-full'/>
                     </div>
                     <span className='pl-2 text-sm font-bold capitalize'>ava max</span>
                  </div>
                  <p className='text-sm text-left text-stone-200 font-medium'>
                    <span className='capitalize'>. weapons</span>
                    <span className='capitalize'> . 2022</span>  
                    <span className='capitalize'> . 2:31</span>
                    <span className='capitalize'> . 57,862,629</span>
                  </p>
                </div>
              </section>
            </div>
          </div>
       </div>
        <div className='p-3 bg-gradient-to-t from-[80%] from-neutral-900 to-neutral-900/30'>
          <AlbumActions />
          <div className="w-full flex items-center gap-x-3 py-3 pl-2 rounded-md  hover:bg-neutral-800/40 ">
             <div className='relative min-w-[75px] min-h-[75px]'>
               <Image src="/allan2.jpg" alt='' fill className='rounded-full'/>
             </div>
             <div className='flex flex-col justify-center gap-y-1'>
              <span className='text-sm font-semibold text-white capitalize'>artist</span>
              <Link href={"/artist/udu89dh3982hd8h9"} className='text-base font-semibold capitalize text-white hover:underline'>ava max</Link>
             </div>
          </div>
          <AlbumTableTitle/>
          <StaticCarosel displayCol showAll>
             
               <LikedList music={album} index={1} />
            
            </StaticCarosel>
        </div>
      </AlbumWrapper>
      <ScrollBar className='z-10'/>
    </ScrollArea>
  )
}

export default AlbumPage