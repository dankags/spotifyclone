import { createSlice, configureStore } from '@reduxjs/toolkit'

const library = createSlice({
    name: "library",
    initialState: {
        userLibrary:[]
    },
    reducers: {
        setLibrary: (state, action) => {
            
            state.userLibrary=state.userLibrary.concat(action.payload.filter(item=>!state.userLibrary.some(object => object.id === item.id)))
            
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
            let filteredArray = state.userLibrary.filter((item) => item.id !== action.payload.id);
            if(!state.userLibrary){
               state.userLibrary = [];
               state.userLibrary.filter((item)=>item.id !== action.payload.id );
               return
            }
            state.userLibrary=filteredArray;
          },
    }
})

export const { setLibrary, pushToLibrary, filterLibrary } = library.actions

export default library.reducer