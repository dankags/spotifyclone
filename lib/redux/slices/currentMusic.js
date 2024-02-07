const { createSlice } = require("@reduxjs/toolkit");


const currentMusic=createSlice({
    name:"currentMusic",
    initialState:{
        likedSongs:null,
        playlist:null,
        music:null,
        musicIndex:0,
        playing:false,
        isLiked:false
    },
    reducers:{
       setLikedSongs: (state, action) => { 
         state.likedSongs=action.payload
       },
       filterLikedSongs:(state,action)=>{
          let filteredArray = state.likedSongs.filter((song) => song !== action.payload);
        
         if(!state.likedSongs){
            state.likedSongs = [];
            state.likedSongs.filter((item)=>item !== action.payload );
            return
         }
         state.likedSongs=filteredArray;
       },
       pushToLikedSongs:(state,action)=>{
         if(!state.likedSongs){
            state.likedSongs=[];
            state.likedSongs.push(action.payload);
            return
         }
         state.likedSongs.push(action.payload)
       },
       setPlaylist:(state,action)=>{
        state.playlist=action.payload;
       },
       setMusicByPlaylist:(state)=>{
        if (state.playlist) {
           if(state.musicIndex === 0){
            state.music=state.playlist.musics[state.musicIndex]
            return
        }
           state.musicIndex +=1
           if (state.musicIndex >= state.playlist?.musics.length) {
            state.musicIndex =0
            state.music=state.music=state.playlist.musics[state.musicIndex]
            return
           }
           state.music=state.playlist.musics[state.musicIndex]
        }
       },
       setMusicBySelect:(state,action)=>{
        state.music=action.payload
       },
       playMusic:(state)=>{
         if(state.music){
            state.playing = !state.playing
         }
       }
    }
})

export const {
  setLikedSongs,
  pushToLikedSongs,
  playMusic,
  setMusicByPlaylist,
  setMusicBySelect,
  setPlaylist,
  filterLikedSongs,
} = currentMusic.actions;

export default currentMusic.reducer