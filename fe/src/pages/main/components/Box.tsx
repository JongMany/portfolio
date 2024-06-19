// import { OrbitControls } from "@react-three/drei";

export const Box = () => {
  return (
    <>
      {/* <OrbitControls /> */}
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};
