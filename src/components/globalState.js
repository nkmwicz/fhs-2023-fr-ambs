import europe from "../mymaps/europe16c.json";
import { atom, selector } from "recoil";
import ambs16c from "../mymaps/ambs.json";
import { groups } from "d3-array";

const europeFeatures = europe.features;

// what is the lat and long

export const View = atom({
  key: "view",
  default: {
    latitude: 41.902782,
    longitude: 12.496366,
    zoom: 4,
    pitch: 30,
    bearing: 0,
  },
});

export const europeMap = atom({
  key: "europeMap",
  default: europeFeatures,
});

export const dates = atom({
  key: "dates",
  default: [1500, 1600],
});

export const sliderValue = atom({
  key: "sliderValue",
  default: [1500, 1600],
});

export const europeFiltered = selector({
  key: "europeFiltered",
  get: ({ get }) => {
    const map = get(europeMap);
    const [start, end] = get(dates);
    const filtered = map.filter((feature) => {
      return feature.properties.start <= end && feature.properties.end >= start;
    });
    function filterSmallest(arr) {
      const smallest = arr.reduce((acc, curr) => {
        if (
          !acc[curr.properties.name] ||
          acc[curr.properties.area] > curr.properties.area
        ) {
          acc[curr.properties.name] = curr;
        }
        return acc;
      }, {});

      return Object.values(smallest);
    }
    return filterSmallest(filtered);
  },
});

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

export const ambassadors = atom({
  key: "ambassadors",
  default: ambs16c,
});

export const filteredAmbassadors = selector({
  key: "filteredAmbassadors",
  get: ({ get }) => {
    const ambs = get(ambassadors);
    const years = get(dates);
    const filtered = ambs.filter((amb) => {
      return amb.properties.year >= years[0] && amb.properties.year <= years[1];
    });
    const grouped = Array.from(
      groups(filtered, (amb) => amb.properties.place),
      ([key, value]) => ({
        name: key,
        info: value,
      })
    );
    return grouped;
  },
});

export const tableExists = atom({
  key: "tableExists",
  default: false,
});

export const mapPlace = atom({
  key: "mapPlace",
  default: "",
});

export const mapStates = atom({
  key: "mapStates",
  default: [],
});

export const tableYLoc = atom({
  key: "tableYLoc",
  default: 0,
});

export const tableXLoc = atom({
  key: "tableXLoc",
  default: 0,
});
