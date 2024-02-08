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
         //  let filteredArray = state.likedSongs.songs.filter((song) => song !== action.payload);
         state.likedSongs.songs.filter((song) => song !== action.payload);
         // if(!state.likedSongs.songs){
         //    state.likedSongs = [];
         //    state.likedSongs.filter((item)=>item !== action.payload );
         //    return
         // }
         // state.likedSongs=filteredArray;
       },
       pushToLikedSongs:(state,action)=>{
         if(!state.likedSongs){
            state.likedSongs=[];
            state.likedSongs.push(action.payload);
            return
         }
         state.likedSongs.songs.push(action.payload)
       },
       setPlaylist:(state,action)=>{
        state.playlist=action.payload;
       },
       setMusicByPlaylist: (state) => {
         
          if (state.playlist) {
             //bug:playing the nextmusic is not working since it adds music index twice and plays
            //  music after the next
             const playlistLength = state.playlist.length
             const musicindex=state.musicIndex
            
           if(state.musicIndex === 0){
              state.music = state.playlist[state.musicIndex]
              state.musicIndex +=1
             return
           }
           if (state.musicIndex > playlistLength) {
              state.musicIndex =0
              state.music = state.playlist[state.musicIndex]
            return
           }
        
             state.musicIndex += 1 
             state.music = state.playlist[0]
          }
          return
       },
       setMusicBySelect: (state, action) => {
          if (state.playlist) {
             if (state.playlist.some((item)=> item.id===action.payload.id)) {
                const musicindex = state.playlist.findIndex((item)=>item.id===action.payload.id)-1
                console.log(musicindex)
                state.musicIndex = musicindex;
             }
       }
        state.music=action.payload
       },
       playMusic:state=>{
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