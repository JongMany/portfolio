import { Texture } from "three";
declare module "three" {
  export type Texture = typeof Texture & {
    encoding?: number;
  };
}
