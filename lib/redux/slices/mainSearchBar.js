const { createSlice } = require("@reduxjs/toolkit");

const searchBarInputController= createSlice({
  name: "pageWidth",
  initialState: {
    searchInputvalue:null,
  },
  reducers: {
    setSearchinputValue: (state, action) => {
      state.searchInputvalue = action.payload;
    },
  },
});

export const { setSearchinputValue } = searchBarInputController.actions;

export default searchBarInputController.reducer;
