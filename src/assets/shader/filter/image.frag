precision highp float;
uniform vec2 uResolution;
uniform sampler2D uSample;
varying vec2 vTexCoord;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  // uv = 1.0 - uv;
  uv = vec2(uv.x, 1.0 - uv.y);
  vec4 color = texture2D(uSample, uv);
  gl_FragColor = color;
}