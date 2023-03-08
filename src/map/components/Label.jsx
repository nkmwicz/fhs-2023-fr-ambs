import React from "react";
import { useRecoilValue } from "recoil";
import { dates } from "../../components/globalState";

export function Label() {
  const date = useRecoilValue(dates);
  if (date[0] === date[1]) {
    return (
      <div className="label">
        <h1>
          French Ambassadors Abroad <br /> in {date[0]}
        </h1>
      </div>
    );
  }
  return (
    <div className="label">
      <h1>
        French Ambassadors Abroad <br /> from {date[0]} to {date[1]}
      </h1>
    </div>
  );
}
