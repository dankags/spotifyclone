import { configureStore } from '@reduxjs/toolkit'
import rightbarReducer from './slices/rightbar'
import currentMusicReducer from './slices/currentMusic'
import pageWidthReducer from './slices/pageWidth'
export const makeStore = () => {
  return configureStore({
    reducer: {
      rightbar:rightbarReducer,
      currentmusic:currentMusicReducer,
      pagewidth:pageWidthReducer,
    }
  })
}

