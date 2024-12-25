precision highp float;
uniform vec2 uResolution;
uniform sampler2D uSample;
varying vec2 vTexCoord;

float character(float n, vec2 p) {
  p = floor(p * vec2(4.0, 4.0) + 2.5);
  if(clamp(p.x, 0.0, 4.0) == p.x){
    if(clamp(p.y, 0.0, 4.0) == p.y){
      if(int(mod(n / exp2(p.x + 5.0 * p.y), 2.0)) == 1){
        return 1.0;
      }
    }
  }
  return 0.0;
}

float asciiFilter(vec3 color, vec2 uv, float pixelSize) {
  float gray = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;
  
  float n = 65536.0;              // .
  if (gray > 0.2) n = 65600.0;    // :
  if (gray > 0.3) n = 332772.0;   // *
  if (gray > 0.4) n = 15255086.0; // o
  if (gray > 0.5) n = 23385164.0; // &
  if (gray > 0.6) n = 15252014.0; // 8
  if (gray > 0.7) n = 13199452.0; // @
  if (gray > 0.8) n = 11512810.0; // #
  vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);
  return character(n, p);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution;
  // uv = 1.0 - uv;
  uv = vec2(uv.x, 1.0 - uv.y);
  vec4 color = texture2D(uSample, uv);
  vec2 st = uv;
  float pixelSize = 1.0 / 40.0;
  st.x *= uResolution.x / uResolution.y;
  color.rgb *= asciiFilter(color.rgb, st, pixelSize);
  gl_FragColor = color;
}