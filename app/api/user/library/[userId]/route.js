import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async (req,{params}) => {
    const { userId } =params
    try {
        let library = null;
        let artists = null;
        const followings = await prisma.following.findMany({
            where: {
                initiateFollowId : userId
            },
            select: {
                followingId: true,
            }
        })
        if (followings) {
            const followingsIds= followings.map((item)=>item.followingId)
             const artistsProfile = await prisma.user.findMany({
                where: {
                    id: {
                    in:followingsIds
                    },
                 },
                 select: {
                    image: true,
                    id: true,
                    name: true,
                    artist: {
                        select: {
                         slug:true   
                        }
                    }
                } 
             })
            artists=artistsProfile
        }
        const likedPlaylist = await prisma.likedPlaylist.findUnique({
            where: {
                userId:userId
            }
        })
        const playlistIds=likedPlaylist?.playlists
        console.log(playlistIds)
        const playLists = await prisma.playlist.findMany({
            where: {
                OR: [
                  {
                    id: {
                      in: playlistIds,
                     },
                  },
                  {
                    creatorId: userId,
                  },
                ],
              },
            select: {
                id: true,
                creatorId:true,
                name: true,
                image: true,
                slug:true
            },

        })
        
        if (playLists && artists) {
             library = artists.concat(playLists)
            
            return NextResponse.json({library:library}, { status: 200 })
            
        }
        if (playLists && !artists) {
            library = playLists
            return NextResponse.json({library:library}, { status: 200 })
        }
        if (!playLists && artists) {
            library = artists
            return NextResponse.json({library:library}, { status: 200 })
        }
        if (!playLists && !artists) {
            library = "no library found"
            return NextResponse.json({library:library}, { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
    
}