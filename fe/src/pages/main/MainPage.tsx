import { useEffect, useState } from "react";
import { DetailHelmet } from "../../components/meta/DetailHelmet";
import { Canvas } from "@react-three/fiber";
import { Box } from "./components/Box";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface";
import ScrollManager from "./components/ScrollManager";

export default function MainPage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SERVER}/api/hello`).then((res) => {
      console.log(res);
    });
    console.log("main");
  }, []);

  return (
    <>
      <DetailHelmet
        title="메인"
        pageTitle="방구석 코딩쟁이의 코딩 일대기"
        url={import.meta.env.VITE_BASE_URL + "/main"}
        shortDesc="방구석 코딩쟁이의 포트폴리오를 소개합니다."
      />
      <>
        <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
          <color attach="background" args={["#ececec"]} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager
              currentSectionIndex={currentSectionIndex}
              onCurrentSectionIndexChange={setCurrentSectionIndex}
            />
            <Box />
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </>
    </>
  );
}
