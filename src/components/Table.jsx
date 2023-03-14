import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  currentSlide,
  dates,
  filteredAmbassadors,
  mapPlace,
  tableExists,
  tableXLoc,
  tableYLoc,
  View,
} from "./globalState";
import { groups, max, min } from "d3-array";
import { styleCircles } from "../map/components/mapStyling";
import { FlyToInterpolator } from "deck.gl";

export function Table() {
  const [isTable, setIsTable] = useRecoilState(tableExists);
  const [place, setPlace] = useRecoilState(mapPlace);
  const years = useRecoilValue(dates);
  const ambGroups = useRecoilValue(filteredAmbassadors);
  const [groupedAmbs, setGroupedAmbs] = useState([]);
  const [placesAmbs, setPlacesAmbs] = useState();
  const [mapView, setMapView] = useRecoilState(View);
  const tableX = useRecoilValue(tableXLoc);
  const tableY = useRecoilValue(tableYLoc);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  //set tableX and TableY to center of screen on window resize
  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (place && styleCircles(place).long) {
      const placeAmbs = ambGroups.find((d) => d.name === place);
      setPlacesAmbs(placeAmbs);
      const theAmbs = placeAmbs?.info
        ? Array.from(
            groups(placeAmbs.info, (d) => d.properties.name),
            ([key, value]) => ({ name: key, info: value })
          )
        : [];
      setGroupedAmbs(theAmbs);
      setMapView({
        ...mapView,
        longitude: styleCircles(place).long,
        latitude: styleCircles(place).lat,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
    if (!place) {
      setMapView({
        ...mapView,
        longitude: 12.496366,
        latitude: 41.902782,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }, [place, years]);
  const slide = useRecoilValue(currentSlide);
  // console.log(groupedAmbs);

  useEffect(() => {
    if (slide && slide.place) {
      setIsTable(true);
      setPlace(slide.place);
    }
    if (isTable && !slide?.place) {
      setIsTable(false);
      setPlace("");
    }
  }, [slide]);

  function handleClick(e) {
    if (e) {
      setIsTable(false);
    }
  }

  return (
    <>
      {isTable ? (
        <div
          className="mytable-wrapper"
          style={{ bottom: windowHeight - tableY, left: tableX }}
        >
          <div className="mytable">
            <div className="table-header">
              <div className="table-h2-wrapper">
                <h2>
                  {place}:{" "}
                  {placesAmbs?.info.length ? placesAmbs.info.length : 0}
                </h2>
              </div>
              <div className="table-close-wrapper">
                <button className="table-close" onClick={handleClick}>
                  X
                </button>
              </div>
            </div>
            <table>
              <tbody>
                {groupedAmbs &&
                  groupedAmbs.map((d, i) => {
                    // console.log(d);
                    if (d) {
                      const years = d.info.map((d) => d.properties.year);
                      return (
                        <tr key={`min/max-li_${i}`}>
                          {min(years) !== max(years) ? (
                            <>
                              <td>{d.name}</td>
                              <td> {`(${min(years)} - ${max(years)})`}</td>
                            </>
                          ) : (
                            <>
                              <td>{d.name}</td>
                              <td> {`(${min(years)})`}</td>
                            </>
                          )}
                        </tr>
                      );
                    }
                    return null;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </>
  );
}
