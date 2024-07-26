import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { Star } from "@/shared/constants/webGl/bigbang/Star";

export class BigBangScene {
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private pointLight?: THREE.Light;
  private ambientLight?: THREE.Light;
  private controls?: OrbitControls;
  private stars: Star[] = [];
  private starCount = 1000;

  constructor(
    private renderer: THREE.WebGLRenderer,
    private domElement: HTMLElement,
    debug = false
  ) {
    // renderer
    this.renderer = renderer;
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    // domElement
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

    // Star
    this.createStars();

    // EventListener
    this.setEventListener();

    // Animation
    this.setAnimation();

    if (debug) {
      this.setHelpers();
      this.setControls();
    }
  }

  private setEventListener() {
    this.onResize(); // 초기 사이즈 설정을 위해 한번 호출
    window.addEventListener("resize", this.onResize.bind(this));
  }

  private onResize() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private setCamera() {
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 7);
    this.camera.lookAt(0, 0, 0);
  }

  private setLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.ambientLight.position.set(0, 0, 0);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, 2);
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);
  }

  private setControls() {
    this.controls = new OrbitControls(this.camera!, this.renderer.domElement);
    this.controls.enableDamping = true; // Set to true is used to give a sense of weight to the controls
  }

  private setHelpers() {
    const axes = new THREE.AxesHelper(10);
    const grid = new THREE.GridHelper(10, 10);
    axes.renderOrder = 2;
    grid.renderOrder = 1;
    this.scene.add(axes);
    this.scene.add(grid);
  }

  private setAnimation() {
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private render() {
    this.stars.forEach((star) => {
      star.animate();
    });
    this.renderer.render(this.scene, this.camera!);
  }

  private createStars() {
    for (let i = 0; i < this.starCount; i++) {
      const star = new Star([0, 0, 0], Math.random(), [
        Math.random(),
        Math.random(),
        Math.random(),
      ]);
      this.stars.push(star);
      this.scene.add(star.star);
    }
  }
}
