import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Arrows,
  CenteredSlide,
  Intro,
  SplitSlide,
  SplitSlideChild,
  SplitSlideEmbed,
  QuickLayout,
} from "./index";

import { BordersJson } from "./BordersJson";
import {
  borderyear,
  filteredSlide,
  filteredStates,
  slideIndex,
  slidesArray,
} from "./globalState";
import { LeafletMap } from "./LeafletMap";

export function Layout() {
  const [index, setIndex] = useRecoilState(slideIndex);
  const eur = useRecoilValue(filteredStates);
  const slides = useRecoilValue(slidesArray);
  const slide = useRecoilValue(filteredSlide);
  const mapBoxRef = useRef();

  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const mapRef = useRef();

  const M_BordersJson = useMemo(() => BordersJson, []);

  const M_LeafletMap = useMemo(() => LeafletMap, [eur]);

  const rightArrow = () => {
    if (index !== slides.length - 1) {
      setIndex(index + 1);
    }
  };
  const leftArrow = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    if (mapBoxRef.current) {
      console.log(mapBoxRef.current.offSetHeight);
    }
  });

  return (
    <div className="main">
      <div className="slide-number">
        <p>
          Slide
          {slide.number}
        </p>
      </div>
      <Arrows handleNextClick={rightArrow} handlePrevClick={leftArrow} />
      {slide.slide && <QuickLayout slide={slide} bgColor="black" />}
      {slide.splitChild && (
        <SplitSlideChild
          title={slide.title}
          textArray={slide.text}
          subTitle={slide.subTitle}
        >
          <M_LeafletMap>
            <M_BordersJson />
          </M_LeafletMap>
        </SplitSlideChild>
      )}
    </div>
  );
}
