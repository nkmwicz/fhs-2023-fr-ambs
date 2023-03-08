export function styleCircles(d, latitude) {
  let fillCircle, colorCircle, clusterPopText, long, lat;
  if (d ? d === "Swiss Cantons" : latitude === 46.94) {
    fillCircle = "mediumpurple";
    colorCircle = "black";
    clusterPopText = "<p><strong>Swiss Cantons</strong><p>";
    long = 7.45;
    lat = 46.94;
  } else if (d ? d === "Grisons" : latitude === 46.66) {
    fillCircle = "darkred";
    colorCircle = "black";
    clusterPopText = "<p><strong>Grisons</strong><p>";
    long = 9.63;
    lat = 46.66;
  } else if (d ? d === "Habsburg" : latitude === 48.21) {
    fillCircle = "yellow";
    colorCircle = "black";
    clusterPopText = "<p><strong>Holy Roman Emperor</strong></p>";
    long = 16.36;
    lat = 48.21;
  } else if (d ? d === "England" : latitude === 51.51) {
    fillCircle = "green";
    colorCircle = "black";
    clusterPopText = "<p><strong>England</strong><p>";
    long = -0.12;
    lat = 51.51;
  } else if (d ? d === "Venice" : latitude === 45.44) {
    fillCircle = "darkred";
    colorCircle = "black";
    clusterPopText = "<p><strong>Venice</strong></p>";
    long = 12.33;
    lat = 45.44;
  } else if (d ? d === "Denmark" : latitude === 55.68) {
    fillCircle = "darkkhaki";
    colorCircle = "black";
    clusterPopText = "<p><strong>Denmark</strong></p>";
    long = 12.57;
    lat = 55.68;
  } else if (d ? d === "Ferrara" : latitude === 44.84) {
    fillCircle = "lightpink";
    colorCircle = "black";
    clusterPopText = "<p><strong>Ferrara</strong></p>";
    long = 11.62;
    lat = 44.84;
  } else if (d ? d === "Geneva" : latitude === 46.21) {
    fillCircle = "lightblue";
    colorCircle = "black";
    clusterPopText = "<p><strong>Geneva</strong></p>";
    long = 6.14;
    lat = 46.21;
  } else if (d ? d === "Ottoman Empire" : latitude === 41.01) {
    fillCircle = "white";
    colorCircle = "black";
    clusterPopText = "<p><strong>Ottoman Empire</strong></p>";
    long = 28.96;
    lat = 41.01;
  } else if (d ? d === "Netherlands" : latitude === 52.37) {
    fillCircle = "darkseagreen";
    colorCircle = "black";
    clusterPopText = "<p><strong>Netherlands</strong></p>";
    long = 4.89;
    lat = 52.37;
  } else if (d ? d === "Poland" : latitude === 52.23) {
    fillCircle = "cyan";
    colorCircle = "black";
    clusterPopText = "<p><strong>Poland</strong></p>";
    long = 21.02;
    lat = 52.23;
  } else if (d ? d === "Portugal" : latitude === 38.72) {
    fillCircle = "lemonchiffon";
    colorCircle = "black";
    clusterPopText = "<p><strong>Portugal</strong></p>";
    long = -9.13;
    lat = 38.72;
  } else if (d ? d === "Rome" : latitude === 41.89) {
    fillCircle = "magenta";
    colorCircle = "black";
    clusterPopText = "<p><strong>Rome</strong></p>";
    long = 12.51;
    lat = 41.89;
  } else if (d ? d === "Savoy" : latitude === 45.06) {
    fillCircle = "sandybrown";
    colorCircle = "black";
    clusterPopText = "<p><strong>Savoy</strong></p>";
    long = 7.68;
    lat = 45.06;
  } else if (d ? d === "Saxony" : latitude === 51.05) {
    fillCircle = "beige";
    colorCircle = "black";
    clusterPopText = "<p><strong>Saxony</strong></p>";
    long = 13.34;
    lat = 51.05;
  } else if (d ? d === "Scotland" : latitude === 55.95) {
    fillCircle = "coral";
    colorCircle = "black";
    clusterPopText = "<p><strong>Scotland</strong></p>";
    long = -3.19;
    lat = 55.95;
  } else if (d ? d === "Spain" : latitude === 40.43) {
    fillCircle = "hotpink";
    colorCircle = "black";
    clusterPopText = "<p><strong>Spain</strong></p>";
    long = -3.7;
    lat = 40.43;
  } else if (d ? d === "Tuscany" : latitude === 43.46) {
    fillCircle = "mediumturquoise";
    colorCircle = "black";
    clusterPopText = "<p><strong>Tuscany</strong></p>";
    long = 11.14;
    lat = 43.46;
  } else if (d ? d === "Santa-Fiore" : latitude === 43.77) {
    fillCircle = "navajowhite";
    colorCircle = "black";
    clusterPopText = "<p><strong>Santa-Fiore</strong></p>";
    long = 11.26;
    lat = 43.77;
  } else if (d ? d === "Lorraine" : latitude === 48.76) {
    fillCircle = "deepskyblue";
    colorCircle = "black";
    clusterPopText = "<p><strong>Lorraine</strong></p>";
    long = 6.14;
    lat = 48.76;
  } else if (d ? d === "Urbino" : latitude === 43.72) {
    fillCircle = "teal";
    colorCircle = "black";
    clusterPopText = "<p><strong>Urbino</strong></p>";
    long = 12.63;
    lat = 43.72;
  } else if (d ? d === "Electorate of the Palatine" : latitude === 49.91) {
    fillCircle = "cadetblue";
    colorCircle = "black";
    clusterPopText = "<p><strong>Electorate of the Palatine</strong></p>";
    long = 7.45;
    lat = 49.91;
  } else if (d ? d === "Brandenbourg" : latitude === 52.39) {
    fillCircle = "darkorange";
    colorCircle = "black";
    clusterPopText = "<p><strong>Brandenbourg</strong></p>";
    long = 12.63;
    lat = 52.39;
  } else if (d ? d === "Sweden" : latitude === 59.33) {
    fillCircle = "palevioletred";
    colorCircle = "black";
    clusterPopText = "<p><strong>Sweden</strong></p>";
    long = 18.07;
    lat = 59.33;
  } else if (d ? d === "Mantua" : latitude === 45.17) {
    fillCircle = "royalblue";
    colorCircle = "black";
    clusterPopText = "<p><strong>Mantua</strong></p>";
    long = 10.79;
    lat = 45.17;
  } else if (d ? d === "Wurttemburg" : latitude === 48.55) {
    fillCircle = "red";
    colorCircle = "black";
    clusterPopText = "<p><strong>Wurttemburg</strong></p>";
    long = 9.04;
    lat = 48.55;
  } else if (d ? d === "Spanish Netherlands" : latitude === 50.84) {
    fillCircle = "ivory";
    colorCircle = "black";
    clusterPopText = "<p><strong>Spanish Netherlands</strong></p>";
    long = 4.36;
    lat = 50.84;
  } else if (d ? d === "Fribourg" : latitude === 46.8) {
    fillCircle = "peachpuff";
    colorCircle = "black";
    clusterPopText = "<p><strong>Fribourg</strong></p>";
    long = 7.15;
    lat = 46.8;
  } else if (d ? d === "Hamburg" : latitude === 52.55) {
    fillCircle = "olive";
    colorCircle = "black";
    clusterPopText = "<p><strong>Hamburg</strong></p>";
    long = 9.99;
    lat = 52.55;
  } else if (d ? d === "France" || d === "Paris; France" : latitude === 48.86) {
    fillCircle = "chocolate";
    colorCircle = "black";
    clusterPopText = "<p><strong>Paris; France</strong></p>";
    long = 2.35;
    lat = 48.86;
  }
  return {
    fillCircle,
    colorCircle,
    clusterPopText,
    long,
    lat,
  };
}

