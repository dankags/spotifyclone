const { createSlice } = require("@reduxjs/toolkit");

const toBeFiltered=createSlice({
    name:'pageWidth',
    initialState:{
      componentId:null
    },
    reducers:{
      setComponentId:(state,action)=>{
        state.componentId= action.payload
      }
    }
})

export const {setComponentId}=toBeFiltered.actions

export default toBeFiltered.reducer