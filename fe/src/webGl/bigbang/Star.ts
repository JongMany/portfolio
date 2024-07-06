import * as THREE from "three";

import {
  starFragmentShader,
  starVertexShader,
} from "@/constants/shader/starShader";

export class Star {
  private uniforms: {
    iTime: { value: number };
    iResolution: { value: THREE.Vector2 };
    iMouse: { value: THREE.Vector2 };
  };
  private model: THREE.Points;
  private material: THREE.ShaderMaterial;
  private geometry: THREE.BufferGeometry;

  private velocity = {
    x: (Math.random() - 0.5) * 0.05,
    y: (Math.random() - 0.5) * 0.05,
    z: (Math.random() - 0.5) * 0.05,
  };

  constructor(
    private position: [number, number, number],
    private size: number,
    private color: [number, number, number]
  ) {
    this.uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { value: new THREE.Vector2() },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      depthWrite: false,
    });

    this.geometry = new THREE.BufferGeometry();

    const colors = new Float32Array(this.color); // Example white color
    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(this.position), 3)
    );

    this.geometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute([this.size], 1)
    );
    this.model = new THREE.Points(this.geometry, this.material);
  }

  get star() {
    return this.model;
  }

  animate() {
    // this.uniforms.iTime.value += 0.01;
    this.model.position.x += this.velocity.x;
    this.model.position.y += this.velocity.y;
    this.model.position.z += this.velocity.z;
    if (this.model.position.x > 10 || this.model.position.x < -10) {
      this.model.position.x = 0;
      this.model.position.y = 0;
      this.model.position.z = 0;
    }

    if (this.model.position.y > 10 || this.model.position.y < -10) {
      this.model.position.x = 0;
      this.model.position.y = 0;
      this.model.position.z = 0;
    }

    if (this.model.position.z > 10 || this.model.position.z < -10) {
      this.model.position.x = 0;
      this.model.position.y = 0;
      this.model.position.z = 0;
    }
  }
}
