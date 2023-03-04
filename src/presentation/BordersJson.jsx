import { CircleMarker, GeoJSON, Marker, Pane, Polygon, Popup, Tooltip, useMapEvents } from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { borderyear, filteredSlide, filteredStates, sliderValue } from "./globalState";
import flip from "@turf/flip";
import { v4 as uuidv4 } from 'uuid';
import hre1600 from '../utils/hre1600.json';
import { useEffect } from "react";
import { useState } from "react";

export function BordersJson() {
  // const dynasties = dynastiesMap.features;
  const eur = useRecoilValue(filteredStates);
  const [isClosed, setIsClosed] = useState(false);
  const [key, setKey] = useState([]);
  const hre = hre1600.features;
  const slide = useRecoilValue(filteredSlide);
  const [year, setYear] = useRecoilState(borderyear);

  function getColors(d) {
    const colors = slide.colors;
    if (colors) {
      return colors[d] || "rgba(0,0,0,0)"
    }
    return "rgba(0,0,0,0)"
  };

  useEffect(() => {
    const keyArray = []
    for (const [key, value] of Object.entries(slide.colors)) {
      const keyItem = { country: key, color: value }
      keyArray.push(keyItem)
    }
    setKey(keyArray);
  }, [slide])

  function HoverPopup() {
    const map = useMapEvents({
      mousemove(e) {
        const coordinates = e.target;
        console.log(coordinates);
      },
    })
  };

  const changeColor = (e) => {
    e.target.setStyle({ fillColor: "white" });
    // e.target.setStyle({ color: "white" });
  };

  const returnColor = (e) => {
    // console.log(e.target.options.pathOptions)
    e.target.setStyle({ fillColor: e.target.options.pathOptions.fillColor });
    e.target.setStyle({ color: e.target.options.pathOptions.color });
  }

  const pathOptions = {
    color: 'black',
    fillColor: 'blue',
    fillOpacity: 1
  }



  return (
    <>
      {slide.hre && <GeoJSON
        data={hre}
        style={d => ({
          color: 'rgba(0,0,0,1)',
          weight: 5,
          fillColor: 'red',
          fillOpacity: 0.3,
        })}>
      </GeoJSON>}
      {isClosed ? slide.colors && <button
        className="key-button"
        onClick={() => { setIsClosed(false) }}>
        <svg aria-label="map key">
          <path fillRule="evenodd" clipRule="evenodd" d="M21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711L21.1642 4.24999L22.789 5.87475C23.57 6.6558 23.57 7.92213 22.789 8.70317L20.3126 11.1796C19.5315 11.9606 18.2652 11.9606 17.4842 11.1796L15.8594 9.55482L12.7489 12.6653C13.5356 13.7403 14 15.0659 14 16.5C14 20.0899 11.0899 23 7.5 23C3.91015 23 1 20.0899 1 16.5C1 12.9101 3.91015 10 7.5 10C8.9341 10 10.2597 10.4644 11.3347 11.2511L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289ZM17.2736 8.14061L18.8984 9.76537L21.3748 7.28896L19.75 5.6642L17.2736 8.14061ZM7.5 12C5.01472 12 3 14.0147 3 16.5C3 18.9853 5.01472 21 7.5 21C9.98528 21 12 18.9853 12 16.5C12 14.0147 9.98528 12 7.5 12Z" color="black" fill="#000000" />
        </svg>
      </button> :
        <div className="key">
          <div
            type="button"
            aria-label="close"
            onClick={() => { setIsClosed(true) }}
            className="keyClose">
            X
          </div>
          {key.map(d => {
            return (
              <div className="key-items" key={uuidv4()}>
                <div className="keyCircle" style={{ backgroundColor: d.color }}></div>&nbsp;<strong>: {d.country}</strong>
              </div>
            )
          })}
        </div>}
      <>
        {eur.map(feature => {
          const recoords = flip(feature)
          return (
            <Polygon
              key={uuidv4()}
              positions={recoords.geometry.coordinates}
              eventHandlers={{
                mouseover: changeColor,
                mouseout: returnColor
              }}
              pathOptions={{
                color: 'black',
                weight: 1,
                fillOpacity: 1,
                fillColor: getColors(feature.properties.name)
              }}
            >
              <Tooltip>{feature.properties.name}</Tooltip>
              <Popup>{feature.properties.name}</Popup>
            </Polygon>
          )
        })}
      </>
      {/* <HoverPopup /> */}
      {slide.vienna && <Pane name="circles-pane" style={{ zIndex: 499 }}>
        <CircleMarker
          pathOptions={pathOptions}
          center={[48.21, 16.36]}>
          <Popup>Vienna</Popup>
        </CircleMarker>
      </Pane>}
      {slide.mohacs && <Pane name="circles-pane" style={{ zIndex: 499 }}>
        <CircleMarker
          pathOptions={pathOptions}
          center={[45.99, 18.68]}>
          <Popup>Battle of Mohacs</Popup>
        </CircleMarker>
      </Pane>}
      {slide.pavia && <Pane name="circles-pane" style={{ zIndex: 499 }}>
        <CircleMarker
          pathOptions={pathOptions}
          center={[45.18, 9.15]}>
          <Popup>Battle of Pavia</Popup>
        </CircleMarker>
      </Pane>}
      {slide.lepanto && <Pane name="circles-pane" style={{ zIndex: 499 }}>
        <CircleMarker
          pathOptions={pathOptions}
          center={[38.315128542453095, 21.641579527985336]}>
          <Popup>Battle of Pavia</Popup>
        </CircleMarker>
      </Pane>}
      {slide.toulon && <Pane name="circles-pane" style={{ zIndex: 499 }}>
        <CircleMarker
          pathOptions={pathOptions}
          center={[43.12, 5.93]}>
          <Popup>Toulon</Popup>
        </CircleMarker>
      </Pane>}
    </>
  )
};