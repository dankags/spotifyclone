const { createSlice } = require("@reduxjs/toolkit");


const currentMusic=createSlice({
    name:"currentMusic",
    initialState:{
       likedSongs: null,
        playlist:null,
        music:null,
        musicIndex:0,
        playing:false,
        isLiked:false
    },
    reducers:{
       setLikedSongs: (state, action) => { 
          state.likedSongs = action.payload
          state.noOfLikedSongs=state.likedSongs.songs.length
       },
       setPlaylist:(state,action)=>{
        state.playlist=action.payload;
       },
       setMusicByPlaylist: (state, action) => {
          
             const musicindex=action.payload
              state.music = state.playlist[musicindex]
             
          
       },
       setNotByPlayList: (state, action) => {
          console.log(action.payload);
          
          state.music = action.payload;
       },
       setMusicBySelect: (state, action) => {
          if (state.playlist?.length !== 0) {
             
             
             if (state.playlist?.some((item)=> item.id === action.payload.id)) {
                const musicindex = state.playlist?.findIndex((item)=>item.id===action.payload.id)-1
                state.musicIndex = musicindex;
             }   
       }
        state.music=action.payload
       },
       playMusic:state=>{
         if(state.music){
            state.playing = !state.playing
         }
       },
       setPlayMusicValue: (state, action) => {
          state.playing=action.payload
       }
    }
})

export const {
  setLikedSongs,
  playMusic,
  setMusicByPlaylist,
  setMusicBySelect,
  setPlaylist,
  setPlayMusicValue,
  setNotByPlayList,
} = currentMusic.actions;

export default currentMusic.reducer