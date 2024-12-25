import P5 from "p5";
import { Mover } from "./Mover";
import BaseVertexShader from "../assets/shader/filter/base.vert?raw";
import ImageFilter from "../assets/shader/filter/ascii.frag?raw";
export const sketchMover = () => {
  const sketch = (p: P5) => {
    let canvas: P5.Graphics;
    let movers: Mover[];
    let filterShader: P5.Shader;
    // let flag: boolean;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.noStroke();
      canvas = p.createGraphics(p.width, p.height, p.WEBGL);
      canvas.noStroke();
      filterShader = p.createShader(BaseVertexShader, ImageFilter);
      movers = [];
      for (let i = 0; i < 100; i++) {
        const diameter = p.random(20, 50);
        const x = p.random(-p.width * 0.5, p.width * 0.5);
        const y = p.height * 0.5 + diameter;
        const position = p.createVector(x, y);
        const speedX = 0;
        const speedY = p.random(4, 6.5);
        const velocity = p.createVector(speedX, speedY);
        movers.push(new Mover(canvas, position, velocity, diameter));
      }
    };

    p.draw = () => {
      p.background(0, 0, 0);
      canvas.background("#190057");
      
      movers.map((mover) => {
        mover.update();
        mover.draw();
        mover.isCheckEdge();
      });

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
}