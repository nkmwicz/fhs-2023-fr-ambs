import React, { useEffect } from "react";
import "../../App.css";
import SliderUnstyled from "@mui/base/SliderUnstyled";
import { useRecoilState } from "recoil";
import { dates, sliderValue } from "../../components/globalState";

export function RangeSlider() {
  const [years, setYears] = useRecoilState(dates);
  const [value, setValue] = useRecoilState(sliderValue);

  useEffect(() => {
    if (value !== years) {
      setValue(years);
    }
  }, [years]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    setYears(newValue);
  };

  return (
    <div className="sliderBox">
      <div className="values-text">{value[0]}</div>
      <div className="slider-wrapper">
        <SliderUnstyled
          className="slider"
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          getAriaLabel={() => "Date Range"}
          // getAriaValueText={value}
          min={1500}
          max={1600}
        />
      </div>
      <div className="values-text">{value[1]}</div>
    </div>
  );
}
