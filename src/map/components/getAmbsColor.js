import { colorToRGBA } from "./colorToRGBA";
import { styleCircles } from "./mapStyling";

export function getAmbsColor(d, ambsGroups) {
  const info = ambsGroups.find((a) => d.properties.name === a.name);
  const ambs = info?.info.length;
  if (ambs > 0) {
    return colorToRGBA(styleCircles(d.properties.name).fillCircle);
  }
  return [0, 0, 0, 0];
}
