import { type GLTF } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { declare } from "./Gltf";

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

// declare function useGLTF<T extends string | string[]>(
//   path: T,
//   useDraco?: boolean | string,
//   useMeshOpt?: boolean,
//   extendLoader?: (loader: GLTFLoader) => void
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// ): T extends any[] ? GLTFResult[] : GLTFResult;

// 타입 보강
// declare module "@react-three/drei" {
//   export type GLTFResult = GLTFResult;
//   export const useGLTF: typeof declare.useGLTF;
//   // export type GLTFResult = declare.GLTFResult;
// }

// declare module "@react-three/drei" {
declare module "@react-three/drei" {
  export function useGLTF<T extends string | string[]>(
    path: T,
    useDraco?: boolean | string,
    useMeshOpt?: boolean,
    extendLoader?: (loader: GLTFLoader) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): T extends any[] ? GLTFResult[] : GLTFResult;
}
