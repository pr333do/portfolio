#define PI 3.14159265359

uniform float uTime;
uniform float uPlayhead;

varying vec2 vUv;
varying vec3 vPosition;

void main()
{
  vUv = uv;
  vPosition = position;

  vec4 projectedPosition =
    projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectedPosition;
}