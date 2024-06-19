import { type GLTF } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

type ObjectMap = {
  nodes: {
    [name: string]: THREE.Object3D & {
      geometry: THREE.BufferGeometry;
    };
  };
  materials: {
    [name: string]: THREE.Material;
  };
};
type GLTFResult = GLTF & ObjectMap;

export declare function useGLTF<T extends string | string[]>(
  path: T,
  useDraco?: boolean | string,
  useMeshOpt?: boolean,
  extendLoader?: (loader: GLTFLoader) => void
): T extends any[] ? GLTFResult[] : GLTFResult;
