import { configureStore } from '@reduxjs/toolkit'
import rightbarReducer from './slices/rightbar'
import currentMusicReducer from './slices/currentMusic'
import pageWidthReducer from './slices/pageWidth'
import backCoverImgReducer from './slices/ChangeArtistBackImg'
import libraryReducer from './slices/library'

export const makeStore = () => {
  return configureStore({
    reducer: {
      rightbar: rightbarReducer,
      currentmusic: currentMusicReducer,
      pagewidth: pageWidthReducer,
      artistBackCover: backCoverImgReducer,
      userLibrary:libraryReducer
    },
  });
}

