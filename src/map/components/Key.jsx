import React from "react";
import { useRecoilValue } from "recoil";
import { filteredAmbassadors } from "../../components/globalState";
import { styleCircles, changeTickText } from "./mapStyling";

export function Key() {
  const ambs = useRecoilValue(filteredAmbassadors);

  return (
    <div className="key">
      <div className="key-title">
        <h2>Key</h2>
      </div>
      <div className="key-body">
        {ambs.map((d, i) => {
          return (
            <div className="key-item" key={`key-item${i}`}>
              <div>{changeTickText(d.name)}:</div>
              <div
                style={{
                  backgroundColor: styleCircles(d.name).fillCircle,
                  border: "solid black 1px",
                  borderRadius: "50%",
                  height: "15px",
                  width: "15px",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
