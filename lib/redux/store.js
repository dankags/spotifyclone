import { configureStore } from '@reduxjs/toolkit'
import rightbarReducer from './slices/rightbar'
import currentMusicReducer from './slices/currentMusic'
import pageWidthReducer from './slices/pageWidth'
import backCoverImgReducer from './slices/ChangeArtistBackImg'
import libraryReducer from './slices/library'
import toBeFilteredReducer from './slices/FilterMusic'
import likedMusicsReducer from './slices/likedSongs'
import playlistMusicIndexReducer from './slices/playlistMusicIndex'
import followingsReducer from './slices/followings'
import currentPlayingUrlReducer from "./slices/currentPlayingUrl"

export const makeStore = () => {
  return configureStore({
    reducer: {
      rightbar: rightbarReducer,
      currentmusic: currentMusicReducer,
      pagewidth: pageWidthReducer,
      artistBackCover: backCoverImgReducer,
      userLibrary: libraryReducer,
      filterComponent: toBeFilteredReducer,
      likedMusics: likedMusicsReducer,
      musicIndex: playlistMusicIndexReducer,
      userFollowings:followingsReducer,
      urlPlaying:currentPlayingUrlReducer,
    },
  });
}

