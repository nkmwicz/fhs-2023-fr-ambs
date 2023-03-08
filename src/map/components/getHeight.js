import { deviation, mean } from "d3-array";

export function getHeight(d, ambsGroups) {
  const listValues = ambsGroups.map((b) => b.info.length);
  const info = ambsGroups.find((a) => d.properties.name === a.name);
  const ambs = info?.info.length;
  // const maxAmbs = max(listValues);
  // console.log(ambs);

  // const percentage = ambs / maxAmbs;
  // console.log(percentage);

  const std = deviation(listValues);
  const avg = mean(listValues);
  const dev0 = [avg - std - std, avg - std];
  const dev1 = [avg - std, avg];
  const dev2 = [avg, avg + std];
  const dev3 = [avg + std, avg + std + std];
  const dev4 = [avg + std + std, avg + std + std + std];
  const dev5 = [avg + std + std + std, avg + std + std + std + std];
  if (ambs && ambs >= dev0[0] && ambs < dev0[1]) return 200;
  if (ambs && ambs >= dev1[0] && ambs < dev1[1]) return 30000;
  if (ambs && ambs >= dev2[0] && ambs < dev2[1]) return 120000;
  if (ambs && ambs >= dev3[0] && ambs < dev3[1]) return 200000;
  if (ambs && ambs >= dev4[0] && ambs < dev4[1]) return 400000;
  if (ambs && ambs >= dev5[0] && ambs < dev5[1]) return 600000;
  return 20;

  // if (!percentage.isNaN) return 75000 * percentage;
}
