import { useDarkVibrantColor } from "@/lib/hooks/colorHooks";
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const backCoverImg = createSlice({
  name: "backCoverImg",
  initialState: {
    imgurl: null,
  },
  reducers: {
    setImageUrl: (state, action) => {
      state.imgurl = action.payload;
    },
  },
});

export const { setImageUrl } = backCoverImg.actions;

export default backCoverImg.reducer;
