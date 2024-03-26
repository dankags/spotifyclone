const { createSlice } = require("@reduxjs/toolkit");

const playlistMusicIndex = createSlice({
  name: "playlistMusicIndex",
  initialState: {
    musicIndex: 0,
    playlistLength: 0,
  },
  reducers: {
    setPlaylistLength: (state, action) => {
      state.playlistLength = action.payload;
    },
    setIndexBySelect: (state, action) => {
      const setIndex = action.payload % state.playlistLength;
      state.musicIndex = setIndex
    },
    addMusicIndex: (state) => {
      const nextIndex=(state.musicIndex + 1) % state.playlistLength;
      state.musicIndex = nextIndex; // Ensure the index wraps around
    },
    reduceMusicIndex: (state) => {
      const prevIndex=(state.musicIndex - 1 + state.playlistLength) % state.playlistLength;
      state.musicIndex =prevIndex
    },
  },
});

export const {setPlaylistLength,reduceMusicIndex,addMusicIndex,setIndexBySelect}=playlistMusicIndex.actions

export default playlistMusicIndex.reducer
