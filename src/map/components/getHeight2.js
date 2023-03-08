import { deviation, mean } from "d3-array";

export function getHeight2(d, ambsGroups) {
  const listValues = ambsGroups.map((b) => b.info.length);
  const total = listValues.reduce((a, b) => a + b, 0);
  const info = ambsGroups.find((a) => d.properties.name === a.name);
  const ambs = info?.info.length;
  return (ambs / total) * 100 * 20000;

  // if (!percentage.isNaN) return 75000 * percentage;
}
