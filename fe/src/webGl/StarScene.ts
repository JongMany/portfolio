import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  animationScript,
  animationTimeline,
} from "../pages/root/constants/animationScript";
import { points } from "@/constants/points";
import { Star } from "@/webGl/Star";
import { MyStar } from "@/webGl/MyStar";

type Points = THREE.Points<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
>;

/**
 * @class StarScene
 * @description 스크롤에 따라 카메라의 위치를 변경하는 클래스
 */
export class StarScene {
  private animationScript = animationScript; // 애니메이션 스크립트 관련 코드
  private scrollRate: number = 0; // 스크롤 비율

  private renderer: THREE.WebGLRenderer;
  private domElement: HTMLElement; // 렌더러를 붙일 DOM 엘리먼트
  private scene: THREE.Scene;

  private camera?: THREE.PerspectiveCamera;
  private pointLight?: THREE.Light;
  private ambientLight?: THREE.Light;

  private myStars: MyStar[] = [];
  private backgroundStars: Star[] = [];

  private controls?: OrbitControls;

  private raycaster: THREE.Raycaster;
  private pointer: THREE.Vector2 = new THREE.Vector2(-1000, -1000);
  private clickPoints: THREE.Vector2 | null = null;

  constructor(
    renderer: THREE.WebGLRenderer,
    domElement: HTMLElement,
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

    // 배경 별
    this.createBackgroundStars();
    // 내 별
    this.createMyStar();

    // raycaster
    this.raycaster = new THREE.Raycaster();

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
    // 초기 스크롤 비율 계산
    const scrollRate = scrollTop / (scrollHeight - clientHeight);
    this.updateScrollRate(scrollRate);

    // set resize events
    this.setResizeEvents();
    // set animation
    this.setAnimation();
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

    // const textureLoader = new THREE.TextureLoader();
    // textureLoader.setCrossOrigin("anonymous");
    // const particleTexture = textureLoader.load(
    //   // "https://img.icons8.com/color/452/star.png"
    //   "/texture/star.png"
    // );

    // const particleMaterial = new THREE.PointsMaterial({
    //   size: 0.7,
    //   sizeAttenuation: true,
    //   map: particleTexture,
    //   color: 0xffff00,
    //   // alphaTest: 0.5,
    //   // transparent: true,
    // });

    // const stars = new THREE.Points(particleGeometry, particleMaterial);
    // this.myStars = [stars];

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const myStar = new MyStar(i, point);
      this.scene.add(myStar.star);
      this.myStars.push(myStar);
    }
  }

  private createBackgroundStars(count: number = 5000) {
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

    this.backgroundStars.push(stars, starField);

    this.scene.add(stars.star);
  }

  /**
   * @method 애니메이션 세팅하는 메서드
   * @description 애니메이션을 렌더링하는 메서드를 호출한다.
   */
  private setAnimation() {
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  /**
   * @method 렌더링 메서드
   * @description 렌더러를 통해 씬을 렌더링한다.
   */
  private render() {
    // console.log(this.camera?.position, this.scrollRate);
    this.animate(this.scrollRate);

    this.backgroundStars.forEach((item) => {
      item.animate();
    });
    // this.myStars.forEach((star) => {
    //   star.animate();
    // });
    this.raycaster.setFromCamera(this.pointer, this.camera!);
    const intersectItem = this.raycaster
      .intersectObjects(this.scene.children)
      .filter((obj) => obj.object.name.includes("myStar"))[0];

    if (intersectItem) {
      const selectIndex = Number(intersectItem.object.name.split("_")[1]);
      for (let i = 0; i < this.myStars.length; i++) {
        const selectStar = this.myStars[i];
        const colors = selectStar.star.geometry.attributes.color.array;
        if (i === selectIndex) {
          colors[0] = 1;
          colors[1] = 1;
          colors[2] = 0;
          // selectStar.star.geometry.attributes.color.needsUpdate = true;
        } else {
          colors[0] = 1;
          colors[1] = 1;
          colors[2] = 1;
        }
        selectStar.star.geometry.attributes.color.needsUpdate = true;
      }
    } else {
      for (let i = 0; i < this.myStars.length; i++) {
        const selectStar = this.myStars[i];
        const colors = selectStar.star.geometry.attributes.color.array;
        colors[0] = 1;
        colors[1] = 1;
        colors[2] = 1;
        selectStar.star.geometry.attributes.color.needsUpdate = true;
      }
    }
    //

    // for (const object of intersects) {
    //   const colors = (object.object as Points).geometry.attributes.color
    //     .array as Float32Array;
    //   colors[0] = 1;
    //   colors[1] = 1;
    //   colors[2] = 0;
    //   (object.object as Points).geometry.attributes.color.needsUpdate = true;
    // }

    this.renderer.render(this.scene, this.camera!);
  }

  animate(scrollRate: number) {
    if (!this.camera) return;

    this.animationScript.forEach((script) => {
      const { start, end, func } = script;
      if (scrollRate >= start && scrollRate < end) {
        func(this.camera!, scrollRate);
      }
    });
    this.backgroundStars.forEach((item) => {
      item.star.rotation.y += 0.001;
      item.star.rotation.x += 0.001;
    });

    this.camera.updateProjectionMatrix();
  }

  /**
   * @method 스크롤 비율 업데이트 메서드
   * @param scrollRate {number} 스크롤 비율
   */
  updateScrollRate(scrollRate: number) {
    this.scrollRate = scrollRate;
  }

  private setResizeEvents() {
    this.onResize(); // 초기 사이즈 설정을 위해 한번 호출
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("pointermove", this.onPointerMove.bind(this));
    window.addEventListener("click", this.onClick.bind(this));
  }

  private onPointerMove(event: PointerEvent) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private onClick(event: MouseEvent) {
    this.clickPoints = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.raycaster.setFromCamera(this.clickPoints, this.camera!);
    const intersectItem = this.raycaster
      .intersectObjects(this.scene.children)
      .filter((obj) => obj.object.name.includes("myStar"))[0];
    if (intersectItem) {
      const index = Number(intersectItem.object.name.split("_")[1]);
      // const target = points[index];
      this.updateScrollRate(animationTimeline[index].start);
      window.scrollTo(
        0,
        animationScript[index].start * document.documentElement.scrollHeight
      );
    }

    this.clickPoints = null;
  }

  private onResize() {
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;

    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  /**
   * @method 카메라 세팅 메서드
   */
  private setCamera() {
    const width = this.domElement.clientWidth;
    const height = this.domElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 7);
    this.camera.lookAt(0, 0, 0);
  }

  /**
   * @method 라이트 세팅 메서드
   * @description pointLight와 ambientLight를 생성하여 씬에 추가한다.
   */
  private setLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.ambientLight.position.set(0, 0, 0);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, 2);
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);
  }

  /**
   * @method 컨트롤러 세팅 메서드 (디버그용)
   */
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

  /**
   * @method 렌더러 제거 메서드 (디버그용)
   */
  destroy() {
    this.renderer.domElement.remove();
    window.removeEventListener("resize", this.resize.bind(this));
    this.renderer.setAnimationLoop(null);
  }
}
