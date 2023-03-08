import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  currentSlide,
  dates,
  filteredAmbassadors,
  mapPlace,
  tableExists,
} from "./globalState";
import { groups, max, min } from "d3-array";

export function Table() {
  const [isTable, setIsTable] = useRecoilState(tableExists);
  const [place, setPlace] = useRecoilState(mapPlace);
  const years = useRecoilValue(dates);
  const ambGroups = useRecoilValue(filteredAmbassadors);
  const [groupedAmbs, setGroupedAmbs] = useState([]);

  useEffect(() => {
    if (place) {
      const placeAmbs = ambGroups.find((d) => d.name === place);
      const theAmbs = placeAmbs?.info
        ? Array.from(
            groups(placeAmbs.info, (d) => d.properties.name),
            ([key, value]) => ({ name: key, info: value })
          )
        : [];
      setGroupedAmbs(theAmbs);
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
        <div className="mytable">
          <button className="table-close" onClick={handleClick}>
            X
          </button>
          <h2>{place}</h2>
          <hr />
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
      ) : null}
    </>
  );
}
