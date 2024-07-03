export const starVertexShader = `
  attribute vec3 color;
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 600.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }`;

export const starFragmentShader = `
  varying vec3 vColor;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5)) * 2.0;
    float distanceToCenterAlpha = 1.0 - clamp(distanceToCenter, 0.0, 1.0);
    distanceToCenterAlpha = pow(distanceToCenterAlpha, 2.0);
    gl_FragColor = vec4( vColor, distanceToCenterAlpha );
  }`;
