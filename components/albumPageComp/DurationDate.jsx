"use client"
import React, { useEffect, useState } from 'react'

const DurationDate = ({album}) => {
    const [duration, setDuration] = useState({
        min: "00",
        sec:"00"
    })
    const [year,setYear]=useState(null)

    useEffect(() => {
        if (album) {
            const durationInMinute = Math.floor((album.duration % 3600) / 60);
            const durationInSecond = Math.floor((album.duration % 3600) % 60);
            const year = new Date(album.uploaded).getFullYear()
            setYear(`${year}`)
            setDuration({
                min: `${
                  durationInMinute < 10 ? `0${durationInMinute}` : `${durationInMinute}`
                }`,
                sec: `${
                  durationInSecond < 10 ? `0${durationInSecond}` : `${durationInSecond}`
                }`,
              });

        }
    }, [album]);

  return (
    <>
          <span className="capitalize"> . {year}</span>
      <span className="capitalize"> . {duration.min}:{duration.sec}</span>
    </>
  );
}

export default DurationDate