float PI = 3.14159265359;

uniform float uTime;
uniform float uPlayhead;
uniform vec3 uCameraPosition;

varying vec2 vUv;
varying vec3 vPosition;


float rand(vec2 p) {
  vec2 k1 = vec2(
    23.14069263277926,
    2.665144142690225
  );

  return fract(
    cos(dot(p, k1)) * 12345.6789
  );
}

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float map(float value, float istart, float istop, float ostart, float ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

float lines(vec2 uv, float offset) {
  return smoothstep(
    0.0,
    0.5 + offset * 0.5,
    0.5 * abs((sin(uv.x * 30.0) + offset*2.0))
  );
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m*v;
}

mat2 rotate2D(float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );
}

void main() {
  vec3 color1 = vec3(0.130,	0.160,	0.160);
  // vec3 color2 = vec3(0.500,	0.470,	1.);
  vec3 color2 = vec3(0.701,	0.811,	0.656);

  float threshold = 0.005;

  float fline = sin((vUv.y)*12.0*PI);

  float k = 0.0;
  float sk = 0.0;

  if (fline < 0.0) {
    k = -1.0;
  } else {
    k = 1.0;
  }

  if (abs(fline) < threshold) {
    sk = (threshold - abs(fline))/threshold;

    k = k*(1.0 - sk) + abs(fline) * sk;
  }

  float distanceFromCamera = distance(vPosition, uCameraPosition) * 0.075;
  float fog = 1.0 - clamp(distanceFromCamera, 0.0, 1.0);

  vec3 finalColor = mix(color1, color2, k);
  finalColor = mix(vec3(0.0), finalColor, fog);


  // Luminacence
  float lightsStrengh = 0.5;
  finalColor *= lightsStrengh;
  vec4 color = vec4(finalColor , 1.0);

  // Noise
  // vec2 uvrandom = vUv;
  // uvrandom.y *= rand(vec2(uvrandom.y, 0.2));
  // color.rgb += rand(uvrandom) * 0.2;

  gl_FragColor = color;
}
