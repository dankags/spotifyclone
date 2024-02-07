import { createSlice, configureStore } from '@reduxjs/toolkit'

const library = createSlice({
    name: "library",
    initialState: {
        userLibrary:null
    },
    reducers: {
        setLibrary: (state, action) => {
            state.userLibrary=action.payload
        },
        pushToLibrary: (state, action) => {
            if(!state.userLibrary){
                state.userLibrary=[];
                state.userLibrary.push(action.payload);
                return
             }
             state.userLibrary.push(action.payload)
        },
        filterLibrary:(state,action)=>{
            let filteredArray = state.userLibrary.filter((song) => song !== action.payload);
            if(!state.userLibrary){
               state.userLibrary = [];
               state.userLibrary.filter((item)=>item !== action.payload );
               return
            }
            state.userLibrary=filteredArray;
          },
    }
})

export const { setLibrary, pushToLibrary, filterLibrary } = library.actions

export default library.reducer