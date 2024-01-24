
import Footer from '@/components/Footer'
import { StaticCarosel } from '@/components/StaticCarosel'
import PlayListCard from '@/components/playlistCard/PlayListCard'
import React from 'react'

export const BottomHomeSection = () => {
  
  
  return (
    <section  className=" pt-4 bg-gradient-to-t from-90% from-neutral-900 to-neutral-900/10" >
       <StaticCarosel title={"Made by Daniel kagombe"}>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
       </StaticCarosel>
       <StaticCarosel title={"For working out"}>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
       </StaticCarosel>
       <StaticCarosel title={"Entertainment"}>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
       </StaticCarosel>
       <StaticCarosel title={"When you are sad"}>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
       </StaticCarosel>
       <StaticCarosel title={"You want to calm down"}>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
        <PlayListCard/>
       </StaticCarosel>
    </section>
  )
}
