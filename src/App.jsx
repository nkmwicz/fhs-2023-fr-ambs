/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from "react";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Arrows,
  cacheImages,
  LoadingSpinner,
  QuickLayout,
} from "./presentation";
import {
  slidesArray,
  currentSlide,
  slideArrayIndex,
} from "./components/globalState";

function App() {
  const [slideState, setSlideState] = useRecoilState(slidesArray);
  const [slideIndex, setSlideIndex] = useRecoilState(slideArrayIndex);
  const slide = useRecoilValue(currentSlide);
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
      const response = await fetch(
        "https://raw.githubusercontent.com/nkmwicz/content-presentations/main/fhs-2023-fr-ambs.json"
      );
      const json = await response.json();
      setSlideState(json.slides);
      setImages(json.images);
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
      {slide && slide.slide ? <QuickLayout slide={slide} /> : null}
    </div>
  );
}

export default App;
