import { createSlice, configureStore } from "@reduxjs/toolkit";

const following = createSlice({
  name: "followings",
  initialState: {
    followings: [],
  },
  reducers: {
    setFollowings: (state, action) => {
      state.followings = state.followings.concat(
        action.payload.filter(
          (item) => !state.followings.some((object) => object.id === item.id)
        )
      );
    },
    pushToFollowings: (state, action) => {
      if (!state.followings) {
        state.followings = [];
        state.followings.push(action.payload);
        return;
      }
      state.followings.push(action.payload);
    },
    filterFollowings: (state, action) => {
      let filteredArray = state.followings.filter(
        (item) => item.id !== action.payload.id
      );
      if (!state.followings) {
        state.followings = [];
        state.followings.filter((item) => item.id !== action.payload.id);
        return;
      }
      state.followings = filteredArray;
    },
  },
});

export const { setFollowings, pushToFollowings, filterFollowings } = following.actions;

export default following.reducer;
