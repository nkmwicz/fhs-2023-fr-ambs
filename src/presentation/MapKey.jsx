import { useEffect } from "react";
import { useRecoilValue } from "recoil"
import { filteredSlide } from "./globalState"

export function MapKey() {
  const slide = useRecoilValue(filteredSlide);
  const colorsArray = slide.colors ? Object.entries(slide.colors) : [];
  // useEffect(() => {
  //   createKey();
  // }, [slide]);

  return (
    <div className="map-key">
      {slide.colors && colorsArray.map(color => {
        console.log(color)
        return (
          <div className="map-color"><div style={{ backgroundColor: color[1], border: 'solid black 1px', width: '10px', height: '10px' }}></div>: {color[0]}</div>
        )
      })}
    </div>
  )
}