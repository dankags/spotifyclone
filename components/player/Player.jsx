import React from 'react'
import CurrentMusicCard from './subComp/currentMusicCard';
import MusicControls from './subComp/MusicControls';


export const Player = () => {
  return (
    <>
      <CurrentMusicCard>
        <MusicControls/>
      </CurrentMusicCard>
    
    </>
  )
}
