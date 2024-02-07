import Vibrant from "node-vibrant";

export async function darkVibrantColor(imageUrl, opacity = 0.3) {
    let dominantColor = null;
    if (imageUrl) {
        const vibrant = new Vibrant(imageUrl)
       await vibrant.getPalette().then((palette) => {
          dominantColor= palette.DarkVibrant.getRgb()
        }).catch((error) => {
            console.log(error);
        })   
    
    
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${opacity <= 0 ? 0 : opacity})`
    } 
    }
      
}

export async function VibrantColor(imageUrl, opacity = 0.3) {
    let dominantColor = null;
    if (imageUrl) {
        const vibrant = new Vibrant(imageUrl)
       await vibrant.getPalette().then((palette) => {
          dominantColor= palette.Vibrant.getRgb()
        }).catch((error) => {
            console.log(error);
        })   
    
    
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${opacity <= 0 ? 0 : opacity})`
    } 
    }
      
}