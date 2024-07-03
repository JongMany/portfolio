import { starFragmentShader, starVertexShader } from "@/constants/starShader";
import * as THREE from "three";

export class MyStar {
  private uniforms: {
    iTime: { value: number };
    iResolution: { value: THREE.Vector2 };
    iMouse: { value: THREE.Vector2 };
  };
  private model: THREE.Points;

  constructor(private position: [number, number, number]) {
    this.uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color(0xffff00) },
        uAlpha: { value: 1.0 },
      },
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(this.position), 3)
    );

    geometry.setAttribute("size", new THREE.Float32BufferAttribute([2], 1));
    this.model = new THREE.Points(geometry, material);

    // this.model.position.set(position[0], position[1], position[2]);
    this.animate = this.animate.bind(this);
  }

  get star() {
    return this.model;
  }

  animate() {
    this.uniforms.iTime.value += 0.01;
  }
}
