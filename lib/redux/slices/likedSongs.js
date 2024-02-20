import { createSlice, configureStore } from '@reduxjs/toolkit'

const likedMusics = createSlice({
  name: 'likedMusics',
  initialState: {
      likedMusics: null,
      likedMusicsLength:0
  },
  reducers: {
    setLikedMusics: (state,action) => {
          state.likedMusics = action.payload;
          state.likedMusicsLength=state.likedMusics?.length
    },
    filterLikedMusics: (state, action) => { 
       const filteredMusics=state.likedMusics.filter((song) => song !== action.payload);
        state.likedMusics=filteredMusics
        state.likedMusicsLength -= 1
      },
    pushToLikedMusics: (state, action) => {
          if (!state.likedMusics) {
              state.likedMusics = [];
              state.likedMusics.push(action.payload);
              state.likedMusicsLength = state.likedMusics?.length
              return
          }
          state.likedMusics.push(action.payload)
          state.likedMusicsLength+=1
      }
  }
})

export const {  filterLikedMusics, pushToLikedMusics,setLikedMusics } = likedMusics.actions
 
export default likedMusics.reducer