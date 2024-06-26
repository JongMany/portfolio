import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import { Office } from "./modeling/Office";
import { motion } from "framer-motion-3d";
import { AvatarWrapper } from "./modeling/AvatarWrapper";
import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { framerMotionConfig } from "../../../configs/framerConfig";

type Props = {
  currentSectionIndex: number;
  menuOpened: boolean;
};
export default function Model({ currentSectionIndex, menuOpened }: Props) {
  const { viewport } = useThree();

  const cameraPositionX = useMotionValue(0);
  const cameraLookAtX = useMotionValue(0);

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened, cameraLookAtX, cameraPositionX]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1} />

      <motion.group
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: currentSectionIndex === 0 ? 0 : -1,
        }}
      >
        <Office currentSectionIndex={currentSectionIndex} />
      </motion.group>

      {/* SKILL */}
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: currentSectionIndex === 1 ? 0 : -10,
          y: currentSectionIndex === 1 ? -viewport.height : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
        <group scale={[2, 2, 2]} position-y={-1.5}>
          <AvatarWrapper
            animation={currentSectionIndex === 0 ? "Falling" : "Standing"}
          />
        </group>
      </motion.group>
    </>
  );
}
