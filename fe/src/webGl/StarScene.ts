import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { animationScript } from "../pages/root/constants/animationScript";
import { points } from "@/constants/points";
import { Star } from "@/webGl/Star";
import { MyStar } from "@/webGl/MyStar";

export class StarScene {
  private renderer: THREE.WebGLRenderer;
  private domElement: HTMLElement;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private pointLight?: THREE.Light;
  private ambientLight?: THREE.Light;
  private models: THREE.Object3D[] = [];
  private myStar?: THREE.Object3D[] = [];
  private controls?: OrbitControls;
  private scrollRate: number = 0;
  private animationScript = animationScript;
  private stars: Star[] = [];

  constructor(
    renderer: THREE.WebGLRenderer,
    domElement: HTMLElement,
    debug = false
  ) {
    // renderer
    this.renderer = renderer;
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.domElement = domElement;
    const hasChild =
      [...this.domElement.childNodes].filter((el) => el.nodeName === "CANVAS")
        .length > 0;

    if (!hasChild) {
      this.domElement.appendChild(this.renderer.domElement);
    }
    // scene
    this.scene = new THREE.Scene();
    const fog = new THREE.Fog(0x000000, 1, 40);
    this.scene.fog = fog;

    // camera, light, models
    this.setCamera();
    this.setLight();
    // 배경 별
    this.createParticles();
    // 내 별
    this.createMyStar();

    // controls
    if (debug) {
      this.setControls();
    }
    // helpers
    if (debug) {
      this.setHelpers();
    }

    // ScrollRate
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const clientHeight = document.documentElement.clientHeight; // 화면 높이
    const scrollHeight = document.documentElement.scrollHeight; // 전체 높이

    const scrollRate = scrollTop / (scrollHeight - clientHeight);
    this.updateScrollRate(scrollRate);

    // set resize events
    this.setResizeEvents();
    this.setAnimation();
  }

  private setCamera() {
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 7);
    this.camera.lookAt(0, 0, 0);
  }

  private setControls() {
    this.controls = new OrbitControls(this.camera!, this.renderer.domElement);
    this.controls.enableDamping = true; // Set to true is used to give a sense of weight to the controls
  }

  private setLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.ambientLight.position.set(0, 0, 0);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, 2);
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);
  }

  private createMyStar() {
    const starPoint = points;
    const particleGeometry = new THREE.BufferGeometry();
    const particlesCount = starPoint.length * 3;

    const vertices = new Float32Array(particlesCount);

    for (let i = 0; i < points.length; i++) {
      vertices[i * 3] = starPoint[i][0];
      vertices[i * 3 + 1] = starPoint[i][1];
      vertices[i * 3 + 2] = starPoint[i][2];
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3) // 3 values for each vertex (x, y, z)
    );

    const textureLoader = new THREE.TextureLoader();
    // textureLoader.setCrossOrigin("anonymous");
    const particleTexture = textureLoader.load(
      // "https://img.icons8.com/color/452/star.png"
      "/texture/star.png"
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.7,
      sizeAttenuation: true,
      map: particleTexture,
      color: 0xffff00,
      // alphaTest: 0.5,
      // transparent: true,
    });

    const stars = new THREE.Points(particleGeometry, particleMaterial);
    this.myStar = [stars];

    for (const point of points) {
      const ss = new MyStar(point);
      this.scene.add(ss.star);
      this.myStar.push(ss.star);
    }

    // this.scene.add(...this.myStar);
  }

  private setResizeEvents() {
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  private resize() {
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;

    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private createParticles(count: number = 5000) {
    // Geometry
    // const particleGeometry = new THREE.BufferGeometry();
    const particlesCount = count * 3;

    const vertices = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      vertices[i] = (Math.random() - 0.5) * 1000;
    }

    const starField = new Star();
    this.scene.add(starField.star);

    const stars = new Star(vertices, count, "blue");

    this.stars.push(stars, starField);

    this.scene.add(stars.star);
  }

  private setAnimation() {
    this.renderer.setAnimationLoop(this.render.bind(this));
    // this.render();
  }

  private render() {
    // console.log(this.camera?.position, this.scrollRate);
    this.animate(this.scrollRate);
    this.renderer.render(this.scene, this.camera!);
    this.stars.forEach((item) => {
      item.animate();
    });
    // this.renderer.setAnimationLoop(this.render.bind(this));
  }

  animate(scrollRate: number) {
    if (!this.camera) return;

    this.animationScript.forEach((script) => {
      const { start, end, func } = script;
      if (scrollRate >= start && scrollRate < end) {
        func(this.camera!, scrollRate);
      }
    });
    this.stars.forEach((item) => {
      item.star.rotation.y += 0.001;
      item.star.rotation.x += 0.001;
    });

    this.camera.updateProjectionMatrix();
  }

  private setHelpers() {
    const axes = new THREE.AxesHelper(10);
    const grid = new THREE.GridHelper(10, 10);
    axes.renderOrder = 2;
    grid.renderOrder = 1;
    this.scene.add(axes);
    this.scene.add(grid);
  }

  updateScrollRate(scrollRate: number) {
    this.scrollRate = scrollRate;
  }

  destroy() {
    this.renderer.domElement.remove();
    window.removeEventListener("resize", this.resize.bind(this));
    this.renderer.setAnimationLoop(null);
  }
}