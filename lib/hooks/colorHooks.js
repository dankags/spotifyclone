import Vibrant from "node-vibrant";
import { useEffect, useState } from "react";


export function useDarkMutedColor(imageUrl) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
        const getColor = async () => {
            let vibrant = new Vibrant(imageUrl, {
              colorCount: 100,
              quality: 10,
            });
            await vibrant.getPalette().then((palette) => {
                setDominantColor(`${palette.DarkMuted.getHex()}`)
            }).catch((error)=>{
                console.log(error);
            }) 
        }
       getColor()
    },[imageUrl])
   

    return dominantColor
}

export function useMutedColor(imageUrl) {
  const [dominantColor, setDominantColor] = useState(null);
  useEffect(() => {
    const getColor = async () => {
      let vibrant = new Vibrant(imageUrl, {
        colorCount: 100,
        quality: 10,
      });
      await vibrant
        .getPalette()
        .then((palette) => {
          setDominantColor(`${palette.Muted.getHex()}`);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getColor();
  }, [imageUrl]);

  return dominantColor;
}

export function useLightMutedColor(imageUrl) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
        const getColor = async () => {
            let vibrant = new Vibrant(imageUrl, {
              colorCount: 100,
              quality: 10,
            });
            await vibrant.getPalette().then((palette) => {
            setDominantColor(`${palette.LightMuted.getHex()}`)
        }).catch((error)=>{
            console.log(error);
        })
        }
        getColor()
    },[imageUrl])

    return dominantColor
}

export function useVibrantColor(imageUrl,opacity=0) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
        const getColor = async () => {
            let vibrant = new Vibrant(imageUrl, {
              colorCount: 100,
              quality: 10,
            });
            await vibrant.getPalette().then((palette) => {
                setDominantColor(`${palette.Vibrant.getRgb()}`)
                }).catch((error)=>{
                    console.log(error);
                })
        }
        getColor()
    },[imageUrl])
    if (dominantColor) {
        return `rgba(${dominantColor},${opacity})`
   }
    
}

export function useDarkVibrantColor(imageUrl,opacity=0.3) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
        const getColor = async () => {
            let vibrant = new Vibrant(imageUrl, {
              colorCount: 200,
              quality: 10,
            });
            await vibrant.getPalette().then((palette) => {
                    setDominantColor(palette.DarkVibrant.getRgb())
                }).catch((error)=>{
                    console.log(error);
                })
        }
        getColor()
    },[imageUrl])
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},${opacity <= 0 ? 0 : opacity})`
   }
    
}


    


export function useNavBarDarkVibrant(imageUrl){
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
        const getColor = async () => {
            let vibrant = new Vibrant(imageUrl, {
              colorCount: 100,
              quality: 10,
            });
            await vibrant.getPalette().then((palette) => {
                    setDominantColor(palette.DarkVibrant.getRgb())
                }).catch((error)=>{
                    console.log(error);
                })
        }
        getColor()
    },[imageUrl])
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]},1.8)`
   }
}

export function useNavBarVibrant(imageUrl){
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
        const getColor = async () => {
            let vibrant = new Vibrant(imageUrl, {
              colorCount: 100,
              quality: 10,
            });
            await vibrant.getPalette().then((palette) => {
                    setDominantColor(palette.Vibrant.getRgb())
                }).catch((error)=>{
                    console.log(error);
                })
    }    
    getColor()
    },[imageUrl])
    if (dominantColor) {
        return `rgba(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`
   }
}

export function useLightVibrantColor(imageUrl) {
    const [dominantColor, setDominantColor] = useState(null)
    useEffect(() => {
        const getColor = async () => {
            let vibrant = new Vibrant(imageUrl, {
              colorCount: 100,
              quality: 10,
            });
            await vibrant.getPalette().then((palette) => {
                    setDominantColor(`${palette.LightVibrant.getHex()}`)
                }).catch((error)=>{
                    console.log(error);
                })
      }  
      getColor()
    },[imageUrl])

    return dominantColor
}

