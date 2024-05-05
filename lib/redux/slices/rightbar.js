import { createSlice, configureStore } from '@reduxjs/toolkit'

const rightbarSlice = createSlice({
  name: 'rightbarSlice',
  initialState: {
    opened:false,
  },
  reducers: {
    openRightbar: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.opened=true;
    },
    closeRightbar: state => {
      state.opened =false
    }
  }
})

export const { openRightbar, closeRightbar } = rightbarSlice.actions
 
export default rightbarSlice.reducer


