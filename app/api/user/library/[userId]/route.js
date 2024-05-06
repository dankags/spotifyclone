import { authOptions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async (req,{params}) => {
    const { userId } =params
    const {user} = await getServerSession(authOptions)
    
    try {
        
        if(!user){return NextResponse.json("you have not autheticated",{status:401})}
        if(user.id !== userId){return NextResponse.json("cannot fetch others Library", { status: 403 })}
        let library = null;
        let artists = null;
        let artist=null
        const isArtist = await prisma.artist.findUnique({
            where: {
                userId:userId
            },
            select: {
                slug: true,
                userId:true
            }
        })
        if (isArtist) {
            const artistInfo = await prisma.user.findUnique({
                where: {
                    id:isArtist.userId
                },
                select: {
                    image: true,
                    name: true,
                    id:true
                }

            })
            artist={slug:isArtist.slug,...artistInfo}
        }
        const followings = await prisma.follow.findMany({
            where: {
                followerId : userId
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
            if (artist) {
                library.push(artist)
            }
            
            return NextResponse.json({library:library}, { status: 200 })
            
        }
        if (playLists && !artists) {
            library = playLists
            if (artist) {
                library.push(artist)
            }
            return NextResponse.json({library:library}, { status: 200 })
        }
        if (!playLists && artists) {
            library = artists
            if (artist) {
                library.push(artist)
            }
            return NextResponse.json({library:library}, { status: 200 })
        }
        if (!playLists && !artists) {
            library = "no library found"
            if (artist) {
                library = [artist]
                return NextResponse.json({ library: library }, { status: 200 })
            }
            return NextResponse.json({library:library}, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
    
}