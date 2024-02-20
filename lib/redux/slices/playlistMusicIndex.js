const { createSlice } = require("@reduxjs/toolkit");

const playlistMusicIndex=createSlice({
    name:'playlistMusicIndex',
    initialState:{
        musicIndex: 0,
        playlistLength:0
        
    },
    reducers:{
        setPlaylistLength: (state, action) => {
            state.playlistLength=action.payload
        },
        setIndexBySelect: (state, action) => {
           const index=action.payload 
            state.musicIndex = index + 1
            if (state.musicIndex > state.playlistLength) {
                state.musicIndex=0
            }
        }, 
        addMusicIndex: (state) => {
            state.musicIndex += 1
            if (state.musicIndex > state.playlistLength) {
                state.musicIndex=0
            }
        },
        reduceMusicIndex: (state) => {
            state.musicIndex -= 1
            if (state.musicIndex < 0) {
                state.musicIndex=state.playlistLength
            }
        },
    },
   
})

export const {setPlaylistLength,reduceMusicIndex,addMusicIndex,setIndexBySelect}=playlistMusicIndex.actions

export default playlistMusicIndex.reducer
