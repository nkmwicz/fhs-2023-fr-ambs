import { deviation, mean } from "d3-array";

export function getHeight(d, ambsGroups, years) {
  const yearSpan = years[1] - years[0] + 1;
  const listValues = ambsGroups.map((b) => b.info.length / yearSpan);
  const info = ambsGroups.find((a) => d.properties.name === a.name);
  const ambs = info?.info.length / yearSpan;
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
  const dev6 = [avg + std + std + std + std, avg + std + std + std + std + std];
  const dev7 = [
    avg + std + std + std + std + std,
    avg + std + std + std + std + std + std,
  ];
  if (ambs && ambs >= dev0[0] && ambs < dev0[1]) return 200;
  if (ambs && ambs >= dev1[0] && ambs < dev1[1]) return 50000;
  if (ambs && ambs >= dev2[0] && ambs < dev2[1]) return 150000;
  if (ambs && ambs >= dev3[0] && ambs < dev3[1]) return 300000;
  if (ambs && ambs >= dev4[0] && ambs < dev4[1]) return 400000;
  if (ambs && ambs >= dev5[0] && ambs < dev5[1]) return 600000;
  if (ambs && ambs >= dev6[0] && ambs < dev6[1]) return 600000;
  if (ambs && ambs >= dev7[0] && ambs < dev7[1]) return 600000;
  return 20;

  // if (!percentage.isNaN) return 75000 * percentage;
}
