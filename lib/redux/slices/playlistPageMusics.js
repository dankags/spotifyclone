import { createSlice, configureStore } from "@reduxjs/toolkit";

const playlistPageMusics = createSlice({
  name: "library",
  initialState: {
    playlistMusics: [],
  },
  reducers: {
    setPlaylistMusics: (state, action) => {
      state.playlistMusics = state.playlistMusics.concat(
        action.payload.filter(
          (item) => !state.playlistMusics.some((object) => object.id === item.id)
        )
      );
    },
    pushToPlaylist: (state, action) => {
      if (!state.playlistMusics) {
        state.playlistMusics = [];
        state.playlistMusics.push(action.payload);
        return;
      }
      state.playlistMusics.push(action.payload);
    },
    filterFromPlaylist: (state, action) => {
      let filteredArray = state.playlistMusics.filter(
        (item) => item.id !== action.payload.id
      );
      if (!state.playlistMusics) {
        state.playlistMusics = [];
        state.playlistMusics.filter((item) => item.id !== action.payload.id);
        return;
      }
      state.playlistMusics = filteredArray;
    },
  },
});

export const { setPlaylistMusics, pushToPlaylist, filterFromPlaylist } = playlistPageMusics.actions;

export default playlistPageMusics.reducer;
