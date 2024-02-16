"use client"

import React, { useState } from 'react'

const LikedContainer = ({ musics }) => {
    const [likedMusics, setLikedMusics] = useState(musics)
    const [unlikedSongs, setUnLikedSong] = useState(null)
    const visibleitems=musics > 50 ? likedMusics.slice(0,50):likedMusics 
  return (
    <div>
          <div>
              
          </div>
          {musics.length > 50 ? (
          div
          ):""}
    </div>
  )
}

export default LikedContainer