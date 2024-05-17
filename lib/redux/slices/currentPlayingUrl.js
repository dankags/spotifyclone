const { createSlice } = require("@reduxjs/toolkit");


const currentPlayingUrl = createSlice({
    name: "currentPlayingUrl",
    initialState: {
        playingUrl: null,
        id:null,
        name:null
    },
    reducers: {
        setPlayingUrl: (state, action) => {
            state.playingUrl=action.payload
        },
        setPlayngId: (state, action) => {
            state.id=action.payload
        },
        setPlayingUrlName: (state, action) => {
            console.log(action.payload);
            
            state.name=action.payload
        }
    }
});

export const { playingUrl,id,name, setPlayingUrl,setPlayngId,setPlayingUrlName } = currentPlayingUrl.actions

export default currentPlayingUrl.reducer