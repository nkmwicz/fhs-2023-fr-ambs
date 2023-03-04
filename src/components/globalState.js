import { atom, selector } from "recoil";

export const slidesArray = atom({
  key: "slidesArray",
  default: [],
});

export const slideArrayIndex = atom({
  key: "slideArrayIndex",
  default: 0,
});

export const currentSlide = selector({
  key: "currentSlide",
  get: ({ get }) => {
    const index = get(slideArrayIndex);
    const slides = get(slidesArray);
    return slides[index];
  },
});
