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
      state.musicIndex = action.payload % state.playlistLength;
    },
    addMusicIndex: (state) => {
      state.musicIndex = (state.musicIndex + 1) % state.playlistLength; // Ensure the index wraps around
    },
    reduceMusicIndex: (state) => {
      state.musicIndex = (state.musicIndex - 1 + state.playlistLength) % state.playlistLength;
    },
  },
});

export const {setPlaylistLength,reduceMusicIndex,addMusicIndex,setIndexBySelect}=playlistMusicIndex.actions

export default playlistMusicIndex.reducer
