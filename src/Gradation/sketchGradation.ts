import P5 from "p5";
import BaseVertexShader from "../assets/shader/filter/base.vert?raw";
import ColorFragmentShader from "../assets/shader/material/gradation.frag?raw";
import ImageFilter from "../assets/shader/filter/ascii.frag?raw";
export const sketchGradation = () => {
  const sketch = (p: P5) => {
    let canvas: P5.Graphics;
    let colorShader: P5.Shader, filterShader: P5.Shader;
    // let flag: boolean;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.noStroke();
      canvas = p.createGraphics(p.width, p.height, p.WEBGL);
      canvas.noStroke();
      colorShader = canvas.createShader(BaseVertexShader, ColorFragmentShader);
      filterShader = p.createShader(BaseVertexShader, ImageFilter);
    };

    p.draw = () => {
      p.background(0, 0, 0);
      canvas.background(0, 0, 0);
      canvas.shader(colorShader);
      canvas.push();
      canvas.translate(-canvas.width * 0.5, -canvas.height * 0.5);
      canvas.rect(0, 0, canvas.width, canvas.height);
      canvas.resetShader();
      canvas.pop();

      p.push();
      p.shader(filterShader);
      filterShader.setUniform("uResolution", [p.width, p.height]);
      filterShader.setUniform("uSample", canvas);
      p.translate(-p.width * 0.5, -p.height * 0.5);
      p.rect(0, 0, p.width, p.height);
      p.resetShader();
      p.pop();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      canvas.resizeCanvas(p.width, p.height);
    };
  };
  new P5(sketch);
};
