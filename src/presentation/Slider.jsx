import SliderUnstyled from '@mui/base/SliderUnstyled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { borderyear, eurStatesMap, filteredSlide, filteredStates, sliderValue } from './globalState';
import { memo, useEffect, useState } from 'react';
import flip from '@turf/flip';
import { v4 as uuidv4 } from 'uuid';


export function Slider() {
  const [year, setYear] = useRecoilState(borderyear);
  const [value, setValue] = useRecoilState(sliderValue);
  const slide = useRecoilValue(filteredSlide);

  useEffect(() => {
    if (slide.year) {
      setValue(slide.year);
      setYear(slide.year);
    }
  }, [slide])

  function handleCommit(e, newValue) {
    setYear(newValue)
  }

  function handleChange(e, newValue) {
    setValue(newValue)
  }
  return (
    <>
      <div style={{ width: '75%', margin: '0 auto', }}>
        <SliderUnstyled
          className={'slider'}
          min={1500}
          max={1600}
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleCommit}
        />
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>{slide.description ? <p>{slide.description} {value}</p> : <p>Europe's Borders: {value}</p>}</div>
    </>
  )
}