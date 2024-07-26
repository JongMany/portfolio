import {
  starFragmentShader,
  starVertexShader,
} from "@/shared/constants/shader/starShader";
import * as THREE from "three";

export class MyStar {
  private uniforms: {
    iTime: { value: number };
    iResolution: { value: THREE.Vector2 };
    iMouse: { value: THREE.Vector2 };
    // uColor: { value: THREE.Color };
    // color: { value: THREE.Color };
    // uAlpha: { value: number };
  };
  private model: THREE.Points;
  private material: THREE.ShaderMaterial;
  private geometry: THREE.BufferGeometry;

  constructor(
    private index: number,
    private position: [number, number, number],
    private speed: number = 300
  ) {
    this.uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { value: new THREE.Vector2() },
      // uColor: { value: new THREE.Color(0xffff00) },
      // color: { value: new THREE.Color(0xff0000) },
      // uAlpha: { value: 1.0 },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      depthWrite: false,
    });

    this.geometry = new THREE.BufferGeometry();

    // Adding color attribute as required by vertex shader
    const colors = new Float32Array([1.0, 1.0, 1.0]); // Example white color
    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(this.position), 3)
    );

    this.geometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute([2], 1)
    );
    this.model = new THREE.Points(this.geometry, this.material);
    this.model.name = "myStar_" + this.index;

    this.animate = this.animate.bind(this);
  }

  get star() {
    return this.model;
  }

  setColor(newColor: THREE.Color) {
    const colors = this.geometry.attributes.color.array as Float32Array;
    colors[0] = newColor.r;
    colors[1] = newColor.g;
    colors[2] = newColor.b;
    this.geometry.attributes.color.needsUpdate = true;
  }

  animate() {
    this.uniforms.iTime.value += 0.01 * this.speed;
    // this.material.uniforms.iTime.value += this.speed * 0.01;
  }
}
