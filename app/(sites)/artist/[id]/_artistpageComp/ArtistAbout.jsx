import Image from 'next/image'
import React from 'react'

const ArtistAbout = () => {
  return (
    <div className='w-full h-96 overflow-hidden rounded-sm flex items-center relative'>
    <Image src='/ab6761670000ecd47145333607578eb5c6caea1f.jpg' alt='' fill={true} className='object-cover w-full h-full rounded-sm  ' />
    <div className='w-full h-full relative top-0 left-0 bg-gradient-to-t from-neutral-900/75 '></div>
      <div className='w-24 h-24 rounded-full p-2 flex flex-col justify-center items-center bg-sky-600 text-white absolute right-5 top-5 '>
        <span className='text-lg font-semibold'>118 #</span>
        <span className='text-xs font-medium'>in the world</span>
       </div>
    <div className='absolute bottom-5 left-5 flex flex-col justify-center gap-2 px-1'>
      <p className='font-semibold text-white'>
        <span className='text-base text-white'>31,756,456  </span>
        <span className='text-sm text-white'>monthly listeners</span>
      </p>
      <p className='text-base line-clamp-4 text-white font-normal overflow-hidden text-ellipsis pr-3'>
      DJ/Producer phenom Alan Walker captured the imagination of the public with his debut single Faded in 2015, which served as a springboard towards an extensive and dedicated community. Notably, being one of the most followed accounts on Spotify and boasting more than 50 billion audio and video streams. Walker is widely recognized by his melancholic melodies yet optimistic lyrics. 

At the age of 25, Walker is already on his way to solidify himself as a usual suspect within the sphere of EDM. His successful singles and collaborations include Bruno Mars, Miley Cyrus, Coldplay, Avicii, Sia, Steve Aoki, A$AP Rocky, Ava Max, Kygo, Hans Zimmer, Madison Beer, Imanbek and many more. 

Inspired by his deep-rooted love for film and music, he has created an elaborate fictional universe, World of Walker, that accompanies his music videos, engaging fans across several mediums. World of Walker blurs the lines between fiction and reality, by inviting the community to grow and interact with an ever-expanding gallery of characters. 

Walker memorialized his first world tour through his movie, Aviation Movie, released in June 2021. The movie combines footage from his sold-out concert at the Oslo Spektrum stadium, with a storyline from World of Walker. Creating a unique, and interactive experience, that merges the world of cinema and music. 

Join the World of Walker and be a part of the movement.
      </p>
       </div>
  </div>
  )
}

export default ArtistAbout