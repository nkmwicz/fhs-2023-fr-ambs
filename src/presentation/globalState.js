import {
  atom, selector
} from 'recoil';
import eurStates from '../utils/eur_fixed_1500-1600.json';


export const slidesArray = atom({
  key: "slidesArray",
  default: [],
});

export const slideIndex = atom({
  key: "slideIndex",
  default: 0,
});

export const filteredSlide = selector({
  key: "filteredSlide",
  get: ({ get }) => {
    const slides = get(slidesArray);
    const i = get(slideIndex);
    return slides.at(i);
  },
});

export const borderyear = atom({
  key: "borderyear",
  default: 1500,
});

export const sliderValue = atom({
  key: "sliderValue",
  default: 1500,
});;

export const dynastiesMap = atom({
  key: "dynastiesMap",
  default: [],
});;

export const eurStatesMap = atom({
  key: "eurStatesMap",
  default: eurStates.features,
});

export const filteredStates = selector({
  key: "filteredStates",
  get: ({ get }) => {
    const map = get(eurStatesMap);
    const year = get(borderyear);
    // console.log(map)
    const filter = map.filter((d) => (
      d.properties.start <= year
      && d.properties.end >= year
    );
    return filter;;
  },
});
