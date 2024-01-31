const { createSlice } = require("@reduxjs/toolkit");

const pageWidth=createSlice({
    name:'pageWidth',
    initialState:{
        width:0
    },
    reducers:{
      setWidth:(state,action)=>{
        state.width= action.payload
      }
    }
})

export const {setWidth}=pageWidth.actions

export default pageWidth.reducer
