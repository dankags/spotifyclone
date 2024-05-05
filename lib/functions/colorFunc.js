import Vibrant from "node-vibrant";

export async function darkVibrantColor(imageUrl, opacity = 0.3) {
       return new Promise((resolve, reject) => {
         const vibrant = new Vibrant(imageUrl, {
           colorCount: 200,
           quality: 10,
         });
         vibrant
           .getPalette()
           .then((palette) => {
             const dominantColor = palette.DarkVibrant.getRgb();
             resolve(
               `rgba(${dominantColor[0]},${dominantColor[1]},${
                 dominantColor[2]
               },${opacity <= 0 ? 0 : opacity})`
             );
           })
           .catch((error) => {
             reject(error);
           });
       });
     
}

export async function VibrantColor(imageUrl, opacity = 0.3) {
    let dominantColor = null;
    if (imageUrl) {
        const vibrant = new Vibrant(imageUrl, { colorCount: 100, quality: 10 });
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
        const vibrant = new Vibrant(imageUrl, { colorCount: 100, quality: 10 });
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
        const vibrant = new Vibrant(imageUrl, { colorCount: 100, quality: 10 });
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
    return new Promise((resolve, reject) => {
      const vibrant = new Vibrant(imageUrl, {
        colorCount: 200,
        quality: 10,
      });
      vibrant
        .getPalette()
        .then((palette) => {
          const dominantColor = palette.Muted.getRgb();
          resolve(
            `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${
              opacity <= 0 ? 0 : opacity
            })`
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
      
}

export async function lightMutedColor(imageUrl, opacity = 0.3) {
    let dominantColor = null;
    if (imageUrl) {
        const vibrant = new Vibrant(imageUrl, { colorCount: 100, quality: 10 });
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