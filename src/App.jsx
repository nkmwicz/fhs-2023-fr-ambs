/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Arrows,
  cacheImages,
  LoadingSpinner,
  QuickLayout,
  SplitSlideChild,
} from "./presentation";
import {
  slidesArray,
  currentSlide,
  slideArrayIndex,
  europeMap,
  europeFiltered,
  dates,
  ambassadors,
  filteredAmbassadors,
} from "./components/globalState";
import { Map } from "./map/map";
import { RangeSlider } from "./map/components/slider";
import { Label } from "./map/components/Label";
import { Key } from "./map/components/Key";
import { SlideNumber } from "./components/SlideNumber";
import { Table } from "./components/Table";
import { BasicBarChart } from "./components/BasicBarChart";

function App() {
  const [slideState, setSlideState] = useRecoilState(slidesArray);
  const [slideIndex, setSlideIndex] = useRecoilState(slideArrayIndex);
  const [years, setYears] = useRecoilState(dates);
  const [ambs, setAmbs] = useRecoilState(ambassadors);
  const slide = useRecoilValue(currentSlide);
  const filtered = useRecoilValue(europeFiltered);
  const filteredAmbs = useRecoilValue(filteredAmbassadors);

  useEffect(() => {
    // console.log("allCountries", allCountries.length);
    // console.log(groups(filtered, (feature) => feature.properties.name));
  }, [filtered]);

  // const M_Map = useMemo(() => Map, [ambs]);
  const M_Table = useMemo(() => Table, [filtered]);

  useEffect(() => {
    if (slide && slide.start && slide.end) {
      setYears([slide.start, slide.end]);
    }
    if (slide && slide.states) {
      null;
    }
  }, [slide]);

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  function nextSlide(e) {
    if (e && slideIndex < slideState.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
    if (e && slideIndex === slideState.length - 1) {
      setSlideIndex(0);
    }
  }

  function prevSlide(e) {
    if (e && slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
    if (e && slideIndex === 0) {
      setSlideIndex(slideState.length - 1);
    }
  }

  useEffect(() => {
    cacheImages(images);
  }, [images]);

  useEffect(() => {
    async function getSlides() {
      const content = await fetch(
        "https://raw.githubusercontent.com/nkmwicz/content-presentations/main/fhs-2023-fr-ambs.json"
      );
      const jsonContent = await content.json();
      setSlideState(jsonContent.slides);
      setImages(jsonContent.images);
      console.info(jsonContent);

      setLoading(false);
    }
    getSlides();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Arrows handleNextClick={nextSlide} handlePrevClick={prevSlide} />
      {slide && slide.slide && !slide.child ? (
        <QuickLayout slide={slide} />
      ) : null}
      {slide && slide.slide && slide.child ? (
        <div className="main">
          <SplitSlideChild
            title={slide.title}
            subTitle={slide.subTitle}
            textArray={slide.text}
          >
            <BasicBarChart groupedData={filteredAmbs} />
          </SplitSlideChild>
        </div>
      ) : null}
      <Map />
      <Label />
      <RangeSlider />
      <Key />
      <SlideNumber slideNumber={slide.number} />
      <M_Table />
    </div>
  );
}

export default App;
