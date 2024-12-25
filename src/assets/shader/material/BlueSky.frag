precision highp float;
varying vec2 vTexCoord;
void main(void) {
  vec2 uv = vTexCoord;
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}