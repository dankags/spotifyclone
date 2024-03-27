const { createSlice } = require("@reduxjs/toolkit");


const currentPlayingUrl = createSlice({
    name: "currentPlayingUrl",
    initialState: {
        playingUrl: null,
        id:null
    },
    reducers: {
        setPlayingUrl: (state, action) => {
            state.playingUrl=action.payload
        },
        setPlayngId: (state, action) => {
            state.id=action.payload
        }
    }
});

export const { playingUrl,id, setPlayingUrl,setPlayngId } = currentPlayingUrl.actions

export default currentPlayingUrl.reducer