export function changeTickText(tickText) {
  // for (let i=0; i< tickText.length; i++) {
  //   tickText[i].style.transform = 'translate(-15px; 25px) rotate(-90deg)';
  if (tickText === "Habsburg") {
    return "Habs.";
  } else if (tickText === "Ottoman Empire") {
    return "Ott.";
  } else if (tickText === "Denmark") {
    return "Den.";
  } else if (tickText === "England") {
    return "Eng.";
  } else if (tickText === "Ferrara") {
    return "Ferr.";
  } else if (tickText === "Geneva") {
    return "Gen.";
  } else if (tickText === "Grisons") {
    return "Gris.";
  } else if (tickText === "Netherlands") {
    return "Neth.";
  } else if (tickText === "Poland") {
    return "Pol";
  } else if (tickText === "Portugal") {
    return "Port.";
  } else if (tickText === "Rome") {
    return "Rome";
  } else if (tickText === "Santa-Fiore") {
    return "St.Fiore.";
  } else if (tickText === "Savoy") {
    return "Sav.";
  } else if (tickText === "Saxony") {
    return "Sax.";
  } else if (tickText === "Scotland") {
    return "Scot.";
  } else if (tickText === "Spain") {
    return "Sp.";
  } else if (tickText === "Swiss Cantons") {
    return "Swiss";
  } else if (tickText === "Tuscany") {
    return "Tus.";
  } else if (tickText === "Urbino") {
    return "Urb.";
  } else if (tickText === "Venice") {
    return "Ven.";
  } else if (tickText === "Wurttemburg") {
    return "Wurt.";
  } else if (tickText === "Lorraine") {
    return "Lor.";
  } else if (tickText === "Brandenbourg") {
    return "Brand.";
  } else if (tickText === "Electorate of the Palatine") {
    return "Pal.";
  } else if (tickText === "Spanish Netherlands") {
    return "Sp.Neth";
  } else if (tickText === "Fribourg") {
    return "Frib.";
  } else if (tickText === "Hamburg") {
    return "Ham.";
  } else if (tickText === "Mantua") {
    return "Mant.";
  } else if (tickText === "Sweden") {
    return "Swe.";
  } else if (tickText === "France" || tickText === "Paris; France") {
    return "Fr.";
  }
}
