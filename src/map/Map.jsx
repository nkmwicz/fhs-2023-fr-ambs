import DeckGL from "@deck.gl/react";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers";
import React from "react";
import { MapView, WebMercatorViewport } from "@deck.gl/core";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  europeFiltered,
  filteredAmbassadors,
  mapPlace,
  tableExists,
  tableXLoc,
  tableYLoc,
  View,
} from "../components/globalState";
import { getHeight } from "./components/getHeight";
import { getHeight2 } from "./components/getHeight2";
import { getAmbsColor } from "./components/getAmbsColor";
import { deviation, mean } from "d3-array";
import oceans from "../mymaps/oceans.json";
import { styleCircles } from "./components/mapStyling";

export function Map() {
  const [viewState, setViewState] = useRecoilState(View);
  const features = useRecoilValue(europeFiltered);
  const ambs = useRecoilValue(filteredAmbassadors);
  const [isTable, setIsTable] = useRecoilState(tableExists);
  const [place, setPlace] = useRecoilState(mapPlace);
  const [tableX, setTableX] = useRecoilState(tableXLoc);
  const [tableY, setTableY] = useRecoilState(tableYLoc);
  const viewport = new WebMercatorViewport({
    ...viewState,
  });

  function getTooltip({ object }) {
    if (object && object.properties.name) {
      const info = ambs.find((a) => {
        return object.properties.name === a.name;
      });
      if (info) return `${object.properties.name} ${info.info.length}`;
      return object.properties.name + " 0";
    }
  }
  function getZ(d) {
    const listValues = ambs.map((d) => d?.info?.length);
    const ambs1 = d.info.length;
    const std = deviation(listValues);
    const avg = mean(listValues);
    const dev0 = [avg - std - std, avg - std];
    const dev1 = [avg - std, avg];
    const dev2 = [avg, avg + std];
    const dev3 = [avg + std, avg + std + std];
    const dev4 = [avg + std + std, avg + std + std + std];
    const dev5 = [avg + std + std + std, avg + std + std + std + std];
    if (ambs1 && ambs1 >= dev0[0] && ambs1 < dev0[1]) return 200;
    if (ambs1 && ambs1 >= dev1[0] && ambs1 < dev1[1]) return 50000;
    if (ambs1 && ambs1 >= dev2[0] && ambs1 < dev2[1]) return 120000;
    if (ambs1 && ambs1 >= dev3[0] && ambs1 < dev3[1]) return 200000;
    if (ambs1 && ambs1 >= dev4[0] && ambs1 < dev4[1]) return 400000;
    if (ambs1 && ambs1 >= dev5[0] && ambs1 < dev5[1]) return 600000;
    return 20;
  }

  const oceansL = React.useMemo(() => oceans, []);

  const bordersLayer = new GeoJsonLayer({
    id: "borders",
    data: features,
    stroked: true,
    pickable: false,
    lineWidthMinPixels: 1,
    getLineWidth: 1,
    getFillColor: [0, 0, 0, 0],
  });

  const memoBorders = React.useMemo(() => bordersLayer, [features]);

  const textLayer = new TextLayer({
    id: "text-layer",
    data: ambs,
    background: true,
    // getBackgroundColor: [255, 0, 0, 0],
    pickable: false,
    billboard: false,
    getPosition: (d) => {
      return [
        d.info[0].geometry.coordinates[0],
        d.info[0].geometry.coordinates[1],
        getZ(d) * 1.1,
        // d.info.length * 1000,
      ];
    },
    getText: (d) => `${d.info.length}`,
    getBorderColor: [0, 0, 0, 255],
    getBorderWidth: 1,
    backgroundPadding: [2, 2],
    getSize: 18,
    getAngle: 0,
    getTextAnchor: "middle",
    getAlignmentBaseline: "center",
  });

  const memoText = React.useMemo(() => textLayer, [ambs]);

  const europeLayer = new GeoJsonLayer({
    id: "europe",
    data: features,
    pickable: true,
    stroked: true,
    color: [0, 0, 0],
    extruded: true,
    autoHighlight: true,
    getElevation: (d) => getHeight(d, ambs),
    // getElevation: (d) => getHeight2(d, ambs),
    lineWidthMinPixels: 2,
    getFillColor: (d) => getAmbsColor(d, ambs),
    getLineWidth: 12,
    updateTriggers: {
      getElevation: ambs,
      getFillColor: ambs,
    },
    onClick: ({ object }) => {
      if (!isTable) {
        setIsTable(true);
        setPlace(object.properties.name);
      } else {
        setPlace(object.properties.name);
      }
    },
  });

  const memoEurope = React.useMemo(() => europeLayer, [features, ambs]);

  const handleMapChange = (e) => {
    setViewState(e.viewState);
    if (place) {
      setTableX(
        viewport.project([styleCircles(place).long, styleCircles(place).lat])[0]
      );
      setTableY(
        viewport.project([styleCircles(place).long, styleCircles(place).lat])[1]
      );
    }
  };

  const oceansLayer = new GeoJsonLayer({
    id: "oceans",
    data: oceansL,
    pickable: true,
    stroked: false,
    extruded: false,
    lineWidthMinPixels: 1,
    getFillColor: [39, 106, 245, 44],
    getLineWidth: 0,
  });

  return (
    <DeckGL
      views={new MapView()}
      controller={{ keyboard: false }}
      viewState={viewState}
      layers={[memoBorders, memoEurope, memoText, oceansLayer]}
      getTooltip={getTooltip}
      pickable={true}
      onViewStateChange={handleMapChange}
    />
  );
}
