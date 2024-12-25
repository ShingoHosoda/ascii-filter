import "./assets/css/ress.css";
import "./assets/css/style.css";
// import { sketchRGB } from "./RGB/sketchRGB";
// import { sketchGradation } from "./Gradation/sketchGradation";
import { sketchSnowWorld } from "./SnowParticle/sketchSnowWorld"
const main = () => {
  // sketchRGB();
  // sketchGradation();
  sketchSnowWorld();
};

window.addEventListener("DOMContentLoaded", main);
