import { deviation, mean } from "d3-array";

export function getZ(d, ambsGroups) {
  const listValues = ambsGroups.map((d) => d.info.length);
  // const maxAmbs = max(listValues);
  const ambs = d.info.length;

  const std = deviation(listValues);
  const avg = mean(listValues);
  const dev0 = [avg - std - std, avg - std];
  const dev1 = [avg - std, avg];
  const dev2 = [avg, avg + std];
  const dev3 = [avg + std, avg + std + std];
  const dev4 = [avg + std + std, avg + std + std + std];
  const dev5 = [avg + std + std + std, avg + std + std + std + std];
  if (ambs && ambs >= dev0[0] && ambs < dev0[1]) return 1200;
  if (ambs && ambs >= dev1[0] && ambs < dev1[1]) return 180000;
  if (ambs && ambs >= dev2[0] && ambs < dev2[1]) return 1200000;
  if (ambs && ambs >= dev3[0] && ambs < dev3[1]) return 2200000;
  if (ambs && ambs >= dev4[0] && ambs < dev4[1]) return 3200000;
  if (ambs && ambs >= dev5[0] && ambs < dev5[1]) return 4200000;
  if (d) return d[1].length * 3000;
  // if (!percentage.isNaN) return 400000 * percentage;
  return 20;
}
