import { ShaderMaterial } from "three";
import * as THREE from "three";
class StarMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: { time: { value: 0.0 }, fade: { value: 1.0 } },
      vertexShader: /* glsl */ `
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,
      fragmentShader: /* glsl */ `
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
      }`,
      // #include <${
      // version >= 154 ? "colorspace_fragment" : "encodings_fragment"
      // }>
    });
  }
}

function genStarField(radius: number) {
  const theta = THREE.MathUtils.randFloatSpread(360);
  const phi = THREE.MathUtils.randFloatSpread(360);
  const x = radius * Math.sin(theta) * Math.cos(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(theta);
  return new THREE.Vector3(x, y, z);
}

export class Star {
  private material: StarMaterial;
  private fade: false;
  private model: THREE.Object3D;
  private factor = 4;
  private depth = 50;
  private saturation = 0;
  private speed = 1;

  constructor(
    private initPosition: Float32Array = new Float32Array(0),
    private count: number = 3000,
    private color = "white",
    private radius = 100
  ) {
    this.fade = false;
    this.color = color;
    this.count = count;

    this.material = new StarMaterial();
    this.material.uniforms.fade.value = this.fade;
    this.material.blending = THREE.AdditiveBlending;
    this.material.depthWrite = false;
    this.material.transparent = true;
    this.material.vertexColors = true;

    const geometry = this.createGeometry(this.initPosition);
    this.model = new THREE.Points(geometry, this.material);
    this.animate = this.animate.bind(this);
    // this.model = new THREE.Points(geometry, this.material);
  }

  animate() {
    this.material.uniforms.time.value += this.speed * 0.01;
  }

  createGeometry(initPosition: Float32Array) {
    const positions: number[] = [...initPosition];
    const colors: number[] = [];
    const sizes = Array.from(
      { length: this.count },
      () => (0.5 + 0.5 * Math.random()) * this.factor
    );
    const color = new THREE.Color();
    let r = this.radius + this.depth;
    const increment = this.depth / this.count;

    // position이 있는 경우는 그걸 쓰고 아닌 경우만 랜덤으로 만들기
    if (initPosition.length === 0) {
      for (let i = 0; i < this.count; i++) {
        r -= increment * Math.random();
        const starPos = genStarField(r);
        positions.push(starPos.x, starPos.y, starPos.z);
      }
    }

    for (let i = 0; i < this.count; i++) {
      if (this.color === "white") {
        color.setHSL(i / this.count, this.saturation, 0.9);
      } else {
        color.set(this.color);
      }
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    return geometry;
  }

  get star() {
    return this.model;
  }
}
