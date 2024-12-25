precision highp float;
uniform vec3 uColor;
varying vec2 vTexCoord;
void main(void) {
  vec2 uv = vTexCoord;
  gl_FragColor = vec4(uColor, 1.0);
}