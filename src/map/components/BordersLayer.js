import React from "react";
import { useRecoilValue } from "recoil";
import { europeFiltered } from "../../components/globalState";
import { GeoJsonLayer } from "@deck.gl/layers";

export function BordersLayer() {
  const features = useRecoilValue(europeFiltered);

  return (
    <GeoJsonLayer
      id="borders"
      data={features}
      stroked={true}
      pickable={true}
      lineWidthMinPixels={1}
      getLineWidth={1}
      getFillColor="[0, 0, 0, 0]"
    />
  );
}
