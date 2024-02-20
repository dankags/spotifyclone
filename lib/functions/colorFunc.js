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

export async function lightVibrantColor(imageUrl, opacity = 0.3) {
    let dominantColor = null;
    if (imageUrl) {
        const vibrant = new Vibrant(imageUrl)
       await vibrant.getPalette().then((palette) => {
          dominantColor= palette.LightVibrant.getRgb()
        }).catch((error) => {
            console.log(error);
        })   
    
    
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${opacity <= 0 ? 0 : opacity})`
    } 
    }
      
}

export async function darkMutedColor(imageUrl, opacity = 0.3) {
    let dominantColor = null;
    if (imageUrl) {
        const vibrant = new Vibrant(imageUrl)
       await vibrant.getPalette().then((palette) => {
          dominantColor= palette.DarkMuted.getRgb()
        }).catch((error) => {
            console.log(error);
        })   
    
    
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${opacity <= 0 ? 0 : opacity})`
    } 
    }
      
}

export async function MutedColor(imageUrl, opacity = 0.3) {
    let dominantColor = null;
    if (imageUrl) {
        const vibrant = new Vibrant(imageUrl)
       await vibrant.getPalette().then((palette) => {
          dominantColor= palette.Muted.getRgb()
        }).catch((error) => {
            console.log(error);
        })   
    
    
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${opacity <= 0 ? 0 : opacity})`
    } 
    }
      
}

export async function lightMutedColor(imageUrl, opacity = 0.3) {
    let dominantColor = null;
    if (imageUrl) {
        const vibrant = new Vibrant(imageUrl)
       await vibrant.getPalette().then((palette) => {
          dominantColor= palette.LightMuted.getRgb()
        }).catch((error) => {
            console.log(error);
        })   
    
    
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${opacity <= 0 ? 0 : opacity})`
    } 
    }
      
}