const { createSlice } = require("@reduxjs/toolkit");


const currentPlayingUrl = createSlice({
    name: "currentPlayingUrl",
    initialState: {
        playingUrl:null
    },
    reducers: {
        setPlayingUrl: (state, action) => {
            state.playingUrl=action.payload
        }
    }
});

export const { playingUrl, setPlayingUrl } = currentPlayingUrl.actions

export default currentPlayingUrl.reducer