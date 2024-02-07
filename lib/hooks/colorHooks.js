import Vibrant from "node-vibrant";
// import Image from "next/image";

import { useEffect, useState } from "react";


export function useDarkMutedColor(imageUrl) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
        let vibrant = new Vibrant(imageUrl)
        vibrant.getPalette().then((palette) => {
                setDominantColor(`${palette.DarkMuted.getHex()}`)
            }).catch((error)=>{
                console.log(error);
            })
    },[imageUrl])
   

    return dominantColor
}

export function useLightMutedColor(imageUrl) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
    let vibrant = new Vibrant(imageUrl)
    vibrant.getPalette().then((palette) => {
            setDominantColor(`${palette.LightMuted.getHex()}`)
        }).catch((error)=>{
            console.log(error);
        })
    },[imageUrl])

    return dominantColor
}

export function useVibrantColor(imageUrl,opacity=0) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
    let vibrant = new Vibrant(imageUrl)
    vibrant.getPalette().then((palette) => {
        setDominantColor(`${palette.Vibrant.getRgb()}`)
        }).catch((error)=>{
            console.log(error);
        })
    },[imageUrl])
    if (dominantColor) {
        return `rgba(${dominantColor},${opacity})`
   }
    
}

export function useDarkVibrantColor(imageUrl,opacity=0.3) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
    let vibrant = new Vibrant(imageUrl)
    vibrant.getPalette().then((palette) => {
            setDominantColor(palette.DarkVibrant.getRgb())
        }).catch((error)=>{
            console.log(error);
        })
    },[imageUrl])
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${opacity <= 0 ? 0 : opacity})`
   }
    
}


    


export function useNavBarDarkVibrant(imageUrl){
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
    let vibrant = new Vibrant(imageUrl)
    vibrant.getPalette().then((palette) => {
            setDominantColor(palette.DarkVibrant.getRgb())
        }).catch((error)=>{
            console.log(error);
        })
    },[imageUrl])
    if (dominantColor) {
        return `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`
   }
}

export function useLightVibrantColor(imageUrl) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
    let vibrant = new Vibrant(imageUrl)
    vibrant.getPalette().then((palette) => {
            setDominantColor(`${palette.LightVibrant.getHex()}`)
        }).catch((error)=>{
            console.log(error);
        })
    },[imageUrl])

    return dominantColor
}

